import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { type PaginationInput } from "../../resolvers/main";

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

  // Country CRUD operations
  createCountry: async (adminId: string, data: { country: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const country = await prisma.country.create({
        data,
      });

      return country;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el país");
    }
  },

  updateCountry: async (adminId: string, id: number, data: { country: string }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const country = await prisma.country.update({
        where: { id },
        data,
      });

      return country;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el país");
    }
  },

  deleteCountry: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.country.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el país");
    }
  },

  // Region CRUD operations
  createRegion: async (adminId: string, data: { region: string; countryId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const region = await prisma.region.create({
        data,
      });

      return region;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la región");
    }
  },

  updateRegion: async (adminId: string, id: number, data: { region?: string; countryId?: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const region = await prisma.region.update({
        where: { id },
        data,
      });

      return region;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la región");
    }
  },

  deleteRegion: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.region.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la región");
    }
  },

  // City CRUD operations
  createCity: async (adminId: string, data: { city: string; regionId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const city = await prisma.city.create({
        data,
      });

      return city;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la ciudad");
    }
  },

  updateCity: async (adminId: string, id: number, data: { city?: string; regionId?: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const city = await prisma.city.update({
        where: { id },
        data,
      });

      return city;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la ciudad");
    }
  },

  deleteCity: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.city.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la ciudad");
    }
  },

  // County CRUD operations
  createCounty: async (adminId: string, data: { county: string; cityId: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const county = await prisma.county.create({
        data,
      });

      return county;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el condado");
    }
  },

  updateCounty: async (adminId: string, id: number, data: { county?: string; cityId?: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const county = await prisma.county.update({
        where: { id },
        data,
      });

      return county;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el condado");
    }
  },

  deleteCounty: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      await prisma.county.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el condado");
    }
  },
};
