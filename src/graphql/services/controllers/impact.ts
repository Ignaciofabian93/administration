import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const ImpactServices = {
  // Material Impact Estimate methods
  getMaterialImpactEstimates: async ({ adminId, limit, offset }: { adminId: string; limit?: number; offset?: number }) => {
    try {
      const materialImpactEstimates = await prisma.materialImpactEstimate.findMany({
        take: limit,
        skip: offset,
      });

      return materialImpactEstimates;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las estimaciones de impacto de materiales");
    }
  },

  getMaterialImpactEstimate: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const materialImpactEstimate = await prisma.materialImpactEstimate.findUnique({
        where: { id },
      });

      if (!materialImpactEstimate) {
        throw new ErrorService.NotFoundError("No se encontró la estimación de impacto de material");
      }

      return materialImpactEstimate;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la estimación de impacto de material");
    }
  },

  createMaterialImpactEstimate: async (
    adminId: string,
    data: {
      materialType: string;
      estimatedCo2SavingsKG: number;
      estimatedWaterSavingsLT: number;
    },
  ) => {
    try {
      const materialImpactEstimate = await prisma.materialImpactEstimate.create({
        data,
      });

      return materialImpactEstimate;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la estimación de impacto de material");
    }
  },

  updateMaterialImpactEstimate: async (
    adminId: string,
    id: number,
    data: {
      materialType?: string;
      estimatedCo2SavingsKG?: number;
      estimatedWaterSavingsLT?: number;
    },
  ) => {
    try {
      const materialImpactEstimate = await prisma.materialImpactEstimate.update({
        where: { id },
        data,
      });

      return materialImpactEstimate;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la estimación de impacto de material");
    }
  },

  deleteMaterialImpactEstimate: async (adminId: string, id: number) => {
    try {
      await prisma.materialImpactEstimate.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la estimación de impacto de material");
    }
  },

  // CO2 Impact Message methods
  getCo2ImpactMessages: async ({ adminId, limit, offset }: { adminId: string; limit?: number; offset?: number }) => {
    try {
      const co2ImpactMessages = await prisma.co2ImpactMessage.findMany({
        take: limit,
        skip: offset,
      });

      return co2ImpactMessages;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los mensajes de impacto de CO2");
    }
  },

  getCo2ImpactMessage: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const co2ImpactMessage = await prisma.co2ImpactMessage.findUnique({
        where: { id },
      });

      if (!co2ImpactMessage) {
        throw new ErrorService.NotFoundError("No se encontró el mensaje de impacto de CO2");
      }

      return co2ImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el mensaje de impacto de CO2");
    }
  },

  createCo2ImpactMessage: async (
    adminId: string,
    data: {
      min: number;
      max: number;
      message1: string;
      message2: string;
      message3: string;
    },
  ) => {
    try {
      const co2ImpactMessage = await prisma.co2ImpactMessage.create({
        data,
      });

      return co2ImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el mensaje de impacto de CO2");
    }
  },

  updateCo2ImpactMessage: async (
    adminId: string,
    id: number,
    data: {
      min?: number;
      max?: number;
      message1?: string;
      message2?: string;
      message3?: string;
    },
  ) => {
    try {
      const co2ImpactMessage = await prisma.co2ImpactMessage.update({
        where: { id },
        data,
      });

      return co2ImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el mensaje de impacto de CO2");
    }
  },

  deleteCo2ImpactMessage: async (adminId: string, id: number) => {
    try {
      await prisma.co2ImpactMessage.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el mensaje de impacto de CO2");
    }
  },

  // Water Impact Message methods
  getWaterImpactMessages: async ({ adminId, limit, offset }: { adminId: string; limit?: number; offset?: number }) => {
    try {
      const waterImpactMessages = await prisma.waterImpactMessage.findMany({
        take: limit,
        skip: offset,
      });

      return waterImpactMessages;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los mensajes de impacto de agua");
    }
  },

  getWaterImpactMessage: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const waterImpactMessage = await prisma.waterImpactMessage.findUnique({
        where: { id },
      });

      if (!waterImpactMessage) {
        throw new ErrorService.NotFoundError("No se encontró el mensaje de impacto de agua");
      }

      return waterImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el mensaje de impacto de agua");
    }
  },

  createWaterImpactMessage: async (
    adminId: string,
    data: {
      min: number;
      max: number;
      message1: string;
      message2: string;
      message3: string;
    },
  ) => {
    try {
      const waterImpactMessage = await prisma.waterImpactMessage.create({
        data,
      });

      return waterImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el mensaje de impacto de agua");
    }
  },

  updateWaterImpactMessage: async (
    adminId: string,
    id: number,
    data: {
      min?: number;
      max?: number;
      message1?: string;
      message2?: string;
      message3?: string;
    },
  ) => {
    try {
      const waterImpactMessage = await prisma.waterImpactMessage.update({
        where: { id },
        data,
      });

      return waterImpactMessage;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el mensaje de impacto de agua");
    }
  },

  deleteWaterImpactMessage: async (adminId: string, id: number) => {
    try {
      await prisma.waterImpactMessage.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el mensaje de impacto de agua");
    }
  },
};
