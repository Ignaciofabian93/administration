# User Subgraph Schema Updates

## Overview

This document outlines the comprehensive updates made to the user subgraph to align with the Prisma schema and provide full user-related functionality for the Ekoru platform.

## Key Changes Made

### 1. GraphQL Schema Updates (`src/graphql/schema.ts`)

- **Replaced** old User type with new structure based on Seller model
- **Updated** enums to match Prisma schema:
  - `PreferredContactMethod` → `ContactMethod`
  - Added `SellerType` enum (PERSON, STORE)
- **Added** new types:
  - `PersonProfile` - for individual users
  - `StoreProfile` - for business users
  - `Session` - for authentication sessions
  - `JSON` scalar for flexible data
- **Added** comprehensive input types for registration and updates
- **Expanded** queries to include filtering, pagination, and new endpoints
- **Added** comprehensive mutations for:
  - Registration (separate for persons and stores)
  - Authentication (login, logout, token refresh)
  - Password management
  - Profile updates
  - Account management
  - Points system
  - Admin functions

### 2. Type Definitions Updates (`src/types/`)

#### `enums.ts`

- Added `SellerType` enum
- Updated `ProductSize` values to match Prisma
- Added missing enums (`ExchangeStatus`, `ProductCondition`)

#### `user.ts`

- **Completely rewritten** to match Prisma schema
- New `User` type based on `Seller` model
- Added `PersonProfile` and `StoreProfile` types
- Added input types for registration and updates
- Updated `UserCategory` to include `level` field
- Updated `Session` structure

#### `context.ts`

- Added `userId` to context for authentication

### 3. Service Layer Rewrite (`src/graphql/services/users.ts`)

- **Complete rewrite** to work with new Prisma schema
- Updated all database queries to use `Seller` model instead of `User`
- Added comprehensive user management functions:
  - Registration with profile creation in transactions
  - Authentication with JWT and session management
  - Password hashing with bcrypt (increased salt rounds to 12)
  - Profile management for both person and store types
  - Points and category management
  - Admin functions
- **Improved error handling** with proper error types
- Added transaction support for data consistency

### 4. Resolver Updates (`src/graphql/resolvers/users.ts`)

- **Complete rewrite** to match new schema
- Added resolvers for all new queries and mutations
- Added proper field resolvers for nested data
- Updated parameter handling to match new input types
- Added context-based authentication for protected operations

### 5. Authentication Middleware (`src/middleware/auth.ts`)

- Updated token decoding to match new JWT structure
- Added context creation helper
- Improved error handling

### 6. Main Application (`src/index.ts`)

- Updated to use new context creation
- Simplified error formatting for development

## New Capabilities

### Authentication & Authorization

- JWT-based authentication with session management
- Secure password hashing with bcrypt
- Token refresh capability (skeleton)
- Session management (list, logout single, logout all)

### User Registration

- Separate registration flows for persons and stores
- Profile creation with comprehensive data
- Email notifications on registration
- Proper data validation

### Profile Management

- Update user account information
- Separate profile updates for persons and stores
- Image upload support (profile and cover images)
- Location data management

### Account Management

- Account deactivation/reactivation
- Account deletion with password confirmation
- Email verification system (skeleton)
- Password reset system (skeleton)

### Points & Rewards System

- Add/deduct points functionality
- User category management based on points
- Category-based discounts

### Location Services

- Hierarchical location queries (Country → Region → City → County)
- Location-based user filtering

### Admin Functions

- Create users programmatically
- Update user status and properties
- Delete users
- User verification management

### Enhanced Queries

- Filtering by user type, status, verification
- Pagination support
- Store catalog functionality
- User category management
- Session management

## Database Schema Alignment

The service now fully aligns with your Prisma schema:

- Uses `Seller` as the main user entity
- Supports both `PERSON` and `STORE` user types
- Proper relationships with location entities
- Session management through `Session` model
- Profile data through `PersonProfile` and `StoreProfile`

## Federation Compatibility

- Maintains Apollo Federation v2 compatibility
- Proper entity resolution with `@key` directive
- Shareable fields where appropriate

## Security Improvements

- Increased password hashing rounds (12 vs default 10)
- Proper JWT secret handling with fallback
- Session-based authentication tracking
- Password confirmation for destructive operations

## Areas for Future Implementation

Several mutations have skeleton implementations that need to be completed:

1. `refreshToken` - JWT token refresh logic
2. `requestPasswordReset` - Email-based password reset
3. `resetPassword` - Password reset with token validation
4. `verifyAccount` - Email verification system
5. `resendVerificationEmail` - Resend verification emails

## Migration Considerations

If you have existing data in the old User table, you'll need to:

1. Migrate data from `User` table to `Seller` table
2. Create corresponding `PersonProfile`/`StoreProfile` records
3. Update any existing authentication tokens
4. Run the new Prisma migrations

The updated schema provides a robust foundation for your user management system that aligns with your microservices architecture and supports all the user-related features needed for the Ekoru platform.
