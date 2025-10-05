import { UserService } from "../services/users";
import { type SellerType } from "../../types/enums";
import {
  type RegisterServiceInput,
  type RegisterPersonInput,
  type RegisterStoreInput,
  RegisterAdminInput,
} from "../../types/user";

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
    me: (_parent: unknown, _args: unknown, context: { userId: string }) => {
      console.log("context in me resolver:", context);

      return UserService.getMe({ userId: context.userId });
    },

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

    // Service-specific queries
    services: (
      _parent: unknown,
      args: {
        isActive?: boolean;
        isVerified?: boolean;
        limit?: number;
        offset?: number;
      },
    ) => {
      // Temporary: Use getUsers with SERVICE filter until getServices is implemented
      return UserService.getUsers({ ...args, sellerType: "SERVICE" as any });
    },
    serviceProviders: () => {
      // Temporary: Use getUsers with SERVICE filter until getServiceProviders is implemented
      return UserService.getUsers({ sellerType: "SERVICE" as any, isActive: true, isVerified: true });
    },

    // Categories
    userCategories: () => UserService.getUserCategories(),
    userCategory: (_parent: unknown, args: { id: string }) => UserService.getUserCategory(args),
  },

  Mutation: {
    // Registration
    registerAdmin: (_parent: unknown, args: { input: RegisterAdminInput }) => UserService.registerAdmin(args.input),
    registerPerson: (_parent: unknown, args: { input: RegisterPersonInput }) => UserService.registerPerson(args.input),
    registerStore: (_parent: unknown, args: { input: RegisterStoreInput }) => UserService.registerStore(args.input),
    registerService: (_parent: unknown, args: { input: RegisterServiceInput }) =>
      UserService.registerService(args.input),

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
    updateUser: (_parent: unknown, args: { input: any }, context: { userId: string }) => {
      return UserService.updateUser({ userId: context.userId, input: args.input });
    },
    updatePersonProfile: (_parent: unknown, args: { input: any }, context: { userId: string }) => {
      return UserService.updatePersonProfile({ userId: context.userId, input: args.input });
    },
    updateStoreProfile: (_parent: unknown, args: { input: any }, context: { userId: string }) => {
      return UserService.updateStoreProfile({ userId: context.userId, input: args.input });
    },
    // updateServiceProfile: (_parent: unknown, args: { input: any }, context: { userId: string }) =>
    //   UserService.updateServiceProfile({ userId: context.userId, input: args.input }), // TODO: Implement updateServiceProfile

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
      if (parent.sellerType === "PERSON") return parent.personProfile; // ✅ Fixed: camelCase
      if (parent.sellerType === "STORE") return parent.storeProfile; // ✅ Fixed: camelCase
      if (parent.sellerType === "SERVICE") return parent.serviceProfile; // ✅ Fixed: camelCase
      return null;
    },
    country: (parent: any) => parent.country, // ✅ Fixed: camelCase
    region: (parent: any) => parent.region, // ✅ Fixed: camelCase
    city: (parent: any) => parent.city, // ✅ Fixed: camelCase
    county: (parent: any) => parent.county, // ✅ Fixed: camelCase
    userCategory: (parent: any) => parent.sellerCategory, // ✅ Fixed: matches Prisma include
  },
  Profile: {
    __resolveType(obj: any) {
      if (obj.firstName !== undefined) {
        return "PersonProfile";
      }
      if (obj.businessName !== undefined && obj.serviceArea === undefined) {
        return "StoreProfile";
      }
      if (obj.businessName !== undefined && obj.serviceArea !== undefined) {
        return "ServiceProfile";
      }
      return null;
    },
  },
};
