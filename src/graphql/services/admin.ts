import { AdminService } from "./controllers/admin";
import { ImpactServices } from "./controllers/impact";
import { LocationServices } from "./controllers/location";
import { ProductServices } from "./controllers/products";
import { SellerService } from "./controllers/sellers";
import { BlogServices } from "./controllers/blog";
import { CommunityServices } from "./controllers/community";

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
  // Blog services
  ...BlogServices,
  // Community services
  ...CommunityServices,
};
