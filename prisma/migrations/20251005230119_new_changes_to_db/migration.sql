-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'MODERATOR', 'CONTENT_MANAGER', 'SUPPORT');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FREE', 'PLUS', 'PREMIUM');

-- CreateEnum
CREATE TYPE "TransactionKind" AS ENUM ('PURCHASE', 'EXCHANGE', 'GIFT', 'REFERRAL', 'BONUS');

-- CreateEnum
CREATE TYPE "ShippingStage" AS ENUM ('PREPARING', 'SHIPPED', 'DELIVERED', 'RETURNED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('POPULAR', 'DISCOUNTED', 'WOMAN_OWNED', 'BEST_SELLER', 'TOP_RATED', 'COMMUNITY_FAVORITE', 'LIMITED_TIME_OFFER', 'FLASH_SALE', 'BEST_VALUE', 'HANDMADE', 'SUSTAINABLE', 'SUPPORTS_CAUSE', 'FAMILY_BUSINESS', 'CHARITY_SUPPORT', 'LIMITED_STOCK', 'SEASONAL', 'FREE_SHIPPING', 'FOR_REPAIR', 'REFURBISHED', 'EXCHANGEABLE', 'LAST_PRICE', 'FOR_GIFT', 'OPEN_TO_OFFERS', 'OPEN_BOX', 'CRUELTY_FREE', 'DELIVERED_TO_HOME', 'IN_HOUSE_PICKUP', 'IN_MID_POINT_PICKUP');

-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('EMAIL', 'WHATSAPP', 'PHONE', 'INSTAGRAM', 'FACEBOOK', 'WEBSITE', 'TIKTOK');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LB', 'OZ', 'G');

-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('XS', 'S', 'M', 'L', 'XL');

-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'OPEN_BOX', 'LIKE_NEW', 'FAIR', 'POOR', 'FOR_PARTS', 'REFURBISHED');

-- CreateEnum
CREATE TYPE "SellerType" AS ENUM ('PERSON', 'STORE', 'SERVICE');

-- CreateEnum
CREATE TYPE "ServicePricing" AS ENUM ('FIXED', 'QUOTATION', 'HOURLY', 'PACKAGE');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ORDER_RECEIVED', 'ORDER_CONFIRMED', 'ORDER_SHIPPED', 'ORDER_DELIVERED', 'ORDER_CANCELLED', 'QUOTATION_REQUEST', 'QUOTATION_RECEIVED', 'QUOTATION_ACCEPTED', 'QUOTATION_DECLINED', 'EXCHANGE_PROPOSAL', 'EXCHANGE_ACCEPTED', 'EXCHANGE_DECLINED', 'EXCHANGE_COMPLETED', 'PAYMENT_RECEIVED', 'PAYMENT_FAILED', 'PAYMENT_REFUNDED', 'REVIEW_RECEIVED', 'MESSAGE_RECEIVED', 'PRODUCT_LIKED', 'PRODUCT_COMMENTED', 'SYSTEM_ANNOUNCEMENT', 'ACCOUNT_VERIFICATION', 'PROFILE_UPDATED');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'APPLE_PAY', 'GOOGLE_PAY', 'STRIPE', 'CASH_ON_DELIVERY', 'CRYPTOCURRENCY', 'KHIPU', 'WEBPAY', 'MERCADO_PAGO', 'TRANSBANK', 'FLOW', 'ONECLICK', 'REDCOMPRA');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT', 'PREPAID');

-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CHECKING', 'SAVINGS', 'BUSINESS');

-- CreateEnum
CREATE TYPE "PaymentEnvironment" AS ENUM ('SANDBOX', 'PRODUCTION');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('RECYCLING', 'POLLUTION', 'SUSTAINABILITY', 'CIRCULAR_ECONOMY', 'USED_PRODUCTS', 'REUSE', 'ENVIRONMENT', 'UPCYCLING', 'RESPONSIBLE_CONSUMPTION', 'ECO_TIPS', 'ENVIRONMENTAL_IMPACT', 'SUSTAINABLE_LIVING', 'OTHER', 'SECURITY');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastName" TEXT,
    "role" "AdminRole" NOT NULL DEFAULT 'MODERATOR',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "County" (
    "id" SERIAL NOT NULL,
    "county" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isMatched" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "departmentName" TEXT NOT NULL,
    "departmentImage" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentCategory" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "departmentCategoryName" TEXT NOT NULL,

    CONSTRAINT "DepartmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "departmentCategoryId" INTEGER NOT NULL,
    "averageWeight" DOUBLE PRECISION DEFAULT 0.0,
    "fifthMaterialTypeId" INTEGER,
    "fifthMaterialTypeQuantity" DOUBLE PRECISION DEFAULT 0.0,
    "firstMaterialTypeId" INTEGER,
    "firstMaterialTypeQuantity" DOUBLE PRECISION DEFAULT 0.0,
    "fourthMaterialTypeId" INTEGER,
    "fourthMaterialTypeQuantity" DOUBLE PRECISION DEFAULT 0.0,
    "keywords" TEXT[],
    "productCategoryName" TEXT NOT NULL,
    "secondMaterialTypeId" INTEGER,
    "secondMaterialTypeQuantity" DOUBLE PRECISION DEFAULT 0.0,
    "size" "ProductSize" DEFAULT 'M',
    "thirdMaterialTypeId" INTEGER,
    "thirdMaterialTypeQuantity" DOUBLE PRECISION DEFAULT 0.0,
    "weightUnit" "WeightUnit" DEFAULT 'KG',

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "hasOffer" BOOLEAN NOT NULL DEFAULT false,
    "offerPrice" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "sellerId" TEXT NOT NULL,
    "badges" "Badge"[],
    "barcode" TEXT,
    "brand" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "images" TEXT[],
    "interests" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isExchangeable" BOOLEAN NOT NULL DEFAULT false,
    "productCategoryId" INTEGER NOT NULL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsNumber" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "condition" "ProductCondition" NOT NULL DEFAULT 'NEW',
    "conditionDescription" TEXT,
    "sustainabilityScore" INTEGER,
    "materialComposition" TEXT,
    "recycledContent" DOUBLE PRECISION,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "color" TEXT,
    "size" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLike" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "ProductLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER,

    CONSTRAINT "ProductComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceReview" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "kind" "TransactionKind" NOT NULL,
    "pointsCollected" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingStatusId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingStatus" (
    "id" SERIAL NOT NULL,
    "status" "ShippingStage" NOT NULL DEFAULT 'PREPARING',

    CONSTRAINT "ShippingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "productId" INTEGER,
    "isExchange" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "offeredProductId" INTEGER NOT NULL,
    "requestedProductId" INTEGER NOT NULL,
    "status" "ExchangeStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialImpactEstimate" (
    "id" SERIAL NOT NULL,
    "materialType" TEXT NOT NULL,
    "estimatedCo2SavingsKG" DOUBLE PRECISION NOT NULL,
    "estimatedWaterSavingsLT" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MaterialImpactEstimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Co2ImpactMessage" (
    "id" SERIAL NOT NULL,
    "min" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "max" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "message1" TEXT NOT NULL,
    "message2" TEXT NOT NULL,
    "message3" TEXT NOT NULL,

    CONSTRAINT "Co2ImpactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterImpactMessage" (
    "id" SERIAL NOT NULL,
    "min" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "max" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "message1" TEXT NOT NULL,
    "message2" TEXT NOT NULL,
    "message3" TEXT NOT NULL,

    CONSTRAINT "WaterImpactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "priority" "NotificationPriority" NOT NULL DEFAULT 'MEDIUM',
    "relatedId" TEXT,
    "actionUrl" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "quotationId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentProvider" TEXT,
    "externalId" TEXT,
    "description" TEXT,
    "fees" DOUBLE PRECISION DEFAULT 0,
    "netAmount" DOUBLE PRECISION,
    "payerId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "failureReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "processedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "bankMethodId" INTEGER,
    "cardMethodId" INTEGER,
    "chileanConfigId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRefund" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "externalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "PaymentRefund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationTemplate" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentWebhook" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER,
    "provider" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processingError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "PaymentWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethodCard" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "providerToken" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "cardLast4" TEXT NOT NULL,
    "cardBrand" TEXT NOT NULL,
    "cardType" "CardType" NOT NULL DEFAULT 'CREDIT',
    "expiryMonth" INTEGER NOT NULL,
    "expiryYear" INTEGER NOT NULL,
    "cardholderName" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "billingAddress" JSONB,
    "fingerprint" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethodCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethodBank" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerToken" TEXT NOT NULL,
    "accountLast4" TEXT NOT NULL,
    "bankName" TEXT,
    "accountType" "BankAccountType" NOT NULL DEFAULT 'CHECKING',
    "accountHolderName" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethodBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChileanPaymentConfig" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "merchantId" TEXT,
    "apiKey" TEXT,
    "secretKey" TEXT,
    "environment" "PaymentEnvironment" NOT NULL DEFAULT 'SANDBOX',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "webhookUrl" TEXT,
    "returnUrl" TEXT,
    "cancelUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChileanPaymentConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sellerType" "SellerType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT DEFAULT '',
    "cityId" INTEGER,
    "countryId" INTEGER,
    "countyId" INTEGER,
    "regionId" INTEGER,
    "phone" TEXT DEFAULT '',
    "website" TEXT,
    "preferredContactMethod" "ContactMethod" DEFAULT 'WHATSAPP',
    "socialMediaLinks" JSONB,
    "accountType" "AccountType" DEFAULT 'FREE',
    "points" INTEGER DEFAULT 0,
    "sellerCategoryId" INTEGER,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerPreferences" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "preferredLanguage" TEXT DEFAULT 'es',
    "currency" TEXT DEFAULT 'CLP',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "orderUpdates" BOOLEAN NOT NULL DEFAULT true,
    "communityUpdates" BOOLEAN NOT NULL DEFAULT true,
    "securityAlerts" BOOLEAN NOT NULL DEFAULT true,
    "weeklySummary" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SellerPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonProfile" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "displayName" TEXT,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "profileImage" TEXT,
    "coverImage" TEXT,
    "allowExchanges" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PersonProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreProfile" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "businessName" TEXT,
    "displayName" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "businessType" TEXT,
    "taxId" TEXT,
    "businessRegistration" TEXT,
    "allowExchanges" BOOLEAN NOT NULL DEFAULT false,
    "minOrderAmount" INTEGER,
    "shippingPolicy" TEXT,
    "returnPolicy" TEXT,
    "businessHours" JSONB,

    CONSTRAINT "StoreProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceProfile" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "businessName" TEXT,
    "displayName" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "businessType" TEXT,
    "taxId" TEXT,
    "businessRegistration" TEXT,
    "allowExchanges" BOOLEAN NOT NULL DEFAULT false,
    "minOrderAmount" INTEGER,
    "serviceArea" TEXT,
    "serviceHours" JSONB,
    "yearsOfExperience" INTEGER,
    "licenseNumber" TEXT,
    "insuranceInfo" TEXT,
    "certifications" TEXT[],
    "emergencyService" BOOLEAN NOT NULL DEFAULT false,
    "travelRadius" INTEGER,
    "responsiveness" TEXT,

    CONSTRAINT "ServiceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryDiscountAmount" INTEGER NOT NULL,
    "pointsThreshold" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "SellerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sellerId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "pricingType" "ServicePricing" NOT NULL DEFAULT 'QUOTATION',
    "basePrice" DOUBLE PRECISION,
    "priceRange" TEXT,
    "duration" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "images" TEXT[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedPrice" DOUBLE PRECISION,
    "finalPrice" DOUBLE PRECISION,
    "estimatedDuration" INTEGER,
    "status" "QuotationStatus" NOT NULL DEFAULT 'PENDING',
    "clientNotes" TEXT,
    "providerNotes" TEXT,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "tags" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "BlogCategory" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityComment" (
    "id" SERIAL NOT NULL,
    "communityPostId" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "Product_sellerId_idx" ON "Product"("sellerId");

-- CreateIndex
CREATE INDEX "Product_productCategoryId_idx" ON "Product"("productCategoryId");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_color_size_key" ON "ProductVariant"("productId", "color", "size");

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_transactionId_key" ON "Exchange"("transactionId");

-- CreateIndex
CREATE INDEX "Notification_sellerId_idx" ON "Notification"("sellerId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_externalId_key" ON "Payment"("externalId");

-- CreateIndex
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");

-- CreateIndex
CREATE INDEX "Payment_quotationId_idx" ON "Payment"("quotationId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_payerId_idx" ON "Payment"("payerId");

-- CreateIndex
CREATE INDEX "Payment_receiverId_idx" ON "Payment"("receiverId");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE INDEX "PaymentRefund_paymentId_idx" ON "PaymentRefund"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentRefund_status_idx" ON "PaymentRefund"("status");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTemplate_type_key" ON "NotificationTemplate"("type");

-- CreateIndex
CREATE INDEX "NotificationTemplate_type_idx" ON "NotificationTemplate"("type");

-- CreateIndex
CREATE INDEX "PaymentWebhook_paymentId_idx" ON "PaymentWebhook"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentWebhook_provider_idx" ON "PaymentWebhook"("provider");

-- CreateIndex
CREATE INDEX "PaymentWebhook_processed_idx" ON "PaymentWebhook"("processed");

-- CreateIndex
CREATE INDEX "PaymentTransaction_paymentId_idx" ON "PaymentTransaction"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_action_idx" ON "PaymentTransaction"("action");

-- CreateIndex
CREATE INDEX "PaymentTransaction_createdAt_idx" ON "PaymentTransaction"("createdAt");

-- CreateIndex
CREATE INDEX "PaymentMethodCard_sellerId_idx" ON "PaymentMethodCard"("sellerId");

-- CreateIndex
CREATE INDEX "PaymentMethodCard_provider_idx" ON "PaymentMethodCard"("provider");

-- CreateIndex
CREATE INDEX "PaymentMethodCard_isDefault_idx" ON "PaymentMethodCard"("isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodCard_sellerId_providerToken_key" ON "PaymentMethodCard"("sellerId", "providerToken");

-- CreateIndex
CREATE INDEX "PaymentMethodBank_sellerId_idx" ON "PaymentMethodBank"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodBank_sellerId_providerToken_key" ON "PaymentMethodBank"("sellerId", "providerToken");

-- CreateIndex
CREATE INDEX "ChileanPaymentConfig_sellerId_idx" ON "ChileanPaymentConfig"("sellerId");

-- CreateIndex
CREATE INDEX "ChileanPaymentConfig_provider_idx" ON "ChileanPaymentConfig"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "ChileanPaymentConfig_sellerId_provider_key" ON "ChileanPaymentConfig"("sellerId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");

-- CreateIndex
CREATE INDEX "Seller_email_idx" ON "Seller"("email");

-- CreateIndex
CREATE INDEX "Seller_sellerType_idx" ON "Seller"("sellerType");

-- CreateIndex
CREATE INDEX "Seller_isActive_idx" ON "Seller"("isActive");

-- CreateIndex
CREATE INDEX "Seller_isVerified_idx" ON "Seller"("isVerified");

-- CreateIndex
CREATE INDEX "Seller_cityId_idx" ON "Seller"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerPreferences_sellerId_key" ON "SellerPreferences"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonProfile_sellerId_key" ON "PersonProfile"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreProfile_sellerId_key" ON "StoreProfile"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProfile_sellerId_key" ON "ServiceProfile"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- CreateIndex
CREATE INDEX "Service_sellerId_idx" ON "Service"("sellerId");

-- CreateIndex
CREATE INDEX "Service_categoryId_idx" ON "Service"("categoryId");

-- CreateIndex
CREATE INDEX "Service_isActive_idx" ON "Service"("isActive");

-- CreateIndex
CREATE INDEX "Service_pricingType_idx" ON "Service"("pricingType");

-- CreateIndex
CREATE INDEX "BlogPost_isPublished_idx" ON "BlogPost"("isPublished");

-- CreateIndex
CREATE INDEX "BlogPost_publishedAt_idx" ON "BlogPost"("publishedAt");

-- CreateIndex
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");

-- CreateIndex
CREATE INDEX "CommunityPost_sellerId_idx" ON "CommunityPost"("sellerId");

-- CreateIndex
CREATE INDEX "CommunityPost_createdAt_idx" ON "CommunityPost"("createdAt");

-- CreateIndex
CREATE INDEX "CommunityComment_communityPostId_idx" ON "CommunityComment"("communityPostId");

-- CreateIndex
CREATE INDEX "CommunityComment_sellerId_idx" ON "CommunityComment"("sellerId");

-- CreateIndex
CREATE INDEX "CommunityComment_createdAt_idx" ON "CommunityComment"("createdAt");

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentCategory" ADD CONSTRAINT "DepartmentCategory_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_departmentCategoryId_fkey" FOREIGN KEY ("departmentCategoryId") REFERENCES "DepartmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_fifthMaterialTypeId_fkey" FOREIGN KEY ("fifthMaterialTypeId") REFERENCES "MaterialImpactEstimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_firstMaterialTypeId_fkey" FOREIGN KEY ("firstMaterialTypeId") REFERENCES "MaterialImpactEstimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_fourthMaterialTypeId_fkey" FOREIGN KEY ("fourthMaterialTypeId") REFERENCES "MaterialImpactEstimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_secondMaterialTypeId_fkey" FOREIGN KEY ("secondMaterialTypeId") REFERENCES "MaterialImpactEstimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_thirdMaterialTypeId_fkey" FOREIGN KEY ("thirdMaterialTypeId") REFERENCES "MaterialImpactEstimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLike" ADD CONSTRAINT "ProductLike_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLike" ADD CONSTRAINT "ProductLike_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReview" ADD CONSTRAINT "ServiceReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReview" ADD CONSTRAINT "ServiceReview_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingStatusId_fkey" FOREIGN KEY ("shippingStatusId") REFERENCES "ShippingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_offeredProductId_fkey" FOREIGN KEY ("offeredProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_requestedProductId_fkey" FOREIGN KEY ("requestedProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bankMethodId_fkey" FOREIGN KEY ("bankMethodId") REFERENCES "PaymentMethodBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cardMethodId_fkey" FOREIGN KEY ("cardMethodId") REFERENCES "PaymentMethodCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_chileanConfigId_fkey" FOREIGN KEY ("chileanConfigId") REFERENCES "ChileanPaymentConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRefund" ADD CONSTRAINT "PaymentRefund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentWebhook" ADD CONSTRAINT "PaymentWebhook_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethodCard" ADD CONSTRAINT "PaymentMethodCard_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethodBank" ADD CONSTRAINT "PaymentMethodBank_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChileanPaymentConfig" ADD CONSTRAINT "ChileanPaymentConfig_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_sellerCategoryId_fkey" FOREIGN KEY ("sellerCategoryId") REFERENCES "SellerCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerPreferences" ADD CONSTRAINT "SellerPreferences_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonProfile" ADD CONSTRAINT "PersonProfile_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProfile" ADD CONSTRAINT "StoreProfile_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceProfile" ADD CONSTRAINT "ServiceProfile_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_communityPostId_fkey" FOREIGN KEY ("communityPostId") REFERENCES "CommunityPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
