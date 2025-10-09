import { PlatformAdminService } from "../services/admin";
import { PaginationInput } from "./admin";

export const LocationResolver = {
  Query: {
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
  },
};
