import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const ImpactServices = {
  getMaterialImpactEstimate: async () => {
    try {
      const materialImpactEstimate = await prisma.materialImpactEstimate.findMany();

      if (!materialImpactEstimate) {
        throw new ErrorService.NotFoundError("No se encontraron estimaciones de impacto de materiales");
      }

      return materialImpactEstimate;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la estimación de impacto de materiales");
    }
  },
  getCo2ImpactMessages: async () => {
    try {
      const co2ImpactMessages = await prisma.co2ImpactMessage.findMany();

      if (!co2ImpactMessages) {
        throw new ErrorService.NotFoundError("No se encontraron mensajes de impacto de CO2");
      }

      return co2ImpactMessages;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los mensajes de impacto de CO2");
    }
  },
  getWaterImpactMessages: async () => {
    try {
      const waterImpactMessages = await prisma.waterImpactMessage.findMany();

      if (!waterImpactMessages) {
        throw new ErrorService.NotFoundError("No se encontraron mensajes de impacto de agua");
      }

      return waterImpactMessages;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los mensajes de impacto de agua");
    }
  },
};
