import { UserService } from "../services/users";
import { type NewUser, type PasswordUpdate, type User } from "../../types/user";

export const UserResolver = {
  Query: {
    countries: (_parent: unknown, _args: unknown) => UserService.getCountries(),
    regions: (_parent: unknown, _args: { id: string }) => UserService.getRegions(_args),
    cities: (_parent: unknown, _args: { id: string }) => UserService.getCities(_args),
    counties: (_parent: unknown, _args: { id: string }) => UserService.getCounties(_args),
    users: (_parent: unknown, _args: unknown) => UserService.getUsers(),
    user: (_parent: unknown, _args: { id: string }) => UserService.getUser(_args),
    me: (_parent: unknown, _args: unknown, context: { id: string }) => UserService.getMe(context),
  },
  Mutation: {
    updateProfile: (_parent: unknown, _args: User) => UserService.updateProfile(_args),
    updatePassword: (_parent: unknown, _args: PasswordUpdate) => UserService.updatePassword(_args),
    register: (_parent: unknown, _args: NewUser) => UserService.register(_args),
  },
  User: {
    __resolveReference: (reference: { id: string }) => UserService.getUserById(reference),
  },
};
