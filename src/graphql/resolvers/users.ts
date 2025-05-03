import { UserService } from "../services/users";
import { type Context } from "../../types/context";
import { type PasswordUpdate, type User } from "../../types/user";

export const UserResolver = {
  Query: {
    countries: (_parent: unknown, _args: unknown) => UserService.getCountries(),
    regions: (_parent: unknown, _args: { id: string }) => UserService.getRegions(_args),
    cities: (_parent: unknown, _args: { id: string }) => UserService.getCities(_args),
    counties: (_parent: unknown, _args: { id: string }) => UserService.getCounties(_args),
    users: (_parent: unknown, _args: unknown, context: Context) => UserService.getUsers(context),
    user: (_parent: unknown, _args: { id: string }, context: Context) => UserService.getUser(_args, context),
    me: (_parent: unknown, _args: unknown, context: Context) => UserService.getMe(context),
  },
  Mutation: {
    updateProfile: (_parent: unknown, _args: User, context: Context) => UserService.updateProfile(_args, context),
    updatePassword: (_parent: unknown, _args: PasswordUpdate, context: Context) =>
      UserService.updatePassword(_args, context),
    register: (_parent: unknown, _args: Omit<User, "id">) => UserService.register(_args),
  },
  User: {
    __resolveReference: async (reference: { id: string }) => {
      return await UserService.getUserById(reference.id);
    },
  },
};
