import { PlatformAdminService } from "../services/admin";

export const DepartmentsResolver = {
  Query: {
    getDepartments: (_parent: unknown, _args: unknown, context: { adminId: string }) =>
      PlatformAdminService.getDepartments({ adminId: context.adminId }),

    getDepartment: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartment({ adminId: context.adminId, ..._args }),

    getDepartmentCategories: (_parent: unknown, _args: { departmentId?: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartmentCategories({ adminId: context.adminId, ..._args }),

    getDepartmentCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getDepartmentCategory({ adminId: context.adminId, ..._args }),

    getProductCategories: (_parent: unknown, _args: { departmentCategoryId?: number }, context: { adminId: string }) =>
      PlatformAdminService.getProductCategories({ adminId: context.adminId, ..._args }),

    getProductCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.getProductCategory({ adminId: context.adminId, ..._args }),
  },
};
