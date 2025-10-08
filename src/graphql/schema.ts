import gql from "graphql-tag";

export const typeDefs = gql`
  # Admin Related Enums
  enum AdminRole {
    SUPER_ADMIN
    MODERATOR
    CONTENT_MANAGER
    SUPPORT
    BUSINESS_OWNER
    BUSINESS_MANAGER
    BUSINESS_ANALYST
    BUSINESS_SUPPORT
  }

  enum AdminPermission {
    MANAGE_PRODUCTS
    APPROVE_PRODUCTS
    DELETE_PRODUCTS
    WRITE_BLOG
    PUBLISH_BLOG
    DELETE_BLOG
    MODERATE_CONTENT
    MANAGE_USERS
    BAN_USERS
    VIEW_USER_DATA
    MANAGE_ORDERS
    PROCESS_REFUNDS
    VIEW_TRANSACTIONS
    VIEW_ANALYTICS
    EXPORT_DATA
    MANAGE_ADMINS
    MANAGE_CATEGORIES
    MANAGE_SETTINGS
    VIEW_SYSTEM_LOGS
    MANAGE_BUSINESS_PROFILE
    MANAGE_BUSINESS_TEAM
    VIEW_BUSINESS_ANALYTICS
    MANAGE_BUSINESS_PRODUCTS
    MANAGE_BUSINESS_ORDERS
  }

  enum AdminType {
    PLATFORM
    BUSINESS
  }

  # Account and User Related Enums
  enum AccountType {
    FREE
    PLUS
    PREMIUM
  }

  enum SellerType {
    PERSON
    STARTUP
    COMPANY
  }

  enum ContactMethod {
    EMAIL
    WHATSAPP
    PHONE
    INSTAGRAM
    FACEBOOK
    WEBSITE
    TIKTOK
  }

  # Business Related Enums
  enum BusinessType {
    RETAIL
    SERVICES
    MIXED
  }

  enum BusinessFormalizationStatus {
    NOT_REQUIRED
    PENDING
    IN_PROGRESS
    FORMALIZED
  }

  enum Badge {
    POPULAR
    DISCOUNTED
    WOMAN_OWNED
    ECO_FRIENDLY
    BEST_SELLER
    TOP_RATED
    COMMUNITY_FAVORITE
    LIMITED_TIME_OFFER
    FLASH_SALE
    BEST_VALUE
    HANDMADE
    SUSTAINABLE
    SUPPORTS_CAUSE
    FAMILY_BUSINESS
    CHARITY_SUPPORT
    LIMITED_STOCK
    SEASONAL
    FREE_SHIPPING
    NEW
    USED
    SLIGHT_DAMAGE
    WORN
    FOR_REPAIR
    REFURBISHED
    EXCHANGEABLE
    LAST_PRICE
    FOR_GIFT
    OPEN_TO_OFFERS
    OPEN_BOX
    CRUELTY_FREE
    DELIVERED_TO_HOME
    IN_HOUSE_PICKUP
    IN_MID_POINT_PICKUP
  }

  enum ProductSize {
    XS
    S
    M
    L
    XL
  }

  enum WeightUnit {
    KG
    LB
    OZ
    G
  }

  type ProductLike {
    id: ID!
    userId: String!
    user: Seller # Add federated user reference for likes
  }

  type ProductComment {
    id: ID!
    comment: String!
    userId: String!
    user: Seller # Federated user reference
  }

  type Product {
    id: ID!
    sku: String
    barcode: String
    color: String
    brand: String
    name: String!
    description: String!
    price: Int!
    images: [String]
    hasOffer: Boolean
    offerPrice: Int
    stock: Int!
    isExchangeable: Boolean
    interests: [String]
    isActive: Boolean
    ratings: Float
    ratingCount: Int
    reviewsNumber: Int
    badges: [Badge]
    createdAt: DateTime!
    updatedAt: DateTime!
    productCategoryId: Int!
    productCategory: ProductCategory
    userId: String!
    user: Seller # Federated user reference
    comments: [ProductComment]
    likes: [ProductLike]
  }

  type Co2ImpactMessage {
    id: ID!
    min: Float
    max: Float
    message1: String
    message2: String
    message3: String
  }

  type WaterImpactMessage {
    id: ID!
    min: Float
    max: Float
    message1: String
    message2: String
    message3: String
  }

  type MaterialImpactEstimate {
    id: ID!
    materialType: String!
    estimatedCo2SavingsKG: Float
    estimatedWaterSavingsLT: Float
    firstMaterialTypeFor: [ProductCategory]
    secondMaterialTypeFor: [ProductCategory]
    thirdMaterialTypeFor: [ProductCategory]
    fourthMaterialTypeFor: [ProductCategory]
    fifthMaterialTypeFor: [ProductCategory]
  }

  type ProductCategory {
    id: ID!
    productCategoryName: String!
    departmentCategoryId: Int!
    departmentCategory: DepartmentCategory
    keywords: [String]
    averageWeight: Float
    firstMaterialTypeId: Int
    firstMaterialTypeQuantity: Float
    secondMaterialTypeId: Int
    secondMaterialTypeQuantity: Float
    thirdMaterialTypeId: Int
    thirdMaterialTypeQuantity: Float
    fourthMaterialTypeId: Int
    fourthMaterialTypeQuantity: Float
    fifthMaterialTypeId: Int
    fifthMaterialTypeQuantity: Float
    size: ProductSize
    weightUnit: WeightUnit
    products: [Product]
    firstMaterialType: MaterialImpactEstimate
    secondMaterialType: MaterialImpactEstimate
    thirdMaterialType: MaterialImpactEstimate
    fourthMaterialType: MaterialImpactEstimate
    fifthMaterialType: MaterialImpactEstimate
  }

  type DepartmentCategory {
    id: ID!
    departmentCategoryName: String!
    departmentId: Int!
    department: Department
    productCategories: [ProductCategory]
  }

  type Department {
    id: ID!
    departmentName: String!
    departmentImage: String
    departmentCategories: [DepartmentCategory]
  }

  # Location Types
  type Country {
    id: ID!
    country: String!
  }

  type Region {
    id: ID!
    region: String!
    countryId: Int!
  }

  type City {
    id: ID!
    city: String!
    regionId: Int!
  }

  type County {
    id: ID!
    county: String!
    cityId: Int!
  }

  # Category Types
  type SellerCategory {
    id: ID!
    name: String!
    categoryDiscountAmount: Int!
    pointsThreshold: Int!
    level: Int!
  }

  type SellerPreferences {
    id: ID!
    sellerId: String!
    preferredLanguage: String
    currency: String
    emailNotifications: Boolean!
    pushNotifications: Boolean!
    orderUpdates: Boolean!
    communityUpdates: Boolean!
    securityAlerts: Boolean!
    weeklySummary: Boolean!
    twoFactorAuth: Boolean!
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

  # Profile Types
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

  type BusinessProfile {
    id: ID!
    sellerId: String!
    businessName: String!
    displayName: String
    description: String
    logo: String
    coverImage: String
    businessType: BusinessType!
    legalBusinessName: String
    taxId: String
    businessActivity: String
    businessStartDate: DateTime
    legalRepresentative: String
    legalRepresentativeTaxId: String
    formalizationStatus: BusinessFormalizationStatus!
    formalizationDeadline: DateTime
    formalizationNotes: String
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
    serviceArea: String
    yearsOfExperience: Int
    licenseNumber: String
    insuranceInfo: String
    certifications: [String!]!
    emergencyService: Boolean!
    travelRadius: Int
    businessHours: JSON
    taxDocuments: [String!]!
    verificationDocuments: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Session Type
  type Session {
    id: ID!
    token: String!
    createdAt: DateTime!
    expiresAt: DateTime!
    sellerId: String!
  }

  # Scalars
  scalar DateTime
  scalar JSON

  # Union Types
  union Profile = PersonProfile | BusinessProfile

  # Main Entity Types
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

  type Seller {
    id: ID!
    email: String!
    password: String!
    sellerType: SellerType!
    isActive: Boolean!
    isVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    address: String
    cityId: Int
    countryId: Int
    countyId: Int
    regionId: Int
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    socialMediaLinks: JSON
    accountType: AccountType
    points: Int
    sellerCategoryId: Int
    # Relations
    city: City
    country: Country
    county: County
    region: Region
    sellerCategory: SellerCategory
    preferences: SellerPreferences
    personProfile: PersonProfile
    businessProfile: BusinessProfile
    profile: Profile
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

  input RegisterBusinessInput {
    email: String!
    password: String!
    businessName: String!
    displayName: String
    description: String
    businessType: BusinessType!
    legalBusinessName: String
    taxId: String
    businessActivity: String
    address: String
    cityId: Int
    countyId: Int
    regionId: Int
    countryId: Int
    phone: String
    website: String
    preferredContactMethod: ContactMethod
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
    serviceArea: String
    yearsOfExperience: Int
    licenseNumber: String
    insuranceInfo: String
    certifications: [String!]
    emergencyService: Boolean
    travelRadius: Int
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

  input UpdateBusinessProfileInput {
    businessName: String
    displayName: String
    description: String
    logo: String
    coverImage: String
    businessType: BusinessType
    legalBusinessName: String
    taxId: String
    businessActivity: String
    businessStartDate: DateTime
    legalRepresentative: String
    legalRepresentativeTaxId: String
    formalizationStatus: BusinessFormalizationStatus
    formalizationDeadline: DateTime
    formalizationNotes: String
    minOrderAmount: Int
    shippingPolicy: String
    returnPolicy: String
    serviceArea: String
    yearsOfExperience: Int
    licenseNumber: String
    insuranceInfo: String
    certifications: [String!]
    emergencyService: Boolean
    travelRadius: Int
    businessHours: JSON
  }

  input UpdateSellerInput {
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

  input UpdateSellerPreferencesInput {
    preferredLanguage: String
    currency: String
    emailNotifications: Boolean
    pushNotifications: Boolean
    orderUpdates: Boolean
    communityUpdates: Boolean
    securityAlerts: Boolean
    weeklySummary: Boolean
    twoFactorAuth: Boolean
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

  type Query {
    # PLATFORM ADMIN QUERIES
    # Location queries
    getCountries: [Country!]!
    getRegions(countryId: ID!): [Region!]!
    getRegionsByCountry(countryId: ID!): [Region!]!
    getCities(regionId: ID!): [City!]!
    getCitiesByRegion(regionId: ID!): [City!]!
    getCounties(cityId: ID!): [County!]!
    getCountiesByCity(cityId: ID!): [County!]!

    # Department - Product queries
    getDepartments: [Department!]!

    # Seller/User queries

    # Admin queries
    getAdmins(adminType: AdminType, role: AdminRole, isActive: Boolean, limit: Int, offset: Int): [Admin!]!
    getAdmin(id: ID!): Admin
    getMyData: Admin

    createAdmin(input: CreateAdminInput!): Admin

    # BUSINESS ADMIN QUERIES
  }

  type Mutation {
    # Password management
    updatePassword(currentPassword: String!, newPassword: String!): Seller!
    requestPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, newPassword: String!): Seller!

    # Admin management (super admin only)
    createAdmin(input: RegisterAdminInput!): Admin!
    updateAdmin(adminId: ID!, name: String, lastName: String, role: AdminRole, permissions: [AdminPermission!], isActive: Boolean): Admin!
    deleteAdmin(adminId: ID!): Boolean!
  }
`;
