import { AdminResolver } from "./admin";

export const resolvers = {
  Query: {
    ...AdminResolver.Query,
  },
  Mutation: {
    ...AdminResolver.Mutation,
  },
  Admin: {
    ...AdminResolver.Admin,
  },
  Product: {
    ...AdminResolver.Product,
  },
  BlogPost: {
    ...AdminResolver.BlogPost,
  },
  CommunityPost: {
    ...AdminResolver.CommunityPost,
  },
  CommunityComment: {
    ...AdminResolver.CommunityComment,
  },
  Department: {
    ...AdminResolver.Department,
  },
  DepartmentCategory: {
    ...AdminResolver.DepartmentCategory,
  },
  ProductCategory: {
    ...AdminResolver.ProductCategory,
  },
  ProductComment: {
    ...AdminResolver.ProductComment,
  },
  ProductLike: {
    ...AdminResolver.ProductLike,
  },
};
