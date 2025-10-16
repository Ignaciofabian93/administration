import { Context } from "../../types";
import { PlatformAdminService } from "../services/admin";
import { PaginationInput } from "./main";

export type CountryInput = {
  id: number;
  country: string;
};

export type RegionInput = {
  id: number;
  region: string;
  countryId: number;
};

export type CityInput = {
  id: number;
  city: string;
  regionId: number;
};

export type CountyInput = {
  id: number;
  county: string;
  cityId: number;
};

export const LocationResolver = {
  Query: {
    // Paginated queries
    getCountries: (_parent: unknown, _args: PaginationInput, context: Context) =>
      PlatformAdminService.getCountries({ ..._args, ...context }),

    getRegions: (_parent: unknown, _args: PaginationInput, context: Context) => PlatformAdminService.getRegions({ ...context, ..._args }),

    getRegionsByCountry: (_parent: unknown, _args: { countryId: number } & PaginationInput, context: Context) =>
      PlatformAdminService.getRegionsByCountry({ ...context, ..._args }),

    getCities: (_parent: unknown, _args: PaginationInput, context: Context) => PlatformAdminService.getCities({ ...context, ..._args }),

    getCitiesByRegion: (_parent: unknown, _args: { regionId: number } & PaginationInput, context: Context) =>
      PlatformAdminService.getCitiesByRegion({ ...context, ..._args }),

    getCounties: (_parent: unknown, _args: PaginationInput, context: Context) => PlatformAdminService.getCounties({ ...context, ..._args }),

    getCountiesByCity: (_parent: unknown, _args: { cityId: number } & PaginationInput, context: Context) =>
      PlatformAdminService.getCountiesByCity({ ...context, ..._args }),

    // Export queries (for CSV/XLSX generation)
    exportAllCountries: (_parent: unknown, _args: unknown, context: Context) => PlatformAdminService.exportAllCountries({ ...context }),

    exportAllRegions: (_parent: unknown, _args: unknown, context: Context) => PlatformAdminService.exportAllRegions({ ...context }),

    exportRegionsByCountry: (_parent: unknown, _args: { countryId: number }, context: Context) =>
      PlatformAdminService.exportRegionsByCountry({ ...context, ..._args }),

    exportAllCities: (_parent: unknown, _args: unknown, context: Context) => PlatformAdminService.exportAllCities({ ...context }),

    exportCitiesByRegion: (_parent: unknown, _args: { regionId: number }, context: Context) =>
      PlatformAdminService.exportCitiesByRegion({ ...context, ..._args }),

    exportAllCounties: (_parent: unknown, _args: unknown, context: Context) => PlatformAdminService.exportAllCounties({ ...context }),

    exportCountiesByCity: (_parent: unknown, _args: { cityId: number }, context: Context) =>
      PlatformAdminService.exportCountiesByCity({ ...context, ..._args }),
  },
  Mutation: {
    // Individual CRUD operations
    createCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      PlatformAdminService.createCountry({ ..._args, ...context }),

    updateCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      PlatformAdminService.updateCountry({ ..._args, ...context }),

    deleteCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      PlatformAdminService.deleteCountry({ ..._args, ...context }),

    createRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) =>
      PlatformAdminService.createRegion({ ..._args, ...context }),

    updateRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) =>
      PlatformAdminService.updateRegion({ ..._args, ...context }),

    deleteRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) =>
      PlatformAdminService.deleteRegion({ ..._args, ...context }),

    createCity: (_parent: unknown, _args: { input: CityInput }, context: Context) =>
      PlatformAdminService.createCity({ ..._args, ...context }),

    updateCity: (_parent: unknown, _args: { input: CityInput }, context: Context) =>
      PlatformAdminService.updateCity({ ..._args, ...context }),

    deleteCity: (_parent: unknown, _args: { input: CityInput }, context: Context) =>
      PlatformAdminService.deleteCity({ ..._args, ...context }),

    createCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) =>
      PlatformAdminService.createCounty({ ..._args, ...context }),

    updateCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) =>
      PlatformAdminService.updateCounty({ ..._args, ...context }),

    deleteCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) =>
      PlatformAdminService.deleteCounty({ ..._args, ...context }),

    // Bulk import operations
    bulkImportCountries: (_parent: unknown, _args: { countries: CountryInput[] }, context: Context) =>
      PlatformAdminService.bulkImportCountries({ ...context, ..._args }),

    bulkImportRegions: (_parent: unknown, _args: { regions: RegionInput[] }, context: Context) =>
      PlatformAdminService.bulkImportRegions({ ...context, ..._args }),

    bulkImportCities: (_parent: unknown, _args: { cities: CityInput[] }, context: Context) =>
      PlatformAdminService.bulkImportCities({ ...context, ..._args }),

    bulkImportCounties: (_parent: unknown, _args: { counties: CountyInput[] }, context: Context) =>
      PlatformAdminService.bulkImportCounties({ ...context, ..._args }),
  },
};
