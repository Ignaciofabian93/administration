import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { calculatePagination } from "../../../utils/pagination";

export const StoreServices = {
  // Store Category Queries
  getStoreCategories: async () => {
    try {
      const categories = await prisma.storeCategory.findMany({
        include: {
          StoreSubCategory: true,
        },
      });

      return categories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener categorías de tienda");
    }
  },

  getStoreCategoryById: async (id: string) => {
    try {
      const category = await prisma.storeCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
          StoreSubCategory: true,
        },
      });

      if (!category) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de tienda");
      }

      return category;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener categoría de tienda");
    }
  },

  // Store SubCategory Queries
  getStoreSubCategories: async (storeCategoryId?: number) => {
    try {
      const where: any = {};
      if (storeCategoryId) where.storeCategoryId = storeCategoryId;

      const subCategories = await prisma.storeSubCategory.findMany({
        where,
        include: {
          StoreCategory: true,
          StoreProduct: true,
        },
      });

      return subCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener subcategorías de tienda");
    }
  },

  getStoreSubCategoryById: async (id: string) => {
    try {
      const subCategory = await prisma.storeSubCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
          StoreCategory: true,
          StoreProduct: true,
        },
      });

      if (!subCategory) {
        throw new ErrorService.NotFoundError("No se encontró la subcategoría de tienda");
      }

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener subcategoría de tienda");
    }
  },

  // Store Product Queries
  getStoreProducts: async (args: { subcategoryId?: number; sellerId?: string; isActive?: boolean; page?: number; pageSize?: number }) => {
    try {
      const { subcategoryId, sellerId, isActive, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (subcategoryId) where.subcategoryId = subcategoryId;
      if (sellerId) where.sellerId = sellerId;
      if (isActive !== undefined) where.isActive = isActive;

      const totalCount = await prisma.storeProduct.count({ where });

      const products = await prisma.storeProduct.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          Seller: true,
          StoreSubCategory: true,
          StoreProductMaterial: {
            include: {
              MaterialImpactEstimate: true,
            },
          },
          ProductVariant: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: products,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener productos de tienda");
    }
  },

  getStoreProductById: async (id: string) => {
    try {
      const product = await prisma.storeProduct.findUnique({
        where: { id: parseInt(id) },
        include: {
          Seller: true,
          StoreSubCategory: {
            include: {
              StoreCategory: true,
            },
          },
          StoreProductMaterial: {
            include: {
              MaterialImpactEstimate: true,
            },
          },
          ProductVariant: true,
        },
      });

      if (!product) {
        throw new ErrorService.NotFoundError("No se encontró el producto de tienda");
      }

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener producto de tienda");
    }
  },

  // Store Product Material Queries
  getStoreProductMaterials: async (args: { storeProductId: number; page?: number; pageSize?: number }) => {
    try {
      const { storeProductId, page = 1, pageSize = 10 } = args;

      const totalCount = await prisma.storeProductMaterial.count({ where: { storeProductId } });

      const materials = await prisma.storeProductMaterial.findMany({
        where: { storeProductId },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          MaterialImpactEstimate: true,
          StoreProduct: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: materials,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener materiales de producto de tienda");
    }
  },

  getStoreProductMaterialById: async (id: string) => {
    try {
      const material = await prisma.storeProductMaterial.findUnique({
        where: { id: parseInt(id) },
        include: {
          MaterialImpactEstimate: true,
          StoreProduct: true,
        },
      });

      if (!material) {
        throw new ErrorService.NotFoundError("No se encontró el material del producto de tienda");
      }

      return material;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener material de producto de tienda");
    }
  },

  // Store Category Mutations
  createStoreCategory: async (input: any) => {
    try {
      const category = await prisma.storeCategory.create({
        data: {
          category: input.category,
        },
        include: {
          StoreSubCategory: true,
        },
      });

      return category;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear categoría de tienda");
    }
  },

  updateStoreCategory: async (id: string, input: any) => {
    try {
      const category = await prisma.storeCategory.update({
        where: { id: parseInt(id) },
        data: {
          category: input.category,
        },
        include: {
          StoreSubCategory: true,
        },
      });

      return category;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar categoría de tienda");
    }
  },

  deleteStoreCategory: async (id: string) => {
    try {
      await prisma.storeCategory.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar categoría de tienda");
    }
  },

  // Store SubCategory Mutations
  createStoreSubCategory: async (input: any) => {
    try {
      const subCategory = await prisma.storeSubCategory.create({
        data: {
          subCategory: input.subCategory,
          storeCategoryId: input.storeCategoryId,
        },
        include: {
          StoreCategory: true,
          StoreProduct: true,
        },
      });

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear subcategoría de tienda");
    }
  },

  updateStoreSubCategory: async (id: string, input: any) => {
    try {
      const subCategory = await prisma.storeSubCategory.update({
        where: { id: parseInt(id) },
        data: {
          subCategory: input.subCategory,
          storeCategoryId: input.storeCategoryId,
        },
        include: {
          StoreCategory: true,
          StoreProduct: true,
        },
      });

      return subCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar subcategoría de tienda");
    }
  },

  deleteStoreSubCategory: async (id: string) => {
    try {
      await prisma.storeSubCategory.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar subcategoría de tienda");
    }
  },

  // Store Product Mutations
  createStoreProduct: async (sellerId: string, input: any) => {
    try {
      const product = await prisma.storeProduct.create({
        data: {
          name: input.name,
          description: input.description,
          stock: input.stock,
          barcode: input.barcode || null,
          sku: input.sku || null,
          price: input.price,
          hasOffer: input.hasOffer || false,
          offerPrice: input.offerPrice || null,
          sellerId,
          images: input.images || [],
          isActive: true,
          badges: input.badges || [],
          brand: input.brand || null,
          color: input.color || null,
          ratingCount: 0,
          ratings: 0,
          reviewsNumber: 0,
          materialComposition: input.materialComposition || null,
          recycledContent: input.recycledContent || null,
          subcategoryId: input.subcategoryId,
          sustainabilityScore: input.sustainabilityScore || null,
          carbonFootprint: input.carbonFootprint || null,
          updatedAt: new Date(),
        },
        include: {
          Seller: true,
          StoreSubCategory: true,
          StoreProductMaterial: true,
          ProductVariant: true,
        },
      });

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear producto de tienda");
    }
  },

  updateStoreProduct: async (id: string, input: any) => {
    try {
      const product = await prisma.storeProduct.update({
        where: { id: parseInt(id) },
        data: {
          name: input.name,
          description: input.description,
          stock: input.stock,
          barcode: input.barcode,
          sku: input.sku,
          price: input.price,
          hasOffer: input.hasOffer,
          offerPrice: input.offerPrice,
          images: input.images,
          isActive: input.isActive,
          badges: input.badges,
          brand: input.brand,
          color: input.color,
          materialComposition: input.materialComposition,
          recycledContent: input.recycledContent,
          subcategoryId: input.subcategoryId,
          sustainabilityScore: input.sustainabilityScore,
          carbonFootprint: input.carbonFootprint,
          updatedAt: new Date(),
        },
        include: {
          Seller: true,
          StoreSubCategory: true,
          StoreProductMaterial: true,
          ProductVariant: true,
        },
      });

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar producto de tienda");
    }
  },

  deleteStoreProduct: async (id: string) => {
    try {
      await prisma.storeProduct.update({
        where: { id: parseInt(id) },
        data: {
          deletedAt: new Date(),
          isActive: false,
        },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar producto de tienda");
    }
  },

  // Store Product Material Mutations
  createStoreProductMaterial: async (input: any) => {
    try {
      const material = await prisma.storeProductMaterial.create({
        data: {
          storeProductId: input.storeProductId,
          materialTypeId: input.materialTypeId,
          quantity: input.quantity,
          unit: input.unit || "kg",
          isPrimary: input.isPrimary || false,
          sourceMaterial: input.sourceMaterial || null,
          isRecycled: input.isRecycled || false,
          recycledPercentage: input.recycledPercentage || null,
          supplierVerified: input.supplierVerified || false,
          updatedAt: new Date(),
        },
        include: {
          MaterialImpactEstimate: true,
          StoreProduct: true,
        },
      });

      return material;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear material de producto de tienda");
    }
  },

  updateStoreProductMaterial: async (id: string, input: any) => {
    try {
      const material = await prisma.storeProductMaterial.update({
        where: { id: parseInt(id) },
        data: {
          quantity: input.quantity,
          unit: input.unit,
          isPrimary: input.isPrimary,
          sourceMaterial: input.sourceMaterial,
          isRecycled: input.isRecycled,
          recycledPercentage: input.recycledPercentage,
          supplierVerified: input.supplierVerified,
          updatedAt: new Date(),
        },
        include: {
          MaterialImpactEstimate: true,
          StoreProduct: true,
        },
      });

      return material;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar material de producto de tienda");
    }
  },

  deleteStoreProductMaterial: async (id: string) => {
    try {
      await prisma.storeProductMaterial.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar material de producto de tienda");
    }
  },
};
