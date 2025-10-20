import { BlogCategory, Context } from "../../types";
import { MainService } from "../services";
import { PaginationInput } from "./main";

export const BlogsResolver = {
  Query: {
    getBlogPosts: (_parent: unknown, _args: { category?: BlogCategory; isPublished?: boolean } & PaginationInput, context: Context) =>
      MainService.getBlogPosts({ ..._args, ...context }),

    getBlogPost: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      MainService.getBlogPost({ adminId: context.adminId, ..._args }),

    getBlogPostsByAuthor: (_parent: unknown, _args: { authorId: string; limit?: number; offset?: number }, context: { adminId: string }) =>
      MainService.getBlogPostsByAuthor({ adminId: context.adminId, ..._args }),
  },
  Mutation: {
    createBlogPost: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createBlogPost(context.adminId, args.input),

    updateBlogPost: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      MainService.updateBlogPost(context.adminId, args.id, args.input),

    deleteBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.deleteBlogPost(context.adminId, args.id),

    publishBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.publishBlogPost(context.adminId, args.id),

    unpublishBlogPost: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.unpublishBlogPost(context.adminId, args.id),
  },
};
