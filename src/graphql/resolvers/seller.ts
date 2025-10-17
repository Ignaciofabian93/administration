import { MainService } from "../services";

export const SellerResolver = {
  Query: {
    getSeller: (_parent: unknown, args: { id: string }, _context: { adminId: string }) => MainService.getSellerById(args.id),

    getMySeller: (_parent: unknown, _args: unknown, context: { sellerId: string }) => MainService.getMySellerData(context.sellerId),

    getSellerPreferences: (_parent: unknown, args: { sellerId: string }, _context: { adminId: string }) =>
      MainService.getSellerPreferences(args.sellerId),
  },

  Mutation: {
    updateSeller: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.updateSeller(context.sellerId, args.input),

    updatePersonProfile: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.updatePersonProfile(context.sellerId, args.input),

    updateBusinessProfile: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.updateBusinessProfile(context.sellerId, args.input),

    updateSellerPreferences: (_parent: unknown, args: { input: any }, context: { sellerId: string }) =>
      MainService.updateSellerPreferences(context.sellerId, args.input),
  },
};
