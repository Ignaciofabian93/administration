import { MainService } from "../services";

export const ProductsResolver = {
  Query: {
    getProducts: (
      _parent: unknown,
      _args: { sellerId?: string; categoryId?: number; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => MainService.getProducts({ adminId: context.adminId, ..._args }),

    getProduct: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      MainService.getProduct({ adminId: context.adminId, ..._args }),

    getProductsByCategory: (
      _parent: unknown,
      _args: { categoryId: number; limit?: number; offset?: number },
      context: { adminId: string },
    ) => MainService.getProductsByCategory({ adminId: context.adminId, ..._args }),
  },
  Mutation: {
    updateProduct: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      MainService.updateProduct(context.adminId, args.id, args.input),

    deleteProduct: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.deleteProduct(context.adminId, args.id),

    approveProduct: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.approveProduct(context.adminId, args.id),

    rejectProduct: (_parent: unknown, args: { id: number; reason?: string }, context: { adminId: string }) =>
      MainService.rejectProduct(context.adminId, args.id, args.reason),
  },
};
