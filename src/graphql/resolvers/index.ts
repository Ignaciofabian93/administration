import { MainResolver } from "./main";

export const resolvers = {
  Query: {
    ...MainResolver.Query,
  },
  Mutation: {
    ...MainResolver.Mutation,
  },

  // // Core entities with relationships
  // Admin: {
  //   ...MainResolver.Admin, // city, country, county, region, seller, activityLogs relationships
  // },
  // Seller: {
  //   ...MainResolver.Seller, // city, country, county, region, sellerCategory, sellerLevel, preferences, personProfile, businessProfile relationships
  // },

  // // Location entities
  // Country: {
  //   ...MainResolver.Country, // countryConfig, regions, sellers relationships
  // },
  // Region: {
  //   ...MainResolver.Region, // country, cities, sellers relationships
  // },
  // City: {
  //   ...MainResolver.City, // region, counties, sellers relationships
  // },
  // County: {
  //   ...MainResolver.County, // city, sellers relationships
  // },
  // CountryConfig: {
  //   ...MainResolver.CountryConfig, // country relationship
  // },

  // // Product-related entities
  // Product: {
  //   ...MainResolver.Product, // seller, productCategory, comments, likes, chats, exchanges, itemsOrdered relationships
  // },
  // ProductCategory: {
  //   ...MainResolver.ProductCategory, // departmentCategory, products, productCategoryMaterials relationships
  // },
  // ProductComment: {
  //   ...MainResolver.ProductComment, // product, seller relationships
  // },
  // ProductLike: {
  //   ...MainResolver.ProductLike, // product, seller relationships
  // },
  // ProductVariant: {
  //   ...MainResolver.ProductVariant, // storeProduct relationship
  // },
  // ProductCategoryMaterial: {
  //   ...MainResolver.ProductCategoryMaterial, // productCategory, materialImpactEstimate relationships
  // },

  // // Department entities
  // Department: {
  //   ...MainResolver.Department, // departmentCategories relationship
  // },
  // DepartmentCategory: {
  //   ...MainResolver.DepartmentCategory, // department, productCategories relationships
  // },

  // // Store entities
  // StoreCategory: {
  //   ...MainResolver.StoreCategory, // storeSubCategories relationship
  // },
  // StoreSubCategory: {
  //   ...MainResolver.StoreSubCategory, // storeCategory, storeProducts relationships
  // },
  // StoreProduct: {
  //   ...MainResolver.StoreProduct, // seller, storeSubCategory, productVariants, storeProductMaterials relationships
  // },
  // StoreProductMaterial: {
  //   ...MainResolver.StoreProductMaterial, // storeProduct, materialImpactEstimate relationships
  // },

  // // Service entities
  // ServiceCategory: {
  //   ...MainResolver.ServiceCategory, // serviceSubCategories relationship
  // },
  // ServiceSubCategory: {
  //   ...MainResolver.ServiceSubCategory, // serviceCategory, services relationships
  // },
  // Service: {
  //   ...MainResolver.Service, // seller, serviceSubCategory, quotations, reviews relationships
  // },
  // ServiceReview: {
  //   ...MainResolver.ServiceReview, // service, reviewer relationships
  // },
  // Quotation: {
  //   ...MainResolver.Quotation, // service, client, provider, payments relationships
  // },

  // // Community entities
  // BlogPost: {
  //   ...MainResolver.BlogPost, // author relationship
  // },
  // CommunityPost: {
  //   ...MainResolver.CommunityPost, // seller, commentsList relationships
  // },
  // CommunityComment: {
  //   ...MainResolver.CommunityComment, // communityPost, seller relationships
  // },
  // CommunityCategory: {
  //   ...MainResolver.CommunityCategory, // communitySubCategories relationship
  // },
  // CommunitySubCategory: {
  //   ...MainResolver.CommunitySubCategory, // communityCategory relationship
  // },

  // // Order and Transaction entities
  // Order: {
  //   ...MainResolver.Order, // seller, shippingStatus, orderItems, payments relationships
  // },
  // OrderItem: {
  //   ...MainResolver.OrderItem, // order, product relationships
  // },
  // ShippingStatus: {
  //   ...MainResolver.ShippingStatus, // orders relationship
  // },
  // Transaction: {
  //   ...MainResolver.Transaction, // seller, exchange relationships
  // },
  // Exchange: {
  //   ...MainResolver.Exchange, // offeredProduct, requestedProduct, transaction relationships
  // },

  // // Payment entities
  // Payment: {
  //   ...MainResolver.Payment, // order, quotation, payer, receiver, chileanConfig, refunds, transactions, webhooks relationships
  // },
  // PaymentRefund: {
  //   ...MainResolver.PaymentRefund, // payment relationship
  // },
  // PaymentTransaction: {
  //   ...MainResolver.PaymentTransaction, // payment relationship
  // },
  // PaymentWebhook: {
  //   ...MainResolver.PaymentWebhook, // payment relationship
  // },
  // ChileanPaymentConfig: {
  //   ...MainResolver.ChileanPaymentConfig, // seller, payments relationships
  // },

  // // Communication entities
  // Chat: {
  //   ...MainResolver.Chat, // sender, receiver, product, messages relationships
  // },
  // Message: {
  //   ...MainResolver.Message, // chat, sender relationships
  // },

  // // Notification entities
  // Notification: {
  //   ...MainResolver.Notification, // seller relationship
  // },

  // // Profile entities
  // PersonProfile: {
  //   ...MainResolver.PersonProfile, // seller relationship
  // },
  // BusinessProfile: {
  //   ...MainResolver.BusinessProfile, // seller relationship
  // },
  // SellerPreferences: {
  //   ...MainResolver.SellerPreferences, // seller relationship
  // },
  // SellerCategory: {
  //   ...MainResolver.SellerCategory, // sellers relationship
  // },
  // SellerLevel: {
  //   ...MainResolver.SellerLevel, // sellers relationship
  // },

  // // Material Impact entities
  // MaterialImpactEstimate: {
  //   ...MainResolver.MaterialImpactEstimate, // productCategoryMaterials, storeProductMaterials relationships
  // },

  // // Social entities
  // Match: {
  //   ...MainResolver.Match, // sender, receiver relationships
  // },
  // Story: {
  //   ...MainResolver.Story, // seller relationship
  // },

  // // Activity Log
  // AdminActivityLog: {
  //   ...MainResolver.AdminActivityLog, // admin relationship
  // },
};
