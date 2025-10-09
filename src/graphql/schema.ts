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

  enum BlogCategory {
    RECYCLING
    POLLUTION
    SUSTAINABILITY
    CIRCULAR_ECONOMY
    USED_PRODUCTS
    REUSE
    ENVIRONMENT
    UPCYCLING
    RESPONSIBLE_CONSUMPTION
    ECO_TIPS
    ENVIRONMENTAL_IMPACT
    SUSTAINABLE_LIVING
    OTHER
    SECURITY
  }

  enum ProductCondition {
    NEW
    OPEN_BOX
    LIKE_NEW
    FAIR
    POOR
    FOR_PARTS
    REFURBISHED
  }

  enum ExchangeStatus {
    PENDING
    ACCEPTED
    DECLINED
    COMPLETED
    CANCELLED
  }

  enum TransactionKind {
    PURCHASE
    EXCHANGE
    GIFT
    REFERRAL
    BONUS
  }

  enum ShippingStage {
    PREPARING
    SHIPPED
    DELIVERED
    RETURNED
    CANCELED
  }

  enum ServicePricing {
    FIXED
    QUOTATION
    HOURLY
    PACKAGE
  }

  enum QuotationStatus {
    PENDING
    ACCEPTED
    DECLINED
    COMPLETED
    CANCELLED
    EXPIRED
  }

  enum NotificationType {
    ORDER_RECEIVED
    ORDER_CONFIRMED
    ORDER_SHIPPED
    ORDER_DELIVERED
    ORDER_CANCELLED
    QUOTATION_REQUEST
    QUOTATION_RECEIVED
    QUOTATION_ACCEPTED
    QUOTATION_DECLINED
    EXCHANGE_PROPOSAL
    EXCHANGE_ACCEPTED
    EXCHANGE_DECLINED
    EXCHANGE_COMPLETED
    PAYMENT_RECEIVED
    PAYMENT_FAILED
    PAYMENT_REFUNDED
    REVIEW_RECEIVED
    MESSAGE_RECEIVED
    PRODUCT_LIKED
    PRODUCT_COMMENTED
    SYSTEM_ANNOUNCEMENT
    ACCOUNT_VERIFICATION
    PROFILE_UPDATED
  }

  enum NotificationPriority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  enum PaymentStatus {
    PENDING
    PROCESSING
    COMPLETED
    FAILED
    CANCELLED
    REFUNDED
    PARTIALLY_REFUNDED
    EXPIRED
  }

  enum RefundStatus {
    PENDING
    PROCESSING
    COMPLETED
    FAILED
    CANCELLED
  }

  enum PaymentEnvironment {
    SANDBOX
    PRODUCTION
  }

  enum ChileanPaymentProvider {
    KHIPU
    WEBPAY
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
    productId: Int!
    sellerId: String!
    product: Product!
    seller: Seller!
  }

  type ProductComment {
    id: ID!
    comment: String!
    productId: Int!
    sellerId: String!
    createdAt: DateTime!
    rating: Int
    product: Product!
    seller: Seller!
  }

  type Product {
    id: ID!
    sku: String
    barcode: String
    color: String
    brand: String!
    name: String!
    description: String!
    price: Int!
    images: [String!]!
    hasOffer: Boolean!
    offerPrice: Int!
    stock: Int!
    isExchangeable: Boolean!
    interests: [String!]!
    isActive: Boolean!
    ratings: Float!
    ratingCount: Int!
    reviewsNumber: Int!
    badges: [Badge!]!
    condition: ProductCondition!
    conditionDescription: String
    sustainabilityScore: Int
    materialComposition: String
    recycledContent: Float
    createdAt: DateTime!
    updatedAt: DateTime!
    productCategoryId: Int!
    sellerId: String!
    productCategory: ProductCategory!
    seller: Seller!
    comments: [ProductComment!]!
    likes: [ProductLike!]!
    productVariants: [ProductVariant!]!
    itemsOrdered: [OrderItem!]!
    chats: [Chat!]!
    exchangesOffered: [Exchange!]!
    exchangesRequested: [Exchange!]!
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

  # Blog Types
  type BlogPost {
    id: ID!
    title: String!
    content: String!
    authorId: String!
    isPublished: Boolean!
    publishedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    category: BlogCategory!
    author: Admin!
  }

  # Community Types
  type CommunityPost {
    id: ID!
    sellerId: String!
    content: String!
    images: [String!]!
    likes: Int!
    comments: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    commentsList: [CommunityComment!]!
    seller: Seller!
  }

  type CommunityComment {
    id: ID!
    communityPostId: Int!
    sellerId: String!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    communityPost: CommunityPost!
    seller: Seller!
  }

  # Service Types
  type ServiceCategory {
    id: ID!
    name: String!
    description: String
    icon: String
    isActive: Boolean!
  }

  type Service {
    id: ID!
    name: String!
    description: String
    sellerId: String!
    categoryId: Int!
    pricingType: ServicePricing!
    basePrice: Float
    priceRange: String
    duration: Int
    isActive: Boolean!
    images: [String!]!
    tags: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    category: ServiceCategory!
    seller: Seller!
    quotations: [Quotation!]!
    reviews: [ServiceReview!]!
  }

  type ServiceReview {
    id: ID!
    serviceId: Int!
    reviewerId: String!
    rating: Int!
    comment: String
    createdAt: DateTime!
    reviewer: Seller!
    service: Service!
  }

  type Quotation {
    id: ID!
    serviceId: Int!
    clientId: String!
    providerId: String!
    title: String!
    description: String!
    estimatedPrice: Float
    finalPrice: Float
    estimatedDuration: Int
    status: QuotationStatus!
    clientNotes: String
    providerNotes: String
    attachments: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    expiresAt: DateTime
    acceptedAt: DateTime
    completedAt: DateTime
    client: Seller!
    provider: Seller!
    service: Service!
  }

  # Order and Transaction Types
  type Order {
    id: ID!
    sellerId: String!
    createdAt: DateTime!
    shippingStatusId: Int!
    seller: Seller!
    shippingStatus: ShippingStatus!
    orderItems: [OrderItem!]!
    payments: [Payment!]!
  }

  type OrderItem {
    id: ID!
    orderId: Int!
    productId: Int!
    quantity: Int!
    order: Order!
    product: Product!
  }

  type ShippingStatus {
    id: ID!
    status: ShippingStage!
    orders: [Order!]!
  }

  type Transaction {
    id: ID!
    kind: TransactionKind!
    pointsCollected: Int!
    createdAt: DateTime!
    sellerId: String!
    seller: Seller!
    exchange: Exchange
  }

  type Exchange {
    id: ID!
    transactionId: Int!
    offeredProductId: Int!
    requestedProductId: Int!
    status: ExchangeStatus!
    notes: String
    createdAt: DateTime!
    completedAt: DateTime
    offeredProduct: Product!
    requestedProduct: Product!
    transaction: Transaction!
  }

  # Payment Types
  type Payment {
    id: ID!
    orderId: Int
    quotationId: Int
    amount: Float!
    currency: String!
    status: PaymentStatus!
    paymentProvider: ChileanPaymentProvider!
    externalId: String
    externalToken: String
    description: String
    fees: Float
    netAmount: Float
    payerId: String!
    receiverId: String!
    failureReason: String
    metadata: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
    processedAt: DateTime
    refundedAt: DateTime
    chileanConfigId: Int!
    chileanConfig: ChileanPaymentConfig!
    order: Order
    payer: Seller!
    quotation: Quotation
    receiver: Seller!
    refunds: [PaymentRefund!]!
    transactions: [PaymentTransaction!]!
    webhooks: [PaymentWebhook!]!
  }

  type PaymentRefund {
    id: ID!
    paymentId: Int!
    amount: Float!
    reason: String!
    status: RefundStatus!
    externalId: String
    createdAt: DateTime!
    processedAt: DateTime
    payment: Payment!
  }

  type PaymentTransaction {
    id: ID!
    paymentId: Int!
    action: String!
    amount: Float
    status: String!
    description: String
    metadata: JSON
    createdAt: DateTime!
    createdBy: String
    payment: Payment!
  }

  type PaymentWebhook {
    id: ID!
    paymentId: Int
    provider: ChileanPaymentProvider!
    eventType: String!
    externalId: String!
    payload: JSON!
    processed: Boolean!
    processingError: String
    createdAt: DateTime!
    processedAt: DateTime
    payment: Payment
  }

  type ChileanPaymentConfig {
    id: ID!
    sellerId: String!
    provider: ChileanPaymentProvider!
    merchantId: String
    apiKey: String
    secretKey: String
    environment: PaymentEnvironment!
    isActive: Boolean!
    webhookUrl: String
    returnUrl: String
    cancelUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    seller: Seller!
    payments: [Payment!]!
  }

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

  # Additional Product Types
  type ProductVariant {
    id: ID!
    productId: Int!
    name: String!
    price: Int!
    stock: Int!
    color: String
    size: String
    createdAt: DateTime!
    updatedAt: DateTime!
    product: Product!
  }

  # Match and Story Types
  type Match {
    id: ID!
    senderId: String!
    receiverId: String!
    createdAt: DateTime!
    isMatched: Boolean!
    receiver: Seller!
    sender: Seller!
  }

  type Story {
    id: ID!
    images: [String!]!
    title: String!
    description: String!
    sellerId: String!
    seller: Seller!
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

  # Blog Post Input Types
  input CreateBlogPostInput {
    title: String!
    content: String!
    category: BlogCategory!
    isPublished: Boolean
  }

  input UpdateBlogPostInput {
    title: String
    content: String
    tags: [String!]
    category: BlogCategory
    isPublished: Boolean
  }

  # Department Input Types
  input CreateDepartmentInput {
    departmentName: String!
    departmentImage: String
  }

  input UpdateDepartmentInput {
    departmentName: String
    departmentImage: String
  }

  input CreateDepartmentCategoryInput {
    departmentId: Int!
    departmentCategoryName: String!
  }

  input UpdateDepartmentCategoryInput {
    departmentCategoryName: String
  }

  input CreateProductCategoryInput {
    departmentCategoryId: Int!
    productCategoryName: String!
    keywords: [String!]
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
  }

  input UpdateProductCategoryInput {
    productCategoryName: String
    keywords: [String!]
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
  }

  # Material Impact Input Types
  input CreateMaterialImpactEstimateInput {
    materialType: String!
    estimatedCo2SavingsKG: Float!
    estimatedWaterSavingsLT: Float!
  }

  input UpdateMaterialImpactEstimateInput {
    materialType: String
    estimatedCo2SavingsKG: Float
    estimatedWaterSavingsLT: Float
  }

  input CreateCo2ImpactMessageInput {
    min: Float!
    max: Float!
    message1: String!
    message2: String!
    message3: String!
  }

  input UpdateCo2ImpactMessageInput {
    min: Float
    max: Float
    message1: String
    message2: String
    message3: String
  }

  input CreateWaterImpactMessageInput {
    min: Float!
    max: Float!
    message1: String!
    message2: String!
    message3: String!
  }

  input UpdateWaterImpactMessageInput {
    min: Float
    max: Float
    message1: String
    message2: String
    message3: String
  }

  # Location Input Types
  input CreateCountryInput {
    country: String!
  }

  input UpdateCountryInput {
    country: String!
  }

  input CreateRegionInput {
    region: String!
    countryId: Int!
  }

  input UpdateRegionInput {
    region: String
    countryId: Int
  }

  input CreateCityInput {
    city: String!
    regionId: Int!
  }

  input UpdateCityInput {
    city: String
    regionId: Int
  }

  input CreateCountyInput {
    county: String!
    cityId: Int!
  }

  input UpdateCountyInput {
    county: String
    cityId: Int
  }

  # Community Post Input Types
  input CreateCommunityPostInput {
    content: String!
    images: [String!]
  }

  input UpdateCommunityPostInput {
    content: String
    images: [String!]
  }

  input CreateCommunityCommentInput {
    communityPostId: Int!
    content: String!
  }

  input UpdateCommunityCommentInput {
    content: String!
  }

  # Product Input Types
  input UpdateProductInput {
    name: String
    description: String
    price: Int
    hasOffer: Boolean
    offerPrice: Int
    stock: Int
    brand: String
    color: String
    images: [String!]
    interests: [String!]
    isActive: Boolean
    isExchangeable: Boolean
    productCategoryId: Int
    condition: ProductCondition
    conditionDescription: String
    sustainabilityScore: Int
    materialComposition: String
    recycledContent: Float
    barcode: String
    sku: String
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
    getCountries(limit: Int, offset: Int): [Country!]!
    getRegions(limit: Int, offset: Int): [Region!]!
    getRegionsByCountry(countryId: ID!): [Region!]!
    getCities(limit: Int, offset: Int): [City!]!
    getCitiesByRegion(regionId: ID!): [City!]!
    getCounties(limit: Int, offset: Int): [County!]!
    getCountiesByCity(cityId: ID!): [County!]!

    # Admin queries
    getAdmins(adminType: AdminType, role: AdminRole, isActive: Boolean, limit: Int, offset: Int): [Admin!]!
    getAdmin(id: ID!): Admin
    getMyData: Admin

    # Blog post queries
    getBlogPosts(category: BlogCategory, isPublished: Boolean, limit: Int, offset: Int): [BlogPost!]!
    getBlogPost(id: ID!): BlogPost
    getBlogPostsByAuthor(authorId: ID!, limit: Int, offset: Int): [BlogPost!]!

    # Product queries
    getProducts(sellerId: String, categoryId: Int, isActive: Boolean, limit: Int, offset: Int): [Product!]!
    getProduct(id: ID!): Product
    getProductsByCategory(categoryId: Int!, limit: Int, offset: Int): [Product!]!

    # Department queries
    getDepartments: [Department!]!
    getDepartment(id: ID!): Department
    getDepartmentCategories(departmentId: Int): [DepartmentCategory!]!
    getDepartmentCategory(id: ID!): DepartmentCategory
    getProductCategories(departmentCategoryId: Int): [ProductCategory!]!
    getProductCategory(id: ID!): ProductCategory

    # Material Impact queries
    getMaterialImpactEstimates(limit: Int, offset: Int): [MaterialImpactEstimate!]!
    getMaterialImpactEstimate(id: ID!): MaterialImpactEstimate
    getCo2ImpactMessages(limit: Int, offset: Int): [Co2ImpactMessage!]!
    getCo2ImpactMessage(id: ID!): Co2ImpactMessage
    getWaterImpactMessages(limit: Int, offset: Int): [WaterImpactMessage!]!
    getWaterImpactMessage(id: ID!): WaterImpactMessage

    # Community queries
    getCommunityPosts(sellerId: String, limit: Int, offset: Int): [CommunityPost!]!
    getCommunityPost(id: ID!): CommunityPost
    getCommunityComments(communityPostId: Int!, limit: Int, offset: Int): [CommunityComment!]!
    getCommunityComment(id: ID!): CommunityComment

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
    updateAdmin(adminId: ID!, input: UpdateAdminInput!): Admin!
    deleteAdmin(adminId: ID!): Boolean!

    # Blog post management
    createBlogPost(input: CreateBlogPostInput!): BlogPost!
    updateBlogPost(id: ID!, input: UpdateBlogPostInput!): BlogPost!
    deleteBlogPost(id: ID!): Boolean!
    publishBlogPost(id: ID!): BlogPost!
    unpublishBlogPost(id: ID!): BlogPost!

    # Product management
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    approveProduct(id: ID!): Product!
    rejectProduct(id: ID!, reason: String): Product!

    # Department management
    createDepartment(input: CreateDepartmentInput!): Department!
    updateDepartment(id: ID!, input: UpdateDepartmentInput!): Department!
    deleteDepartment(id: ID!): Boolean!

    # Department Category management
    createDepartmentCategory(input: CreateDepartmentCategoryInput!): DepartmentCategory!
    updateDepartmentCategory(id: ID!, input: UpdateDepartmentCategoryInput!): DepartmentCategory!
    deleteDepartmentCategory(id: ID!): Boolean!

    # Product Category management
    createProductCategory(input: CreateProductCategoryInput!): ProductCategory!
    updateProductCategory(id: ID!, input: UpdateProductCategoryInput!): ProductCategory!
    deleteProductCategory(id: ID!): Boolean!

    # Material Impact management
    createMaterialImpactEstimate(input: CreateMaterialImpactEstimateInput!): MaterialImpactEstimate!
    updateMaterialImpactEstimate(id: ID!, input: UpdateMaterialImpactEstimateInput!): MaterialImpactEstimate!
    deleteMaterialImpactEstimate(id: ID!): Boolean!

    # Co2 Impact Message management
    createCo2ImpactMessage(input: CreateCo2ImpactMessageInput!): Co2ImpactMessage!
    updateCo2ImpactMessage(id: ID!, input: UpdateCo2ImpactMessageInput!): Co2ImpactMessage!
    deleteCo2ImpactMessage(id: ID!): Boolean!

    # Water Impact Message management
    createWaterImpactMessage(input: CreateWaterImpactMessageInput!): WaterImpactMessage!
    updateWaterImpactMessage(id: ID!, input: UpdateWaterImpactMessageInput!): WaterImpactMessage!
    deleteWaterImpactMessage(id: ID!): Boolean!

    # Location management
    createCountry(input: CreateCountryInput!): Country!
    updateCountry(id: ID!, input: UpdateCountryInput!): Country!
    deleteCountry(id: ID!): Boolean!

    createRegion(input: CreateRegionInput!): Region!
    updateRegion(id: ID!, input: UpdateRegionInput!): Region!
    deleteRegion(id: ID!): Boolean!

    createCity(input: CreateCityInput!): City!
    updateCity(id: ID!, input: UpdateCityInput!): City!
    deleteCity(id: ID!): Boolean!

    createCounty(input: CreateCountyInput!): County!
    updateCounty(id: ID!, input: UpdateCountyInput!): County!
    deleteCounty(id: ID!): Boolean!

    # Community post management
    createCommunityPost(input: CreateCommunityPostInput!): CommunityPost!
    updateCommunityPost(id: ID!, input: UpdateCommunityPostInput!): CommunityPost!
    deleteCommunityPost(id: ID!): Boolean!

    # Community comment management
    createCommunityComment(input: CreateCommunityCommentInput!): CommunityComment!
    updateCommunityComment(id: ID!, input: UpdateCommunityCommentInput!): CommunityComment!
    deleteCommunityComment(id: ID!): Boolean!
  }
`;
