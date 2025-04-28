import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type UserCategory {
    id: ID!
    name: String!
    categoryDiscountAmount: Int!
    pointsThreshold: Int!
  }

  type User @key(fields: "id") {
    id: ID
    name: String
    email: String
    address: String
    county: String
    city: String
    region: String
    phone: String
    isCompany: Boolean
    createdAt: String
    updatedAt: String
    userCategory: UserCategory
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    register(
      id: ID!
      name: String!
      email: String!
      address: String!
      county: String!
      city: String!
      region: String!
      phone: String!
      isCompany: Boolean!
    ): User
    updatePassword(password: String!, newPassword: String!): User
    updateProfile(
      id: ID!
      name: String!
      email: String!
      address: String!
      county: String!
      city: String!
      region: String!
      phone: String!
      isCompany: Boolean!
    ): User
  }
`;
