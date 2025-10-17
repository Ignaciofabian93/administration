import gql from "graphql-tag";

export const productTypeDefs = gql`
  type ProductCategoryMaterial {
    id: ID!
    productCategoryId: Int!
    materialTypeId: Int!
    quantity: Float!
    unit: String!
    isPrimary: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    materialImpactEstimate: MaterialImpactEstimate!
    productCategory: ProductCategory!
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
    deletedAt: DateTime
    productCategoryId: Int!
    sellerId: String!
    productCategory: ProductCategory!
    seller: Seller!
    comments: [ProductComment!]!
    likes: [ProductLike!]!
    itemsOrdered: [OrderItem!]!
    chats: [Chat!]!
    exchangesOffered: [Exchange!]!
    exchangesRequested: [Exchange!]!
  }
  type ProductCategory {
    id: ID!
    productCategoryName: String!
    departmentCategoryId: Int!
    departmentCategory: DepartmentCategory
    keywords: [String]
    averageWeight: Float
    size: ProductSize
    weightUnit: WeightUnit
    products: [Product]
    productCategoryMaterials: [ProductCategoryMaterial!]!
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

  input CreateProductVariantInput {
    name: String!
    price: Int!
    stock: Int!
    color: String
    size: String
    storeProductId: Int!
  }

  input UpdateProductVariantInput {
    name: String
    price: Int
    stock: Int
    color: String
    size: String
    storeProductId: Int
  }

  # Product Category Material Input Types
  input CreateProductCategoryMaterialInput {
    productCategoryId: Int!
    materialTypeId: Int!
    quantity: Float!
    unit: String
    isPrimary: Boolean
  }

  input UpdateProductCategoryMaterialInput {
    quantity: Float
    unit: String
    isPrimary: Boolean
  }

  type ProductsConnection {
    nodes: [Product!]!
    pageInfo: PageInfo!
  }

  type ProductCategoryMaterialsConnection {
    nodes: [ProductCategoryMaterial!]!
    pageInfo: PageInfo!
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
    size: ProductSize
    weightUnit: WeightUnit
  }

  input UpdateProductCategoryInput {
    productCategoryName: String
    keywords: [String!]
    averageWeight: Float
    size: ProductSize
    weightUnit: WeightUnit
  }

  extend type Query {
    getDepartments: [Department!]!
    getDepartment(id: ID!): Department
    getDepartmentCategories(departmentId: Int): [DepartmentCategory!]!
    getDepartmentCategory(id: ID!): DepartmentCategory
    getProductCategories(departmentCategoryId: Int): [ProductCategory!]!
    getProductCategory(id: ID!): ProductCategory

    # Product queries with pagination
    getProducts(sellerId: String, categoryId: Int, isActive: Boolean, page: Int = 1, pageSize: Int = 10): ProductsConnection!
    getProduct(id: ID!): Product
    getProductsByCategory(categoryId: Int!, page: Int = 1, pageSize: Int = 10): ProductsConnection!

    # Product category material queries with pagination
    getProductCategoryMaterials(
      productCategoryId: Int
      materialTypeId: Int
      isPrimary: Boolean
      page: Int = 1
      pageSize: Int = 10
    ): ProductCategoryMaterialsConnection!
    getProductCategoryMaterial(id: ID!): ProductCategoryMaterial
  }

  extend type Mutation {
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

    # Product management
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    approveProduct(id: ID!): Product!
    rejectProduct(id: ID!, reason: String): Product!

    # Product category material management
    createProductCategoryMaterial(input: CreateProductCategoryMaterialInput!): ProductCategoryMaterial!
    updateProductCategoryMaterial(id: ID!, input: UpdateProductCategoryMaterialInput!): ProductCategoryMaterial!
    deleteProductCategoryMaterial(id: ID!): Boolean!

    # Product variant management
    createProductVariant(input: CreateProductVariantInput!): ProductVariant!
    updateProductVariant(id: ID!, input: UpdateProductVariantInput!): ProductVariant!
    deleteProductVariant(id: ID!): Boolean!
  }
`;
