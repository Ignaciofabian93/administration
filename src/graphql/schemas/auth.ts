import gql from "graphql-tag";

export const authTypeDefs = gql`
  # Session Type
  type Session {
    id: ID!
    token: String!
    createdAt: DateTime!
    expiresAt: DateTime!
    sellerId: String!
  }

  extend type Mutation {
    # Password management
    updatePassword(currentPassword: String!, newPassword: String!): Admin!
    requestPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, newPassword: String!): Admin!
  }
`;
