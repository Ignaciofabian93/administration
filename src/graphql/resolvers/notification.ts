import { MainService } from "../services";

export const NotificationResolver = {
  Query: {
    // Notification queries
    getNotifications: (
      _parent: unknown,
      args: { isRead?: boolean; type?: string; page?: number; pageSize?: number },
      context: { sellerId: string },
    ) => MainService.getNotifications(context.sellerId, args),

    getNotification: (_parent: unknown, args: { id: string }, context: { sellerId: string }) =>
      MainService.getNotificationById(args.id, context.sellerId),

    getUnreadNotificationCount: (_parent: unknown, _args: unknown, context: { sellerId: string }) =>
      MainService.getUnreadNotificationCount(context.sellerId),

    // Notification template queries (admin only)
    getNotificationTemplates: (_parent: unknown, args: { type?: string; isActive?: boolean }, _context: { adminId: string }) =>
      MainService.getNotificationTemplates(args),

    getNotificationTemplate: (_parent: unknown, args: { id: string }, _context: { adminId: string }) =>
      MainService.getNotificationTemplateById(args.id),
  },

  Mutation: {
    // Notification management
    markNotificationAsRead: (_parent: unknown, args: { id: string }, context: { sellerId: string }) =>
      MainService.markNotificationAsRead(args.id, context.sellerId),

    markAllNotificationsAsRead: (_parent: unknown, _args: unknown, context: { sellerId: string }) =>
      MainService.markAllNotificationsAsRead(context.sellerId),

    deleteNotification: (_parent: unknown, args: { id: string }, context: { sellerId: string }) =>
      MainService.deleteNotification(args.id, context.sellerId),

    // Notification template management (admin only)
    createNotificationTemplate: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createNotificationTemplate(args.input),

    updateNotificationTemplate: (_parent: unknown, args: { id: string; input: any }, context: { adminId: string }) =>
      MainService.updateNotificationTemplate(args.id, args.input),

    deleteNotificationTemplate: (_parent: unknown, args: { id: string }, context: { adminId: string }) =>
      MainService.deleteNotificationTemplate(args.id),
  },
};
