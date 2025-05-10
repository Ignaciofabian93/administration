export type NewUser = {
  name: string;
  surnames: string;
  email: string;
  password: string;
  isCompany: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  surnames: string;
  email: string;
  password: string;
  isCompany: boolean;
  address: string;
  countyId: number;
  cityId: number;
  regionId: number;
  countryId: number;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type PasswordUpdate = {
  password: string;
  newPassword: string;
};
