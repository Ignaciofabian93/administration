import { UserResolver } from "./users";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
  },
  User: {
    __resolveReference: UserResolver.User.__resolveReference,
  },
};
