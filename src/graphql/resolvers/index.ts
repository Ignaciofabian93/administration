import { UserResolver } from "./users";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
  },
};
