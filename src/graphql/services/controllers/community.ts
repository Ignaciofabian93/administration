import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export type CreateCommunityPostInput = {
  content: string;
  images?: string[];
};

export type UpdateCommunityPostInput = {
  content?: string;
  images?: string[];
};

export type CreateCommunityCommentInput = {
  communityPostId: number;
  content: string;
};

export type UpdateCommunityCommentInput = {
  content: string;
};

export const CommunityServices = {
  getCommunityPosts: async ({
    adminId,
    sellerId,
    limit,
    offset,
  }: {
    adminId: string;
    sellerId?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const where: any = {};
      if (sellerId) where.sellerId = sellerId;

      const communityPosts = await prisma.communityPost.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          seller: true,
          commentsList: {
            include: {
              seller: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return communityPosts;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los posts de la comunidad");
    }
  },

  getCommunityPost: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const communityPost = await prisma.communityPost.findUnique({
        where: { id },
        include: {
          seller: true,
          commentsList: {
            include: {
              seller: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      if (!communityPost) {
        throw new ErrorService.NotFoundError("No se encontró el post de la comunidad");
      }

      return communityPost;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el post de la comunidad por ID");
    }
  },

  getCommunityComments: async ({
    adminId,
    communityPostId,
    limit,
    offset,
  }: {
    adminId: string;
    communityPostId: number;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const comments = await prisma.communityComment.findMany({
        where: { communityPostId },
        take: limit,
        skip: offset,
        include: {
          seller: true,
          communityPost: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return comments;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener los comentarios de la comunidad");
    }
  },

  getCommunityComment: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      const comment = await prisma.communityComment.findUnique({
        where: { id },
        include: {
          seller: true,
          communityPost: true,
        },
      });

      if (!comment) {
        throw new ErrorService.NotFoundError("No se encontró el comentario de la comunidad");
      }

      return comment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener el comentario de la comunidad por ID");
    }
  },

  createCommunityPost: async (sellerId: string, input: CreateCommunityPostInput) => {
    try {
      const communityPost = await prisma.communityPost.create({
        data: {
          ...input,
          sellerId,
          images: input.images || [],
        },
        include: {
          seller: true,
          commentsList: true,
        },
      });

      return communityPost;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el post de la comunidad");
    }
  },

  updateCommunityPost: async (adminId: string, id: number, input: UpdateCommunityPostInput) => {
    try {
      const existingPost = await prisma.communityPost.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new ErrorService.NotFoundError("No se encontró el post de la comunidad");
      }

      const communityPost = await prisma.communityPost.update({
        where: { id },
        data: input,
        include: {
          seller: true,
          commentsList: {
            include: {
              seller: true,
            },
          },
        },
      });

      return communityPost;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el post de la comunidad");
    }
  },

  deleteCommunityPost: async (adminId: string, id: number) => {
    try {
      const existingPost = await prisma.communityPost.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new ErrorService.NotFoundError("No se encontró el post de la comunidad");
      }

      await prisma.communityPost.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el post de la comunidad");
    }
  },

  createCommunityComment: async (sellerId: string, input: CreateCommunityCommentInput) => {
    try {
      // Update the comments count on the post
      await prisma.communityPost.update({
        where: { id: input.communityPostId },
        data: {
          comments: {
            increment: 1,
          },
        },
      });

      const comment = await prisma.communityComment.create({
        data: {
          ...input,
          sellerId,
        },
        include: {
          seller: true,
          communityPost: true,
        },
      });

      return comment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear el comentario de la comunidad");
    }
  },

  updateCommunityComment: async (adminId: string, id: number, input: UpdateCommunityCommentInput) => {
    try {
      const existingComment = await prisma.communityComment.findUnique({
        where: { id },
      });

      if (!existingComment) {
        throw new ErrorService.NotFoundError("No se encontró el comentario de la comunidad");
      }

      const comment = await prisma.communityComment.update({
        where: { id },
        data: input,
        include: {
          seller: true,
          communityPost: true,
        },
      });

      return comment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar el comentario de la comunidad");
    }
  },

  deleteCommunityComment: async (adminId: string, id: number) => {
    try {
      const existingComment = await prisma.communityComment.findUnique({
        where: { id },
        include: {
          communityPost: true,
        },
      });

      if (!existingComment) {
        throw new ErrorService.NotFoundError("No se encontró el comentario de la comunidad");
      }

      // Update the comments count on the post
      await prisma.communityPost.update({
        where: { id: existingComment.communityPostId },
        data: {
          comments: {
            decrement: 1,
          },
        },
      });

      await prisma.communityComment.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar el comentario de la comunidad");
    }
  },
};
