import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { calculatePagination } from "../../../utils/pagination";

export const PaymentServices = {
  // Payment Queries
  getPaymentById: async (id: string) => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) },
        include: {
          chileanConfig: true,
          order: true,
          payer: true,
          receiver: true,
          quotation: true,
          refunds: true,
          transactions: true,
          webhooks: true,
        },
      });

      if (!payment) {
        throw new ErrorService.NotFoundError("No se encontró el pago");
      }

      return payment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener pago");
    }
  },

  getPayments: async (args: { sellerId?: string; status?: string; page?: number; pageSize?: number }) => {
    try {
      const { sellerId, status, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (sellerId) {
        where.OR = [{ payerId: sellerId }, { receiverId: sellerId }];
      }
      if (status) where.status = status;

      const totalCount = await prisma.payment.count({ where });

      const payments = await prisma.payment.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          chileanConfig: true,
          order: true,
          payer: true,
          receiver: true,
          quotation: true,
          refunds: true,
          transactions: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: payments,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener pagos");
    }
  },

  getPaymentConfig: async (sellerId: string) => {
    try {
      const config = await prisma.chileanPaymentConfig.findFirst({
        where: { sellerId },
        include: {
          seller: true,
          payments: true,
        },
      });

      if (!config) {
        throw new ErrorService.NotFoundError("No se encontró la configuración de pago");
      }

      return config;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener configuración de pago");
    }
  },

  // Payment Mutations
  createPayment: async (input: any) => {
    try {
      const payment = await prisma.payment.create({
        data: {
          orderId: input.orderId || null,
          quotationId: input.quotationId || null,
          amount: input.amount,
          currency: input.currency,
          status: "PENDING" as any,
          paymentProvider: input.paymentProvider,
          description: input.description || null,
          payerId: input.payerId,
          receiverId: input.receiverId,
          chileanConfigId: input.chileanConfigId,
          paymentType: input.paymentType,
          updatedAt: new Date(),
        },
        include: {
          chileanConfig: true,
          order: true,
          payer: true,
          receiver: true,
          quotation: true,
          refunds: true,
          transactions: true,
        },
      });

      return payment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear pago");
    }
  },

  updatePaymentStatus: async (id: string, status: string) => {
    try {
      const updateData: any = {
        status,
        updatedAt: new Date(),
      };

      // Set processedAt when status changes to COMPLETED or FAILED
      if (status === "COMPLETED" || status === "FAILED") {
        updateData.processedAt = new Date();
      }

      const payment = await prisma.payment.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
          chileanConfig: true,
          order: true,
          payer: true,
          receiver: true,
          quotation: true,
          refunds: true,
          transactions: true,
        },
      });

      return payment;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar estado de pago");
    }
  },

  refundPayment: async (paymentId: string, amount: number, reason: string) => {
    try {
      // First, verify the payment exists and has enough funds
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(paymentId) },
      });

      if (!payment) {
        throw new ErrorService.NotFoundError("No se encontró el pago");
      }

      if (payment.status !== "COMPLETED") {
        throw new ErrorService.InternalServerError("Solo se pueden reembolsar pagos completados");
      }

      // Create the refund
      const refund = await prisma.paymentRefund.create({
        data: {
          paymentId: parseInt(paymentId),
          amount,
          reason,
          status: "PENDING" as any,
        },
        include: {
          payment: true,
        },
      });

      // Update payment status if fully refunded
      if (amount >= payment.amount) {
        await prisma.payment.update({
          where: { id: parseInt(paymentId) },
          data: {
            status: "REFUNDED" as any,
            refundedAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      return refund;
    } catch (error) {
      if (error instanceof ErrorService.NotFoundError || error instanceof ErrorService.InternalServerError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al intentar reembolsar pago");
    }
  },
};
