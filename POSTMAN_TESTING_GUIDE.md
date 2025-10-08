# Testing with Postman - Complete Guide

This guide explains how to test both REST authentication and GraphQL queries with Postman, including cookie-based authentication.

## 📋 Prerequisites

- Postman installed (Desktop version recommended for better cookie handling)
- Server running on `http://localhost:6000`

---

## 🔐 Part 1: REST Authentication

### 1. Admin Login

**Create a new request:**

- **Method:** `POST`
- **URL:** `http://localhost:6000/auth/authAdmin`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "admin@example.com",
    "password": "your-password"
  }
  ```

**Expected Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Inicio de sesión exitoso"
}
```

**Important:** The cookies `x-o-token` and `x-o-refresh-token` will be automatically saved by Postman.

---

### 2. Seller Login

**Create a new request:**

- **Method:** `POST`
- **URL:** `http://localhost:6000/auth/auth`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "seller@example.com",
    "password": "your-password"
  }
  ```

**Expected Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Inicio de sesión exitoso"
}
```

**Important:** The cookies `token` and `refreshToken` will be automatically saved by Postman.

---

### 3. Refresh Admin Token

**Create a new request:**

- **Method:** `POST`
- **URL:** `http://localhost:6000/auth/refreshAdmin`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Note:** Cookies are sent automatically by Postman

**Expected Response:**

```json
{
  "token": "new-token-here",
  "success": true
}
```

---

### 4. Refresh Seller Token

**Create a new request:**

- **Method:** `POST`
- **URL:** `http://localhost:6000/auth/refresh`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Note:** Cookies are sent automatically by Postman

**Expected Response:**

```json
{
  "token": "new-token-here",
  "success": true
}
```

---

## 🚀 Part 2: Testing GraphQL with Cookie Authentication

### Important: Cookie Configuration in Postman

1. **Enable Cookie Sending:**

   - Go to Settings (⚙️ icon) → General
   - Make sure "Automatically follow redirects" is ON
   - Make sure "Send cookies" is ON

2. **View Cookies:**
   - Click "Cookies" link (under the Send button)
   - Select `localhost:6000`
   - You should see your cookies: `x-o-token`, `x-o-refresh-token` (or `token`, `refreshToken` for sellers)

---

### Method 1: Using Cookies (Recommended)

After logging in via REST, cookies are automatically included in requests to the same domain.

**Create a new GraphQL request:**

- **Method:** `POST`
- **URL:** `http://localhost:6000/graphql`
- **Headers:**
  ```
  Content-Type: application/json
  x-admin-id: <your-admin-id>
  ```
- **Body (raw JSON):**
  ```json
  {
    "query": "query GetMyData { getMyData { id name email role permissions } }"
  }
  ```

**Or with variables:**

```json
{
  "query": "query GetAdmins($limit: Int, $isActive: Boolean) { getAdmins(limit: $limit, isActive: $isActive) { id name email role isActive } }",
  "variables": {
    "limit": 10,
    "isActive": true
  }
}
```

---

### Method 2: Using Authorization Header (Alternative)

If you prefer to use the token directly from the login response:

- **Method:** `POST`
- **URL:** `http://localhost:6000/graphql`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer <paste-token-from-login-response>
  x-admin-id: <your-admin-id>
  ```
- **Body (raw JSON):**
  ```json
  {
    "query": "query GetMyData { getMyData { id name email role } }"
  }
  ```

---

## 📝 Example GraphQL Queries

### 1. Get My Admin Data

```json
{
  "query": "query GetMyData { getMyData { id name email role permissions city { city } country { country } } }"
}
```

---

### 2. Get All Countries

```json
{
  "query": "query GetCountries { getCountries { id country } }"
}
```

---

### 3. Get Regions by Country

```json
{
  "query": "query GetRegions($countryId: ID!) { getRegions(countryId: $countryId) { id region } }",
  "variables": {
    "countryId": "1"
  }
}
```

---

### 4. Get All Admins (with filters)

```json
{
  "query": "query GetAdmins($adminType: AdminType, $role: AdminRole, $isActive: Boolean, $limit: Int) { getAdmins(adminType: $adminType, role: $role, isActive: $isActive, limit: $limit) { id name email role adminType isActive createdAt } }",
  "variables": {
    "adminType": "PLATFORM",
    "isActive": true,
    "limit": 20
  }
}
```

---

### 5. Get Specific Admin

```json
{
  "query": "query GetAdmin($id: ID!) { getAdmin(id: $id) { id name email role permissions activityLogs { action createdAt } } }",
  "variables": {
    "id": "admin-id-here"
  }
}
```

---

### 6. Create Admin (Mutation)

```json
{
  "query": "mutation CreateAdmin($input: RegisterAdminInput!) { createAdmin(input: $input) { id email name role } }",
  "variables": {
    "input": {
      "email": "newadmin@example.com",
      "name": "John",
      "password": "SecurePassword123!",
      "lastName": "Doe",
      "role": "MODERATOR",
      "adminType": "PLATFORM",
      "permissions": ["MANAGE_PRODUCTS", "APPROVE_PRODUCTS"]
    }
  }
}
```

---

### 7. Update Admin (Mutation)

```json
{
  "query": "mutation UpdateAdmin($adminId: ID!, $name: String, $role: AdminRole, $isActive: Boolean) { updateAdmin(adminId: $adminId, name: $name, role: $role, isActive: $isActive) { id name role isActive } }",
  "variables": {
    "adminId": "admin-id-here",
    "name": "Updated Name",
    "role": "CONTENT_MANAGER",
    "isActive": true
  }
}
```

---

## 🎯 Creating a Postman Collection

### Step 1: Create Collection Structure

1. Create a new Collection: "Administration API"
2. Add two folders:
   - "Auth (REST)"
   - "GraphQL Queries"

### Step 2: Set Collection Variables

In Collection settings → Variables tab:

| Variable | Initial Value         | Current Value             |
| -------- | --------------------- | ------------------------- |
| baseUrl  | http://localhost:6000 | http://localhost:6000     |
| adminId  | (leave empty)         | (will be filled manually) |

### Step 3: Auth Folder Requests

Add these requests to "Auth (REST)" folder:

1. **Admin Login** - POST `{{baseUrl}}/auth/authAdmin`
2. **Seller Login** - POST `{{baseUrl}}/auth/auth`
3. **Refresh Admin Token** - POST `{{baseUrl}}/auth/refreshAdmin`
4. **Refresh Seller Token** - POST `{{baseUrl}}/auth/refresh`

### Step 4: GraphQL Folder Requests

Add these to "GraphQL Queries" folder:

1. **Get My Data** - POST `{{baseUrl}}/graphql`
2. **Get Countries** - POST `{{baseUrl}}/graphql`
3. **Get Admins** - POST `{{baseUrl}}/graphql`
4. **Create Admin** - POST `{{baseUrl}}/graphql`

For all GraphQL requests, add this header:

```
x-admin-id: {{adminId}}
```

---

## 🔍 Troubleshooting

### Issue: "Not allowed by CORS"

**Solution:** Make sure your request is being sent to `localhost:6000`, not `127.0.0.1:6000`

---

### Issue: Cookies not being sent

**Solution:**

1. Check Postman Settings → General → "Send cookies" is enabled
2. Use Desktop Postman (better cookie support than web version)
3. Clear cookies and login again
4. Check cookies are for the correct domain (localhost:6000)

---

### Issue: "No se pudo generar un nuevo token de acceso"

**Solution:**

1. Login again to get fresh cookies
2. Make sure cookies haven't expired (7 days for refresh token)
3. Check you're using the correct endpoint (admin vs seller)

---

### Issue: GraphQL queries return null or errors

**Solution:**

1. Make sure you logged in first (have valid cookies)
2. Add the `x-admin-id` header with your admin ID
3. Check the console logs in your server terminal for errors
4. Verify your query syntax is correct

---

### Issue: "adminId is undefined"

**Solution:** Add the `x-admin-id` header to your GraphQL requests with your admin user ID.

---

## 💡 Pro Tips

1. **Use Environment Variables:** Create different environments (Development, QA, Production) in Postman

2. **Automate Token Extraction:** Add a test script to your login request:

   ```javascript
   // In the "Tests" tab of your login request
   const response = pm.response.json();
   pm.collectionVariables.set("token", response.token);
   ```

3. **Check Cookies Easily:** Click on "Cookies" link below the Send button

4. **Copy as cURL:** Right-click on request → Code → cURL to share with team

5. **Save Responses:** Save example responses to document your API

---

## 📚 Additional Resources

- [Postman Cookie Documentation](https://learning.postman.com/docs/sending-requests/cookies/)
- [GraphQL Queries Documentation](https://graphql.org/learn/queries/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)

---

## 🎉 Quick Start Workflow

1. **Login as Admin:**

   ```
   POST http://localhost:6000/auth/authAdmin
   Body: { "email": "admin@example.com", "password": "password" }
   ```

2. **Check cookies were saved:**

   - Click "Cookies" button
   - Verify `x-o-token` and `x-o-refresh-token` exist

3. **Test GraphQL:**

   ```
   POST http://localhost:6000/graphql
   Headers: x-admin-id: <your-admin-id>
   Body: { "query": "query { getMyData { id name email } }" }
   ```

4. **Success!** 🎊 You're ready to test all queries!
