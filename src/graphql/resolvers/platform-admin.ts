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

export type PaginationInput = {
  limit: number;
  offset: number;
};

export const PlatformAdminResolver = {
  Query: {
    // Location queries
    getCountries: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCountries({ adminId: context.adminId, ..._args }),

    getRegions: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getRegions({ adminId: context.adminId, ..._args }),

    getRegionsByCountry: (_parent: unknown, _args: { countryId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getRegionsByCountry({ adminId: context.adminId, ..._args }),

    getCities: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCities({ adminId: context.adminId, ..._args }),

    getCitiesByRegion: (_parent: unknown, _args: { regionId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCitiesByRegion({ adminId: context.adminId, ..._args }),

    getCounties: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCounties({ adminId: context.adminId, ..._args }),

    getCountiesByCity: (_parent: unknown, _args: { cityId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCountiesByCity({ adminId: context.adminId, ..._args }),

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
