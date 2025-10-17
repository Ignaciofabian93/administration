import gql from "graphql-tag";

export const sellerTypeDefs = gql`
  # Seller Types
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
    locale: String!
    sellerLevelId: Int
    timezone: String!
    # Relations
    city: City
    country: Country
    county: County
    region: Region
    sellerCategory: SellerCategory
    sellerLevel: SellerLevel
    preferences: SellerPreferences
    personProfile: PersonProfile
    businessProfile: BusinessProfile
    profile: Profile
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

  # Union Types
  union Profile = PersonProfile | BusinessProfile

  # Seller Input Types
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

  extend type Query {
    # Seller queries
    getSeller(id: ID!): Seller
    getMySeller: Seller
    getSellerPreferences(sellerId: String!): SellerPreferences
  }

  extend type Mutation {
    # Seller profile management
    updateSeller(input: UpdateSellerInput!): Seller!
    updatePersonProfile(input: UpdatePersonProfileInput!): PersonProfile!
    updateBusinessProfile(input: UpdateBusinessProfileInput!): BusinessProfile!
    updateSellerPreferences(input: UpdateSellerPreferencesInput!): SellerPreferences!
  }
`;
