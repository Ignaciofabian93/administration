import { Context } from "../../types";
import { SellerLevelService } from "../services/controllers/sellerLevel";
import { PaginationInput } from "./main";

export type SellerLevelInput = {
  levelName: string;
  minPoints: number;
  maxPoints: number;
  benefits: string;
  badgeIcon: string;
};

export const SellerLevelResolver = {
  Query: {
    getSellerLevels: (_parent: unknown, _args: PaginationInput, context: Context) =>
      SellerLevelService.getSellerLevels({ ..._args, ...context }),
    getSellerLevel: (_parent: unknown, _args: { id: number }, context: Context) =>
      SellerLevelService.getSellerLevel({ ..._args, ...context }),
  },
  Mutation: {
    createSellerLevel: (_parent: unknown, _args: { input: SellerLevelInput }, context: Context) =>
      SellerLevelService.createSellerLevel({ ..._args, ...context }),
    updateSellerLevel: (_parent: unknown, _args: { id: number; input: SellerLevelInput }, context: Context) =>
      SellerLevelService.updateSellerLevel({ ..._args, ...context }),
    deleteSellerLevel: (_parent: unknown, _args: { id: number }, context: Context) =>
      SellerLevelService.deleteSellerLevel({ ..._args, ...context }),
  },
};
