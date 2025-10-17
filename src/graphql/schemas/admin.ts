import gql from "graphql-tag";

export const adminTypeDefs = gql`
  # Admin Types
  type Admin {
    id: ID!
    email: String!
    password: String!
    name: String!
    lastName: String
    adminType: AdminType!
    role: AdminRole!
    permissions: [AdminPermission!]!
    sellerId: String
    isActive: Boolean!
    isEmailVerified: Boolean!
    accountLocked: Boolean!
    loginAttempts: Int!
    lastLoginAt: DateTime
    lastLoginIp: String
    createdAt: DateTime!
    updatedAt: DateTime!
    cityId: Int
    countryId: Int
    countyId: Int
    regionId: Int
    # Relations
    city: City
    country: Country
    county: County
    region: Region
    seller: Seller
    activityLogs: [AdminActivityLog!]!
  }

  type AdminActivityLog {
    id: ID!
    adminId: String!
    action: String!
    entityType: String
    entityId: String
    changes: JSON
    ipAddress: String
    userAgent: String
    metadata: JSON
    createdAt: DateTime!
  }

  # Connection Type
  type AdminsConnection {
    nodes: [Admin!]!
    pageInfo: PageInfo!
  }

  # Input Types
  input RegisterAdminInput {
    email: String!
    name: String!
    password: String!
    lastName: String
    role: AdminRole!
    adminType: AdminType
    permissions: [AdminPermission!]
    sellerId: String
    cityId: Int
    countryId: Int
    countyId: Int
    regionId: Int
  }

  input CreateAdminInput {
    email: String!
    password: String!
    name: String!
    lastName: String
    adminType: AdminType!
    role: AdminRole!
    permissions: [AdminPermission!]
  }

  input UpdateAdminInput {
    name: String
    lastName: String
    role: AdminRole
    permissions: [AdminPermission!]
    isActive: Boolean
    cityId: Int
    countryId: Int
    countyId: Int
    regionId: Int
  }

  extend type Query {
    # Admin queries with pagination
    getAdmins(adminType: AdminType, role: AdminRole, isActive: Boolean, page: Int = 1, pageSize: Int = 10): AdminsConnection!
    getAdmin(id: ID!): Admin
    getMyData: Admin
    getAdminActivityLogs(adminId: String!, page: Int = 1, pageSize: Int = 10): AdminActivityLogsConnection!
  }

  extend type Mutation {
    # Admin management (super admin only)
    createAdmin(input: RegisterAdminInput!): Admin!
    updateAdmin(adminId: ID!, input: UpdateAdminInput!): Admin!
    deleteAdmin(adminId: ID!): Boolean!
    lockAdminAccount(adminId: ID!): Admin!
    unlockAdminAccount(adminId: ID!): Admin!
  }

  # Connection Type for Activity Logs
  type AdminActivityLogsConnection {
    nodes: [AdminActivityLog!]!
    pageInfo: PageInfo!
  }
`;
