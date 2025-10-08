import { PlatformAdminService } from "../services/platform-admin";

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
  },

  Mutation: {
    // Password management
  },
};
