import { UserService } from "../services/users";
import { type SellerType } from "../../types/enums";
import { type RegisterPersonInput, type RegisterStoreInput } from "../../types/user";

export const UserResolver = {
  Query: {
    // Location queries
    countries: () => UserService.getCountries(),
    regions: (_parent: unknown, args: { countryId: string }) => UserService.getRegions(args),
    cities: (_parent: unknown, args: { regionId: string }) => UserService.getCities(args),
    counties: (_parent: unknown, args: { cityId: string }) => UserService.getCounties(args),

    // User queries
    users: (
      _parent: unknown,
      args: {
        sellerType?: SellerType;
        isActive?: boolean;
        isVerified?: boolean;
        limit?: number;
        offset?: number;
      },
    ) => UserService.getUsers(args),
    user: (_parent: unknown, args: { id: string }) => UserService.getUserById(args),
    userByEmail: (_parent: unknown, args: { email: string }) => UserService.getUserByEmail(args),
    me: (_parent: unknown, _args: unknown, context: { userId: string }) => UserService.getMe({ id: context.userId }),

    // Store-specific queries
    stores: (
      _parent: unknown,
      args: {
        isActive?: boolean;
        isVerified?: boolean;
        limit?: number;
        offset?: number;
      },
    ) => UserService.getStores(args),
    storeCatalog: () => UserService.getStoreCatalog(),

    // Categories
    userCategories: () => UserService.getUserCategories(),
    userCategory: (_parent: unknown, args: { id: string }) => UserService.getUserCategory(args),

    // Sessions
    mySessions: (_parent: unknown, _args: unknown, context: { userId: string }) =>
      UserService.getMySessions({ userId: context.userId }),
  },

  Mutation: {
    // Registration
    registerPerson: (_parent: unknown, args: { input: RegisterPersonInput }) => UserService.registerPerson(args.input),
    registerStore: (_parent: unknown, args: { input: RegisterStoreInput }) => UserService.registerStore(args.input),

    // Password management
    updatePassword: (
      _parent: unknown,
      args: { currentPassword: string; newPassword: string },
      context: { userId: string },
    ) =>
      UserService.updatePassword({
        userId: context.userId,
        currentPassword: args.currentPassword,
        newPassword: args.newPassword,
      }),
    requestPasswordReset: (_parent: unknown, args: { email: string }) => {
      // TODO: Implement password reset request
      throw new Error("Password reset not implemented yet");
    },
    resetPassword: (_parent: unknown, args: { token: string; newPassword: string }) => {
      // TODO: Implement password reset
      throw new Error("Password reset not implemented yet");
    },

    // Profile updates
    updateUser: (_parent: unknown, args: { input: any }, context: { userId: string }) =>
      UserService.updateUser({ userId: context.userId, input: args.input }),
    updatePersonProfile: (_parent: unknown, args: { input: any }, context: { userId: string }) =>
      UserService.updatePersonProfile({ userId: context.userId, input: args.input }),
    updateStoreProfile: (_parent: unknown, args: { input: any }, context: { userId: string }) =>
      UserService.updateStoreProfile({ userId: context.userId, input: args.input }),

    // Account management
    verifyAccount: (_parent: unknown, args: { token: string }) => {
      // TODO: Implement account verification
      throw new Error("Account verification not implemented yet");
    },
    resendVerificationEmail: () => {
      // TODO: Implement resend verification email
      throw new Error("Resend verification email not implemented yet");
    },
    deactivateAccount: (_parent: unknown, _args: unknown, context: { userId: string }) =>
      UserService.deactivateAccount({ userId: context.userId }),
    reactivateAccount: (_parent: unknown, _args: unknown, context: { userId: string }) =>
      UserService.reactivateAccount({ userId: context.userId }),
    deleteAccount: (_parent: unknown, args: { password: string }, context: { userId: string }) =>
      UserService.deleteAccount({ userId: context.userId, password: args.password }),

    // Points and category management
    addPoints: (_parent: unknown, args: { userId: string; points: number }) =>
      UserService.addPoints({ userId: args.userId, points: args.points }),
    deductPoints: (_parent: unknown, args: { userId: string; points: number }) =>
      UserService.deductPoints({ userId: args.userId, points: args.points }),
    updateUserCategory: (_parent: unknown, args: { userId: string; categoryId: string }) =>
      UserService.updateUserCategory({ userId: args.userId, categoryId: args.categoryId }),

    // Admin mutations
    adminCreateUser: (_parent: unknown, args: { email: string; sellerType: SellerType; isVerified?: boolean }) =>
      UserService.adminCreateUser(args),
    adminUpdateUser: (_parent: unknown, args: { userId: string; input: any }) =>
      UserService.adminUpdateUser({ userId: args.userId, input: args.input }),
    adminDeleteUser: (_parent: unknown, args: { userId: string }) =>
      UserService.adminDeleteUser({ userId: args.userId }),
  },

  User: {
    __resolveReference: (reference: { id: string }) => UserService.getUserById(reference),
    profile: (parent: any) => {
      console.log("parent::", parent);

      if (parent.sellerType === "PERSON") return parent.PersonProfile;
      if (parent.sellerType === "STORE") return parent.StoreProfile;
      return null;
    },
    country: (parent: any) => parent.Country,
    region: (parent: any) => parent.Region,
    city: (parent: any) => parent.City,
    county: (parent: any) => parent.County,
    userCategory: (parent: any) => parent.UserCategory,
  },
  Profile: {
    __resolveType(obj: any) {
      if (obj.firstName !== undefined && obj.lastName !== undefined) {
        return "PersonProfile";
      }
      if (obj.businessName !== undefined && obj.taxId !== undefined) {
        return "StoreProfile";
      }
      return null;
    },
  },
};
