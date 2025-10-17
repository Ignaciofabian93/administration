import gql from "graphql-tag";

export const storeTypeDefs = gql`
  type StoreCategory {
    id: ID!
    category: String!
    storeSubCategories: [StoreSubCategory!]!
  }

  type StoreSubCategory {
    id: ID!
    subCategory: String!
    storeCategoryId: Int!
    storeCategory: StoreCategory!
    storeProducts: [StoreProduct!]!
  }

  type StoreProduct {
    id: ID!
    name: String!
    description: String!
    stock: Int!
    barcode: String
    sku: String
    price: Int!
    hasOffer: Boolean!
    offerPrice: Int
    sellerId: String!
    createdAt: DateTime!
    images: [String!]!
    isActive: Boolean!
    updatedAt: DateTime!
    badges: [Badge!]!
    brand: String
    color: String
    ratingCount: Int!
    ratings: Float!
    reviewsNumber: Int!
    materialComposition: String
    recycledContent: Float
    subcategoryId: Int!
    deletedAt: DateTime
    sustainabilityScore: Int
    carbonFootprint: Float
    productVariants: [ProductVariant!]!
    seller: Seller!
    storeSubCategory: StoreSubCategory!
    storeProductMaterials: [StoreProductMaterial!]!
  }

  # Additional Product Types
  type ProductVariant {
    id: ID!
    name: String!
    price: Int!
    stock: Int!
    color: String
    size: String
    createdAt: DateTime!
    updatedAt: DateTime!
    storeProductId: Int!
    storeProduct: StoreProduct!
  }

  type StoreProductMaterial {
    id: ID!
    storeProductId: Int!
    materialTypeId: Int!
    quantity: Float!
    unit: String!
    isPrimary: Boolean!
    sourceMaterial: String
    isRecycled: Boolean!
    recycledPercentage: Float
    supplierVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    materialImpactEstimate: MaterialImpactEstimate!
    storeProduct: StoreProduct!
  }

  type StoreProductsConnection {
    nodes: [StoreProduct!]!
    pageInfo: PageInfo!
  }

  type StoreProductMaterialsConnection {
    nodes: [StoreProductMaterial!]!
    pageInfo: PageInfo!
  }

  # Store Input Types
  input CreateStoreCategoryInput {
    category: String!
  }

  input UpdateStoreCategoryInput {
    category: String
  }

  input CreateStoreSubCategoryInput {
    subCategory: String!
    storeCategoryId: Int!
  }

  input UpdateStoreSubCategoryInput {
    subCategory: String
    storeCategoryId: Int
  }

  input CreateStoreProductInput {
    name: String!
    description: String!
    stock: Int!
    barcode: String
    sku: String
    price: Int!
    hasOffer: Boolean
    offerPrice: Int
    images: [String!]!
    badges: [Badge!]
    brand: String
    color: String
    materialComposition: String
    recycledContent: Float
    subcategoryId: Int!
    sustainabilityScore: Int
    carbonFootprint: Float
  }

  input UpdateStoreProductInput {
    name: String
    description: String
    stock: Int
    barcode: String
    sku: String
    price: Int
    hasOffer: Boolean
    offerPrice: Int
    images: [String!]
    isActive: Boolean
    badges: [Badge!]
    brand: String
    color: String
    materialComposition: String
    recycledContent: Float
    subcategoryId: Int
    sustainabilityScore: Int
    carbonFootprint: Float
  }

  input CreateStoreProductMaterialInput {
    storeProductId: Int!
    materialTypeId: Int!
    quantity: Float!
    unit: String
    isPrimary: Boolean
    sourceMaterial: String
    isRecycled: Boolean
    recycledPercentage: Float
    supplierVerified: Boolean
  }

  input UpdateStoreProductMaterialInput {
    quantity: Float
    unit: String
    isPrimary: Boolean
    sourceMaterial: String
    isRecycled: Boolean
    recycledPercentage: Float
    supplierVerified: Boolean
  }

  extend type Query {
    # Store queries with pagination
    getStoreCategories: [StoreCategory!]!
    getStoreCategory(id: ID!): StoreCategory
    getStoreSubCategories(storeCategoryId: Int): [StoreSubCategory!]!
    getStoreSubCategory(id: ID!): StoreSubCategory
    getStoreProducts(subcategoryId: Int, sellerId: String, isActive: Boolean, page: Int = 1, pageSize: Int = 10): StoreProductsConnection!
    getStoreProduct(id: ID!): StoreProduct
    getStoreProductMaterials(storeProductId: Int!, page: Int = 1, pageSize: Int = 10): StoreProductMaterialsConnection!
    getStoreProductMaterial(id: ID!): StoreProductMaterial
  }

  extend type Mutation {
    # Store management
    createStoreCategory(input: CreateStoreCategoryInput!): StoreCategory!
    updateStoreCategory(id: ID!, input: UpdateStoreCategoryInput!): StoreCategory!
    deleteStoreCategory(id: ID!): Boolean!

    createStoreSubCategory(input: CreateStoreSubCategoryInput!): StoreSubCategory!
    updateStoreSubCategory(id: ID!, input: UpdateStoreSubCategoryInput!): StoreSubCategory!
    deleteStoreSubCategory(id: ID!): Boolean!

    createStoreProduct(input: CreateStoreProductInput!): StoreProduct!
    updateStoreProduct(id: ID!, input: UpdateStoreProductInput!): StoreProduct!
    deleteStoreProduct(id: ID!): Boolean!

    createStoreProductMaterial(input: CreateStoreProductMaterialInput!): StoreProductMaterial!
    updateStoreProductMaterial(id: ID!, input: UpdateStoreProductMaterialInput!): StoreProductMaterial!
    deleteStoreProductMaterial(id: ID!): Boolean!
  }
`;
