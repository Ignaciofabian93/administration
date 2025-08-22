import { UserResolver } from "./users";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
  },
  User: {
    ...UserResolver.User,
  },
  Profile: {
    ...UserResolver.Profile,
  },
};
