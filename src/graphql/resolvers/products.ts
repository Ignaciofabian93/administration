import { Context, ProductCondition } from "../../types";
import { BulkDepartmentCategoryInput, BulkDepartmentInput, BulkProductCategoryInput, BulkProductInput } from "../../types/bulk";
import { MainService } from "../services";
import { PaginationInput } from "./main";

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  hasOffer: boolean;
  offerPrice: number;
  brand: string;
  color: string;
  images: string[];
  interests: string[];
  isActive: boolean;
  isExchangeable: boolean;
  productCategoryId: number;
  condition: ProductCondition;
  conditionDescription: string;
};

export const ProductsResolver = {
  Query: {
    getProducts: (
      _parent: unknown,
      _args: { sellerId?: string; categoryId?: number; isActive?: boolean } & PaginationInput,
      context: Context,
    ) => MainService.getProducts({ ...context, ..._args }),

    getProduct: (_parent: unknown, _args: { id: number }, context: Context) => MainService.getProduct({ ...context, ..._args }),

    getProductsByCategory: (_parent: unknown, _args: { categoryId: number } & PaginationInput, context: Context) =>
      MainService.getProductsByCategory({ ...context, ..._args }),
  },
  Mutation: {
    createProduct: (_parent: unknown, _args: { input: ProductInput }, context: Context) =>
      MainService.createProduct({ ..._args, ...context }),
    updateProduct: (_parent: unknown, _args: { id: number; input: ProductInput }, context: Context) =>
      MainService.updateProduct({ ...context, ..._args }),

    deleteProduct: (_parent: unknown, _args: { id: number }, context: Context) => MainService.deleteProduct({ ..._args, ...context }),

    approveProduct: (_parent: unknown, _args: { id: number }, context: Context) => MainService.approveProduct({ ..._args, ...context }),

    // rejectProduct: (_parent: unknown, _args: { id: number; reason?: string }, context: Context) =>
    //   MainService.rejectProduct({ ..._args, ...context }),

    // Bulk Import Mutations
    bulkImportDepartments: (_parent: unknown, _args: { departments: BulkDepartmentInput[] }, context: Context) =>
      MainService.bulkImportDepartments({ ...context, ..._args }),

    bulkImportDepartmentCategories: (_parent: unknown, _args: { categories: BulkDepartmentCategoryInput[] }, context: Context) =>
      MainService.bulkImportDepartmentCategories({ ...context, ..._args }),

    bulkImportProductCategories: (_parent: unknown, _args: { categories: BulkProductCategoryInput[] }, context: Context) =>
      MainService.bulkImportProductCategories({ ...context, ..._args }),

    bulkImportProducts: (_parent: unknown, _args: { products: BulkProductInput[] }, context: Context) =>
      MainService.bulkImportProducts({ ...context, ..._args }),
  },
};
