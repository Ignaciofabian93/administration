import express from "express";
import http from "http";
import cors from "cors";
import auth from "./auth/route";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./middleware/auth";
import { type Context } from "./types/context";

const app = express();
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
  "http://localhost:3000", // Local development
  "http://localhost:5173", // Vite default
  "http://localhost:5000", // Vite default
  "http://localhost:4200", // Angular default
  "https://studio.apollographql.com", // Apollo Studio
  // Add your production domain here
  // "https://your-production-domain.com"
];

app.use("/auth", auth);

app.use(
  "/graphql",
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
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-id", "x-user-id"],
  }),
  express.json({ limit: "20mb" }),
  express.urlencoded({ extended: true, limit: "20mb" }),
  expressMiddleware(server, {
    context: async ({ req }) => createContext({ req }),
  }),
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "administration" });
});

const PORT = process.env.PORT || 6000;

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`\n🚀 Administration GraphQL Server ready!`);
console.log(`📍 Local: http://localhost:${PORT}/graphql`);
console.log(`🔧 Apollo Sandbox (embedded): http://localhost:${PORT}/graphql`);
console.log(`📊 Apollo Studio: https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:${PORT}/graphql`);
console.log(`💚 Health Check: http://localhost:${PORT}/health\n`);
