import gql from "graphql-tag";

export const notificationTypeDefs = gql`
  # Notification Types
  type Notification {
    id: ID!
    sellerId: String!
    type: NotificationType!
    title: String!
    message: String!
    isRead: Boolean!
    priority: NotificationPriority!
    relatedId: String
    actionUrl: String
    metadata: JSON
    createdAt: DateTime!
    readAt: DateTime
    seller: Seller!
  }

  type NotificationTemplate {
    id: ID!
    type: NotificationType!
    title: String!
    message: String!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    # Notification queries
    getNotifications(isRead: Boolean, type: NotificationType, page: Int = 1, pageSize: Int = 10): NotificationsConnection!
    getNotification(id: ID!): Notification
    getUnreadNotificationCount: Int!

    # Notification template queries (admin only)
    getNotificationTemplates(type: NotificationType, isActive: Boolean): [NotificationTemplate!]!
    getNotificationTemplate(id: ID!): NotificationTemplate
  }

  extend type Mutation {
    # Notification management
    markNotificationAsRead(id: ID!): Notification!
    markAllNotificationsAsRead: Boolean!
    deleteNotification(id: ID!): Boolean!

    # Notification template management (admin only)
    createNotificationTemplate(input: CreateNotificationTemplateInput!): NotificationTemplate!
    updateNotificationTemplate(id: ID!, input: UpdateNotificationTemplateInput!): NotificationTemplate!
    deleteNotificationTemplate(id: ID!): Boolean!
  }

  # Connection Types
  type NotificationsConnection {
    nodes: [Notification!]!
    pageInfo: PageInfo!
  }

  # Input Types
  input CreateNotificationTemplateInput {
    type: NotificationType!
    title: String!
    message: String!
    isActive: Boolean
  }

  input UpdateNotificationTemplateInput {
    title: String
    message: String
    isActive: Boolean
  }
`;
