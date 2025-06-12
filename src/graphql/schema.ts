import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  enum AccountType {
    FREE
    PLUS
    PREMIUM
  }

  enum PreferredContactMethod {
    EMAIL
    WHATSAPP
    ALL
  }

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

  scalar DateTime

  type User @key(fields: "id") {
    id: ID!
    name: String!
    surnames: String
    email: String
    businessName: String
    profileImage: String
    birthday: String
    phone: String
    address: String
    isCompany: Boolean
    accountType: AccountType
    preferredContactMethod: PreferredContactMethod
    points: Int
    county: County
    city: City
    region: Region
    country: Country
    createdAt: DateTime!
    updatedAt: DateTime!
    userCategory: UserCategory
  }

  extend type Query {
    countries: [Country]
    regions(id: ID!): [Region]
    cities(id: ID!): [City]
    counties(id: ID!): [County]
    users: [User]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    register(
      name: String!
      surnames: String!
      businessName: String
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
      accountType: AccountType
      preferredContactMethod: PreferredContactMethod
      points: Int
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
