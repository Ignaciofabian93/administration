import { BlogCategory } from "../../types";
import { PlatformAdminService } from "../services/admin";
import { PaginationInput } from "./main";

export const BlogsResolver = {
  Query: {
    getBlogPosts: (
      _parent: unknown,
      _args: { category?: BlogCategory; isPublished?: boolean } & PaginationInput,
      context: { adminId: string },
    ) => PlatformAdminService.getBlogPosts({ adminId: context.adminId, ..._args }),

    getBlogPost: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getBlogPost({ adminId: context.adminId, ..._args }),

    getBlogPostsByAuthor: (_parent: unknown, _args: { authorId: string; limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getBlogPostsByAuthor({ adminId: context.adminId, ..._args }),
  },
  Mutation: {
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
  },
};
