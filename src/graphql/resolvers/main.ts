import { type AdminPermission, type AdminRole, type AdminType } from "../../types";
import { AdminsResolver } from "./admins";
import { BlogsResolver } from "./blogs";
import { CommunityResolver } from "./community";
import { DepartmentsResolver } from "./departments";
import { ImpactResolver } from "./impact";
import { LocationResolver } from "./location";
import { ProductsResolver } from "./products";
import { SellerLevelResolver } from "./sellerLevel";

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
  page?: number;
  pageSize?: number;
};

export const MainResolver = {
  Query: {
    // Location queries
    ...LocationResolver.Query,
    // Admin queries
    ...AdminsResolver.Query,
    // Department queries
    ...DepartmentsResolver.Query,
    // Blog post queries
    ...BlogsResolver.Query,
    // Product queries
    ...ProductsResolver.Query,
    // Material Impact queries
    ...ImpactResolver.Query,
    // Community queries
    ...CommunityResolver.Query,
    // Seller level queries
    ...SellerLevelResolver.Query,
  },
  Mutation: {
    // Admin management
    ...AdminsResolver.Mutation,
    // Blog post management
    ...BlogsResolver.Mutation,
    // Product management
    ...ProductsResolver.Mutation,
    // Department management
    ...DepartmentsResolver.Mutation,
    // Material Impact management
    ...ImpactResolver.Mutation,
    // Location management
    ...LocationResolver.Mutation,
    // Community Management
    ...CommunityResolver.Mutation,
    // Seller level management
    ...SellerLevelResolver.Mutation,
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
