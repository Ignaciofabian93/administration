import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type UserCategory {
    id: ID!
    name: String!
    categoryDiscountAmount: Int!
    pointsThreshold: Int!
  }

  type County {
    id: ID!
    county: String!
  }

  type City {
    id: ID!
    city: String!
  }

  type Region {
    id: ID!
    region: String!
  }

  type Country {
    id: ID!
    country: String!
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
    surnames: String
    email: String
    profileImage: String
    birthday: String
    businessName: String
    address: String
    county: County
    city: City
    region: Region
    country: Country
    phone: String
    isCompany: Boolean
    createdAt: String
    updatedAt: String
    userCategory: UserCategory
  }

  extend type Query {
    countries: [Country]
    regions(id: ID!): [Region]
    cities(id: ID!): [City]
    counties(id: ID!): [County]
    users: [User]
    user(id: ID!): User
    me(id: ID!): User
  }

  extend type Mutation {
    register(
      name: String!
      surnames: String!
      email: String!
      address: String
      countyId: Int
      cityId: Int
      regionId: Int
      countryId: Int
      phone: String
      password: String!
      isCompany: Boolean!
    ): User
    updatePassword(password: String!, newPassword: String!): User
    updateProfile(
      id: ID!
      name: String
      surnames: String
      email: String
      profileImage: String
      birthday: String
      businessName: String
      address: String
      countyId: Int
      cityId: Int
      regionId: Int
      countryId: Int
      phone: String
    ): User
  }
`;
