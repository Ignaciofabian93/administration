import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const LocationServices = {
  getCountries: async ({ adminId }: { adminId: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const countries = await prisma.country.findMany();

      if (!countries) {
        throw new ErrorService.NotFoundError("No se encontraron países");
      }

      return countries;
    } catch (error) {
      console.error(error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los países");
    }
  },
  getRegions: async ({ adminId }: { adminId: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany();

      if (!regions) {
        throw new ErrorService.NotFoundError("No se encontraron regiones");
      }

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones");
    }
  },
  getRegionsByCountry: async ({ adminId, countryId }: { adminId: string; countryId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const regions = await prisma.region.findMany({
        where: { countryId },
      });

      if (!regions) {
        throw new ErrorService.NotFoundError("No se encontraron regiones para el país proporcionado");
      }

      return regions;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las regiones por país");
    }
  },
  getCities: async ({ adminId }: { adminId: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany();

      if (!cities) {
        throw new ErrorService.NotFoundError("No se encontraron ciudades");
      }

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades");
    }
  },
  getCitiesByRegion: async ({ adminId, regionId }: { adminId: string; regionId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const cities = await prisma.city.findMany({
        where: { regionId },
      });

      if (!cities) {
        throw new ErrorService.NotFoundError("No se encontraron ciudades para la región proporcionada");
      }

      return cities;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las ciudades por región");
    }
  },
  getCounties: async ({ adminId }: { adminId: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany();

      if (!counties) {
        throw new ErrorService.NotFoundError("No se encontraron condados");
      }

      return counties;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los condados");
    }
  },
  getCountiesByCity: async ({ adminId, cityId }: { adminId: string; cityId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const counties = await prisma.county.findMany({
        where: { cityId },
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
