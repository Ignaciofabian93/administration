import { MainService } from "../services";

export const DepartmentsResolver = {
  Query: {
    getDepartments: (_parent: unknown, _args: unknown, context: { adminId: string }) =>
      MainService.getDepartments({ adminId: context.adminId }),

    getDepartment: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      MainService.getDepartment({ adminId: context.adminId, ..._args }),

    getDepartmentCategories: (_parent: unknown, _args: { departmentId?: number }, context: { adminId: string }) =>
      MainService.getDepartmentCategories({ adminId: context.adminId, ..._args }),

    getDepartmentCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      MainService.getDepartmentCategory({ adminId: context.adminId, ..._args }),

    getProductCategories: (_parent: unknown, _args: { departmentCategoryId?: number }, context: { adminId: string }) =>
      MainService.getProductCategories({ adminId: context.adminId, ..._args }),

    getProductCategory: (_parent: unknown, _args: { id: number }, context: { adminId: string }) =>
      MainService.getProductCategory({ adminId: context.adminId, ..._args }),
  },
  Mutation: {
    // Department management
    createDepartment: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createDepartment(context.adminId, args.input),

    updateDepartment: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      MainService.updateDepartment(context.adminId, args.id, args.input),

    deleteDepartment: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.deleteDepartment(context.adminId, args.id),

    // Department Category management
    createDepartmentCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createDepartmentCategory(context.adminId, args.input),

    updateDepartmentCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      MainService.updateDepartmentCategory(context.adminId, args.id, args.input),

    deleteDepartmentCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.deleteDepartmentCategory(context.adminId, args.id),

    // Product Category management
    createProductCategory: (_parent: unknown, args: { input: any }, context: { adminId: string }) =>
      MainService.createProductCategory(context.adminId, args.input),

    updateProductCategory: (_parent: unknown, args: { id: number; input: any }, context: { adminId: string }) =>
      MainService.updateProductCategory(context.adminId, args.id, args.input),

    deleteProductCategory: (_parent: unknown, args: { id: number }, context: { adminId: string }) =>
      MainService.deleteProductCategory(context.adminId, args.id),
  },
};
