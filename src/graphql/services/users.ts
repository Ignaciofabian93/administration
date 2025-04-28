import prisma from "../../client/prisma";
import { type Context } from "../../types/context";
import { TokenValidation } from "../../middleware/tokenValidation";
import { PasswordUpdate, User } from "../../types/user";
import { ErrorService } from "../../errors/errors";

export const UserService = {
  getUserById: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    return user;
  },
  getUsers: async ({ token }: Context) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("Token no valido");
    }
    const users = await prisma.user.findMany({ include: { userCategory: true } });
    if (!users) {
      return new ErrorService.NotFoundError("Usuarios no encontrados");
    }
    return users;
  },
  getUser: async ({ id }: { id: string }, { token }: Context) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("Token no valido");
    }
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userCategory: true },
    });
    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    return user;
  },
  getMe: async ({ token }: Context) => {
    const userId = TokenValidation(token as string) as string;
    if (!userId) {
      return new ErrorService.UnAuthorizedError("Token no valido");
    }
    console.log("ID::: ", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        county: true,
        city: true,
        region: true,
        phone: true,
        isCompany: true,
        createdAt: true,
        updatedAt: true,
        userCategory: true,
      },
    });
    console.log("USER:: ", user);

    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      county: user.county,
      city: user.city,
      region: user.region,
      phone: user.phone,
      isCompany: user.isCompany,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
      userCategory: {
        id: user.userCategory?.id,
        name: user.userCategory?.name,
        categoryDiscountAmount: user.userCategory?.categoryDiscountAmount,
        pointsThreshold: user.userCategory?.pointsThreshold,
      },
    };
  },
  register: async ({ name, email, password, isCompany, address, county, city, region, phone }: User) => {
    if (!name || !email || !password || !address || !county || !city || !region || !phone) {
      return new ErrorService.BadRequestError("Faltan datos");
    }
    const user = await prisma.user.create({
      data: { name, email, password, isCompany, address, county, city, region, phone },
    });
    if (!user) {
      return new ErrorService.InternalServerError("No se pudo crear el usuario");
    }
    return user;
  },
  updateProfile: async (
    { name, email, isCompany, phone, address, county, city, region }: User,
    { req, token }: Context,
  ) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("Token no valido");
    }
    if (!name || !email || !address || !county || !city || !region || !phone) {
      return new ErrorService.BadRequestError("Faltan datos");
    }
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, isCompany, address, county, city, region, phone },
    });
    if (!user) {
      return new ErrorService.InternalServerError("No se pudo actualizar el usuario");
    }
    return user;
  },
  updatePassword: async ({ password, newPassword }: PasswordUpdate, { req, token }: Context) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("Token no valido");
    }
    if (!password || !newPassword) {
      return new ErrorService.BadRequestError("Faltan datos");
    }
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    if (user.password !== password) {
      return new ErrorService.BadRequestError("Contraseña incorrecta");
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
    if (!updatedUser) {
      return new ErrorService.InternalServerError("No se pudo actualizar la contraseña");
    }
    return updatedUser;
  },
};
