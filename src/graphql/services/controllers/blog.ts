import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { type BlogCategory } from "../../../types";

export type CreateBlogPostInput = {
  title: string;
  content: string;
  tags: string[];
  category: BlogCategory;
  isPublished?: boolean;
};

export type UpdateBlogPostInput = {
  title?: string;
  content?: string;
  tags?: string[];
  category?: BlogCategory;
  isPublished?: boolean;
};

export const BlogServices = {
  getBlogPosts: async ({
    adminId,
    category,
    isPublished,
    limit,
    offset,
  }: {
    adminId: string;
    category?: BlogCategory;
    isPublished?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const where: any = {};
      if (category) where.category = category;
      if (isPublished !== undefined) where.isPublished = isPublished;

      const blogPosts = await prisma.blogPost.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return blogPosts;
    } catch (error) {
      console.error("Error in getBlogPosts:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los posts del blog");
    }
  },

  getBlogPost: async ({ adminId, id }: { adminId: string; id: number }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const parsedId = Number(id);
      const blogPost = await prisma.blogPost.findUnique({
        where: { id: parsedId },
        include: {
          author: true,
        },
      });

      if (!blogPost) {
        throw new ErrorService.NotFoundError("No se encontró el post del blog");
      }

      return blogPost;
    } catch (error) {
      console.error("Error in getBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener el post del blog por ID");
    }
  },

  getBlogPostsByAuthor: async ({
    adminId,
    authorId,
    limit,
    offset,
  }: {
    adminId: string;
    authorId: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const blogPosts = await prisma.blogPost.findMany({
        where: { authorId },
        take: limit,
        skip: offset,
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return blogPosts;
    } catch (error) {
      console.error("Error in getBlogPostsByAuthor:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener los posts del blog por autor");
    }
  },

  createBlogPost: async (adminId: string, input: CreateBlogPostInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const blogPost = await prisma.blogPost.create({
        data: {
          ...input,
          authorId: adminId,
          isPublished: input.isPublished || false,
          publishedAt: input.isPublished ? new Date() : null,
        },
        include: {
          author: true,
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error in createBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar crear el post del blog");
    }
  },

  updateBlogPost: async (adminId: string, id: number, input: UpdateBlogPostInput) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");
      // Verify the blog post exists and belongs to the admin or admin has permissions
      const parsedId = Number(id);
      const existingPost = await prisma.blogPost.findUnique({
        where: { id: parsedId },
      });

      if (!existingPost) {
        throw new ErrorService.NotFoundError("No se encontró el post del blog");
      }

      const blogPost = await prisma.blogPost.update({
        where: { id: parsedId },
        data: input,
        include: {
          author: true,
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error in updateBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar actualizar el post del blog");
    }
  },

  deleteBlogPost: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");
      // Verify the blog post exists
      const parsedId = Number(id);
      const existingPost = await prisma.blogPost.findUnique({
        where: { id: parsedId },
      });

      if (!existingPost) {
        throw new ErrorService.NotFoundError("No se encontró el post del blog");
      }

      await prisma.blogPost.delete({
        where: { id: parsedId },
      });

      return true;
    } catch (error) {
      console.error("Error in deleteBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar eliminar el post del blog");
    }
  },

  publishBlogPost: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const parsedId = Number(id);
      const blogPost = await prisma.blogPost.update({
        where: { id: parsedId },
        data: {
          isPublished: true,
          publishedAt: new Date(),
        },
        include: {
          author: true,
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error in publishBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar publicar el post del blog");
    }
  },

  unpublishBlogPost: async (adminId: string, id: number) => {
    try {
      if (!adminId) throw new ErrorService.UnAuthorizedError("No autorizado");

      const parsedId = Number(id);
      const blogPost = await prisma.blogPost.update({
        where: { id: parsedId },
        data: {
          isPublished: false,
          publishedAt: null,
        },
        include: {
          author: true,
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error in unpublishBlogPost:", error);
      throw new ErrorService.InternalServerError("Error al intentar despublicar el post del blog");
    }
  },
};
