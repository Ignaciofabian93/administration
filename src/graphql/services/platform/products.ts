import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const ProductServices = {
  getDepartments: async () => {
    try {
      const departments = await prisma.department.findMany();

      if (!departments) {
        throw new ErrorService.NotFoundError("No se encontraron departamentos");
      }

      return departments;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los departamentos");
    }
  },
  getDepartmentById: async (id: number) => {
    try {
      const department = await prisma.department.findUnique({
        where: { id },
      });

      if (!department) {
        throw new ErrorService.NotFoundError("No se encontró el departamento");
      }

      return department;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el departamento por ID");
    }
  },
  getDepartmentCategories: async () => {
    try {
      const departmentCategories = await prisma.departmentCategory.findMany();

      if (!departmentCategories) {
        throw new ErrorService.NotFoundError("No se encontraron las categorías de departamentos");
      }

      return departmentCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de departamentos");
    }
  },
  getDepartmentCategoryById: async (id: number) => {
    try {
      const departmentCategory = await prisma.departmentCategory.findUnique({
        where: { id },
      });

      if (!departmentCategory) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de departamento");
      }

      return departmentCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la categoría de departamento por ID");
    }
  },
  getDepartmentCategoryByDepartmentId: async (departmentId: number) => {
    try {
      const departmentCategories = await prisma.departmentCategory.findMany({
        where: { departmentId },
      });
      if (!departmentCategories) {
        throw new ErrorService.NotFoundError("No se encontraron las categorías de departamento para el ID proporcionado");
      }
      return departmentCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de departamento por ID de departamento");
    }
  },
  getProductCategories: async () => {
    try {
      const productCategories = await prisma.productCategory.findMany();

      if (!productCategories) {
        throw new ErrorService.NotFoundError("No se encontraron las categorías de productos");
      }

      return productCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener las categorías de productos");
    }
  },
  getProductCategoryById: async (id: number) => {
    try {
      const productCategory = await prisma.productCategory.findUnique({
        where: { id },
      });

      if (!productCategory) {
        throw new ErrorService.NotFoundError("No se encontró la categoría de producto");
      }

      return productCategory;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener la categoría de producto por ID");
    }
  },
  getProductCategoriesByDepartmentCategoryId: async (departmentCategoryId: number) => {
    try {
      const productCategories = await prisma.productCategory.findMany({
        where: { departmentCategoryId },
      });

      if (!productCategories) {
        throw new ErrorService.NotFoundError(
          "No se encontraron las categorías de productos para el ID de categoría de departamento proporcionado",
        );
      }

      return productCategories;
    } catch (error) {
      throw new ErrorService.InternalServerError(
        "Error al intentar obtener las categorías de productos por ID de categoría de departamento",
      );
    }
  },
  getProducts: async (limit?: number, offset?: number, filters?: Record<string, string>) => {
    try {
      const products = await prisma.product.findMany({
        where: { ...filters },
        take: limit,
        skip: offset,
      });

      if (!products) {
        throw new ErrorService.NotFoundError("No se encontraron productos");
      }

      return products;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los productos");
    }
  },
  getProductById: async (id: number) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new ErrorService.NotFoundError("No se encontró el producto");
      }

      return product;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el producto por ID");
    }
  },
};
