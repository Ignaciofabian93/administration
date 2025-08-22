import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  enum AccountType {
    FREE
    PLUS
    PREMIUM
  }

  enum ContactMethod {
    EMAIL
    WHATSAPP
    ALL
  }

  enum SellerType {
    PERSON
    STORE
  }

  type UserCategory {
    id: ID!
    name: String!
    categoryDiscountAmount: Int!
    pointsThreshold: Int!
    level: Int!
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

  type PersonProfile {
    id: ID!
    sellerId: String!
    firstName: String!
    lastName: String
    displayName: String
    bio: String
    birthday: DateTime
    profileImage: String
    coverImage: String
    allowExchanges: Boolean!
  }

  type StoreProfile {
    id: ID!
    sellerId: String!
    businessName: String!
    displayName: String
    description: String
    logo: String
    coverImage: String
    businessType: String
    taxId: String
    businessRegistration: String
    allowExchanges: Boolean!
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
    businessHours: JSON
  }

  type Session {
    id: ID!
    token: String!
    createdAt: DateTime!
    expiresAt: DateTime!
    sellerId: String!
  }

  scalar DateTime
  scalar JSON

  union Profile = PersonProfile | StoreProfile

  type User @key(fields: "id") {
    id: ID!
    email: String!
    sellerType: SellerType!
    isActive: Boolean!
    isVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    address: String
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    socialMediaLinks: JSON
    accountType: AccountType!
    points: Int!
    county: County
    city: City
    region: Region
    country: Country
    userCategory: UserCategory
    profile: Profile
  }

  input RegisterPersonInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String
    displayName: String
    bio: String
    birthday: DateTime
    address: String
    cityId: Int
    countyId: Int
    regionId: Int
    countryId: Int
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    allowExchanges: Boolean
  }

  input RegisterStoreInput {
    email: String!
    password: String!
    businessName: String!
    displayName: String
    description: String
    businessType: String
    taxId: String
    businessRegistration: String
    address: String
    cityId: Int
    countyId: Int
    regionId: Int
    countryId: Int
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    allowExchanges: Boolean
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
  }

  input UpdatePersonProfileInput {
    firstName: String
    lastName: String
    displayName: String
    bio: String
    birthday: DateTime
    profileImage: String
    coverImage: String
    allowExchanges: Boolean
  }

  input UpdateStoreProfileInput {
    businessName: String
    displayName: String
    description: String
    logo: String
    coverImage: String
    businessType: String
    taxId: String
    businessRegistration: String
    allowExchanges: Boolean
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
    businessHours: JSON
  }

  input UpdateUserInput {
    email: String
    address: String
    cityId: Int
    countyId: Int
    regionId: Int
    countryId: Int
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    socialMediaLinks: JSON
    accountType: AccountType
  }

  extend type Query {
    # Location queries
    countries: [Country!]!
    regions(countryId: ID!): [Region!]!
    cities(regionId: ID!): [City!]!
    counties(cityId: ID!): [County!]!

    # User queries
    users(sellerType: SellerType, isActive: Boolean, isVerified: Boolean, limit: Int, offset: Int): [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
    me: User

    # Store-specific queries
    stores(isActive: Boolean, isVerified: Boolean, limit: Int, offset: Int): [User!]!
    storeCatalog: [User!]!

    # Categories
    userCategories: [UserCategory!]!
    userCategory(id: ID!): UserCategory

    # Sessions
    mySessions: [Session!]!
  }

  extend type Mutation {
    # Registration
    registerPerson(input: RegisterPersonInput!): User!
    registerStore(input: RegisterStoreInput!): User!

    # Authentication
    login(email: String!, password: String!): String!
    logout: Boolean!
    logoutAllSessions: Boolean!
    refreshToken: String!

    # Password management
    updatePassword(currentPassword: String!, newPassword: String!): User!
    requestPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, newPassword: String!): User!

    # Profile updates
    updateUser(input: UpdateUserInput!): User!
    updatePersonProfile(input: UpdatePersonProfileInput!): User!
    updateStoreProfile(input: UpdateStoreProfileInput!): User!

    # Account management
    verifyAccount(token: String!): User!
    resendVerificationEmail: Boolean!
    deactivateAccount: User!
    reactivateAccount: User!
    deleteAccount(password: String!): Boolean!

    # Points and category management
    addPoints(userId: ID!, points: Int!): User!
    deductPoints(userId: ID!, points: Int!): User!
    updateUserCategory(userId: ID!, categoryId: ID!): User!

    # Admin mutations
    adminCreateUser(email: String!, sellerType: SellerType!, isVerified: Boolean): User!
    adminUpdateUser(
      userId: ID!
      isActive: Boolean
      isVerified: Boolean
      accountType: AccountType
      points: Int
      userCategoryId: Int
    ): User!
    adminDeleteUser(userId: ID!): Boolean!
  }
`;
