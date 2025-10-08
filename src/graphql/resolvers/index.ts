import { PlatformAdminResolver } from "./platform-admin";
import { BusinessAdminResolver } from "./business-admin";

export const resolvers = {
  Query: {
    ...PlatformAdminResolver.Query,
    ...BusinessAdminResolver.Query,
  },
  Mutation: {
    ...PlatformAdminResolver.Mutation,
    ...BusinessAdminResolver.Mutation,
  },
};
