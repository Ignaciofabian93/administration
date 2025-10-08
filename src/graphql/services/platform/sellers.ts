import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const SellerService = {
  getSellers: async () => {
    try {
      const sellers = await prisma.seller.findMany();

      if (!sellers) {
        throw new ErrorService.NotFoundError("No se encontraron vendedores");
      }

      return sellers;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener vendedores");
    }
  },
  getSellerById: async (id: string) => {
    try {
      const seller = await prisma.seller.findUnique({
        where: { id },
      });

      if (!seller) {
        throw new ErrorService.NotFoundError("No se encontró el vendedor");
      }

      return seller;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener vendedor por ID");
    }
  },
  getPersons: async () => {
    try {
      const persons = await prisma.seller.findMany({
        where: { sellerType: "PERSON" },
      });

      if (!persons) {
        throw new ErrorService.NotFoundError("No se encontraron personas");
      }

      return persons;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener personas");
    }
  },
  getPersonById: async (id: string) => {
    try {
      const person = await prisma.seller.findUnique({
        where: { id, sellerType: "PERSON" },
      });

      if (!person) {
        throw new ErrorService.NotFoundError("No se encontró la persona");
      }

      return person;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener persona por ID");
    }
  },
  getBusinesses: async () => {
    try {
      const businesses = await prisma.seller.findMany({
        where: {
          sellerType: { in: ["STARTUP", "COMPANY"] },
        },
      });

      if (!businesses) {
        throw new ErrorService.NotFoundError("No se encontraron negocios");
      }

      return businesses;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener negocios");
    }
  },
  getBusinessById: async (id: string) => {
    try {
      const business = await prisma.seller.findFirst({
        where: {
          id,
          sellerType: { in: ["STARTUP", "COMPANY"] },
        },
      });

      if (!business) {
        throw new ErrorService.NotFoundError("No se encontró el negocio");
      }

      return business;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener negocio por ID");
    }
  },
};
