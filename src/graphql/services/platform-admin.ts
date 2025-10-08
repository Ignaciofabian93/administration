import { AdminService } from "./platform/admin";
import { ImpactServices } from "./platform/impact";
import { LocationServices } from "./platform/location";
import { ProductServices } from "./platform/products";
import { SellerService } from "./platform/sellers";

export const PlatformAdminService = {
  // Location services
  ...LocationServices,
  // Product services
  ...ProductServices,
  // Impact services
  ...ImpactServices,
  // Admin services
  ...AdminService,
  // Seller services
  ...SellerService,
};
