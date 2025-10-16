import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { type PaginationInput } from "../../resolvers/main";
import { calculatePrismaParams, createPaginatedResponse } from "../../../utils/pagination";
import { Context, BulkImportResult, BulkCountryInput, BulkRegionInput, BulkCityInput, BulkCountyInput } from "../../../types";
import { CityInput, CountryInput, CountyInput, RegionInput } from "../../resolvers/location";

export const LocationServices = {
  getCountries: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.country.count();

      const countries = await prisma.country.findMany({
        take,
        skip,
      });

      return createPaginatedResponse(countries, totalCount, page, pageSize);
    } catch (error) {
      console.error(error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los países");
    }
  },

  getRegions: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.region.count();

      const regions = await prisma.region.findMany({
        take,
        skip,
      });

      return createPaginatedResponse(regions, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones");
    }
  },

  getRegionsByCountry: async ({ adminId, countryId, page = 1, pageSize = 10 }: { countryId: number } & PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.region.count({
        where: { countryId },
      });

      const regions = await prisma.region.findMany({
        where: { countryId },
        take,
        skip,
      });

      return createPaginatedResponse(regions, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones por país");
    }
  },

  getCities: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.city.count();

      const cities = await prisma.city.findMany({
        take,
        skip,
      });

      return createPaginatedResponse(cities, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades");
    }
  },

  getCitiesByRegion: async ({ adminId, regionId, page = 1, pageSize = 10 }: { regionId: number } & PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.city.count({
        where: { regionId },
      });

      const cities = await prisma.city.findMany({
        where: { regionId },
        take,
        skip,
      });

      return createPaginatedResponse(cities, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades por región");
    }
  },

  getCounties: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.county.count();

      const counties = await prisma.county.findMany({
        take,
        skip,
      });

      return createPaginatedResponse(counties, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los condados");
    }
  },
  getCountiesByCity: async ({ adminId, cityId, page = 1, pageSize = 10 }: { cityId: number } & PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.county.count({
        where: { cityId },
      });

      const counties = await prisma.county.findMany({
        where: { cityId },
        take,
        skip,
      });

      return createPaginatedResponse(counties, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los condados por ciudad");
    }
  },

  // Country CRUD operations
  createCountry: async ({ adminId, input }: { input: CountryInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const country = await prisma.country.create({
        data: { ...input },
      });

      return country;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el país");
    }
  },

  updateCountry: async ({ adminId, input }: { input: CountryInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const country = await prisma.country.update({
        where: { id: input.id },
        data: { ...input },
      });

      return country;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el país");
    }
  },

  deleteCountry: async ({ adminId, input }: { input: CountryInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.country.delete({
        where: { id: input.id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el país");
    }
  },

  // Region CRUD operations
  createRegion: async ({ adminId, input }: { input: RegionInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const region = await prisma.region.create({
        data: { ...input },
      });

      return region;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la región");
    }
  },

  updateRegion: async ({ adminId, input }: { input: RegionInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const region = await prisma.region.update({
        where: { id: input.id },
        data: { ...input },
      });

      return region;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la región");
    }
  },

  deleteRegion: async ({ adminId, input }: { input: RegionInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.region.delete({
        where: { id: input.id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la región");
    }
  },

  // City CRUD operations
  createCity: async ({ adminId, input }: { input: CityInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const city = await prisma.city.create({
        data: { ...input },
      });

      return city;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la ciudad");
    }
  },

  updateCity: async ({ adminId, input }: { input: CityInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const city = await prisma.city.update({
        where: { id: input.id },
        data: { ...input },
      });

      return city;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la ciudad");
    }
  },

  deleteCity: async ({ adminId, input }: { input: { id: number } } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.city.delete({
        where: { id: input.id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la ciudad");
    }
  },

  // County CRUD operations
  createCounty: async ({ adminId, input }: { input: CountyInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const county = await prisma.county.create({
        data: { ...input },
      });

      return county;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el condado");
    }
  },

  updateCounty: async ({ adminId, input }: { input: CountyInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const county = await prisma.county.update({
        where: { id: input.id },
        data: { ...input },
      });

      return county;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el condado");
    }
  },

  deleteCounty: async ({ adminId, input }: { input: { id: number } } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.county.delete({
        where: { id: input.id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el condado");
    }
  },

  // ============================================
  // BULK EXPORT OPERATIONS
  // ============================================

  exportAllCountries: async ({ adminId }: Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const countries = await prisma.country.findMany({
        orderBy: { country: "asc" },
      });

      return countries;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar los países");
    }
  },

  exportAllRegions: async ({ adminId }: Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany({
        orderBy: [{ countryId: "asc" }, { region: "asc" }],
      });

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar las regiones");
    }
  },

  exportRegionsByCountry: async ({ adminId, countryId }: { countryId: number } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany({
        where: { countryId },
        orderBy: { region: "asc" },
      });

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar las regiones por país");
    }
  },

  exportAllCities: async ({ adminId }: Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany({
        orderBy: [{ regionId: "asc" }, { city: "asc" }],
      });

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar las ciudades");
    }
  },

  exportCitiesByRegion: async ({ adminId, regionId }: { regionId: number } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany({
        where: { regionId },
        orderBy: { city: "asc" },
      });

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar las ciudades por región");
    }
  },

  exportAllCounties: async ({ adminId }: Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany({
        orderBy: [{ cityId: "asc" }, { county: "asc" }],
      });

      return counties;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar los condados");
    }
  },

  exportCountiesByCity: async ({ adminId, cityId }: { cityId: number } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany({
        where: { cityId },
        orderBy: { county: "asc" },
      });

      return counties;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar exportar los condados por ciudad");
    }
  },

  // ============================================
  // BULK IMPORT OPERATIONS
  // ============================================

  bulkImportCountries: async ({ adminId, countries }: { countries: BulkCountryInput[] } & Context): Promise<BulkImportResult> => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const result: BulkImportResult = {
        success: true,
        created: 0,
        failed: 0,
        errors: [],
      };

      for (let i = 0; i < countries.length; i++) {
        try {
          const country = countries[i];

          // Validate required fields
          if (!country.country || country.country.trim() === "") {
            throw new Error("El nombre del país es requerido");
          }

          // Check if country already exists
          const existing = await prisma.country.findFirst({
            where: { country: country.country },
          });

          if (existing) {
            throw new Error(`El país "${country.country}" ya existe`);
          }

          await prisma.country.create({
            data: {
              country: country.country.trim(),
            },
          });

          result.created++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: countries[i],
            error: error.message || "Error desconocido",
          });
        }
      }

      result.success = result.failed === 0;

      return result;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar importar los países");
    }
  },

  bulkImportRegions: async ({ adminId, regions }: { regions: BulkRegionInput[] } & Context): Promise<BulkImportResult> => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const result: BulkImportResult = {
        success: true,
        created: 0,
        failed: 0,
        errors: [],
      };

      for (let i = 0; i < regions.length; i++) {
        try {
          const region = regions[i];

          // Validate required fields
          if (!region.region || region.region.trim() === "") {
            throw new Error("El nombre de la región es requerido");
          }

          if (!region.countryId) {
            throw new Error("El ID del país es requerido");
          }

          // Verify country exists
          const country = await prisma.country.findUnique({
            where: { id: region.countryId },
          });

          if (!country) {
            throw new Error(`El país con ID ${region.countryId} no existe`);
          }

          // Check if region already exists
          const existing = await prisma.region.findFirst({
            where: {
              region: region.region,
              countryId: region.countryId,
            },
          });

          if (existing) {
            throw new Error(`La región "${region.region}" ya existe en este país`);
          }

          await prisma.region.create({
            data: {
              region: region.region.trim(),
              countryId: region.countryId,
            },
          });

          result.created++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: regions[i],
            error: error.message || "Error desconocido",
          });
        }
      }

      result.success = result.failed === 0;

      return result;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar importar las regiones");
    }
  },

  bulkImportCities: async ({ adminId, cities }: { cities: BulkCityInput[] } & Context): Promise<BulkImportResult> => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const result: BulkImportResult = {
        success: true,
        created: 0,
        failed: 0,
        errors: [],
      };

      for (let i = 0; i < cities.length; i++) {
        try {
          const city = cities[i];

          // Validate required fields
          if (!city.city || city.city.trim() === "") {
            throw new Error("El nombre de la ciudad es requerido");
          }

          if (!city.regionId) {
            throw new Error("El ID de la región es requerido");
          }

          // Verify region exists
          const region = await prisma.region.findUnique({
            where: { id: city.regionId },
          });

          if (!region) {
            throw new Error(`La región con ID ${city.regionId} no existe`);
          }

          // Check if city already exists
          const existing = await prisma.city.findFirst({
            where: {
              city: city.city,
              regionId: city.regionId,
            },
          });

          if (existing) {
            throw new Error(`La ciudad "${city.city}" ya existe en esta región`);
          }

          await prisma.city.create({
            data: {
              city: city.city.trim(),
              regionId: city.regionId,
            },
          });

          result.created++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: cities[i],
            error: error.message || "Error desconocido",
          });
        }
      }

      result.success = result.failed === 0;

      return result;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar importar las ciudades");
    }
  },

  bulkImportCounties: async ({ adminId, counties }: { counties: BulkCountyInput[] } & Context): Promise<BulkImportResult> => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const result: BulkImportResult = {
        success: true,
        created: 0,
        failed: 0,
        errors: [],
      };

      for (let i = 0; i < counties.length; i++) {
        try {
          const county = counties[i];

          // Validate required fields
          if (!county.county || county.county.trim() === "") {
            throw new Error("El nombre del condado es requerido");
          }

          if (!county.cityId) {
            throw new Error("El ID de la ciudad es requerido");
          }

          // Verify city exists
          const city = await prisma.city.findUnique({
            where: { id: county.cityId },
          });

          if (!city) {
            throw new Error(`La ciudad con ID ${county.cityId} no existe`);
          }

          // Check if county already exists
          const existing = await prisma.county.findFirst({
            where: {
              county: county.county,
              cityId: county.cityId,
            },
          });

          if (existing) {
            throw new Error(`El condado "${county.county}" ya existe en esta ciudad`);
          }

          await prisma.county.create({
            data: {
              county: county.county.trim(),
              cityId: county.cityId,
            },
          });

          result.created++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: counties[i],
            error: error.message || "Error desconocido",
          });
        }
      }

      result.success = result.failed === 0;

      return result;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar importar los condados");
    }
  },
};
