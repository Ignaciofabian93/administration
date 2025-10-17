import prisma from "../../../client/prisma";
import { ErrorService } from "../../../errors/errors";

export const SellerService = {
  getSellers: async () => {
    try {
      const sellers = await prisma.seller.findMany();

      if (!sellers) {
        throw new ErrorService.NotFoundError("No se encontraron vendedores");
      }

      return sellers;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener vendedores");
    }
  },
  getSellerById: async (id: string) => {
    try {
      const seller = await prisma.seller.findUnique({
        where: { id },
      });

      if (!seller) {
        throw new ErrorService.NotFoundError("No se encontró el vendedor");
      }

      return seller;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener vendedor por ID");
    }
  },
  getPersons: async () => {
    try {
      const persons = await prisma.seller.findMany({
        where: { sellerType: "PERSON" },
      });

      if (!persons) {
        throw new ErrorService.NotFoundError("No se encontraron personas");
      }

      return persons;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener personas");
    }
  },
  getPersonById: async (id: string) => {
    try {
      const person = await prisma.seller.findUnique({
        where: { id, sellerType: "PERSON" },
      });

      if (!person) {
        throw new ErrorService.NotFoundError("No se encontró la persona");
      }

      return person;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener persona por ID");
    }
  },
  getBusinesses: async () => {
    try {
      const businesses = await prisma.seller.findMany({
        where: {
          sellerType: { in: ["STARTUP", "COMPANY"] },
        },
      });

      if (!businesses) {
        throw new ErrorService.NotFoundError("No se encontraron negocios");
      }

      return businesses;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener negocios");
    }
  },
  getBusinessById: async (id: string) => {
    try {
      const business = await prisma.seller.findFirst({
        where: {
          id,
          sellerType: { in: ["STARTUP", "COMPANY"] },
        },
      });

      if (!business) {
        throw new ErrorService.NotFoundError("No se encontró el negocio");
      }

      return business;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener negocio por ID");
    }
  },

  getMySellerData: async (sellerId: string) => {
    try {
      const seller = await prisma.seller.findUnique({
        where: { id: sellerId },
        include: {
          city: true,
          country: true,
          county: true,
          region: true,
          sellerCategory: true,
          SellerLevel: true,
          preferences: true,
          personProfile: true,
          BusinessProfile: true,
        },
      });

      if (!seller) {
        throw new ErrorService.NotFoundError("No se encontró el vendedor");
      }

      return seller;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener datos del vendedor");
    }
  },

  getSellerPreferences: async (sellerId: string) => {
    try {
      const preferences = await prisma.sellerPreferences.findUnique({
        where: { sellerId },
      });

      if (!preferences) {
        throw new ErrorService.NotFoundError("No se encontraron las preferencias del vendedor");
      }

      return preferences;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar obtener preferencias del vendedor");
    }
  },

  updateSeller: async (sellerId: string, input: any) => {
    try {
      const seller = await prisma.seller.update({
        where: { id: sellerId },
        data: {
          email: input.email,
          address: input.address,
          cityId: input.cityId,
          countyId: input.countyId,
          regionId: input.regionId,
          countryId: input.countryId,
          phone: input.phone,
          website: input.website,
          preferredContactMethod: input.preferredContactMethod,
          socialMediaLinks: input.socialMediaLinks,
          accountType: input.accountType,
        },
      });

      return seller;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar vendedor");
    }
  },

  updatePersonProfile: async (sellerId: string, input: any) => {
    try {
      const profile = await prisma.personProfile.update({
        where: { sellerId },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          displayName: input.displayName,
          bio: input.bio,
          birthday: input.birthday,
          profileImage: input.profileImage,
          coverImage: input.coverImage,
          allowExchanges: input.allowExchanges,
        },
      });

      return profile;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar perfil de persona");
    }
  },

  updateBusinessProfile: async (sellerId: string, input: any) => {
    try {
      const profile = await prisma.businessProfile.update({
        where: { sellerId },
        data: {
          businessName: input.businessName,
          displayName: input.displayName,
          description: input.description,
          logo: input.logo,
          coverImage: input.coverImage,
          businessType: input.businessType,
          legalBusinessName: input.legalBusinessName,
          taxId: input.taxId,
          businessActivity: input.businessActivity,
          businessStartDate: input.businessStartDate,
          legalRepresentative: input.legalRepresentative,
          legalRepresentativeTaxId: input.legalRepresentativeTaxId,
          formalizationStatus: input.formalizationStatus,
          formalizationDeadline: input.formalizationDeadline,
          formalizationNotes: input.formalizationNotes,
          minOrderAmount: input.minOrderAmount,
          shippingPolicy: input.shippingPolicy,
          returnPolicy: input.returnPolicy,
          serviceArea: input.serviceArea,
          yearsOfExperience: input.yearsOfExperience,
          licenseNumber: input.licenseNumber,
          insuranceInfo: input.insuranceInfo,
          certifications: input.certifications,
          emergencyService: input.emergencyService,
          travelRadius: input.travelRadius,
          businessHours: input.businessHours,
        },
      });

      return profile;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar perfil de negocio");
    }
  },

  updateSellerPreferences: async (sellerId: string, input: any) => {
    try {
      const preferences = await prisma.sellerPreferences.update({
        where: { sellerId },
        data: {
          preferredLanguage: input.preferredLanguage,
          currency: input.currency,
          emailNotifications: input.emailNotifications,
          pushNotifications: input.pushNotifications,
          orderUpdates: input.orderUpdates,
          communityUpdates: input.communityUpdates,
          securityAlerts: input.securityAlerts,
          weeklySummary: input.weeklySummary,
          twoFactorAuth: input.twoFactorAuth,
        },
      });

      return preferences;
    } catch (error) {
      throw new ErrorService.InternalServerError("Error al intentar actualizar preferencias del vendedor");
    }
  },
};
