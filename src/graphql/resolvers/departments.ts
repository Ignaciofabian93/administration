import { Context, ProductSize, WeightUnit } from "../../types";
import { MainService } from "../services";
import { PaginationInput } from "./main";

export type CreateDepartmentInput = {
  departmentName: string;
  departmentImage: string;
};

export type UpdateDepartmentInput = {
  departmentName: string;
  departmentImage: string;
};

export type CreateDepartmentCategoryInput = {
  departmentId: number;
  departmentCategoryName: string;
};

export type UpdateDepartmentCategoryInput = {
  departmentId: number;
  departmentCategoryName: string;
};

export type CreateProductCategoryInput = {
  departmentCategoryId: number;
  productCategoryName: string;
  keywords: string[];
  averageWeight: number;
  size: ProductSize;
  weightUnit: WeightUnit;
};

export type UpdateProductCategoryInput = {
  productCategoryName: string;
  keywords: string[];
  averageWeight: number;
  size: ProductSize;
  weightUnit: WeightUnit;
};

export const DepartmentsResolver = {
  Query: {
    getDepartments: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getDepartments({ ..._args, ...context }),

    getDepartment: (_parent: unknown, _args: { id: number }, context: Context) => MainService.getDepartment({ ...context, ..._args }),

    getDepartmentCategories: (_parent: unknown, _args: PaginationInput, context: Context) =>
      MainService.getDepartmentCategories({ ...context, ..._args }),

    getDepartmentCategory: (_parent: unknown, _args: { id: number }, context: Context) =>
      MainService.getDepartmentCategory({ ...context, ..._args }),

    getProductCategories: (_parent: unknown, _args: PaginationInput, context: Context) =>
      MainService.getProductCategories({ ...context, ..._args }),

    getProductCategory: (_parent: unknown, _args: { id: number }, context: Context) =>
      MainService.getProductCategory({ ...context, ..._args }),
  },
  Mutation: {
    // Department management
    createDepartment: (_parent: unknown, _args: { input: CreateDepartmentInput }, context: Context) =>
      MainService.createDepartment({ ...context, ..._args }),

    updateDepartment: (_parent: unknown, _args: { id: number; input: UpdateDepartmentInput }, context: Context) =>
      MainService.updateDepartment({ ...context, ..._args }),

    deleteDepartment: (_parent: unknown, _args: { id: number }, context: Context) => MainService.deleteDepartment({ ...context, ..._args }),

    // Department Category management
    createDepartmentCategory: (_parent: unknown, _args: { input: CreateDepartmentCategoryInput }, context: Context) =>
      MainService.createDepartmentCategory({ ...context, ..._args }),

    updateDepartmentCategory: (_parent: unknown, _args: { id: number; input: UpdateDepartmentCategoryInput }, context: Context) =>
      MainService.updateDepartmentCategory({ ...context, ..._args }),

    deleteDepartmentCategory: (_parent: unknown, _args: { id: number }, context: Context) =>
      MainService.deleteDepartmentCategory({ ...context, ..._args }),

    // Product Category management
    createProductCategory: (_parent: unknown, _args: { input: CreateProductCategoryInput }, context: Context) =>
      MainService.createProductCategory({ ...context, ..._args }),

    updateProductCategory: (_parent: unknown, _args: { id: number; input: UpdateProductCategoryInput }, context: Context) =>
      MainService.updateProductCategory({ ...context, ..._args }),

    deleteProductCategory: (_parent: unknown, _args: { id: number }, context: Context) =>
      MainService.deleteProductCategory({ ...context, ..._args }),
  },
};
