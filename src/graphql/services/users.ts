import prisma from "../../client/prisma";
import { type Context } from "../../types/context";
import { TokenValidation } from "../../middleware/tokenValidation";
import { NewUser, PasswordUpdate, User } from "../../types/user";
import { ErrorService } from "../../errors/errors";
import { hash, genSalt } from "bcrypt";

export const UserService = {
  getCountries: async () => {
    const countries = await prisma.country.findMany();
    if (!countries) {
      return new ErrorService.NotFoundError("Países no encontrados");
    }
    return countries;
  },
  getRegions: async ({ id }: { id: string }) => {
    const regions = await prisma.region.findMany({ where: { countryId: Number(id) } });
    if (!regions) {
      return new ErrorService.NotFoundError("Regiones no encontradas");
    }
    return regions;
  },
  getCities: async ({ id }: { id: string }) => {
    const cities = await prisma.city.findMany({ where: { regionId: Number(id) } });
    if (!cities) {
      return new ErrorService.NotFoundError("Ciudades no encontradas");
    }
    return cities;
  },
  getCounties: async ({ id }: { id: string }) => {
    const counties = await prisma.county.findMany({ where: { cityId: Number(id) } });
    if (!counties) {
      return new ErrorService.NotFoundError("Comunas no encontrados");
    }
    return counties;
  },
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
      return new ErrorService.UnAuthorizedError("No autorizado");
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        county: { select: { id: true, county: true } },
        city: { select: { id: true, city: true } },
        region: { select: { id: true, region: true } },
        country: { select: { id: true, country: true } },
        phone: true,
        isCompany: true,
        createdAt: true,
        updatedAt: true,
        userCategory: true,
      },
    });
    if (!users) {
      return new ErrorService.NotFoundError("Usuarios no encontrados");
    }
    return users;
  },
  getUser: async ({ id }: { id: string }, { token }: Context) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("No autorizado");
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        county: { select: { id: true, county: true } },
        city: { select: { id: true, city: true } },
        region: { select: { id: true, region: true } },
        country: { select: { id: true, country: true } },
        phone: true,
        isCompany: true,
        createdAt: true,
        updatedAt: true,
        userCategory: true,
      },
    });
    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    return user;
  },
  getMe: async ({ token }: Context) => {
    const userId = TokenValidation(token as string) as string;
    if (!userId) {
      return new ErrorService.UnAuthorizedError("No autorizado");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        surnames: true,
        email: true,
        address: true,
        county: { select: { id: true, county: true } },
        city: { select: { id: true, city: true } },
        region: { select: { id: true, region: true } },
        country: { select: { id: true, country: true } },
        phone: true,
        isCompany: true,
        createdAt: true,
        updatedAt: true,
        userCategory: true,
      },
    });

    if (!user) {
      return new ErrorService.NotFoundError("Usuario no encontrado");
    }
    return user;
  },
  register: async ({ name, surnames, email, password, isCompany }: NewUser) => {
    if (!name || !surnames || !email || !password) {
      return new ErrorService.BadRequestError("Faltan datos");
    }
    const formattedEmail = email.toLowerCase();
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = await prisma.user.create({
      data: { name, surnames, email: formattedEmail, password: hashedPassword, isCompany },
    });
    if (!user) {
      return new ErrorService.InternalServerError("No se pudo crear el usuario");
    }
    return user;
  },
  updateProfile: async (
    { name, surnames, email, isCompany, phone, address, countyId, cityId, regionId, countryId }: User,
    { req, token }: Context,
  ) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("No autorizado");
    }
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { name, surnames, email, isCompany, address, countyId, cityId, regionId, countryId, phone },
    });
    if (!user) {
      return new ErrorService.InternalServerError("No se pudo actualizar el usuario");
    }
    return user;
  },
  updatePassword: async ({ password, newPassword }: PasswordUpdate, { req, token }: Context) => {
    const userId = TokenValidation(token as string);
    if (!userId) {
      return new ErrorService.UnAuthorizedError("No autorizado");
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
