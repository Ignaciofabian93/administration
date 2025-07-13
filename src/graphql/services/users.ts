import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { hash, genSalt } from "bcrypt";
import { type User } from "../../types/user";
import { type City, type County, type Region, type Country } from "../../types/location";
import { sendWelcomeEmail } from "../../mail/register";

export const UserService = {
  getCountries: async () => {
    try {
      const countries: Country[] = await prisma.country.findMany({
        select: {
          id: true,
          country: true,
        },
        orderBy: {
          country: "asc",
        },
      });
      if (!countries) {
        return new ErrorService.NotFoundError("Países no encontrados");
      }
      return countries;
    } catch (error) {
      console.error("Error al obtener países:", error);
      return new ErrorService.InternalServerError("Error al obtener países");
    }
  },
  getRegions: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de país es requerido");
      }

      const parsedId = Number(id);

      const regions: Region[] = await prisma.region.findMany({
        select: {
          id: true,
          region: true,
        },
        where: { countryId: parsedId },
        orderBy: {
          region: "asc",
        },
      });

      if (!regions) {
        return new ErrorService.NotFoundError("Regiones no encontradas");
      }

      return regions;
    } catch (error) {
      console.error("Error al obtener regiones:", error);
      return new ErrorService.InternalServerError("Error al obtener regiones");
    }
  },
  getCities: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de región es requerido");
      }

      const parsedId = Number(id);

      const cities: City[] = await prisma.city.findMany({
        select: { id: true, city: true },
        where: { regionId: parsedId },
        orderBy: {
          city: "asc",
        },
      });

      if (!cities) {
        return new ErrorService.NotFoundError("Ciudades no encontradas");
      }

      return cities;
    } catch (error) {
      console.error("Error al obtener ciudades:", error);
      return new ErrorService.InternalServerError("Error al obtener ciudades");
    }
  },
  getCounties: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de ciudad es requerido");
      }

      const parsedId = Number(id);

      const counties: County[] = await prisma.county.findMany({
        select: { id: true, county: true },
        where: { cityId: parsedId },
        orderBy: {
          county: "asc",
        },
      });

      if (!counties) {
        return new ErrorService.NotFoundError("Comunas no encontrados");
      }

      return counties;
    } catch (error) {
      console.error("Error al obtener comunas:", error);
      return new ErrorService.InternalServerError("Error al obtener comunas");
    }
  },
  getUserById: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de usuario es requerido");
      }

      const user: Partial<User> | null = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          surnames: true,
          businessName: true,
          profileImage: true,
          birthday: true,
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
          accountType: true,
          preferredContactMethod: true,
          points: true,
        },
        where: { id },
      });
      if (!user) {
        return new ErrorService.NotFoundError("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return new ErrorService.InternalServerError("Error al obtener usuario por ID");
    }
  },
  getUsers: async () => {
    try {
      const users: Partial<User>[] = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          surnames: true,
          businessName: true,
          profileImage: true,
          birthday: true,
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
          accountType: true,
          preferredContactMethod: true,
          points: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      if (!users) {
        return new ErrorService.NotFoundError("Usuarios no encontrados");
      }

      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return new ErrorService.InternalServerError("Error al obtener usuarios");
    }
  },
  getUser: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de usuario es requerido");
      }

      const user: Partial<User> | null = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          surnames: true,
          businessName: true,
          profileImage: true,
          birthday: true,
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
          accountType: true,
          preferredContactMethod: true,
          points: true,
        },
        where: { id },
      });

      if (!user) {
        return new ErrorService.NotFoundError("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return new ErrorService.InternalServerError("Error al obtener usuario");
    }
  },
  getMe: async ({ id }: { id: string }) => {
    try {
      if (!id) {
        return new ErrorService.BadRequestError("ID de usuario es requerido");
      }

      const user: Partial<User> | null = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          surnames: true,
          businessName: true,
          profileImage: true,
          birthday: true,
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
          accountType: true,
          preferredContactMethod: true,
          points: true,
        },
        where: { id },
      });

      if (!user) {
        return new ErrorService.NotFoundError("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return new ErrorService.InternalServerError("Error al obtener usuario");
    }
  },
  register: async ({ name, surnames, businessName, email, password, isCompany }: Partial<User>) => {
    try {
      if ((!isCompany && !name) || (!isCompany && !surnames) || !email || !password || (isCompany && !businessName)) {
        return new ErrorService.BadRequestError("Faltan datos");
      }

      const formattedEmail = email.toLowerCase();
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      const user: Partial<User> = await prisma.user.create({
        data: {
          name,
          surnames,
          businessName: businessName ?? null,
          email: formattedEmail,
          password: hashedPassword,
          isCompany,
          countyId: 268, // Default county ID
          cityId: 40, // Default city ID
          regionId: 13, // Default region ID
          countryId: 1, // Default country ID
          userCategoryId: 1, // Default user category ID
          accountType: "FREE", // Default account type
          preferredContactMethod: "ALL", // Default contact method
        },
      });

      if (!user) {
        return new ErrorService.InternalServerError("No se pudo crear el usuario");
      }
      // Enviar correo de bienvenida
      await sendWelcomeEmail(formattedEmail, name as string, businessName as string);

      return user;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return new ErrorService.InternalServerError("Error al registrar usuario");
    }
  },
  updateProfile: async ({
    id,
    name,
    surnames,
    businessName,
    profileImage,
    birthday,
    email,
    phone,
    address,
    countyId,
    cityId,
    regionId,
    countryId,
    accountType,
    preferredContactMethod,
    points,
  }: User) => {
    try {
      const user: Partial<User> = await prisma.user.update({
        data: {
          name,
          surnames,
          businessName,
          birthday,
          email,
          address,
          countyId,
          cityId,
          regionId,
          countryId,
          phone,
          profileImage,
          accountType,
          preferredContactMethod,
          points,
        },
        select: {
          id: true,
          name: true,
          surnames: true,
          businessName: true,
          profileImage: true,
          birthday: true,
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
          accountType: true,
          preferredContactMethod: true,
          points: true,
        },
        where: { id },
      });

      if (!user) {
        return new ErrorService.InternalServerError("No se pudo actualizar el usuario");
      }

      return user;
    } catch (error) {
      console.error("Error al actualizar perfil de usuario:", error);
      return new ErrorService.InternalServerError("Error al actualizar perfil de usuario");
    }
  },
  updatePassword: async ({ password, newPassword, id }: { password: string; newPassword: string; id: string }) => {
    try {
      if (!password || !newPassword) {
        return new ErrorService.BadRequestError("Faltan datos");
      }
      const user: Partial<User> | null = await prisma.user.findUnique({
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
    } catch (error) {
      console.error("Error al actualizar contraseña de usuario:", error);
      return new ErrorService.InternalServerError("Error al actualizar contraseña de usuario");
    }
  },
};
