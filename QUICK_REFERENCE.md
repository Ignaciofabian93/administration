# 🚀 Quick Reference - Administration API

## 📍 Server URLs

- **Base URL:** `http://localhost:6000`
- **GraphQL:** `http://localhost:6000/graphql`
- **Health:** `http://localhost:6000/health`

---

## 🔐 Authentication (REST)

### Admin Login

```bash
POST /auth/authAdmin
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}

Response: { "token": "...", "message": "Inicio de sesión exitoso" }
Cookies: x-o-token, x-o-refresh-token
```

### Seller Login

```bash
POST /auth/auth
Content-Type: application/json

{
  "email": "seller@example.com",
  "password": "your-password"
}

Response: { "token": "...", "message": "Inicio de sesión exitoso" }
Cookies: token, refreshToken
```

---

## 🔄 Token Refresh

### Refresh Admin Token

```bash
POST /auth/refreshAdmin
(Cookies sent automatically)

Response: { "token": "new-token", "success": true }
```

### Refresh Seller Token

```bash
POST /auth/refresh
(Cookies sent automatically)

Response: { "token": "new-token", "success": true }
```

---

## 🎯 GraphQL Queries

**Note:** After login, cookies are sent automatically!

### Get My Data

```graphql
query {
  getMyData {
    id
    name
    email
    role
    permissions
  }
}
```

### Get Countries

```graphql
query {
  getCountries {
    id
    country
  }
}
```

### Get Regions

```graphql
query GetRegions($countryId: ID!) {
  getRegions(countryId: $countryId) {
    id
    region
  }
}

# Variables:
{ "countryId": "1" }
```

### Get Admins

```graphql
query GetAdmins($limit: Int, $isActive: Boolean) {
  getAdmins(limit: $limit, isActive: $isActive) {
    id
    name
    email
    role
    isActive
  }
}

# Variables:
{ "limit": 10, "isActive": true }
```

### Get Departments

```graphql
query {
  getDepartments {
    id
    name
    description
  }
}
```

---

## ✏️ GraphQL Mutations

### Create Admin

```graphql
mutation CreateAdmin($input: RegisterAdminInput!) {
  createAdmin(input: $input) {
    id
    email
    name
    role
  }
}

# Variables:
{
  "input": {
    "email": "newadmin@example.com",
    "name": "John",
    "password": "SecurePassword123!",
    "role": "MODERATOR"
  }
}
```

### Update Admin

```graphql
mutation UpdateAdmin($adminId: ID!, $name: String, $isActive: Boolean) {
  updateAdmin(adminId: $adminId, name: $name, isActive: $isActive) {
    id
    name
    isActive
  }
}

# Variables:
{
  "adminId": "admin-id-here",
  "name": "Updated Name",
  "isActive": true
}
```

### Delete Admin

```graphql
mutation DeleteAdmin($adminId: ID!) {
  deleteAdmin(adminId: $adminId)
}

# Variables:
{ "adminId": "admin-id-here" }
```

---

## 🍪 Cookies Reference

| Cookie Name       | User Type | Duration | Purpose              |
| ----------------- | --------- | -------- | -------------------- |
| x-o-token         | Admin     | 15 min   | Admin access token   |
| x-o-refresh-token | Admin     | 7 days   | Admin refresh token  |
| token             | Seller    | 15 min   | Seller access token  |
| refreshToken      | Seller    | 7 days   | Seller refresh token |

---

## 📝 Postman Tips

1. **Import Collection:** `Administration_API.postman_collection.json`
2. **Enable Cookies:** Settings → Send cookies (ON)
3. **View Cookies:** Click "Cookies" below Send button
4. **Clear Cookies:** Manage Cookies → Delete All
5. **Environment:** Set `baseUrl` = `http://localhost:6000`

---

## 🔧 Testing Workflow

1. **Start Server**

   ```bash
   npm run dev
   ```

2. **Login** (REST)

   ```
   POST /auth/authAdmin
   Body: { email, password }
   ```

3. **Verify Cookies**

   - Cookies → localhost:6000
   - Check: x-o-token exists

4. **Query GraphQL**
   ```
   POST /graphql
   Body: { query: "..." }
   ```
   Cookies sent automatically! ✨

---

## ⚡ Environment Variables

```env
PORT=6000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
ENVIRONMENT=development
```

---

## 🎨 Admin Roles

- SUPER_ADMIN
- MODERATOR
- CONTENT_MANAGER
- SUPPORT
- BUSINESS_OWNER
- BUSINESS_MANAGER
- BUSINESS_ANALYST
- BUSINESS_SUPPORT

---

## 🛡️ Admin Permissions

- MANAGE_PRODUCTS
- APPROVE_PRODUCTS
- DELETE_PRODUCTS
- WRITE_BLOG
- PUBLISH_BLOG
- DELETE_BLOG
- MODERATE_CONTENT
- MANAGE_USERS
- BAN_USERS
- VIEW_USER_DATA
- MANAGE_ORDERS
- PROCESS_REFUNDS
- VIEW_TRANSACTIONS
- VIEW_ANALYTICS
- EXPORT_DATA
- MANAGE_ADMINS
- MANAGE_CATEGORIES
- MANAGE_SETTINGS
- VIEW_SYSTEM_LOGS
- MANAGE_BUSINESS_PROFILE
- MANAGE_BUSINESS_TEAM
- VIEW_BUSINESS_ANALYTICS
- MANAGE_BUSINESS_PRODUCTS
- MANAGE_BUSINESS_ORDERS

---

## 📚 Documentation Files

- `POSTMAN_TESTING_GUIDE.md` - Detailed testing guide
- `REST_AUTH_COMPLETE.md` - Auth setup documentation
- `STANDALONE_GUIDE.md` - Server setup guide
- `Administration_API.postman_collection.json` - Postman collection

---

## 🐛 Quick Troubleshooting

| Problem           | Solution                            |
| ----------------- | ----------------------------------- |
| adminId undefined | Login first via REST auth           |
| JWT expired       | Refresh token or login again        |
| CORS error        | Check origin in allowedOrigins      |
| Cookies not sent  | Use Desktop Postman, enable cookies |
| 401 Unauthorized  | Token invalid/expired, login again  |

---

**🎉 Happy Testing!**
