import gql from "graphql-tag";

export const impactTypeDefs = gql`
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
    productCategoryMaterials: [ProductCategoryMaterial!]!
    storeProductMaterials: [StoreProductMaterial!]!
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

  type MaterialImpactEstimatesConnection {
    nodes: [MaterialImpactEstimate!]!
    pageInfo: PageInfo!
  }

  type Co2ImpactMessagesConnection {
    nodes: [Co2ImpactMessage!]!
    pageInfo: PageInfo!
  }

  type WaterImpactMessagesConnection {
    nodes: [WaterImpactMessage!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    # Material Impact queries with pagination
    getMaterialImpactEstimates(page: Int = 1, pageSize: Int = 10): MaterialImpactEstimatesConnection!
    getMaterialImpactEstimate(id: ID!): MaterialImpactEstimate
    getCo2ImpactMessages(page: Int = 1, pageSize: Int = 10): Co2ImpactMessagesConnection!
    getCo2ImpactMessage(id: ID!): Co2ImpactMessage
    getWaterImpactMessages(page: Int = 1, pageSize: Int = 10): WaterImpactMessagesConnection!
    getWaterImpactMessage(id: ID!): WaterImpactMessage
  }

  extend type Mutation {
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
  }
`;
