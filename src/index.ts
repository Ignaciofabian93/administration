import express from "express";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./middleware/auth";

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  formatError: (err) => {
    // Log the error to the console
    console.error("GraphQL Error:", err);
    // Return the actual error message for development, you can customize this for production
    return err;
  },
});

await server.start();

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => createContext({ req }),
  }),
);

app.get("/", (req, res) => {
  res.send("User's subgraph is running");
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`User's subgraph is running on port ${PORT}`);
});
