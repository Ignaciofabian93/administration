import { PlatformAdminService } from "../services/admin";
import { PaginationInput } from "./main";

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
  Mutation: {
    createCountry: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCountry(context.adminId, args.input),

    updateCountry: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCountry(context.adminId, args.id, args.input),

    deleteCountry: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCountry(context.adminId, args.id),

    createRegion: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createRegion(context.adminId, args.input),

    updateRegion: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateRegion(context.adminId, args.id, args.input),

    deleteRegion: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteRegion(context.adminId, args.id),

    createCity: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCity(context.adminId, args.input),

    updateCity: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCity(context.adminId, args.id, args.input),

    deleteCity: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCity(context.adminId, args.id),

    createCounty: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCounty(context.adminId, args.input),

    updateCounty: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCounty(context.adminId, args.id, args.input),

    deleteCounty: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCounty(context.adminId, args.id),
  },
};
