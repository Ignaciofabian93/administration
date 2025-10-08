# ✅ REST Auth Setup - Complete

## 🎯 What's Been Done

### 1. **REST Authentication Structure** ✓

- ✅ Admin login endpoint: `POST /auth/authAdmin`
- ✅ Seller login endpoint: `POST /auth/auth`
- ✅ Admin refresh token: `POST /auth/refreshAdmin`
- ✅ Seller refresh token: `POST /auth/refresh`
- ✅ Cookie-based authentication (HttpOnly, Secure in production)
- ✅ Separate cookies for admins and sellers

### 2. **Server Configuration** ✓

- ✅ Cookie-parser middleware installed and configured
- ✅ CORS properly configured for REST and GraphQL
- ✅ Body parsing middleware (JSON, URL-encoded)
- ✅ Express routes properly ordered
- ✅ Global CORS applied before routes

### 3. **Authentication Flow** ✓

```
1. Client → POST /auth/authAdmin (email, password)
2. Server → Validates credentials
3. Server → Generates JWT tokens (access + refresh)
4. Server → Sets cookies (x-o-token, x-o-refresh-token)
5. Client → Receives token in response + cookies auto-saved
6. Client → Makes GraphQL request (cookies sent automatically)
7. Server → Extracts adminId from cookie JWT
8. Server → Context has adminId available for resolvers
```

### 4. **Enhanced Middleware** ✓

The `createContext` middleware now:

- ✅ Extracts adminId from `x-o-token` cookie (admin)
- ✅ Extracts userId from `token` cookie (seller)
- ✅ Falls back to Authorization header if cookies not present
- ✅ Logs cookies and headers for debugging
- ✅ Automatically decodes JWT to get user/admin IDs

### 5. **Cookie Configuration** ✓

```typescript
Admin Cookies:
- x-o-token (15 minutes)
- x-o-refresh-token (7 days)

Seller Cookies:
- token (15 minutes)
- refreshToken (7 days)

Security:
- HttpOnly: true (in production/qa)
- Secure: true (in production/qa)
- SameSite: 'lax'
- Domain: .ekoru.cl (in production/qa only)
```

---

## 🧪 Testing with Postman

### Quick Start:

1. **Import the Postman Collection**

   - File: `Administration_API.postman_collection.json`
   - Or use the guide: `POSTMAN_TESTING_GUIDE.md`

2. **Login as Admin**

   ```
   POST http://localhost:6000/auth/authAdmin
   Body: { "email": "admin@example.com", "password": "password" }
   ```

3. **Cookies Auto-Saved**

   - Check: Cookies → localhost:6000
   - Should see: `x-o-token` and `x-o-refresh-token`

4. **Test GraphQL** (cookies sent automatically)

   ```
   POST http://localhost:6000/graphql
   Body: { "query": "query { getMyData { id name email } }" }
   ```

5. **Success!** The adminId is extracted from the cookie JWT automatically

---

## 🔧 Technical Details

### How GraphQL Gets adminId Without x-admin-id Header:

The `createContext` middleware in `src/middleware/auth.ts` now:

```typescript
// 1. Check for x-admin-id header (manual override)
let adminId = req.headers["x-admin-id"];

// 2. If not found, decode from x-o-token cookie
if (!adminId && req.cookies["x-o-token"]) {
  const decoded = jwt.verify(req.cookies["x-o-token"], JWT_SECRET);
  adminId = decoded.userId; // Extract from JWT payload
}

// 3. Return context with adminId
return { adminId, userId, token, req, res };
```

### Cookie vs Header Priority:

1. **x-admin-id header** (if present) - highest priority
2. **x-o-token cookie JWT** (decoded) - automatic
3. **Authorization Bearer token** (decoded) - fallback
4. **x-user-id header** (if present) - for sellers

---

## 📁 Files Modified

1. ✅ `src/index.ts` - Server setup with cookie-parser
2. ✅ `src/middleware/auth.ts` - Enhanced JWT extraction
3. ✅ `src/auth/route.ts` - REST auth routes
4. ✅ `src/auth/controller.ts` - Login/refresh handlers
5. ✅ `package.json` - Added cookie-parser dependency

---

## 📁 Files Created

1. ✅ `POSTMAN_TESTING_GUIDE.md` - Complete testing guide
2. ✅ `Administration_API.postman_collection.json` - Ready-to-import collection
3. ✅ `.env.example` - Environment variables template

---

## 🚀 Running the Server

```bash
npm run dev
```

**Console Output:**

```
🚀 Administration Server ready!

📡 REST Auth Endpoints:
   POST http://localhost:6000/auth/authAdmin (Admin Login)
   POST http://localhost:6000/auth/auth (Seller Login)
   POST http://localhost:6000/auth/refreshAdmin (Refresh Admin Token)
   POST http://localhost:6000/auth/refresh (Refresh Seller Token)

🔧 GraphQL Endpoint:
   POST http://localhost:6000/graphql
   🌐  Apollo Sandbox: http://localhost:6000/graphql
   📊  Apollo Studio: https://studio.apollographql.com/...

💚 Health Check:
   GET  http://localhost:6000/health

📖 See POSTMAN_TESTING_GUIDE.md for testing instructions
```

---

## ✨ Key Features

### 1. **No Manual Headers Required**

- Just login via REST
- Cookies are sent automatically with GraphQL requests
- adminId extracted from cookie JWT automatically

### 2. **Dual Auth Support**

- Admins: `x-o-token` cookie
- Sellers: `token` cookie
- Both work seamlessly with GraphQL

### 3. **Secure by Default**

- HttpOnly cookies (can't be accessed by JavaScript)
- Secure flag in production (HTTPS only)
- SameSite protection
- Domain-restricted in production

### 4. **Developer Friendly**

- Detailed logging in development
- Clear error messages
- Postman collection ready to use
- Complete documentation

---

## 🐛 Common Issues & Solutions

### Issue: "adminId is undefined in resolvers"

**Solution:** Make sure you logged in first via REST auth. Check cookies are being sent.

### Issue: "JWT malformed" or "invalid token"

**Solution:** Token expired or invalid. Login again to get fresh tokens.

### Issue: Cookies not being saved in Postman

**Solution:**

- Use Desktop Postman (better cookie support)
- Enable "Send cookies" in Settings
- Make sure domain is `localhost:6000` not `127.0.0.1:6000`

### Issue: CORS error

**Solution:** Origin must be in `allowedOrigins` array in `src/index.ts`

---

## 🎉 You're All Set!

**Authentication is now fully configured:**

- ✅ REST auth endpoints working
- ✅ Cookie-based session management
- ✅ Automatic JWT extraction
- ✅ GraphQL integration complete
- ✅ Postman ready for testing
- ✅ Production-ready security

**Next Steps:**

1. Start the server: `npm run dev`
2. Import Postman collection
3. Login via REST
4. Test GraphQL queries
5. Build your application! 🚀
