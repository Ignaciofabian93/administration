import { type AccountType, type ContactMethod } from "./enums";

export type User = {
  id: string;
  name?: string | null;
  surnames?: string | null;
  email: string;
  businessName?: string | null;
  password: string;
  profileImage?: string | null;
  coverImage?: string | null;
  birthday: string;
  phone: string;
  address: string;
  isCompany: boolean;
  accountType: AccountType;
  preferredContactMethod: ContactMethod;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  regionId: number;
  countyId: number;
  cityId: number;
  countryId: number;
  userCategoryId?: number | null;
};

export type UserCategory = {
  id: number;
  name: string;
  level: number;
  categoryDiscountAmount: number;
  pointsThreshold: number;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
};
