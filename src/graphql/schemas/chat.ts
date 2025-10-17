import gql from "graphql-tag";

export const chatTypeDefs = gql`
  # Chat and Message Types
  type Chat {
    id: ID!
    senderId: String!
    receiverId: String!
    productId: Int
    isExchange: Boolean!
    createdAt: DateTime!
    product: Product
    receiver: Seller!
    sender: Seller!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    chatId: Int!
    senderId: String!
    content: String!
    createdAt: DateTime!
    chat: Chat!
    sender: Seller!
  }

  extend type Query {
    # Chat queries
    getChat(id: ID!): Chat
    getMyChats(page: Int = 1, pageSize: Int = 10): ChatsConnection!
    getChatMessages(chatId: Int!, page: Int = 1, pageSize: Int = 20): MessagesConnection!
  }

  extend type Mutation {
    # Chat management
    createChat(input: CreateChatInput!): Chat!
    sendMessage(chatId: Int!, content: String!): Message!
    deleteChat(chatId: ID!): Boolean!
  }

  # Connection Types
  type ChatsConnection {
    nodes: [Chat!]!
    pageInfo: PageInfo!
  }

  type MessagesConnection {
    nodes: [Message!]!
    pageInfo: PageInfo!
  }

  # Input Types
  input CreateChatInput {
    receiverId: String!
    productId: Int
    isExchange: Boolean!
  }
`;
