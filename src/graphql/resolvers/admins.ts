import { PlatformAdminService } from "../services/admin";

export const AdminsResolver = {
  Query: {
    getAdmins: (
      _parent: unknown,
      _args: { adminType?: string; role?: string; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => PlatformAdminService.getAdmins({ adminId: context.adminId, ..._args }),

    getAdmin: (_parent: unknown, _args: { id: string }, context: { adminId: string }) => PlatformAdminService.getAdminById(_args.id),
  },
};
