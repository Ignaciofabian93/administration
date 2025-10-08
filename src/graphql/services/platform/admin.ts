import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const AdminService = {
  getAdmins: async () => {
    try {
      const admins = await prisma.admin.findMany();

      if (!admins) {
        throw new ErrorService.NotFoundError("No se encontraron administradores");
      }

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
      const admin = await prisma.admin.findUnique({
        where: { id: adminId },
      });

      if (!admin) {
        throw new ErrorService.NotFoundError("No se encontró el administrador");
      }

      return admin;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener mis datos");
    }
  },
  createAdmin: async (data: any) => {
    try {
      const admin = await prisma.admin.create({
        data,
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
