import { MainService } from "../services";

export const PaymentResolver = {
  Query: {
    // Payment queries
    getPayment: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getPaymentById(args.id),

    getPayments: (
      _parent: unknown,
      args: { sellerId?: string; status?: string; page?: number; pageSize?: number },
      _context: { adminId: string },
    ) => MainService.getPayments(args),

    getPaymentConfig: (_parent: unknown, args: { sellerId: string }, _context: { adminId: string }) =>
      MainService.getPaymentConfig(args.sellerId),
  },

  Mutation: {
    // Payment management
    createPayment: (_parent: unknown, args: { input: any }, context: { sellerId: string }) => MainService.createPayment(args.input),

    updatePaymentStatus: (_parent: unknown, args: { id: string; status: string }, context: { sellerId: string }) =>
      MainService.updatePaymentStatus(args.id, args.status),

    refundPayment: (_parent: unknown, args: { paymentId: string; amount: number; reason: string }, context: { sellerId: string }) =>
      MainService.refundPayment(args.paymentId, args.amount, args.reason),
  },
};
