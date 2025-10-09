import { BlogCategory, type AdminPermission, type AdminRole, type AdminType } from "../../types";
import { PlatformAdminService } from "../services/admin";

export type CreateAdminInput = {
  email: string;
  password: string;
  name: string;
  lastName?: string;
  role: AdminRole;
  adminType: AdminType;
  permissions: AdminPermission[];
};

export type PaginationInput = {
  limit: number;
  offset: number;
};

export const AdminResolver = {
  Query: {
    // Location queries
    getCountries: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCountries({ adminId: context.adminId, ..._args }),

    getRegions: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getRegions({ adminId: context.adminId, ..._args }),

    getRegionsByCountry: (_parent: unknown, _args: { countryId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getRegionsByCountry({ adminId: context.adminId, ..._args }),

    getCities: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCities({ adminId: context.adminId, ..._args }),

    getCitiesByRegion: (_parent: unknown, _args: { regionId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCitiesByRegion({ adminId: context.adminId, ..._args }),

    getCounties: (_parent: unknown, _args: PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCounties({ adminId: context.adminId, ..._args }),

    getCountiesByCity: (_parent: unknown, _args: { cityId: number } & PaginationInput, context: { adminId: string }) =>
      PlatformAdminService.getCountiesByCity({ adminId: context.adminId, ..._args }),

    // Admin queries
    getMyData: async (_parent: unknown, _args: unknown, context: { adminId: string }) => PlatformAdminService.getMyData(context.adminId),

    getAdmins: (
      _parent: unknown,
      _args: { adminType?: string; role?: string; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getAdmins({ adminId: context.adminId, ..._args }),

    getAdmin: (_parent: unknown, _args: { id: string }, context: { adminId: string }) => PlatformAdminService.getAdminById(_args.id),

    // Department queries
    getDepartments: (_parent: unknown, _args: unknown, context: { adminId: string }) =>
      PlatformAdminService.getDepartments({ adminId: context.adminId }),

    getDepartment: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartment({ adminId: context.adminId, ..._args }),

    getDepartmentCategories: (_parent: unknown, _args: { departmentId?: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartmentCategories({ adminId: context.adminId, ..._args }),

    getDepartmentCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartmentCategory({ adminId: context.adminId, ..._args }),

    getProductCategories: (_parent: unknown, _args: { departmentCategoryId?: number }, context: { adminId: string }) =>
      PlatformAdminService.getProductCategories({ adminId: context.adminId, ..._args }),

    getProductCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getProductCategory({ adminId: context.adminId, ..._args }),

    // Blog post queries
    getBlogPosts: (
      _parent: unknown,
      _args: { category?: BlogCategory; isPublished?: boolean } & PaginationInput,
      context: { adminId: string },
    ) => PlatformAdminService.getBlogPosts({ adminId: context.adminId, ..._args }),

    getBlogPost: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getBlogPost({ adminId: context.adminId, ..._args }),

    getBlogPostsByAuthor: (_parent: unknown, _args: { authorId: string; limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getBlogPostsByAuthor({ adminId: context.adminId, ..._args }),

    // Product queries
    getProducts: (
      _parent: unknown,
      _args: { sellerId?: string; categoryId?: number; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getProducts({ adminId: context.adminId, ..._args }),

    getProduct: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getProduct({ adminId: context.adminId, ..._args }),

    getProductsByCategory: (
      _parent: unknown,
      _args: { categoryId: number; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getProductsByCategory({ adminId: context.adminId, ..._args }),

    // Material Impact queries
    getMaterialImpactEstimates: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getMaterialImpactEstimates({ adminId: context.adminId, ..._args }),

    getMaterialImpactEstimate: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getMaterialImpactEstimate({ adminId: context.adminId, ..._args }),

    getCo2ImpactMessages: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getCo2ImpactMessages({ adminId: context.adminId, ..._args }),

    getCo2ImpactMessage: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getCo2ImpactMessage({ adminId: context.adminId, ..._args }),

    getWaterImpactMessages: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getWaterImpactMessages({ adminId: context.adminId, ..._args }),

    getWaterImpactMessage: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getWaterImpactMessage({ adminId: context.adminId, ..._args }),

    // Community queries
    getCommunityPosts: (_parent: unknown, _args: { sellerId?: string; limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getCommunityPosts({ adminId: context.adminId, ..._args }),

    getCommunityPost: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getCommunityPost({ adminId: context.adminId, ..._args }),

    getCommunityComments: (
      _parent: unknown,
      _args: { communityPostId: number; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getCommunityComments({ adminId: context.adminId, ..._args }),

    getCommunityComment: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getCommunityComment({ adminId: context.adminId, ..._args }),
  },

  Mutation: {
    // Password management
    createAdmin: (_parent: unknown, args: { input: CreateAdminInput }, context: { adminId: string }) =>
      PlatformAdminService.createAdmin(args.input),

    // Admin management (super admin only)
    updateAdmin: (_parent: unknown, args: { adminId: string; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateAdmin(args.adminId, args.input),

    deleteAdmin: (_parent: unknown, args: { adminId: string }, context: { adminId: string }) =>
      PlatformAdminService.deleteAdmin(args.adminId),

    // Blog post management
    createBlogPost: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createBlogPost(context.adminId, args.input),

    updateBlogPost: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateBlogPost(context.adminId, args.id, args.input),

    deleteBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteBlogPost(context.adminId, args.id),

    publishBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.publishBlogPost(context.adminId, args.id),

    unpublishBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.unpublishBlogPost(context.adminId, args.id),

    // Product management
    updateProduct: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateProduct(context.adminId, args.id, args.input),

    deleteProduct: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteProduct(context.adminId, args.id),

    approveProduct: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.approveProduct(context.adminId, args.id),

    rejectProduct: (_parent: unknown, args: { id: number; reason?: string }, context: { adminId: string }) =>
      PlatformAdminService.rejectProduct(context.adminId, args.id, args.reason),

    // Department management
    createDepartment: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createDepartment(context.adminId, args.input),

    updateDepartment: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateDepartment(context.adminId, args.id, args.input),

    deleteDepartment: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteDepartment(context.adminId, args.id),

    // Department Category management
    createDepartmentCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createDepartmentCategory(context.adminId, args.input),

    updateDepartmentCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateDepartmentCategory(context.adminId, args.id, args.input),

    deleteDepartmentCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteDepartmentCategory(context.adminId, args.id),

    // Product Category management
    createProductCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createProductCategory(context.adminId, args.input),

    updateProductCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateProductCategory(context.adminId, args.id, args.input),

    deleteProductCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteProductCategory(context.adminId, args.id),

    // Material Impact management
    createMaterialImpactEstimate: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createMaterialImpactEstimate(context.adminId, args.input),

    updateMaterialImpactEstimate: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateMaterialImpactEstimate(context.adminId, args.id, args.input),

    deleteMaterialImpactEstimate: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteMaterialImpactEstimate(context.adminId, args.id),

    // Co2 Impact Message management
    createCo2ImpactMessage: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCo2ImpactMessage(context.adminId, args.input),

    updateCo2ImpactMessage: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCo2ImpactMessage(context.adminId, args.id, args.input),

    deleteCo2ImpactMessage: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCo2ImpactMessage(context.adminId, args.id),

    // Water Impact Message management
    createWaterImpactMessage: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createWaterImpactMessage(context.adminId, args.input),

    updateWaterImpactMessage: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateWaterImpactMessage(context.adminId, args.id, args.input),

    deleteWaterImpactMessage: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteWaterImpactMessage(context.adminId, args.id),

    // Location management
    createCountry: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCountry(context.adminId, args.input),

    updateCountry: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCountry(context.adminId, args.id, args.input),

    deleteCountry: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCountry(context.adminId, args.id),

    createRegion: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createRegion(context.adminId, args.input),

    updateRegion: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateRegion(context.adminId, args.id, args.input),

    deleteRegion: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteRegion(context.adminId, args.id),

    createCity: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCity(context.adminId, args.input),

    updateCity: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCity(context.adminId, args.id, args.input),

    deleteCity: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCity(context.adminId, args.id),

    createCounty: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCounty(context.adminId, args.input),

    updateCounty: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCounty(context.adminId, args.id, args.input),

    deleteCounty: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCounty(context.adminId, args.id),

    // Community post management
    createCommunityPost: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCommunityPost(context.adminId, args.input),

    updateCommunityPost: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCommunityPost(context.adminId, args.id, args.input),

    deleteCommunityPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCommunityPost(context.adminId, args.id),

    // Community comment management
    createCommunityComment: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCommunityComment(context.adminId, args.input),

    updateCommunityComment: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCommunityComment(context.adminId, args.id, args.input),

    deleteCommunityComment: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCommunityComment(context.adminId, args.id),
  },

  // Field resolvers to map Prisma relation names to GraphQL schema
  Admin: {
    region: (parent: any) => parent.Region,
    country: (parent: any) => parent.Country,
    city: (parent: any) => parent.City,
    county: (parent: any) => parent.County,
  },

  // Additional field resolvers for nested relationships
  Product: {
    seller: (parent: any) => parent.seller,
    productCategory: (parent: any) => parent.productCategory,
    comments: (parent: any) => parent.comments,
    likes: (parent: any) => parent.likes,
    productVariants: (parent: any) => parent.productVariants,
    exchangesOffered: (parent: any) => parent.Exchange_Exchange_offeredProductIdToProduct,
    exchangesRequested: (parent: any) => parent.Exchange_Exchange_requestedProductIdToProduct,
    itemsOrdered: (parent: any) => parent.itemsOrdered,
    chats: (parent: any) => parent.chats,
  },

  BlogPost: {
    author: (parent: any) => parent.author,
  },

  CommunityPost: {
    seller: (parent: any) => parent.seller,
    commentsList: (parent: any) => parent.commentsList,
  },

  CommunityComment: {
    seller: (parent: any) => parent.seller,
    communityPost: (parent: any) => parent.communityPost,
  },

  Department: {
    departmentCategories: (parent: any) => parent.departmentCategories,
  },

  DepartmentCategory: {
    department: (parent: any) => parent.department,
    productCategories: (parent: any) => parent.productCategories,
  },

  ProductCategory: {
    departmentCategory: (parent: any) => parent.departmentCategory,
    products: (parent: any) => parent.products,
    firstMaterialType: (parent: any) => parent.firstMaterialType,
    secondMaterialType: (parent: any) => parent.secondMaterialType,
    thirdMaterialType: (parent: any) => parent.thirdMaterialType,
    fourthMaterialType: (parent: any) => parent.fourthMaterialType,
    fifthMaterialType: (parent: any) => parent.fifthMaterialType,
  },

  ProductComment: {
    product: (parent: any) => parent.product,
    seller: (parent: any) => parent.seller,
  },

  ProductLike: {
    product: (parent: any) => parent.product,
    seller: (parent: any) => parent.seller,
  },
};
