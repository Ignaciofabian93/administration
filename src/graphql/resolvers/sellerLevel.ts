import { Context } from "../../types";
import { MainService } from "../services";
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
    getSellerLevels: (_parent: unknown, _args: PaginationInput, context: Context) => MainService.getSellerLevels({ ..._args, ...context }),
    getSellerLevel: (_parent: unknown, _args: { id: number }, context: Context) => MainService.getSellerLevel({ ..._args, ...context }),
  },
  Mutation: {
    createSellerLevel: (_parent: unknown, _args: { input: SellerLevelInput }, context: Context) =>
      MainService.createSellerLevel({ ..._args, ...context }),
    updateSellerLevel: (_parent: unknown, _args: { id: number; input: SellerLevelInput }, context: Context) =>
      MainService.updateSellerLevel({ ..._args, ...context }),
    deleteSellerLevel: (_parent: unknown, _args: { id: number }, context: Context) =>
      MainService.deleteSellerLevel({ ..._args, ...context }),
  },
};
