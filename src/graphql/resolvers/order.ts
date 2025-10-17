import { MainService } from "../services";

export const OrderResolver = {
  Query: {
    // Order queries
    getOrder: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getOrderById(args.id),

    getOrders: (
      _parent: unknown,
      args: { sellerId?: string; shippingStatus?: string; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getOrders(args),

    getOrderItems: (_parent: unknown, args: { orderId: number }, _context: { adminId: string }) => MainService.getOrderItems(args.orderId),

    // Transaction queries
    getTransaction: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getTransactionById(args.id),

    getTransactions: (
      _parent: unknown,
      args: { sellerId?: string; kind?: string; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getTransactions(args),

    // Exchange queries
    getExchange: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getExchangeById(args.id),

    getExchanges: (
      _parent: unknown,
      args: { sellerId?: string; status?: string; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getExchanges(args),
  },

  Mutation: {
    // Order management
    createOrder: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.createOrder(context.sellerId, args.input),

    updateOrderStatus: (_parent: unknown, args: { orderId: string; shippingStatusId: number }, context: { sellerId: string }) =>
      MainService.updateOrderStatus(args.orderId, args.shippingStatusId),

    cancelOrder: (_parent: unknown, args: { orderId: string }, context: { sellerId: string }) => MainService.cancelOrder(args.orderId),

    // Exchange management
    proposeExchange: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.proposeExchange(context.sellerId, args.input),

    acceptExchange: (_parent: unknown, args: { exchangeId: string }, context: { sellerId: string }) =>
      MainService.acceptExchange(args.exchangeId),

    rejectExchange: (_parent: unknown, args: { exchangeId: string }, context: { sellerId: string }) =>
      MainService.rejectExchange(args.exchangeId),
  },
};
