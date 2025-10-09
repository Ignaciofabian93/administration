import { PlatformAdminService } from "../services/admin";
import { CreateAdminInput } from "./main";

export const AdminsResolver = {
  Query: {
    getAdmins: (
      _parent: unknown,
      _args: { adminType?: string; role?: string; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getAdmins({ adminId: context.adminId, ..._args }),

    getAdmin: (_parent: unknown, _args: { id: string }, context: { adminId: string }) => PlatformAdminService.getAdminById(_args.id),
    getMyData: async (_parent: unknown, _args: unknown, context: { adminId: string }) => PlatformAdminService.getMyData(context.adminId),
  },
  Mutation: {
    createAdmin: (_parent: unknown, args: { input: CreateAdminInput }, context: { adminId: string }) =>
      PlatformAdminService.createAdmin(args.input),

    // Admin management (super admin only)
    updateAdmin: (_parent: unknown, args: { adminId: string; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateAdmin(args.adminId, args.input),

    deleteAdmin: (_parent: unknown, args: { adminId: string }, context: { adminId: string }) =>
      PlatformAdminService.deleteAdmin(args.adminId),
  },
};
