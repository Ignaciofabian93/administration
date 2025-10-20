import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";
import { genSalt, hash } from "bcrypt";
import { CreateAdminInput } from "../../resolvers/main";

export const AdminService = {
  getAdmins: async ({
    adminId,
    adminType,
    role,
    isActive,
    limit,
    offset,
  }: {
    adminId: string;
    adminType?: string;
    role?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    try {
      if (!adminId) {
        throw new ErrorService.UnAuthorizedError("No autorizado");
      }
      const where: any = {};
      if (adminType) where.adminType = adminType;
      if (role) where.role = role;
      if (isActive !== undefined) where.isActive = isActive;

      const admins = await prisma.admin.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          Region: true,
          Country: true,
          City: true,
          County: true,
        },
      });

      return admins;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener administradores");
    }
  },
  getAdminById: async (id: string) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        throw new ErrorService.NotFoundError("No se encontró el administrador");
      }

      return admin;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener administrador por ID");
    }
  },
  getMyData: async (adminId: string) => {
    try {
      console.log("📊 Fetching data for admin ID:", adminId);

      const admin = await prisma.admin.findUnique({
        where: { id: adminId },
        include: {
          Region: true,
          Country: true,
          City: true,
          County: true,
        },
      });

      if (!admin) {
        console.error("❌ Admin not found in database:", adminId);
        throw new ErrorService.NotFoundError("No se encontró el administrador");
      }

      console.log("✅ Admin data fetched successfully");

      // Remove password from response for security
      const { password, ...adminWithoutPassword } = admin;

      return adminWithoutPassword;
    } catch (error) {
      console.error("❌ Error fetching admin data:", error);
      throw new ErrorService.InternalServerError("Error al intentar obtener mis datos");
    }
  },
  createAdmin: async ({ email, name, password, lastName, role, adminType, permissions }: CreateAdminInput) => {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const admin = await prisma.admin.create({
        data: {
          email,
          name,
          password: hashedPassword,
          lastName,
          role,
          adminType,
          permissions,
        },
      });

      return admin;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar crear administrador");
    }
  },
  updateAdmin: async (id: string, data: any) => {
    try {
      const admin = await prisma.admin.update({
        where: { id },
        data,
      });

      return admin;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar administrador");
    }
  },
  deleteAdmin: async (id: string) => {
    try {
      await prisma.admin.delete({
        where: { id },
      });
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar eliminar administrador");
    }
  },
};
