import prisma from "../../client/prisma";
import { type Prisma } from "@prisma/client";
import { ErrorService } from "../../errors/errors";
import { hash, genSalt, compare } from "bcrypt";
import {
  type User,
  type RegisterPersonInput,
  type RegisterStoreInput,
  type PersonProfile,
  type StoreProfile,
} from "../../types/user";
import { type City, type County, type Region, type Country } from "../../types/location";
import { type SellerType, type ContactMethod, type AccountType } from "../../types/enums";
import { sendWelcomeEmail } from "../../mail/register";
import { randomUUID } from "crypto";

export const UserService = {
  // Location queries
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
      return countries;
    } catch (error) {
      console.error("Error al obtener países:", error);
      throw new ErrorService.InternalServerError("Error al obtener países");
    }
  },

  getRegions: async ({ countryId }: { countryId: string }) => {
    try {
      const parsedId = Number(countryId);
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
      return regions;
    } catch (error) {
      console.error("Error al obtener regiones:", error);
      throw new ErrorService.InternalServerError("Error al obtener regiones");
    }
  },

  getCities: async ({ regionId }: { regionId: string }) => {
    try {
      const parsedId = Number(regionId);
      const cities: City[] = await prisma.city.findMany({
        select: { id: true, city: true },
        where: { regionId: parsedId },
        orderBy: {
          city: "asc",
        },
      });
      return cities;
    } catch (error) {
      console.error("Error al obtener ciudades:", error);
      throw new ErrorService.InternalServerError("Error al obtener ciudades");
    }
  },

  getCounties: async ({ cityId }: { cityId: string }) => {
    try {
      const parsedId = Number(cityId);
      const counties: County[] = await prisma.county.findMany({
        select: { id: true, county: true },
        where: { cityId: parsedId },
        orderBy: {
          county: "asc",
        },
      });
      return counties;
    } catch (error) {
      console.error("Error al obtener comunas:", error);
      throw new ErrorService.InternalServerError("Error al obtener comunas");
    }
  },

  // User queries
  getUsers: async (args: {
    sellerType?: SellerType;
    isActive?: boolean;
    isVerified?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const where: any = {};
      if (args.sellerType) where.sellerType = args.sellerType;
      if (args.isActive !== undefined) where.isActive = args.isActive;
      if (args.isVerified !== undefined) where.isVerified = args.isVerified;

      const users = await prisma.seller.findMany({
        where,
        include: {
          personProfile: true,
          storeProfile: true,
          serviceProfile: true, // ✅ Added missing serviceProfile
          country: true,
          region: true,
          city: true,
          county: true,
          sellerCategory: true,
        },
        orderBy: { createdAt: "desc" },
        take: args.limit || undefined,
        skip: args.offset || undefined,
      });
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new ErrorService.InternalServerError("Error al obtener usuarios");
    }
  },

  getUserById: async ({ id }: { id: string }) => {
    try {
      const user = await prisma.seller.findUnique({
        where: { id },
        include: {
          personProfile: true,
          storeProfile: true,
          serviceProfile: true, // ✅ Added missing serviceProfile
          country: true,
          region: true,
          city: true,
          county: true,
          sellerCategory: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw new ErrorService.InternalServerError("Error al obtener usuario por ID");
    }
  },

  getUserByEmail: async ({ email }: { email: string }) => {
    try {
      const user = await prisma.seller.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          personProfile: true,
          storeProfile: true,
          serviceProfile: true, // ✅ Added missing serviceProfile
          country: true,
          region: true,
          city: true,
          county: true,
          sellerCategory: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por email:", error);
      throw new ErrorService.InternalServerError("Error al obtener usuario por email");
    }
  },

  getMe: async ({ userId }: { userId: string }) => {
    console.log("ID:: ", userId);

    try {
      const sellerType = await prisma.seller.findUnique({
        where: { id: userId },
        select: { sellerType: true },
      });

      if (sellerType?.sellerType === "PERSON") {
        const userProfile = await prisma.seller.findUnique({
          where: { id: userId },
          include: {
            personProfile: true,
            country: true,
            region: true,
            city: true,
            county: true,
            sellerCategory: true,
          },
        });

        return userProfile;
      } else if (sellerType?.sellerType === "STORE") {
        const storeProfile = await prisma.seller.findUnique({
          where: { id: userId },
          include: {
            storeProfile: true,
            country: true,
            region: true,
            city: true,
            county: true,
            sellerCategory: true,
          },
        });
        return storeProfile;
      } else if (sellerType?.sellerType === "SERVICE") {
        const serviceProfile = await prisma.seller.findUnique({
          where: { id: userId },
          include: {
            serviceProfile: true,
            country: true,
            region: true,
            city: true,
            county: true,
            sellerCategory: true,
          },
        });
        return serviceProfile;
      }
    } catch (error) {
      console.error("Error al obtener usuario actual:", error);
      throw new ErrorService.InternalServerError("Error al obtener usuario actual");
    }
  },

  getStores: async (args: { isActive?: boolean; isVerified?: boolean; limit?: number; offset?: number }) => {
    try {
      const where: any = { sellerType: "STORE" };
      if (args.isActive !== undefined) where.isActive = args.isActive;
      if (args.isVerified !== undefined) where.isVerified = args.isVerified;

      const stores = await prisma.seller.findMany({
        where,
        include: {
          storeProfile: true,
          country: true,
          region: true,
          city: true,
          county: true,
          sellerCategory: true,
        },
        orderBy: { createdAt: "desc" },
        take: args.limit || undefined,
        skip: args.offset || undefined,
      });
      return stores;
    } catch (error) {
      console.error("Error al obtener tiendas:", error);
      throw new ErrorService.InternalServerError("Error al obtener tiendas");
    }
  },

  getStoreCatalog: async () => {
    try {
      return await UserService.getStores({ isActive: true, isVerified: true });
    } catch (error) {
      console.error("Error al obtener catálogo de tiendas:", error);
      throw new ErrorService.InternalServerError("Error al obtener catálogo de tiendas");
    }
  },

  // User categories
  getUserCategories: async () => {
    try {
      const categories = await prisma.sellerCategory.findMany({
        orderBy: { level: "asc" },
      });
      return categories;
    } catch (error) {
      console.error("Error al obtener categorías de usuario:", error);
      throw new ErrorService.InternalServerError("Error al obtener categorías de usuario");
    }
  },

  getUserCategory: async ({ id }: { id: string }) => {
    try {
      const category = await prisma.sellerCategory.findUnique({
        where: { id: Number(id) },
      });
      return category;
    } catch (error) {
      console.error("Error al obtener categoría de usuario:", error);
      throw new ErrorService.InternalServerError("Error al obtener categoría de usuario");
    }
  },

  // Registration
  registerPerson: async (input: RegisterPersonInput) => {
    try {
      const { email, password, firstName, lastName, ...profileData } = input;

      // Check if user already exists
      const existingUser = await prisma.seller.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        throw new ErrorService.BadRequestError("Ya existe un usuario con este email");
      }

      // Hash password
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);

      // Create user and profile in transaction
      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const user = await tx.seller.create({
          data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            sellerType: "PERSON",
            address: profileData.address || "",
            phone: profileData.phone || "",
            website: profileData.website || null,
            preferredContactMethod: profileData.preferredContactMethod || "WHATSAPP",
            cityId: profileData.cityId || null,
            countyId: profileData.countyId || null,
            regionId: profileData.regionId || null,
            countryId: profileData.countryId || null,
            updatedAt: new Date(),
          },
        });

        // Handle birthday field conversion from date string to DateTime
        let processedBirthday = profileData.birthday;
        if (processedBirthday && typeof processedBirthday === "string") {
          // Parse date string and create a proper DateTime with current timezone
          const date = new Date(processedBirthday);
          // Set time to current time instead of midnight UTC to match creation pattern
          const now = new Date();
          date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
          processedBirthday = date;
        }

        await tx.personProfile.create({
          data: {
            sellerId: user.id,
            firstName,
            lastName: lastName || null,
            displayName: profileData.displayName || null,
            bio: profileData.bio || null,
            birthday: processedBirthday || null,
            allowExchanges: profileData.allowExchanges ?? true,
          },
        });

        return user;
      });

      // Send welcome email
      await sendWelcomeEmail(email.toLowerCase(), firstName, "");

      return await UserService.getUserById({ id: result.id });
    } catch (error) {
      console.error("Error al registrar persona:", error);
      if (error instanceof ErrorService.BadRequestError) throw error;
      throw new ErrorService.InternalServerError("Error al registrar persona");
    }
  },

  registerStore: async (input: RegisterStoreInput) => {
    try {
      const { email, password, businessName, displayName, ...profileData } = input;

      // Check if user already exists
      const existingUser = await prisma.seller.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        throw new ErrorService.BadRequestError("Ya existe un usuario con este email");
      }

      // Hash password
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);

      // Create user and profile in transaction
      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const user = await tx.seller.create({
          data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            sellerType: "STORE",
            address: profileData.address || "",
            phone: profileData.phone || "",
            website: profileData.website || null,
            preferredContactMethod: profileData.preferredContactMethod || "WHATSAPP",
            cityId: profileData.cityId || null,
            countyId: profileData.countyId || null,
            regionId: profileData.regionId || null,
            countryId: profileData.countryId || null,
            updatedAt: new Date(),
          },
        });

        await tx.storeProfile.create({
          data: {
            sellerId: user.id,
            businessName,
            displayName,
            description: profileData.description || null,
            businessType: profileData.businessType || null,
            taxId: profileData.taxId || null,
            businessRegistration: profileData.businessRegistration || null,
            allowExchanges: profileData.allowExchanges ?? false,
            minOrderAmount: profileData.minOrderAmount || null,
            shippingPolicy: profileData.shippingPolicy || null,
            returnPolicy: profileData.returnPolicy || null,
          },
        });

        return user;
      });

      // Send welcome email
      await sendWelcomeEmail(email.toLowerCase(), "", displayName);

      return await UserService.getUserById({ id: result.id });
    } catch (error) {
      console.error("Error al registrar tienda:", error);
      if (error instanceof ErrorService.BadRequestError) throw error;
      throw new ErrorService.InternalServerError("Error al registrar tienda");
    }
  },

  registerService: async (input: RegisterStoreInput) => {
    try {
      const { email, password, businessName, displayName, ...profileData } = input;

      // Check if user already exists
      const existingUser = await prisma.seller.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        throw new ErrorService.BadRequestError("Ya existe un usuario con este email");
      }

      // Hash password
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);

      // Create user and profile in transaction
      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const user = await tx.seller.create({
          data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            sellerType: "SERVICE",
            address: profileData.address || "",
            phone: profileData.phone || "",
            website: profileData.website || null,
            preferredContactMethod: profileData.preferredContactMethod || "WHATSAPP",
            cityId: profileData.cityId || null,
            countyId: profileData.countyId || null,
            regionId: profileData.regionId || null,
            countryId: profileData.countryId || null,
            updatedAt: new Date(),
          },
        });

        await tx.serviceProfile.create({
          data: {
            sellerId: user.id,
            businessName,
            displayName,
            description: profileData.description || null,
            businessType: profileData.businessType || null,
            taxId: profileData.taxId || null,
            businessRegistration: profileData.businessRegistration || null,
            allowExchanges: profileData.allowExchanges ?? false,
            minOrderAmount: profileData.minOrderAmount || null,
          },
        });

        return user;
      });

      // Send welcome email
      await sendWelcomeEmail(email.toLowerCase(), "", displayName);

      return await UserService.getUserById({ id: result.id });
    } catch (error) {
      console.error("Error al registrar servicio:", error);
      if (error instanceof ErrorService.BadRequestError) throw error;
      throw new ErrorService.InternalServerError("Error al registrar servicio");
    }
  },

  // Password management
  updatePassword: async ({
    userId,
    currentPassword,
    newPassword,
  }: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const user = await prisma.seller.findUnique({
        where: { id: userId },
      });

      if (!user || !(await compare(currentPassword, user.password))) {
        throw new ErrorService.BadRequestError("La contraseña actual es incorrecta");
      }

      const salt = await genSalt(12);
      const hashedNewPassword = await hash(newPassword, salt);

      await prisma.seller.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      if (error instanceof ErrorService.BadRequestError) throw error;
      throw new ErrorService.InternalServerError("Error al actualizar contraseña");
    }
  },

  // Profile updates
  updateUser: async ({ userId, input }: { userId: string; input: any }) => {
    try {
      if (!userId) {
        throw new ErrorService.BadRequestError("User ID is required");
      }

      await prisma.seller.update({
        where: { id: userId },
        data: input,
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      if (error instanceof ErrorService.BadRequestError) {
        throw error;
      }
      throw new ErrorService.InternalServerError("Error al actualizar usuario");
    }
  },

  updatePersonProfile: async ({ userId, input }: { userId: string; input: any }) => {
    try {
      // Handle birthday field conversion from date string to DateTime
      const processedInput = { ...input };
      if (processedInput.birthday && typeof processedInput.birthday === "string") {
        // Parse date string and create a proper DateTime with current timezone
        const date = new Date(processedInput.birthday);
        // Set time to current time instead of midnight UTC to match creation pattern
        const now = new Date();
        date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        processedInput.birthday = date;
      }

      await prisma.personProfile.update({
        where: { sellerId: userId },
        data: input,
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error al actualizar perfil de persona:", error);
      throw new ErrorService.InternalServerError("Error al actualizar perfil de persona");
    }
  },

  updateStoreProfile: async ({ userId, input }: { userId: string; input: any }) => {
    try {
      await prisma.storeProfile.update({
        where: { sellerId: userId },
        data: input,
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error al actualizar perfil de tienda:", error);
      throw new ErrorService.InternalServerError("Error al actualizar perfil de tienda");
    }
  },

  // Account management
  deactivateAccount: async ({ userId }: { userId: string }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: { isActive: false },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error al desactivar cuenta:", error);
      throw new ErrorService.InternalServerError("Error al desactivar cuenta");
    }
  },

  reactivateAccount: async ({ userId }: { userId: string }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: { isActive: true },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error reactivating account:", error);
      throw new ErrorService.InternalServerError("Error reactivating account");
    }
  },

  deleteAccount: async ({ userId, password }: { userId: string; password: string }) => {
    try {
      const user = await prisma.seller.findUnique({
        where: { id: userId },
      });

      if (!user || !(await compare(password, user.password))) {
        throw new ErrorService.BadRequestError("Invalid password");
      }

      await prisma.seller.delete({
        where: { id: userId },
      });

      return true;
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error instanceof ErrorService.BadRequestError) throw error;
      throw new ErrorService.InternalServerError("Error deleting account");
    }
  },

  // Points management
  addPoints: async ({ userId, points }: { userId: string; points: number }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: { points: { increment: points } },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error adding points:", error);
      throw new ErrorService.InternalServerError("Error adding points");
    }
  },

  deductPoints: async ({ userId, points }: { userId: string; points: number }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: { points: { decrement: points } },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error deducting points:", error);
      throw new ErrorService.InternalServerError("Error deducting points");
    }
  },

  updateUserCategory: async ({ userId, categoryId }: { userId: string; categoryId: string }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: { sellerCategoryId: Number(categoryId) },
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error updating user category:", error);
      throw new ErrorService.InternalServerError("Error updating user category");
    }
  },

  // Admin functions
  adminCreateUser: async ({
    email,
    sellerType,
    isVerified,
  }: {
    email: string;
    sellerType: SellerType;
    isVerified?: boolean;
  }) => {
    try {
      const tempPassword = randomUUID();
      const salt = await genSalt(12);
      const hashedPassword = await hash(tempPassword, salt);

      const user = await prisma.seller.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          sellerType,
          isVerified: isVerified ?? false,
          address: "",
          phone: "",
          updatedAt: new Date(),
        },
      });

      return await UserService.getUserById({ id: user.id });
    } catch (error) {
      console.error("Error creating user (admin):", error);
      throw new ErrorService.InternalServerError("Error creating user");
    }
  },

  adminUpdateUser: async ({ userId, input }: { userId: string; input: any }) => {
    try {
      await prisma.seller.update({
        where: { id: userId },
        data: input,
      });

      return await UserService.getUserById({ id: userId });
    } catch (error) {
      console.error("Error updating user (admin):", error);
      throw new ErrorService.InternalServerError("Error updating user");
    }
  },

  adminDeleteUser: async ({ userId }: { userId: string }) => {
    try {
      await prisma.seller.delete({
        where: { id: userId },
      });

      return true;
    } catch (error) {
      console.error("Error deleting user (admin):", error);
      throw new ErrorService.InternalServerError("Error deleting user");
    }
  },
};
