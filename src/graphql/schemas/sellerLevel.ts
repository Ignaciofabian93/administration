import gql from "graphql-tag";

export const sellerLevelTypeDefs = gql`
  # Category Types
  type SellerCategory {
    id: ID!
    name: String!
    categoryDiscountAmount: Int!
    pointsThreshold: Int!
    level: Int!
  }

  type SellerLevel {
    id: ID!
    levelName: String!
    minPoints: Int!
    maxPoints: Int
    benefits: JSON
    badgeIcon: String
    createdAt: DateTime!
    updatedAt: DateTime!
    sellers: [Seller!]!
  }
  # Seller Level Input Types
  input CreateSellerLevelInput {
    levelName: String!
    minPoints: Int!
    maxPoints: Int
    benefits: JSON
    badgeIcon: String
  }

  input UpdateSellerLevelInput {
    levelName: String
    minPoints: Int
    maxPoints: Int
    benefits: JSON
    badgeIcon: String
  }

  type SellerLevelsConnection {
    nodes: [SellerLevel!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    # Seller level queries
    getSellerLevels(page: Int = 1, pageSize: Int = 10): SellerLevelsConnection!
    getSellerLevel(id: ID!): SellerLevel
  }

  extend type Mutation {
    # Seller level management
    createSellerLevel(input: CreateSellerLevelInput!): SellerLevel!
    updateSellerLevel(id: ID!, input: UpdateSellerLevelInput!): SellerLevel!
    deleteSellerLevel(id: ID!): Boolean!
  }
`;
