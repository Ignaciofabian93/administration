export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isCompany: boolean;
  address: string;
  county: string;
  city: string;
  region: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type PasswordUpdate = {
  password: string;
  newPassword: string;
};
