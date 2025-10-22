import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { Context } from "../../../types";
import { calculatePrismaParams, createPaginatedResponse } from "../../../utils/pagination";
import {
  CreateDepartmentCategoryInput,
  CreateDepartmentInput,
  CreateProductCategoryInput,
  UpdateDepartmentCategoryInput,
  UpdateDepartmentInput,
  UpdateProductCategoryInput,
} from "../../resolvers/departments";
import { PaginationInput } from "../../resolvers/main";
import { ProductInput } from "../../resolvers/products";

export const ProductServices = {
  // Department methods
  getDepartments: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.department.count();

      const departments = await prisma.department.findMany({
        skip,
        take,
      });

      return createPaginatedResponse(departments, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los departamentos");
    }
  },

  getDepartment: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);
      const department = await prisma.department.findUnique({
        where: { id: parsedId },
        include: {
          departmentCategory: true,
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

  getDepartmentCategories: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.departmentCategory.count();

      const departmentCategory = await prisma.departmentCategory.findMany({
        skip,
        take,
        select: {
          id: true,
          departmentCategoryName: true,
          departmentId: true,
        },
      });

      return createPaginatedResponse(departmentCategory, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de departamentos");
    }
  },

  getDepartmentCategory: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const departmentCategory = await prisma.departmentCategory.findUnique({
        where: { id: parsedId },
        include: {
          department: true,
          productCategory: true,
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
  getProductCategories: async ({ adminId, page = 1, pageSize = 10 }: PaginationInput & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.productCategory.count();

      const productCategory = await prisma.productCategory.findMany({
        skip,
        take,
        select: {
          id: true,
          productCategoryName: true,
          departmentCategoryId: true,
          keywords: true,
          averageWeight: true,
          size: true,
          weightUnit: true,
        },
      });

      return createPaginatedResponse(productCategory, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de productos");
    }
  },

  getProductCategory: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const productCategory = await prisma.productCategory.findUnique({
        where: { id: parsedId },
        include: {
          departmentCategory: true,
          product: true,
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
    page = 1,
    pageSize = 10,
  }: { sellerId?: string; categoryId?: number; isActive?: boolean } & PaginationInput & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const { skip, take } = calculatePrismaParams(page, pageSize);

      const where: any = {};
      if (sellerId) where.sellerId = sellerId;
      if (categoryId) where.productCategoryId = categoryId;
      if (isActive !== undefined) where.isActive = isActive;

      const totalCount = await prisma.product.count({ where });
      const products = await prisma.product.findMany({
        where,
        include: {
          productCategory: true,
          seller: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      });

      return createPaginatedResponse(products, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los productos");
    }
  },

  getProduct: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const product = await prisma.product.findUnique({
        where: { id: parsedId },
        include: {
          productCategory: true,
          seller: true,
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
    page = 1,
    pageSize = 10,
  }: {
    categoryId: number;
  } & PaginationInput &
    Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const { skip, take } = calculatePrismaParams(page, pageSize);

      const totalCount = await prisma.product.count({ where: { productCategoryId: categoryId } });

      const products = await prisma.product.findMany({
        where: { productCategoryId: categoryId },
        take,
        skip,
        include: {
          productCategory: true,
          seller: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return createPaginatedResponse(products, totalCount, page, pageSize);
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los productos por categoría");
    }
  },

  // Product management methods
  createProduct: async ({ adminId, input }: { input: ProductInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const product = await prisma.product.create({
        data: {
          ...input,
          sellerId: adminId,
          updatedAt: new Date(),
        },
      });

      if (!product) {
        throw new ErrorService.InternalServerError("No se pudo crear el producto");
      }

      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new ErrorService.InternalServerError("Error al intentar crear el producto");
    }
  },
  updateProduct: async ({ adminId, id, input }: { id: number; input: ProductInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);
      const existingProduct = await prisma.product.findUnique({
        where: { id: parsedId },
      });

      if (!existingProduct) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      const product = await prisma.product.update({
        where: { id: parsedId },
        data: {
          ...input,
        },
        include: {
          productCategory: true,
          seller: true,
        },
      });

      if (!product) {
        throw new ErrorService.InternalServerError("No se pudo actualizar el producto");
      }

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el producto");
    }
  },

  deleteProduct: async ({ id, adminId }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const existingProduct = await prisma.product.findUnique({
        where: { id: parsedId },
      });

      if (!existingProduct) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      await prisma.product.delete({
        where: { id: parsedId },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el producto");
    }
  },

  approveProduct: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const product = await prisma.product.update({
        where: { id: parsedId },
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

  // rejectProduct: async (adminId: string, id: number, reason?: string) => {
  //   try {
  //     const product = await prisma.product.update({
  //       where: { id },
  //       data: {
  //         isActive: false,
  //       },
  //       include: {
  //         productCategory: true,
  //         seller: true,
  //       },
  //     });

  //     // TODO: Send notification to seller with rejection reason

  //     return product;
  //   } catch (error) {
  //     throw new ErrorService.InternalServerError("Error al intentar rechazar el producto");
  //   }
  // },

  // Department CRUD methods
  createDepartment: async ({ adminId, input }: { input: CreateDepartmentInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const department = await prisma.department.create({
        data: { ...input },
        include: {
          departmentCategory: true,
        },
      });

      return department;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el departamento");
    }
  },

  updateDepartment: async ({ adminId, id, input }: { id: number; input: UpdateDepartmentInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);

      const department = await prisma.department.update({
        where: { id: parsedId },
        data: {
          ...input,
        },
        include: {
          departmentCategory: true,
        },
      });

      return department;
    } catch (error) {
      console.error("Error updating department:", error);
      throw new ErrorService.InternalServerError("Error al intentar actualizar el departamento");
    }
  },

  deleteDepartment: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);
      await prisma.department.delete({
        where: { id: parsedId },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el departamento");
    }
  },

  // Department Category CRUD methods
  createDepartmentCategory: async ({ adminId, input }: { input: CreateDepartmentCategoryInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const departmentCategory = await prisma.departmentCategory.create({
        data: {
          ...input,
        },
        include: {
          department: true,
          productCategory: true,
        },
      });

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la categoría de departamento");
    }
  },

  updateDepartmentCategory: async ({ adminId, id, input }: { id: number; input: UpdateDepartmentCategoryInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const departmentCategory = await prisma.departmentCategory.update({
        where: { id: parsedId },
        data: {
          ...input,
        },
        include: {
          department: true,
          productCategory: true,
        },
      });

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la categoría de departamento");
    }
  },

  deleteDepartmentCategory: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);
      await prisma.departmentCategory.delete({
        where: { id: parsedId },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la categoría de departamento");
    }
  },

  // Product Category CRUD methods
  createProductCategory: async ({ adminId, input }: { input: CreateProductCategoryInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const productCategory = await prisma.productCategory.create({
        data: {
          ...input,
        },
        include: {
          departmentCategory: true,
        },
      });

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear la categoría de producto");
    }
  },

  updateProductCategory: async ({ adminId, id, input }: { id: number; input: UpdateProductCategoryInput } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }

      const parsedId = Number(id);
      const productCategory = await prisma.productCategory.update({
        where: { id: parsedId },
        data: {
          ...input,
        },
        include: {
          departmentCategory: true,
        },
      });

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar la categoría de producto");
    }
  },

  deleteProductCategory: async ({ adminId, id }: { id: number } & Context) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const parsedId = Number(id);
      await prisma.productCategory.delete({
        where: { id: parsedId },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar la categoría de producto");
    }
  },

  // Bulk Import Methods
  bulkImportDepartments: async ({
    adminId,
    departments,
  }: { departments: Array<{ departmentName: string; departmentImage?: string }> } & Context) => {
    if (!adminId) {
      throw new ErrorService.UnAuthorizedError("No autorizado");
    }

    const result = {
      success: true,
      created: 0,
      failed: 0,
      errors: [] as Array<{ row: number; data: string; error: string }>,
    };

    for (let i = 0; i < departments.length; i++) {
      try {
        const department = departments[i];

        // Validate required fields
        if (!department.departmentName || department.departmentName.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(department),
            error: "El nombre del departamento es requerido",
          });
          continue;
        }

        // Check if department already exists
        const existing = await prisma.department.findFirst({
          where: { departmentName: department.departmentName },
        });

        if (existing) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(department),
            error: `El departamento '${department.departmentName}' ya existe`,
          });
          continue;
        }

        // Create department
        await prisma.department.create({
          data: {
            departmentName: department.departmentName,
            departmentImage: department.departmentImage || null,
          },
        });

        result.created++;
      } catch (error: any) {
        result.failed++;
        result.errors.push({
          row: i + 1,
          data: JSON.stringify(departments[i]),
          error: error.message || "Error desconocido",
        });
      }
    }

    result.success = result.failed === 0;
    return result;
  },

  bulkImportDepartmentCategories: async ({
    adminId,
    categories,
  }: { categories: Array<{ departmentCategoryName: string; departmentId: number }> } & Context) => {
    if (!adminId) {
      throw new ErrorService.UnAuthorizedError("No autorizado");
    }

    const result = {
      success: true,
      created: 0,
      failed: 0,
      errors: [] as Array<{ row: number; data: string; error: string }>,
    };

    for (let i = 0; i < categories.length; i++) {
      try {
        const category = categories[i];

        // Validate required fields
        if (!category.departmentCategoryName || category.departmentCategoryName.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: "El nombre de la categoría de departamento es requerido",
          });
          continue;
        }

        if (!category.departmentId) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: "El ID del departamento es requerido",
          });
          continue;
        }

        // Check if department exists
        const department = await prisma.department.findUnique({
          where: { id: category.departmentId },
        });

        if (!department) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: `El departamento con ID ${category.departmentId} no existe`,
          });
          continue;
        }

        // Check if category already exists
        const existing = await prisma.departmentCategory.findFirst({
          where: {
            departmentCategoryName: category.departmentCategoryName,
            departmentId: category.departmentId,
          },
        });

        if (existing) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: `La categoría '${category.departmentCategoryName}' ya existe en este departamento`,
          });
          continue;
        }

        // Create department category
        await prisma.departmentCategory.create({
          data: {
            departmentCategoryName: category.departmentCategoryName,
            departmentId: category.departmentId,
          },
        });

        result.created++;
      } catch (error: any) {
        result.failed++;
        result.errors.push({
          row: i + 1,
          data: JSON.stringify(categories[i]),
          error: error.message || "Error desconocido",
        });
      }
    }

    result.success = result.failed === 0;
    return result;
  },

  bulkImportProductCategories: async ({
    adminId,
    categories,
  }: {
    categories: Array<{
      productCategoryName: string;
      departmentCategoryId: number;
      keywords?: string[];
      averageWeight?: number;
      size?: string;
      weightUnit?: string;
    }>;
  } & Context) => {
    console.log("CATEGORIES:", categories);

    if (!adminId) {
      throw new ErrorService.UnAuthorizedError("No autorizado");
    }

    const result = {
      success: true,
      created: 0,
      failed: 0,
      errors: [] as Array<{ row: number; data: string; error: string }>,
    };

    for (let i = 0; i < categories.length; i++) {
      try {
        const category = categories[i];

        // Validate required fields
        if (!category.productCategoryName || category.productCategoryName.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: "El nombre de la categoría de producto es requerido",
          });
          continue;
        }

        if (!category.departmentCategoryId) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: "El ID de la categoría de departamento es requerido",
          });
          continue;
        }

        // Check if department category exists
        const departmentCategory = await prisma.departmentCategory.findUnique({
          where: { id: category.departmentCategoryId },
        });

        if (!departmentCategory) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: `La categoría de departamento con ID ${category.departmentCategoryId} no existe`,
          });
          continue;
        }

        // Check if product category already exists
        const existing = await prisma.productCategory.findFirst({
          where: {
            productCategoryName: category.productCategoryName,
            departmentCategoryId: category.departmentCategoryId,
          },
        });

        if (existing) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(category),
            error: `La categoría de producto '${category.productCategoryName}' ya existe en esta categoría de departamento`,
          });
          continue;
        }

        // Create product category
        await prisma.productCategory.create({
          data: {
            productCategoryName: category.productCategoryName,
            departmentCategoryId: category.departmentCategoryId,
            keywords: category.keywords || [],
            averageWeight: category.averageWeight || 0.0,
            size: (category.size as any) || "M",
            weightUnit: (category.weightUnit as any) || "KG",
          },
        });

        result.created++;
      } catch (error: any) {
        result.failed++;
        result.errors.push({
          row: i + 1,
          data: JSON.stringify(categories[i]),
          error: error.message || "Error desconocido",
        });
      }
    }

    result.success = result.failed === 0;
    return result;
  },

  bulkImportProducts: async ({ adminId, products }: { products: Array<any> } & Context) => {
    if (!adminId) {
      throw new ErrorService.UnAuthorizedError("No autorizado");
    }

    const result = {
      success: true,
      created: 0,
      failed: 0,
      errors: [] as Array<{ row: number; data: string; error: string }>,
    };

    for (let i = 0; i < products.length; i++) {
      try {
        const product = products[i];

        // Validate required fields
        if (!product.name || product.name.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "El nombre del producto es requerido",
          });
          continue;
        }

        if (!product.description || product.description.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "La descripción del producto es requerida",
          });
          continue;
        }

        if (product.price === undefined || product.price === null || product.price < 0) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "El precio del producto es requerido y debe ser mayor o igual a 0",
          });
          continue;
        }

        if (!product.brand || product.brand.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "La marca del producto es requerida",
          });
          continue;
        }

        if (!product.productCategoryId) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "El ID de la categoría de producto es requerido",
          });
          continue;
        }

        if (!product.sellerId || product.sellerId.trim() === "") {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: "El ID del vendedor es requerido",
          });
          continue;
        }

        // Check if product category exists
        const productCategory = await prisma.productCategory.findUnique({
          where: { id: product.productCategoryId },
        });

        if (!productCategory) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: `La categoría de producto con ID ${product.productCategoryId} no existe`,
          });
          continue;
        }

        // Check if seller exists
        const seller = await prisma.seller.findUnique({
          where: { id: product.sellerId },
        });

        if (!seller) {
          result.failed++;
          result.errors.push({
            row: i + 1,
            data: JSON.stringify(product),
            error: `El vendedor con ID ${product.sellerId} no existe`,
          });
          continue;
        }

        // Create product
        await prisma.product.create({
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            hasOffer: product.hasOffer ?? false,
            offerPrice: product.offerPrice ?? 0,
            brand: product.brand,
            color: product.color || null,
            images: product.images || [],
            interests: product.interests || [],
            isActive: product.isActive ?? true,
            isExchangeable: product.isExchangeable ?? false,
            productCategoryId: product.productCategoryId,
            sellerId: product.sellerId,
            condition: product.condition || "NEW",
            conditionDescription: product.conditionDescription || null,
            updatedAt: new Date(),
            badges: [],
          },
        });

        result.created++;
      } catch (error: any) {
        result.failed++;
        result.errors.push({
          row: i + 1,
          data: JSON.stringify(products[i]),
          error: error.message || "Error desconocido",
        });
      }
    }

    result.success = result.failed === 0;
    return result;
  },
};
