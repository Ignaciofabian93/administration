import { MainService } from "../services";

export const ServiceResolver = {
  Query: {
    // Service category queries
    getServiceCategories: (_parent: unknown, _args: unknown, _context: { adminId: string }) => MainService.getServiceCategories(),

    getServiceCategory: (_parent: unknown, args: { id: string }, _context: { adminId: string }) =>
      MainService.getServiceCategoryById(args.id),

    getServiceSubCategories: (_parent: unknown, args: { serviceCategoryId?: number }, _context: { adminId: string }) =>
      MainService.getServiceSubCategories(args.serviceCategoryId),

    getServiceSubCategory: (_parent: unknown, args: { id: string }, _context: { adminId: string }) =>
      MainService.getServiceSubCategoryById(args.id),

    // Service queries
    getServices: (
      _parent: unknown,
      args: { sellerId?: string; subcategoryId?: number; isActive?: boolean; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getServices(args),

    getService: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getServiceById(args.id),

    // Quotation queries
    getQuotations: (
      _parent: unknown,
      args: { clientId?: string; providerId?: string; status?: string; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getQuotations(args),

    getQuotation: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getQuotationById(args.id),

    // Service review queries
    getServiceReviews: (_parent: unknown, args: { serviceId: number; page?: number; pageSize?: number }, _context: { adminId: string }) =>
      MainService.getServiceReviews(args),
  },

  Mutation: {
    // Service category management
    createServiceSubCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createServiceSubCategory(args.input),

    updateServiceSubCategory: (_parent: unknown, args: { id: string; input: any }, context: { adminId: string }) =>
      MainService.updateServiceSubCategory(args.id, args.input),

    deleteServiceSubCategory: (_parent: unknown, args: { id: string }, context: { adminId: string }) =>
      MainService.deleteServiceSubCategory(args.id),

    updateServiceCategory: (_parent: unknown, args: { id: string; input: any }, context: { adminId: string }) =>
      MainService.updateServiceCategory(args.id, args.input),

    // Service management
    createService: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.createService(context.sellerId, args.input),

    updateService: (_parent: unknown, args: { id: string; input: any }, context: { sellerId: string }) =>
      MainService.updateService(args.id, args.input),

    deleteService: (_parent: unknown, args: { id: string }, context: { sellerId: string }) => MainService.deleteService(args.id),

    // Quotation management
    createQuotation: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.createQuotation(context.sellerId, args.input),

    updateQuotation: (_parent: unknown, args: { id: string; input: any }, context: { sellerId: string }) =>
      MainService.updateQuotation(args.id, args.input),

    acceptQuotation: (_parent: unknown, args: { id: string }, context: { sellerId: string }) => MainService.acceptQuotation(args.id),

    completeQuotation: (_parent: unknown, args: { id: string }, context: { sellerId: string }) => MainService.completeQuotation(args.id),

    cancelQuotation: (_parent: unknown, args: { id: string }, context: { sellerId: string }) => MainService.cancelQuotation(args.id),

    // Service review management
    createServiceReview: (_parent: unknown, args: { serviceId: number; rating: number; comment?: string }, context: { sellerId: string }) =>
      MainService.createServiceReview(context.sellerId, args.serviceId, args.rating, args.comment),

    deleteServiceReview: (_parent: unknown, args: { id: string }, context: { sellerId: string }) =>
      MainService.deleteServiceReview(args.id),
  },
};
