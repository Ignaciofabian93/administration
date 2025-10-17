import gql from "graphql-tag";

export const paymentTypeDefs = gql`
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
    paymentType: PaymentType!
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

  extend type Query {
    # Payment queries
    getPayment(id: ID!): Payment
    getPayments(sellerId: String, status: PaymentStatus, page: Int = 1, pageSize: Int = 10): PaymentsConnection!
    getPaymentConfig(sellerId: String!): ChileanPaymentConfig
  }

  extend type Mutation {
    # Payment management
    createPayment(input: CreatePaymentInput!): Payment!
    updatePaymentStatus(id: ID!, status: PaymentStatus!): Payment!
    refundPayment(paymentId: ID!, amount: Float!, reason: String!): PaymentRefund!
  }

  type PaymentsConnection {
    nodes: [Payment!]!
    pageInfo: PageInfo!
  }

  input CreatePaymentInput {
    orderId: Int
    quotationId: Int
    amount: Float!
    currency: String!
    paymentProvider: ChileanPaymentProvider!
    description: String
    payerId: String!
    receiverId: String!
    chileanConfigId: Int!
    paymentType: PaymentType!
  }
`;
