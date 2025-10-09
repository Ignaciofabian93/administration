import { PlatformAdminService } from "../services/admin";

export const CommunityResolver = {
  Query: {
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
};
