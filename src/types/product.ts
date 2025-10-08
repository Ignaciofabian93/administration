import { type Badge, type ProductSize, type WeightUnit, type ProductCondition } from "./enums";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  hasOffer: boolean;
  offerPrice: number;
  stock: number;
  sellerId: string;
  badges: Badge[];
  barcode?: string | null;
  brand: string;
  color?: string | null;
  createdAt: Date;
  images: string[];
  interests: string[];
  isActive: boolean;
  isExchangeable: boolean;
  productCategoryId: number;
  ratingCount: number;
  ratings: number;
  reviewsNumber: number;
  sku?: string | null;
  updatedAt: Date;
  condition: ProductCondition;
  conditionDescription?: string | null;
  sustainabilityScore?: number | null;
  materialComposition?: string | null;
  recycledContent?: number | null;
};

export type ProductVariant = {
  id: number;
  productId: number;
  name: string;
  price: number;
  stock: number;
  color?: string | null;
  size?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductCategory = {
  id: number;
  departmentCategoryId: number;
  averageWeight?: number | null;
  fifthMaterialTypeId?: number | null;
  fifthMaterialTypeQuantity?: number | null;
  firstMaterialTypeId?: number | null;
  firstMaterialTypeQuantity?: number | null;
  fourthMaterialTypeId?: number | null;
  fourthMaterialTypeQuantity?: number | null;
  keywords: string[];
  productCategoryName: string;
  secondMaterialTypeId?: number | null;
  secondMaterialTypeQuantity?: number | null;
  size?: ProductSize | null;
  thirdMaterialTypeId?: number | null;
  thirdMaterialTypeQuantity?: number | null;
  weightUnit?: WeightUnit | null;
};

export type DepartmentCategory = {
  id: number;
  departmentId: number;
  departmentCategoryName: string;
};

export type Department = {
  id: number;
  departmentName: string;
  departmentImage?: string | null;
};

export type MaterialImpactEstimate = {
  id: number;
  materialType: string;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
};

export type Co2ImpactMessage = {
  id: number;
  min: number;
  max: number;
  message1: string;
  message2: string;
  message3: string;
};

export type WaterImpactMessage = {
  id: number;
  min: number;
  max: number;
  message1: string;
  message2: string;
  message3: string;
};
