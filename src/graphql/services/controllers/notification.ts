import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { calculatePagination } from "../../../utils/pagination";

export const NotificationServices = {
  // Notification Queries
  getNotifications: async (sellerId: string, args: { isRead?: boolean; type?: string; page?: number; pageSize?: number }) => {
    try {
      const { isRead, type, page = 1, pageSize = 10 } = args;
      const where: any = { sellerId };

      if (isRead !== undefined) where.isRead = isRead;
      if (type) where.type = type;

      const totalCount = await prisma.notification.count({ where });

      const notifications = await prisma.notification.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          seller: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: notifications,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener notificaciones");
    }
  },

  getNotificationById: async (id: string, sellerId: string) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
        include: {
          seller: true,
        },
      });

      if (!notification) {
        throw new ErrorService.NotFoundError("No se encontró la notificación");
      }

      // Verify ownership
      if (notification.sellerId !== sellerId) {
        throw new ErrorService.InternalServerError("No tiene permiso para ver esta notificación");
      }

      return notification;
    } catch (error) {
      if (error instanceof ErrorService.NotFoundError || error instanceof ErrorService.InternalServerError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al intentar obtener notificación");
    }
  },

  getUnreadNotificationCount: async (sellerId: string) => {
    try {
      const count = await prisma.notification.count({
        where: {
          sellerId,
          isRead: false,
        },
      });

      return count;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener contador de notificaciones no leídas");
    }
  },

  // Notification Template Queries (Admin only)
  getNotificationTemplates: async (args: { type?: string; isActive?: boolean }) => {
    try {
      const { type, isActive } = args;
      const where: any = {};

      if (type) where.type = type;
      if (isActive !== undefined) where.isActive = isActive;

      const templates = await prisma.notificationTemplate.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      });

      return templates;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener plantillas de notificación");
    }
  },

  getNotificationTemplateById: async (id: string) => {
    try {
      const template = await prisma.notificationTemplate.findUnique({
        where: { id: parseInt(id) },
      });

      if (!template) {
        throw new ErrorService.NotFoundError("No se encontró la plantilla de notificación");
      }

      return template;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener plantilla de notificación");
    }
  },

  // Notification Mutations
  markNotificationAsRead: async (id: string, sellerId: string) => {
    try {
      // First verify ownership
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        throw new ErrorService.NotFoundError("No se encontró la notificación");
      }

      if (notification.sellerId !== sellerId) {
        throw new ErrorService.InternalServerError("No tiene permiso para modificar esta notificación");
      }

      const updatedNotification = await prisma.notification.update({
        where: { id: parseInt(id) },
        data: {
          isRead: true,
          readAt: new Date(),
        },
        include: {
          seller: true,
        },
      });

      return updatedNotification;
    } catch (error) {
      if (error instanceof ErrorService.NotFoundError || error instanceof ErrorService.InternalServerError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al intentar marcar notificación como leída");
    }
  },

  markAllNotificationsAsRead: async (sellerId: string) => {
    try {
      await prisma.notification.updateMany({
        where: {
          sellerId,
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar marcar todas las notificaciones como leídas");
    }
  },

  deleteNotification: async (id: string, sellerId: string) => {
    try {
      // First verify ownership
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        throw new ErrorService.NotFoundError("No se encontró la notificación");
      }

      if (notification.sellerId !== sellerId) {
        throw new ErrorService.InternalServerError("No tiene permiso para eliminar esta notificación");
      }

      await prisma.notification.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      if (error instanceof ErrorService.NotFoundError || error instanceof ErrorService.InternalServerError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al intentar eliminar notificación");
    }
  },

  // Notification Template Mutations (Admin only)
  createNotificationTemplate: async (input: any) => {
    try {
      const template = await prisma.notificationTemplate.create({
        data: {
          type: input.type,
          title: input.title,
          message: input.message,
          isActive: input.isActive !== undefined ? input.isActive : true,
        },
      });

      return template;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear plantilla de notificación");
    }
  },

  updateNotificationTemplate: async (id: string, input: any) => {
    try {
      const template = await prisma.notificationTemplate.update({
        where: { id: parseInt(id) },
        data: {
          title: input.title,
          message: input.message,
          isActive: input.isActive,
          updatedAt: new Date(),
        },
      });

      return template;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar plantilla de notificación");
    }
  },

  deleteNotificationTemplate: async (id: string) => {
    try {
      await prisma.notificationTemplate.delete({
        where: { id: parseInt(id) },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar plantilla de notificación");
    }
  },
};
