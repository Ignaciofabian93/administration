import { AdminService } from "./controllers/admin";
import { ImpactServices } from "./controllers/impact";
import { LocationServices } from "./controllers/location";
import { ProductServices } from "./controllers/products";
import { SellerService } from "./controllers/sellers";
import { BlogServices } from "./controllers/blog";
import { CommunityServices } from "./controllers/community";
import { SellerLevelServices } from "./controllers/sellerLevel";
import { ServiceServices } from "./controllers/service";
import { OrderServices } from "./controllers/order";
import { StoreServices } from "./controllers/store";
import { PaymentServices } from "./controllers/payment";
import { NotificationServices } from "./controllers/notification";

export const MainService = {
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
  // Seller level services
  ...SellerLevelServices,
  // Service services
  ...ServiceServices,
  // Order services
  ...OrderServices,
  // Store services
  ...StoreServices,
  // Payment services
  ...PaymentServices,
  // Notification services
  ...NotificationServices,
};
