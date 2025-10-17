import { MainService } from "../services";

export const StoreResolver = {
  Query: {
    // Store category queries
    getStoreCategories: (_parent: unknown, _args: unknown, _context: { adminId: string }) => MainService.getStoreCategories(),

    getStoreCategory: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getStoreCategoryById(args.id),

    getStoreSubCategories: (_parent: unknown, args: { storeCategoryId?: number }, _context: { adminId: string }) =>
      MainService.getStoreSubCategories(args.storeCategoryId),

    getStoreSubCategory: (_parent: unknown, args: { id: string }, _context: { adminId: string }) =>
      MainService.getStoreSubCategoryById(args.id),

    // Store product queries
    getStoreProducts: (
      _parent: unknown,
      args: { subcategoryId?: number; sellerId?: string; isActive?: boolean; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getStoreProducts(args),

    getStoreProduct: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getStoreProductById(args.id),

    // Store product material queries
    getStoreProductMaterials: (
      _parent: unknown,
      args: { storeProductId: number; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getStoreProductMaterials(args),

    getStoreProductMaterial: (_parent: unknown, args: { id: string }, _context: { adminId: string }) =>
      MainService.getStoreProductMaterialById(args.id),
  },

  Mutation: {
    // Store category management
    createStoreCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createStoreCategory(args.input),

    updateStoreCategory: (_parent: unknown, args: { id: string; input: any }, context: { adminId: string }) =>
      MainService.updateStoreCategory(args.id, args.input),

    deleteStoreCategory: (_parent: unknown, args: { id: string }, context: { adminId: string }) => MainService.deleteStoreCategory(args.id),

    // Store subcategory management
    createStoreSubCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createStoreSubCategory(args.input),

    updateStoreSubCategory: (_parent: unknown, args: { id: string; input: any }, context: { adminId: string }) =>
      MainService.updateStoreSubCategory(args.id, args.input),

    deleteStoreSubCategory: (_parent: unknown, args: { id: string }, context: { adminId: string }) =>
      MainService.deleteStoreSubCategory(args.id),

    // Store product management
    createStoreProduct: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.createStoreProduct(context.sellerId, args.input),

    updateStoreProduct: (_parent: unknown, args: { id: string; input: any }, context: { sellerId: string }) =>
      MainService.updateStoreProduct(args.id, args.input),

    deleteStoreProduct: (_parent: unknown, args: { id: string }, context: { sellerId: string }) => MainService.deleteStoreProduct(args.id),

    // Store product material management
    createStoreProductMaterial: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.createStoreProductMaterial(args.input),

    updateStoreProductMaterial: (_parent: unknown, args: { id: string; input: any }, context: { sellerId: string }) =>
      MainService.updateStoreProductMaterial(args.id, args.input),

    deleteStoreProductMaterial: (_parent: unknown, args: { id: string }, context: { sellerId: string }) =>
      MainService.deleteStoreProductMaterial(args.id),
  },
};
