# GraphQL Schema Architecture

## Schema Organization Diagram

```
schema.ts (Main Entry Point)
    │
    ├─── base.ts ────────────── Foundation
    │    ├── Scalars (DateTime, JSON)
    │    ├── PageInfo (Pagination)
    │    ├── BulkImportResult
    │    └── Query & Mutation (Root types)
    │
    ├─── enums.ts ───────────── All Enumerations
    │    ├── Admin Enums
    │    ├── Account Enums
    │    ├── Business Enums
    │    ├── Product Enums
    │    ├── Service Enums
    │    ├── Order Enums
    │    ├── Payment Enums
    │    └── Notification Enums
    │
    ├─── admin.ts ───────────── Admin Management
    │    ├── Admin
    │    ├── AdminActivityLog
    │    ├── Queries: getAdmins, getAdmin, getMyData, getAdminActivityLogs
    │    └── Mutations: createAdmin, updateAdmin, deleteAdmin, lock/unlock
    │
    ├─── seller.ts ──────────── Seller & Profile Management
    │    ├── Seller
    │    ├── SellerPreferences
    │    ├── PersonProfile
    │    ├── BusinessProfile
    │    ├── Profile (Union)
    │    ├── Queries: getSeller, getMySeller, getSellerPreferences
    │    └── Mutations: update profiles, update preferences
    │
    ├─── product.ts ─────────── Product Catalog
    │    ├── Product
    │    ├── ProductCategory
    │    ├── DepartmentCategory
    │    ├── Department
    │    ├── ProductLike
    │    ├── ProductComment
    │    └── ProductCategoryMaterial
    │
    ├─── service.ts ─────────── Service Management
    │    ├── Service
    │    ├── ServiceCategory
    │    ├── ServiceSubCategory
    │    ├── ServiceReview
    │    ├── Quotation
    │    ├── Queries: services, categories, quotations, reviews
    │    └── Mutations: CRUD for services, quotations, reviews
    │
    ├─── order.ts ───────────── Order & Transaction Management
    │    ├── Order
    │    ├── OrderItem
    │    ├── ShippingStatus
    │    ├── Transaction
    │    ├── Exchange
    │    ├── Queries: orders, transactions, exchanges
    │    └── Mutations: order management, exchange management
    │
    ├─── payment.ts ─────────── Payment Processing
    │    ├── Payment
    │    ├── PaymentRefund
    │    ├── PaymentTransaction
    │    ├── PaymentWebhook
    │    ├── ChileanPaymentConfig
    │    ├── Queries: payments, payment config
    │    └── Mutations: payment creation, refunds
    │
    ├─── chat.ts ────────────── Messaging
    │    ├── Chat
    │    ├── Message
    │    ├── Queries: chats, messages
    │    └── Mutations: create chat, send message, delete chat
    │
    ├─── notification.ts ────── Notifications
    │    ├── Notification
    │    ├── NotificationTemplate
    │    ├── Queries: notifications, templates, unread count
    │    └── Mutations: mark as read, template management
    │
    ├─── social.ts ──────────── Social Features
    │    ├── Match
    │    ├── Story
    │    ├── Queries: matches, stories
    │    └── Mutations: match management, story CRUD
    │
    ├─── auth.ts ────────────── Authentication
    │    ├── Session
    │    └── Mutations: password management
    │
    ├─── location.ts ────────── Geographic Data
    │    ├── Country
    │    ├── Region
    │    ├── City
    │    ├── County
    │    ├── CountryConfig
    │    ├── Queries: location queries with pagination
    │    └── Mutations: location CRUD operations
    │
    ├─── blog.ts ────────────── Blog Management
    ├─── community.ts ───────── Community Features
    ├─── impact.ts ──────────── Impact Tracking
    ├─── sellerLevel.ts ─────── Seller Levels & Tiers
    └─── store.ts ───────────── Store Management
```

## Domain Relationships

```
┌────────────────────────────────────────────────────────────────┐
│                         Core Domains                            │
├────────────────────────────────────────────────────────────────┤
│  Admin ──────> Manages ──────> All Other Domains               │
│  Seller ─────> Has ──────────> Profile (Person | Business)     │
│  Seller ─────> Has ──────────> SellerPreferences               │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                      Commerce Domains                           │
├────────────────────────────────────────────────────────────────┤
│  Seller ─────> Offers ───────> Product                          │
│  Seller ─────> Offers ───────> Service                          │
│  Seller ─────> Creates ──────> Order                            │
│  Order ──────> Contains ─────> OrderItem ──────> Product        │
│  Seller ─────> Requests ─────> Quotation ──────> Service        │
│  Payment ────> Pays For ─────> Order | Quotation                │
│  Seller ─────> Proposes ─────> Exchange ───────> Product        │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                     Social & Content Domains                    │
├────────────────────────────────────────────────────────────────┤
│  Seller ─────> Creates ──────> Chat ───────────> Seller         │
│  Seller ─────> Sends ────────> Message ────────> Chat           │
│  Seller ─────> Creates ──────> Story                            │
│  Seller ─────> Creates ──────> Match ──────────> Seller         │
│  Seller ─────> Receives ─────> Notification                     │
│  Seller ─────> Writes ───────> ProductComment ─> Product        │
│  Seller ─────> Writes ───────> ServiceReview ──> Service        │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                      Support Domains                            │
├────────────────────────────────────────────────────────────────┤
│  Seller ─────> Located In ───> City ───> Region ──> Country    │
│  Payment ────> Uses ──────────> ChileanPaymentConfig            │
│  Admin ──────> Generates ─────> AdminActivityLog                │
│  Notification Uses ──────────> NotificationTemplate             │
└────────────────────────────────────────────────────────────────┘
```

## Query & Mutation Distribution

### Queries by Domain

- **Admin**: 4 queries (admins, admin, my data, activity logs)
- **Seller**: 3 queries (seller, my seller, preferences)
- **Product**: Multiple queries (products, categories, departments)
- **Service**: 7+ queries (services, categories, quotations, reviews)
- **Order**: 6 queries (orders, items, transactions, exchanges)
- **Payment**: 3 queries (payments, payment config)
- **Chat**: 3 queries (chats, my chats, messages)
- **Notification**: 5 queries (notifications, templates, unread count)
- **Social**: 4 queries (matches, stories)
- **Location**: 12+ queries (countries, regions, cities, counties)

### Mutations by Domain

- **Admin**: 5 mutations (create, update, delete, lock, unlock)
- **Auth**: 3 mutations (update password, request reset, reset)
- **Seller**: 4 mutations (update seller, update profiles, update preferences)
- **Service**: 11+ mutations (service, quotation, review management)
- **Order**: 6 mutations (order, exchange management)
- **Payment**: 3 mutations (create, update status, refund)
- **Chat**: 3 mutations (create, send, delete)
- **Notification**: 6 mutations (mark read, template management)
- **Social**: 6 mutations (match, story management)
- **Location**: 12+ mutations (location CRUD operations)

## File Size Comparison

### Before Refactoring

- schema.ts: ~600+ lines (monolithic)

### After Refactoring

- schema.ts: 50 lines (imports only)
- base.ts: ~40 lines
- enums.ts: ~278 lines
- admin.ts: ~120 lines
- seller.ts: ~260 lines
- service.ts: ~200 lines
- order.ts: ~130 lines
- payment.ts: ~150 lines
- chat.ts: ~60 lines
- notification.ts: ~80 lines
- social.ts: ~70 lines
- auth.ts: ~20 lines
- Other domains: varies

**Total lines remain the same, but organized into 18 focused files!**

## Benefits Summary

### Developer Experience

✅ Faster file navigation
✅ Better IDE performance
✅ Clearer code organization
✅ Easier to locate specific types
✅ Reduced cognitive load

### Team Collaboration

✅ Multiple devs can work simultaneously
✅ Fewer merge conflicts
✅ Clear domain ownership
✅ Easier code reviews

### Maintenance

✅ Isolated changes
✅ Easy to add new features
✅ Better testability
✅ Self-documenting structure

### Performance

✅ Tree-shaking friendly
✅ Faster compilation
✅ Smaller git diffs
✅ Better caching

## Next Steps

1. **Test the schema** - Ensure all queries and mutations work
2. **Update resolvers** - Verify resolver structure matches new schema
3. **Update documentation** - Keep API docs in sync
4. **Add schema comments** - Document each type with descriptions
5. **Set up linting** - Add GraphQL ESLint for consistency
