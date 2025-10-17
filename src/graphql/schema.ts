// Import all modular schema definitions
import { baseTypeDefs } from "./schemas/base";
import { enumsTypeDefs } from "./schemas/enums";
import { adminTypeDefs } from "./schemas/admin";
import { sellerTypeDefs } from "./schemas/seller";
import { productTypeDefs } from "./schemas/product";
import { serviceTypeDefs } from "./schemas/service";
import { locationTypeDefs } from "./schemas/location";
import { orderTypeDefs } from "./schemas/order";
import { paymentTypeDefs } from "./schemas/payment";
import { chatTypeDefs } from "./schemas/chat";
import { notificationTypeDefs } from "./schemas/notification";
import { socialTypeDefs } from "./schemas/social";
import { authTypeDefs } from "./schemas/auth";
import { blogTypeDefs } from "./schemas/blog";
import { communityTypeDefs } from "./schemas/community";
import { impactTypeDefs } from "./schemas/impact";
import { sellerLevelTypeDefs } from "./schemas/sellerLevel";
import { storeTypeDefs } from "./schemas/store";

/**
 * Combine all GraphQL type definitions
 *
 * Order matters:
 * 1. base - defines scalars, PageInfo, and root Query/Mutation types
 * 2. enums - defines all enum types used across schemas
 * 3. All domain schemas - extend Query and Mutation as needed
 */
export const typeDefs = [
  baseTypeDefs,
  enumsTypeDefs,
  adminTypeDefs,
  sellerTypeDefs,
  productTypeDefs,
  serviceTypeDefs,
  locationTypeDefs,
  orderTypeDefs,
  paymentTypeDefs,
  chatTypeDefs,
  notificationTypeDefs,
  socialTypeDefs,
  authTypeDefs,
  blogTypeDefs,
  communityTypeDefs,
  impactTypeDefs,
  sellerLevelTypeDefs,
  storeTypeDefs,
];
