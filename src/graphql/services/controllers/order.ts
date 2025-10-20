import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { Transaction } from "../../../types";
import { calculatePagination } from "../../../utils/pagination";

export const OrderServices = {
  // Order Queries
  getOrderById: async (id: string) => {
    try {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          seller: true,
          shippingStatus: true,
          orderItems: true,
          payments: true,
        },
      });

      if (!order) {
        throw new ErrorService.NotFoundError("No se encontró la orden");
      }

      return order;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener orden");
    }
  },

  getOrders: async (args: { sellerId?: string; shippingStatus?: string; page?: number; pageSize?: number }) => {
    try {
      const { sellerId, shippingStatus, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (sellerId) where.sellerId = sellerId;
      if (shippingStatus) {
        const status = await prisma.shippingStatus.findFirst({
          where: { status: shippingStatus as any },
        });
        if (status) where.shippingStatusId = status.id;
      }

      const totalCount = await prisma.order.count({ where });

      const orders = await prisma.order.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          seller: true,
          shippingStatus: true,
          orderItems: true,
          payments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: orders,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener órdenes");
    }
  },

  getOrderItems: async (orderId: number) => {
    try {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
        include: {
          order: true,
          product: true,
        },
      });

      return orderItems;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener items de orden");
    }
  },

  // Transaction Queries
  getTransactionById: async (id: string) => {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
          seller: true,
          exchange: true,
        },
      });

      if (!transaction) {
        throw new ErrorService.NotFoundError("No se encontró la transacción");
      }

      return transaction;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener transacción");
    }
  },

  getTransactions: async (args: { sellerId?: string; kind?: string; page?: number; pageSize?: number }) => {
    try {
      const { sellerId, kind, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (sellerId) where.sellerId = sellerId;
      if (kind) where.kind = kind;

      const totalCount = await prisma.transaction.count({ where });

      const transactions = await prisma.transaction.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          seller: true,
          exchange: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: transactions,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener transacciones");
    }
  },

  // Exchange Queries
  getExchangeById: async (id: string) => {
    try {
      const exchange = await prisma.exchange.findUnique({
        where: { id: parseInt(id) },
        include: {
          transaction: true,
          offeredProduct: true,
          requestedProduct: true,
        },
      });

      if (!exchange) {
        throw new ErrorService.NotFoundError("No se encontró el intercambio");
      }

      return exchange;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener intercambio");
    }
  },

  getExchanges: async (args: { sellerId?: string; status?: string; page?: number; pageSize?: number }) => {
    try {
      const { sellerId, status, page = 1, pageSize = 10 } = args;
      const where: any = {};

      if (status) where.status = status;

      // Filter by seller through the transaction
      if (sellerId) {
        const transactions = await prisma.transaction.findMany({
          where: { sellerId },
          select: { id: true },
        });
        const transactionIds = transactions.map((t: { id: number }) => t.id);
        where.transactionId = { in: transactionIds };
      }

      const totalCount = await prisma.exchange.count({ where });

      const exchanges = await prisma.exchange.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          transaction: {
            include: {
              seller: true,
            },
          },
          offeredProduct: true,
          requestedProduct: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const pageInfo = calculatePagination(totalCount, page, pageSize);

      return {
        nodes: exchanges,
        pageInfo,
      };
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener intercambios");
    }
  },

  // Order Mutations
  createOrder: async (sellerId: string, input: any) => {
    try {
      const order = await prisma.order.create({
        data: {
          sellerId: input.sellerId || sellerId,
          shippingStatusId: input.shippingStatusId,
          updatedAt: new Date(),
          version: 1,
          orderItems: {
            create: input.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          seller: true,
          shippingStatus: true,
          orderItems: true,
          payments: true,
        },
      });

      return order;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear orden");
    }
  },

  updateOrderStatus: async (orderId: string, shippingStatusId: number) => {
    try {
      const order = await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          shippingStatusId,
          version: { increment: 1 },
        },
        include: {
          seller: true,
          shippingStatus: true,
          orderItems: true,
          payments: true,
        },
      });

      return order;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar estado de orden");
    }
  },

  cancelOrder: async (orderId: string) => {
    try {
      // Find the "cancelled" shipping status
      const cancelledStatus = await prisma.shippingStatus.findFirst({
        where: { status: "CANCELLED" as any },
      });

      if (!cancelledStatus) {
        throw new ErrorService.NotFoundError("No se encontró el estado de cancelación");
      }

      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          shippingStatusId: cancelledStatus.id,
          version: { increment: 1 },
        },
      });

      return true;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar cancelar orden");
    }
  },

  // Exchange Mutations
  proposeExchange: async (sellerId: string, input: any) => {
    try {
      // Create a transaction first
      const transaction = await prisma.transaction.create({
        data: {
          kind: "EXCHANGE" as any,
          pointsCollected: 0,
          sellerId,
        },
      });

      // Then create the exchange
      const exchange = await prisma.exchange.create({
        data: {
          transactionId: transaction.id,
          offeredProductId: input.offeredProductId,
          requestedProductId: input.requestedProductId,
          status: "PENDING" as any,
          notes: input.notes || null,
        },
        include: {
          transaction: true,
          offeredProduct: true,
          requestedProduct: true,
        },
      });

      return exchange;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar proponer intercambio");
    }
  },

  acceptExchange: async (exchangeId: string) => {
    try {
      const exchange = await prisma.exchange.update({
        where: { id: parseInt(exchangeId) },
        data: {
          status: "ACCEPTED" as any,
          completedAt: new Date(),
        },
        include: {
          transaction: true,
          offeredProduct: true,
          requestedProduct: true,
        },
      });

      return exchange;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar aceptar intercambio");
    }
  },

  rejectExchange: async (exchangeId: string) => {
    try {
      const exchange = await prisma.exchange.update({
        where: { id: parseInt(exchangeId) },
        data: {
          status: "REJECTED" as any,
        },
        include: {
          transaction: true,
          offeredProduct: true,
          requestedProduct: true,
        },
      });

      return exchange;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar rechazar intercambio");
    }
  },
};
