import { UserService } from "../services/users";
import { type User } from "../../types/user";

export const UserResolver = {
  Query: {
    storeCatalog: (_parent: unknown, _args: unknown) => UserService.getStoreCatalog(),
    countries: (_parent: unknown, _args: unknown) => UserService.getCountries(),
    regions: (_parent: unknown, _args: { id: string }) => UserService.getRegions(_args),
    cities: (_parent: unknown, _args: { id: string }) => UserService.getCities(_args),
    counties: (_parent: unknown, _args: { id: string }) => UserService.getCounties(_args),
    stores: (_parent: unknown, _args: unknown) => UserService.getStores(),
    users: (_parent: unknown, _args: unknown) => UserService.getUsers(),
    user: (_parent: unknown, _args: { id: string }) => UserService.getUser(_args),
    me: (_parent: unknown, _args: { id: string }) => UserService.getMe(_args),
  },
  Mutation: {
    updateProfile: (_parent: unknown, _args: User) => UserService.updateProfile(_args),
    updatePassword: (_parent: unknown, _args: { password: string; newPassword: string; id: string }) =>
      UserService.updatePassword(_args),
    register: (_parent: unknown, _args: Partial<User>) => UserService.register(_args),
  },
  User: {
    __resolveReference: (reference: { id: string }) => UserService.getUserById(reference),
  },
};
