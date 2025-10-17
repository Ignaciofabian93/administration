import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { calculatePagination } from "../../../utils/pagination";

export const ServiceServices = {
  // Service Category Queries
  getServiceCategories: async () => {
    try {
      const categories = await prisma.serviceCategory.findMany({
        include: {
          ServiceSubCategory: true,
        },
      });

      return categories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener categorías de servicios");
    }
  },

  getServiceCategoryById: async (id: string) => {
    try {
      const category = await prisma.serviceCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
          ServiceSubCategory: true,
        },
      });

      if (!category) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de servicio");
      }

      return category;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener categoría de servicio");
    }
  },

  getServiceSubCategories: async (serviceCategoryId?: number) => {
    try {
      const where: any = {};
      if (serviceCategoryId) where.serviceCategoryId = serviceCategoryId;

      const subCategories = await prisma.serviceSubCategory.findMany({
        where,
        include: {
          ServiceCategory: true,
        },
      });

      return subCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener subcategorías de servicios");
    }
  },

  getServiceSubCategoryById: async (id: string) => {
    try {
      const subCategory = await prisma.serviceSubCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
          ServiceCategory: true,
          Service: true,
        },
      });

      if (!subCategory) {
        throw new ErrorService.NotFoundError("No se encontró la subcategoría de servicio");
      }

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener subcategoría de servicio");
    }
  },

  // Service Queries
  getServices: async (args: { sellerId?: string; subcategoryId?: number; isActive?: boolean; page?: number; pageSize?: number }) => {
    try {
      const { sellerId, subcategoryId, isActive, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (sellerId) where.sellerId = sellerId;
      if (subcategoryId) where.subcategoryId = subcategoryId;
      if (isActive !== undefined) where.isActive = isActive;

      const totalCount = await prisma.service.count({ where });

      const services = await prisma.service.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          seller: true,
          ServiceSubCategory: true,
          quotations: true,
          reviews: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: services,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener servicios");
    }
  },

  getServiceById: async (id: string) => {
    try {
      const service = await prisma.service.findUnique({
        where: { id: parseInt(id) },
        include: {
          seller: true,
          ServiceSubCategory: {
            include: {
              ServiceCategory: true,
            },
          },
          quotations: true,
          reviews: true,
        },
      });

      if (!service) {
        throw new ErrorService.NotFoundError("No se encontró el servicio");
      }

      return service;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener servicio");
    }
  },

  // Quotation Queries
  getQuotations: async (args: { clientId?: string; providerId?: string; status?: string; page?: number; pageSize?: number }) => {
    try {
      const { clientId, providerId, status, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (clientId) where.clientId = clientId;
      if (providerId) where.providerId = providerId;
      if (status) where.status = status;

      const totalCount = await prisma.quotation.count({ where });

      const quotations = await prisma.quotation.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          service: true,
          client: true,
          provider: true,
          payments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: quotations,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener cotizaciones");
    }
  },

  getQuotationById: async (id: string) => {
    try {
      const quotation = await prisma.quotation.findUnique({
        where: { id: parseInt(id) },
        include: {
          service: {
            include: {
              ServiceSubCategory: {
                include: {
                  ServiceCategory: true,
                },
              },
            },
          },
          client: true,
          provider: true,
          payments: true,
        },
      });

      if (!quotation) {
        throw new ErrorService.NotFoundError("No se encontró la cotización");
      }

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener cotización");
    }
  },

  // Service Review Queries
  getServiceReviews: async (args: { serviceId: number; page?: number; pageSize?: number }) => {
    try {
      const { serviceId, page = 1, pageSize = 10 } = args;

      const totalCount = await prisma.serviceReview.count({ where: { serviceId } });

      const reviews = await prisma.serviceReview.findMany({
        where: { serviceId },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          reviewer: true,
          service: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: reviews,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener reseñas de servicio");
    }
  },

  // Service Category Mutations
  createServiceSubCategory: async (input: any) => {
    try {
      const subCategory = await prisma.serviceSubCategory.create({
        data: {
          subCategory: input.subCategory,
          serviceCategoryId: input.serviceCategoryId,
        },
        include: {
          ServiceCategory: true,
        },
      });

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear subcategoría de servicio");
    }
  },

  updateServiceSubCategory: async (id: string, input: any) => {
    try {
      const subCategory = await prisma.serviceSubCategory.update({
        where: { id: parseInt(id) },
        data: {
          subCategory: input.subCategory,
          serviceCategoryId: input.serviceCategoryId,
        },
        include: {
          ServiceCategory: true,
        },
      });

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar subcategoría de servicio");
    }
  },

  deleteServiceSubCategory: async (id: string) => {
    try {
      await prisma.serviceSubCategory.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar subcategoría de servicio");
    }
  },

  updateServiceCategory: async (id: string, input: any) => {
    try {
      const category = await prisma.serviceCategory.update({
        where: { id: parseInt(id) },
        data: {
          category: input.category,
        },
        include: {
          ServiceSubCategory: true,
        },
      });

      return category;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar categoría de servicio");
    }
  },

  // Service Mutations
  createService: async (sellerId: string, input: any) => {
    try {
      const service = await prisma.service.create({
        data: {
          name: input.name,
          description: input.description,
          sellerId,
          pricingType: input.pricingType,
          basePrice: input.basePrice,
          priceRange: input.priceRange,
          duration: input.duration,
          images: input.images,
          tags: input.tags,
          subcategoryId: input.subcategoryId,
          isActive: true,
        },
        include: {
          seller: true,
          ServiceSubCategory: true,
        },
      });

      return service;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear servicio");
    }
  },

  updateService: async (id: string, input: any) => {
    try {
      const service = await prisma.service.update({
        where: { id: parseInt(id) },
        data: {
          name: input.name,
          description: input.description,
          pricingType: input.pricingType,
          basePrice: input.basePrice,
          priceRange: input.priceRange,
          duration: input.duration,
          isActive: input.isActive,
          images: input.images,
          tags: input.tags,
        },
        include: {
          seller: true,
          ServiceSubCategory: true,
        },
      });

      return service;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar servicio");
    }
  },

  deleteService: async (id: string) => {
    try {
      await prisma.service.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar servicio");
    }
  },

  // Quotation Mutations
  createQuotation: async (sellerId: string, input: any) => {
    try {
      const quotation = await prisma.quotation.create({
        data: {
          serviceId: input.serviceId,
          clientId: input.clientId,
          providerId: sellerId,
          title: input.title,
          description: input.description,
          estimatedPrice: input.estimatedPrice,
          estimatedDuration: input.estimatedDuration,
          clientNotes: input.clientNotes,
          expiresAt: input.expiresAt,
          status: "PENDING",
          attachments: [],
        },
        include: {
          service: true,
          client: true,
          provider: true,
        },
      });

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear cotización");
    }
  },

  updateQuotation: async (id: string, input: any) => {
    try {
      const quotation = await prisma.quotation.update({
        where: { id: parseInt(id) },
        data: {
          estimatedPrice: input.estimatedPrice,
          finalPrice: input.finalPrice,
          estimatedDuration: input.estimatedDuration,
          status: input.status,
          providerNotes: input.providerNotes,
        },
        include: {
          service: true,
          client: true,
          provider: true,
        },
      });

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar cotización");
    }
  },

  acceptQuotation: async (id: string) => {
    try {
      const quotation = await prisma.quotation.update({
        where: { id: parseInt(id) },
        data: {
          status: "ACCEPTED",
          acceptedAt: new Date(),
        },
        include: {
          service: true,
          client: true,
          provider: true,
        },
      });

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar aceptar cotización");
    }
  },

  completeQuotation: async (id: string) => {
    try {
      const quotation = await prisma.quotation.update({
        where: { id: parseInt(id) },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
        include: {
          service: true,
          client: true,
          provider: true,
        },
      });

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar completar cotización");
    }
  },

  cancelQuotation: async (id: string) => {
    try {
      const quotation = await prisma.quotation.update({
        where: { id: parseInt(id) },
        data: {
          status: "CANCELLED",
        },
        include: {
          service: true,
          client: true,
          provider: true,
        },
      });

      return quotation;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar cancelar cotización");
    }
  },

  // Service Review Mutations
  createServiceReview: async (sellerId: string, serviceId: number, rating: number, comment?: string) => {
    try {
      const review = await prisma.serviceReview.create({
        data: {
          serviceId,
          reviewerId: sellerId,
          rating,
          comment: comment || null,
        },
        include: {
          service: true,
          reviewer: true,
        },
      });

      return review;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear reseña de servicio");
    }
  },

  deleteServiceReview: async (id: string) => {
    try {
      await prisma.serviceReview.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar reseña de servicio");
    }
  },
};
