import gql from "graphql-tag";

export const orderTypeDefs = gql`
  # Order Types
  type Order {
    id: ID!
    sellerId: String!
    createdAt: DateTime!
    shippingStatusId: Int!
    updatedAt: DateTime!
    version: Int!
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
    createdAt: DateTime!
    order: Order!
    product: Product!
  }

  type ShippingStatus {
    id: ID!
    status: ShippingStage!
    orders: [Order!]!
  }

  # Transaction and Exchange Types
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

  extend type Query {
    # Order queries
    getOrder(id: ID!): Order
    getOrders(sellerId: String, shippingStatus: ShippingStage, page: Int = 1, pageSize: Int = 10): OrdersConnection!
    getOrderItems(orderId: Int!): [OrderItem!]!

    # Transaction queries
    getTransaction(id: ID!): Transaction
    getTransactions(sellerId: String, kind: TransactionKind, page: Int = 1, pageSize: Int = 10): TransactionsConnection!

    # Exchange queries
    getExchange(id: ID!): Exchange
    getExchanges(sellerId: String, status: ExchangeStatus, page: Int = 1, pageSize: Int = 10): ExchangesConnection!
  }

  extend type Mutation {
    # Order management
    createOrder(input: CreateOrderInput!): Order!
    updateOrderStatus(orderId: ID!, shippingStatusId: Int!): Order!
    cancelOrder(orderId: ID!): Boolean!

    # Exchange management
    proposeExchange(input: ProposeExchangeInput!): Exchange!
    acceptExchange(exchangeId: ID!): Exchange!
    rejectExchange(exchangeId: ID!): Exchange!
  }

  # Connection Types
  type OrdersConnection {
    nodes: [Order!]!
    pageInfo: PageInfo!
  }

  type TransactionsConnection {
    nodes: [Transaction!]!
    pageInfo: PageInfo!
  }

  type ExchangesConnection {
    nodes: [Exchange!]!
    pageInfo: PageInfo!
  }

  # Input Types
  input CreateOrderInput {
    sellerId: String!
    items: [OrderItemInput!]!
    shippingStatusId: Int!
  }

  input OrderItemInput {
    productId: Int!
    quantity: Int!
  }

  input ProposeExchangeInput {
    offeredProductId: Int!
    requestedProductId: Int!
    notes: String
  }
`;
