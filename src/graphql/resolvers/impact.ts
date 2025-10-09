import { PlatformAdminService } from "../services/admin";

export const ImpactResolver = {
  Query: {
    getMaterialImpactEstimates: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getMaterialImpactEstimates({ adminId: context.adminId, ..._args }),

    getMaterialImpactEstimate: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getMaterialImpactEstimate({ adminId: context.adminId, ..._args }),

    getCo2ImpactMessages: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getCo2ImpactMessages({ adminId: context.adminId, ..._args }),

    getCo2ImpactMessage: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getCo2ImpactMessage({ adminId: context.adminId, ..._args }),

    getWaterImpactMessages: (_parent: unknown, _args: { limit?: number; offset?: number }, context: { adminId: string }) =>
      PlatformAdminService.getWaterImpactMessages({ adminId: context.adminId, ..._args }),

    getWaterImpactMessage: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getWaterImpactMessage({ adminId: context.adminId, ..._args }),
  },
  Mutation: {
    createMaterialImpactEstimate: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createMaterialImpactEstimate(context.adminId, args.input),

    updateMaterialImpactEstimate: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateMaterialImpactEstimate(context.adminId, args.id, args.input),

    deleteMaterialImpactEstimate: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteMaterialImpactEstimate(context.adminId, args.id),

    // Co2 Impact Message management
    createCo2ImpactMessage: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createCo2ImpactMessage(context.adminId, args.input),

    updateCo2ImpactMessage: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateCo2ImpactMessage(context.adminId, args.id, args.input),

    deleteCo2ImpactMessage: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteCo2ImpactMessage(context.adminId, args.id),

    // Water Impact Message management
    createWaterImpactMessage: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createWaterImpactMessage(context.adminId, args.input),

    updateWaterImpactMessage: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateWaterImpactMessage(context.adminId, args.id, args.input),

    deleteWaterImpactMessage: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteWaterImpactMessage(context.adminId, args.id),
  },
};
