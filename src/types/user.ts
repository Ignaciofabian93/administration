import { type AccountType, type ContactMethod, type SellerType } from "./enums";

export type User = {
  id: string;
  email: string;
  password: string;
  sellerType: SellerType;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  cityId?: number | null;
  countryId?: number | null;
  countyId?: number | null;
  regionId?: number | null;
  phone: string;
  website?: string | null;
  preferredContactMethod: ContactMethod;
  socialMediaLinks?: any;
  accountType: AccountType;
  points: number;
  userCategoryId?: number | null;
};

export type PersonProfile = {
  id: string;
  sellerId: string;
  firstName: string;
  lastName?: string | null;
  displayName?: string | null;
  bio?: string | null;
  birthday?: Date | null;
  profileImage?: string | null;
  coverImage?: string | null;
  allowExchanges: boolean;
};

export type StoreProfile = {
  id: string;
  sellerId: string;
  businessName: string;
  displayName?: string | null;
  description?: string | null;
  logo?: string | null;
  coverImage?: string | null;
  businessType?: string | null;
  taxId?: string | null;
  businessRegistration?: string | null;
  allowExchanges: boolean;
  minOrderAmount?: number | null;
  shippingPolicy?: string | null;
  returnPolicy?: string | null;
  businessHours?: any;
};

export type UserCategory = {
  id: number;
  name: string;
  categoryDiscountAmount: number;
  pointsThreshold: number;
  level: number;
};

export type Session = {
  id: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  sellerId: string;
};

export type RegisterPersonInput = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  birthday?: Date;
  address?: string;
  cityId?: number;
  countyId?: number;
  regionId?: number;
  countryId?: number;
  phone?: string;
  website?: string;
  preferredContactMethod?: ContactMethod;
  allowExchanges?: boolean;
};

export type RegisterStoreInput = {
  email: string;
  password: string;
  businessName: string;
  displayName?: string;
  description?: string;
  businessType?: string;
  taxId?: string;
  businessRegistration?: string;
  address?: string;
  cityId?: number;
  countyId?: number;
  regionId?: number;
  countryId?: number;
  phone?: string;
  website?: string;
  preferredContactMethod?: ContactMethod;
  allowExchanges?: boolean;
  minOrderAmount?: number;
  shippingPolicy?: string;
  returnPolicy?: string;
};
