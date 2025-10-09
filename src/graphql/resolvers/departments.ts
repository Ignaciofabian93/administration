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
  Mutation: {
    // Department management
    createDepartment: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createDepartment(context.adminId, args.input),

    updateDepartment: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateDepartment(context.adminId, args.id, args.input),

    deleteDepartment: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteDepartment(context.adminId, args.id),

    // Department Category management
    createDepartmentCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createDepartmentCategory(context.adminId, args.input),

    updateDepartmentCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateDepartmentCategory(context.adminId, args.id, args.input),

    deleteDepartmentCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteDepartmentCategory(context.adminId, args.id),

    // Product Category management
    createProductCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      PlatformAdminService.createProductCategory(context.adminId, args.input),

    updateProductCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      PlatformAdminService.updateProductCategory(context.adminId, args.id, args.input),

    deleteProductCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      PlatformAdminService.deleteProductCategory(context.adminId, args.id),
  },
};
