import { Context } from "../../types";
import { MainService } from "../services";
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
    getCountries: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getCountries({ ..._args, ...context }),

    getRegions: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getRegions({ ...context, ..._args }),

    getRegionsByCountry: (_parent: unknown, _args: { countryId: number } & PaginationInput, context: Context) =>
      MainService.getRegionsByCountry({ ...context, ..._args }),

    getCities: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getCities({ ...context, ..._args }),

    getCitiesByRegion: (_parent: unknown, _args: { regionId: number } & PaginationInput, context: Context) =>
      MainService.getCitiesByRegion({ ...context, ..._args }),

    getCounties: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getCounties({ ...context, ..._args }),

    getCountiesByCity: (_parent: unknown, _args: { cityId: number } & PaginationInput, context: Context) =>
      MainService.getCountiesByCity({ ...context, ..._args }),

    // Export queries (for CSV/XLSX generation)
    exportAllCountries: (_parent: unknown, _args: unknown, context: Context) => MainService.exportAllCountries({ ...context }),

    exportAllRegions: (_parent: unknown, _args: unknown, context: Context) => MainService.exportAllRegions({ ...context }),

    exportRegionsByCountry: (_parent: unknown, _args: { countryId: number }, context: Context) =>
      MainService.exportRegionsByCountry({ ...context, ..._args }),

    exportAllCities: (_parent: unknown, _args: unknown, context: Context) => MainService.exportAllCities({ ...context }),

    exportCitiesByRegion: (_parent: unknown, _args: { regionId: number }, context: Context) =>
      MainService.exportCitiesByRegion({ ...context, ..._args }),

    exportAllCounties: (_parent: unknown, _args: unknown, context: Context) => MainService.exportAllCounties({ ...context }),

    exportCountiesByCity: (_parent: unknown, _args: { cityId: number }, context: Context) =>
      MainService.exportCountiesByCity({ ...context, ..._args }),
  },
  Mutation: {
    // Individual CRUD operations
    createCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      MainService.createCountry({ ..._args, ...context }),

    updateCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      MainService.updateCountry({ ..._args, ...context }),

    deleteCountry: (_parent: unknown, _args: { input: CountryInput }, context: Context) =>
      MainService.deleteCountry({ ..._args, ...context }),

    createRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) => MainService.createRegion({ ..._args, ...context }),

    updateRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) => MainService.updateRegion({ ..._args, ...context }),

    deleteRegion: (_parent: unknown, _args: { input: RegionInput }, context: Context) => MainService.deleteRegion({ ..._args, ...context }),

    createCity: (_parent: unknown, _args: { input: CityInput }, context: Context) => MainService.createCity({ ..._args, ...context }),

    updateCity: (_parent: unknown, _args: { input: CityInput }, context: Context) => MainService.updateCity({ ..._args, ...context }),

    deleteCity: (_parent: unknown, _args: { input: CityInput }, context: Context) => MainService.deleteCity({ ..._args, ...context }),

    createCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) => MainService.createCounty({ ..._args, ...context }),

    updateCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) => MainService.updateCounty({ ..._args, ...context }),

    deleteCounty: (_parent: unknown, _args: { input: CountyInput }, context: Context) => MainService.deleteCounty({ ..._args, ...context }),

    // Bulk import operations
    bulkImportCountries: (_parent: unknown, _args: { countries: CountryInput[] }, context: Context) =>
      MainService.bulkImportCountries({ ...context, ..._args }),

    bulkImportRegions: (_parent: unknown, _args: { regions: RegionInput[] }, context: Context) =>
      MainService.bulkImportRegions({ ...context, ..._args }),

    bulkImportCities: (_parent: unknown, _args: { cities: CityInput[] }, context: Context) =>
      MainService.bulkImportCities({ ...context, ..._args }),

    bulkImportCounties: (_parent: unknown, _args: { counties: CountyInput[] }, context: Context) =>
      MainService.bulkImportCounties({ ...context, ..._args }),
  },
};
