import { MainService } from "../services";
import { CreateAdminInput } from "./main";

export const AdminsResolver = {
  Query: {
    getAdmins: (
      _parent: unknown,
      _args: { adminType?: string; role?: string; isActive?: boolean; limit?: number; offset?: number },
      context: { adminId: string },
    ) => MainService.getAdmins({ adminId: context.adminId, ..._args }),

    getAdmin: (_parent: unknown, _args: { id: string }, context: { adminId: string }) => MainService.getAdminById(_args.id),
    getMyData: async (_parent: unknown, _args: unknown, context: { adminId: string }) => MainService.getMyData(context.adminId),
  },
  Mutation: {
    createAdmin: (_parent: unknown, args: { input: CreateAdminInput }, context: { adminId: string }) => MainService.createAdmin(args.input),

    // Admin management (super admin only)
    updateAdmin: (_parent: unknown, args: { adminId: string; input: any }, context: { adminId: string }) =>
      MainService.updateAdmin(args.adminId, args.input),

    deleteAdmin: (_parent: unknown, args: { adminId: string }, context: { adminId: string }) => MainService.deleteAdmin(args.adminId),
  },
};
