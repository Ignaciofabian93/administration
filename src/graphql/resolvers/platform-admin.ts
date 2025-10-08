import { type AdminPermission, type AdminRole, type AdminType } from "../../types";
import { PlatformAdminService } from "../services/platform-admin";

export type CreateAdminInput = {
  email: string;
  password: string;
  name: string;
  lastName?: string;
  role: AdminRole;
  adminType: AdminType;
  permissions: AdminPermission[];
};

export const PlatformAdminResolver = {
  Query: {
    // Location queries
    getCountries: (_parent: unknown, _args: unknown, context: { adminId: string }) =>
      PlatformAdminService.getCountries({ adminId: context.adminId }),

    getRegions: (_parent: unknown, args: { countryId: number }, context: { adminId: string }) =>
      PlatformAdminService.getRegionsByCountry({ adminId: context.adminId, countryId: args.countryId }),

    getRegionsByCountry: (_parent: unknown, args: { countryId: number }, context: { adminId: string }) =>
      PlatformAdminService.getRegionsByCountry({ adminId: context.adminId, countryId: args.countryId }),

    getCities: (_parent: unknown, _args: unknown, context: { adminId: string }) =>
      PlatformAdminService.getCities({ adminId: context.adminId }),

    getCitiesByRegion: (_parent: unknown, args: { regionId: number }, context: { adminId: string }) =>
      PlatformAdminService.getCitiesByRegion({ adminId: context.adminId, regionId: args.regionId }),

    getCounties: (_parent: unknown, args: unknown, context: { adminId: string }) =>
      PlatformAdminService.getCounties({ adminId: context.adminId }),

    getCountiesByCity: (_parent: unknown, args: { cityId: number }, context: { adminId: string }) =>
      PlatformAdminService.getCountiesByCity({ adminId: context.adminId, cityId: args.cityId }),

    // Admin queries
    getMyData: async (_parent: unknown, _args: unknown, context: { adminId?: string }) => {
      console.log("🔍 getMyData resolver called");
      console.log("Context adminId:", context.adminId);

      if (!context.adminId) {
        console.error("❌ No adminId in context!");
        throw new Error("No se encontró la sesión del administrador. Por favor, inicia sesión nuevamente.");
      }

      return PlatformAdminService.getMyData(context.adminId);
    },
  },

  Mutation: {
    // Password management
    createAdmin: (_parent: unknown, args: { input: CreateAdminInput }, context: { adminId: string }) =>
      PlatformAdminService.createAdmin(args.input),
  },

  // Field resolvers to map Prisma relation names to GraphQL schema
  Admin: {
    region: (parent: any) => parent.Region,
    country: (parent: any) => parent.Country,
    city: (parent: any) => parent.City,
    county: (parent: any) => parent.County,
  },
};
