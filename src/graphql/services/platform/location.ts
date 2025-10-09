import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { type PaginationInput } from "../../resolvers/platform-admin";

export const LocationServices = {
  getCountries: async ({ adminId, limit, offset }: { adminId: string } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const countries = await prisma.country.findMany({
        take: limit,
        skip: offset,
      });

      if (!countries) {
        throw new ErrorService.NotFoundError("No se encontraron países");
      }

      return countries;
    } catch (error) {
      console.error(error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los países");
    }
  },
  getRegions: async ({ adminId, limit, offset }: { adminId: string } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany({
        take: limit,
        skip: offset,
      });

      if (!regions) {
        throw new ErrorService.NotFoundError("No se encontraron regiones");
      }

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones");
    }
  },
  getRegionsByCountry: async ({ adminId, countryId, limit, offset }: { adminId: string; countryId: number } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany({
        where: { countryId },
        take: limit,
        skip: offset,
      });

      if (!regions) {
        throw new ErrorService.NotFoundError("No se encontraron regiones para el país proporcionado");
      }

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones por país");
    }
  },
  getCities: async ({ adminId, limit, offset }: { adminId: string } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany({
        take: limit,
        skip: offset,
      });

      if (!cities) {
        throw new ErrorService.NotFoundError("No se encontraron ciudades");
      }

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades");
    }
  },
  getCitiesByRegion: async ({ adminId, regionId, limit, offset }: { adminId: string; regionId: number } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany({
        where: { regionId },
        take: limit,
        skip: offset,
      });

      if (!cities) {
        throw new ErrorService.NotFoundError("No se encontraron ciudades para la región proporcionada");
      }

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades por región");
    }
  },
  getCounties: async ({ adminId, limit, offset }: { adminId: string } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany({
        take: limit,
        skip: offset,
      });

      if (!counties) {
        throw new ErrorService.NotFoundError("No se encontraron condados");
      }

      return counties;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los condados");
    }
  },
  getCountiesByCity: async ({ adminId, cityId, limit, offset }: { adminId: string; cityId: number } & PaginationInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany({
        where: { cityId },
        take: limit,
        skip: offset,
      });

      if (!counties) {
        throw new ErrorService.NotFoundError("No se encontraron condados para la ciudad proporcionada");
      }

      return counties;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los condados por ciudad");
    }
  },
};
