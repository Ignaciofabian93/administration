import gql from "graphql-tag";

export const serviceTypeDefs = gql`
  # Service Types
  type ServiceCategory {
    id: ID!
    category: String!
    isActive: Boolean!
    serviceSubCategories: [ServiceSubCategory!]!
  }

  type ServiceSubCategory {
    id: ID!
    subCategory: String!
    serviceCategoryId: Int!
    serviceCategory: ServiceCategory!
    services: [Service!]!
  }

  type Service {
    id: ID!
    name: String!
    description: String
    sellerId: String!
    pricingType: ServicePricing!
    basePrice: Float
    priceRange: String
    duration: Int
    isActive: Boolean!
    images: [String!]!
    tags: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    subcategoryId: Int!
    serviceSubCategory: ServiceSubCategory!
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

  # Service Input Types
  input CreateServiceSubCategoryInput {
    subCategory: String!
    serviceCategoryId: Int!
  }

  input UpdateServiceSubCategoryInput {
    subCategory: String
    serviceCategoryId: Int
  }

  input UpdateServiceCategoryInput {
    category: String
    isActive: Boolean
  }

  input CreateServiceInput {
    name: String!
    description: String
    pricingType: ServicePricing!
    basePrice: Float
    priceRange: String
    duration: Int
    images: [String!]!
    tags: [String!]!
    subcategoryId: Int!
  }

  input UpdateServiceInput {
    name: String
    description: String
    pricingType: ServicePricing
    basePrice: Float
    priceRange: String
    duration: Int
    isActive: Boolean
    images: [String!]
    tags: [String!]
  }

  input CreateQuotationInput {
    serviceId: Int!
    clientId: String!
    title: String!
    description: String!
    estimatedPrice: Float
    estimatedDuration: Int
    clientNotes: String
    expiresAt: DateTime
  }

  input UpdateQuotationInput {
    estimatedPrice: Float
    finalPrice: Float
    estimatedDuration: Int
    status: QuotationStatus
    providerNotes: String
  }

  extend type Query {
    # Service category queries
    getServiceCategories: [ServiceCategory!]!
    getServiceCategory(id: ID!): ServiceCategory
    getServiceSubCategories(serviceCategoryId: Int): [ServiceSubCategory!]!
    getServiceSubCategory(id: ID!): ServiceSubCategory

    # Service queries
    getServices(sellerId: String, subcategoryId: Int, isActive: Boolean, page: Int = 1, pageSize: Int = 10): ServicesConnection!
    getService(id: ID!): Service

    # Quotation queries
    getQuotations(clientId: String, providerId: String, status: QuotationStatus, page: Int = 1, pageSize: Int = 10): QuotationsConnection!
    getQuotation(id: ID!): Quotation

    # Service review queries
    getServiceReviews(serviceId: Int!, page: Int = 1, pageSize: Int = 10): ServiceReviewsConnection!
  }

  extend type Mutation {
    # Service category management
    createServiceSubCategory(input: CreateServiceSubCategoryInput!): ServiceSubCategory!
    updateServiceSubCategory(id: ID!, input: UpdateServiceSubCategoryInput!): ServiceSubCategory!
    deleteServiceSubCategory(id: ID!): Boolean!
    updateServiceCategory(id: ID!, input: UpdateServiceCategoryInput!): ServiceCategory!

    # Service management
    createService(input: CreateServiceInput!): Service!
    updateService(id: ID!, input: UpdateServiceInput!): Service!
    deleteService(id: ID!): Boolean!

    # Quotation management
    createQuotation(input: CreateQuotationInput!): Quotation!
    updateQuotation(id: ID!, input: UpdateQuotationInput!): Quotation!
    acceptQuotation(id: ID!): Quotation!
    completeQuotation(id: ID!): Quotation!
    cancelQuotation(id: ID!): Quotation!

    # Service review management
    createServiceReview(serviceId: Int!, rating: Int!, comment: String): ServiceReview!
    deleteServiceReview(id: ID!): Boolean!
  }

  # Connection Types
  type ServicesConnection {
    nodes: [Service!]!
    pageInfo: PageInfo!
  }

  type QuotationsConnection {
    nodes: [Quotation!]!
    pageInfo: PageInfo!
  }

  type ServiceReviewsConnection {
    nodes: [ServiceReview!]!
    pageInfo: PageInfo!
  }
`;
