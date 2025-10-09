import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const ProductServices = {
  // Department methods
  getDepartments: async ({ adminId }: { adminId: string }) => {
    try {
      const departments = await prisma.department.findMany({
        include: {
          departmentCategories: true,
        },
      });

      return departments;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los departamentos");
    }
  },

  getDepartment: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const department = await prisma.department.findUnique({
        where: { id },
        include: {
          departmentCategories: true,
        },
      });

      if (!department) {
        throw new ErrorService.NotFoundError("No se encontró el departamento");
      }

      return department;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el departamento por ID");
    }
  },

  getDepartmentCategories: async ({ adminId, departmentId }: { adminId: string; departmentId?: number }) => {
    try {
      const where: any = {};
      if (departmentId) where.departmentId = departmentId;

      const departmentCategories = await prisma.departmentCategory.findMany({
        where,
        include: {
          department: true,
          productCategories: true,
        },
      });

      return departmentCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de departamentos");
    }
  },

  getDepartmentCategory: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const departmentCategory = await prisma.departmentCategory.findUnique({
        where: { id },
        include: {
          department: true,
          productCategories: true,
        },
      });

      if (!departmentCategory) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de departamento");
      }

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la categoría de departamento por ID");
    }
  },

  // Product Category methods
  getProductCategories: async ({ adminId, departmentCategoryId }: { adminId: string; departmentCategoryId?: number }) => {
    try {
      const where: any = {};
      if (departmentCategoryId) where.departmentCategoryId = departmentCategoryId;

      const productCategories = await prisma.productCategory.findMany({
        where,
        include: {
          departmentCategory: true,
          products: true,
          firstMaterialType: true,
          secondMaterialType: true,
          thirdMaterialType: true,
          fourthMaterialType: true,
          fifthMaterialType: true,
        },
      });

      return productCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de productos");
    }
  },

  getProductCategory: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const productCategory = await prisma.productCategory.findUnique({
        where: { id },
        include: {
          departmentCategory: true,
          products: true,
          firstMaterialType: true,
          secondMaterialType: true,
          thirdMaterialType: true,
          fourthMaterialType: true,
          fifthMaterialType: true,
        },
      });

      if (!productCategory) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de producto");
      }

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la categoría de producto por ID");
    }
  },

  // Product methods
  getProducts: async ({
    adminId,
    sellerId,
    categoryId,
    isActive,
    limit,
    offset,
  }: {
    adminId: string;
    sellerId?: string;
    categoryId?: number;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const where: any = {};
      if (sellerId) where.sellerId = sellerId;
      if (categoryId) where.productCategoryId = categoryId;
      if (isActive !== undefined) where.isActive = isActive;

      const products = await prisma.product.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          productCategory: true,
          seller: true,
          comments: {
            include: {
              seller: true,
            },
          },
          likes: {
            include: {
              seller: true,
            },
          },
          productVariants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los productos");
    }
  },

  getProduct: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          productCategory: true,
          seller: true,
          comments: {
            include: {
              seller: true,
            },
          },
          likes: {
            include: {
              seller: true,
            },
          },
          productVariants: true,
        },
      });

      if (!product) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el producto por ID");
    }
  },

  getProductsByCategory: async ({
    adminId,
    categoryId,
    limit,
    offset,
  }: {
    adminId: string;
    categoryId: number;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const products = await prisma.product.findMany({
        where: { productCategoryId: categoryId },
        take: limit,
        skip: offset,
        include: {
          productCategory: true,
          seller: true,
          comments: {
            include: {
              seller: true,
            },
          },
          likes: {
            include: {
              seller: true,
            },
          },
          productVariants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los productos por categoría");
    }
  },

  // Product management methods
  updateProduct: async (adminId: string, id: number, data: any) => {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      const product = await prisma.product.update({
        where: { id },
        data,
        include: {
          productCategory: true,
          seller: true,
          comments: {
            include: {
              seller: true,
            },
          },
          likes: {
            include: {
              seller: true,
            },
          },
          productVariants: true,
        },
      });

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el producto");
    }
  },

  deleteProduct: async (adminId: string, id: number) => {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      await prisma.product.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el producto");
    }
  },

  approveProduct: async (adminId: string, id: number) => {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          isActive: true,
        },
        include: {
          productCategory: true,
          seller: true,
        },
      });

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar aprobar el producto");
    }
  },

  rejectProduct: async (adminId: string, id: number, reason?: string) => {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          isActive: false,
        },
        include: {
          productCategory: true,
          seller: true,
        },
      });

      // TODO: Send notification to seller with rejection reason

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar rechazar el producto");
    }
  },

  // Department CRUD methods
  createDepartment: async (adminId: string, data: { departmentName: string; departmentImage?: string }) => {
    try {
      const department = await prisma.department.create({
        data,
        include: {
          departmentCategories: true,
        },
      });

      return department;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el departamento");
    }
  },

  updateDepartment: async (adminId: string, id: number, data: { departmentName?: string; departmentImage?: string }) => {
    try {
      const department = await prisma.department.update({
        where: { id },
        data,
        include: {
          departmentCategories: true,
        },
      });

      return department;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el departamento");
    }
  },

  deleteDepartment: async (adminId: string, id: number) => {
    try {
      await prisma.department.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el departamento");
    }
  },

  // Department Category CRUD methods
  createDepartmentCategory: async (adminId: string, data: { departmentId: number; departmentCategoryName: string }) => {
    try {
      const departmentCategory = await prisma.departmentCategory.create({
        data,
        include: {
          department: true,
          productCategories: true,
        },
      });

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la categoría de departamento");
    }
  },

  updateDepartmentCategory: async (adminId: string, id: number, data: { departmentCategoryName?: string }) => {
    try {
      const departmentCategory = await prisma.departmentCategory.update({
        where: { id },
        data,
        include: {
          department: true,
          productCategories: true,
        },
      });

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la categoría de departamento");
    }
  },

  deleteDepartmentCategory: async (adminId: string, id: number) => {
    try {
      await prisma.departmentCategory.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la categoría de departamento");
    }
  },

  // Product Category CRUD methods
  createProductCategory: async (adminId: string, data: any) => {
    try {
      const productCategory = await prisma.productCategory.create({
        data,
        include: {
          departmentCategory: true,
          firstMaterialType: true,
          secondMaterialType: true,
          thirdMaterialType: true,
          fourthMaterialType: true,
          fifthMaterialType: true,
        },
      });

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la categoría de producto");
    }
  },

  updateProductCategory: async (adminId: string, id: number, data: any) => {
    try {
      const productCategory = await prisma.productCategory.update({
        where: { id },
        data,
        include: {
          departmentCategory: true,
          firstMaterialType: true,
          secondMaterialType: true,
          thirdMaterialType: true,
          fourthMaterialType: true,
          fifthMaterialType: true,
        },
      });

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la categoría de producto");
    }
  },

  deleteProductCategory: async (adminId: string, id: number) => {
    try {
      await prisma.productCategory.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la categoría de producto");
    }
  },
};
