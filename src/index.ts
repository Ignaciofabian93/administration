import express, { type Express } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./auth/route";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./middleware/auth";
import { type Context } from "./types/context";

const app: Express = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  introspection: true, // Enable for development
  formatError: (error) => {
    console.error("GraphQL Error:", error);
    return error;
  },
});

await server.start();

// CORS configuration for your web app
const allowedOrigins = [
  "http://localhost:5000", // Vite default
  "https://studio.apollographql.com", // Apollo Studio
  // Add your production domain here
  // "https://your-production-domain.com"
];

// Global CORS middleware for all routes
app.use(helmet());
app.use(
  cors<cors.CorsRequest>({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Log unauthorized origins for debugging
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// Body parsing middleware - MUST be before routes
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use("/session", auth);

// GraphQL endpoint
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => createContext({ req }),
  }) as unknown as express.RequestHandler,
);

const PORT = process.env.PORT || 4500;

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`\n🚀 Administration Server ready!`);
