import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { Context, PaginationInput } from "../../../types";
import { calculatePrismaParams, createPaginatedResponse } from "../../../utils/pagination";
import { SellerLevelInput } from "../../resolvers/sellerLevel";

export const SellerLevelService = {
  getSellerLevels: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.sellerLevel.count();
      const sellerLevels = await prisma.sellerLevel.findMany({
        take,
        skip,
      });

      return createPaginatedResponse(sellerLevels, totalCount, page, pageSize);
    } catch (error) {
      console.error("Error al intentar obtener los niveles de vendedor:", error);
      throw new ErrorService.InternalServerError("Error al obtener los niveles de vendedor");
    }
  },

  getSellerLevel: async ({ id, adminId }: { id: number } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const sellerLevel = await prisma.sellerLevel.findUnique({
        where: { id },
      });
      if (!sellerLevel) throw new ErrorService.NotFoundError("Nivel de vendedor no encontrado");
      return sellerLevel;
    } catch (error) {
      console.error("Error al intentar obtener el nivel de vendedor:", error);
      throw new ErrorService.InternalServerError("Error al obtener el nivel de vendedor");
    }
  },

  createSellerLevel: async ({ input, adminId }: { input: SellerLevelInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const newSellerLevel = await prisma.sellerLevel.create({
        data: { ...input, updatedAt: new Date() },
      });

      if (!newSellerLevel) throw new ErrorService.InternalServerError("No se pudo crear el nivel de vendedor");
      return newSellerLevel;
    } catch (error) {
      console.error("Error al intentar crear el nivel de vendedor:", error);
      throw new ErrorService.InternalServerError("Error al crear el nivel de vendedor");
    }
  },

  updateSellerLevel: async ({ id, input, adminId }: { id: number; input: SellerLevelInput } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const existingLevel = await prisma.sellerLevel.findUnique({ where: { id } });
      if (!existingLevel) throw new ErrorService.NotFoundError("Nivel de vendedor no encontrado");

      const updatedLevel = await prisma.sellerLevel.update({
        where: { id },
        data: { ...input, updatedAt: new Date() },
      });

      if (!updatedLevel) throw new ErrorService.InternalServerError("No se pudo actualizar el nivel de vendedor");
      return updatedLevel;
    } catch (error) {
      console.error("Error al intentar actualizar el nivel de vendedor:", error);
      throw new ErrorService.InternalServerError("Error al actualizar el nivel de vendedor");
    }
  },

  deleteSellerLevel: async ({ id, adminId }: { id: number } & Context) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const existingLevel = await prisma.sellerLevel.findUnique({ where: { id } });
      if (!existingLevel) throw new ErrorService.NotFoundError("Nivel de vendedor no encontrado");

      await prisma.sellerLevel.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("Error al intentar eliminar el nivel de vendedor:", error);
      throw new ErrorService.InternalServerError("Error al eliminar el nivel de vendedor");
    }
  },
};
