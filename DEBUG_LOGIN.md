# 🐛 Debugging Login Issues - Troubleshooting Guide

## Issue: curl request to /auth/authAdmin returns nothing

### ✅ Step-by-Step Debugging

## 1. Check if Server is Running

```bash
# Check if port 6000 is listening
curl http://localhost:6000/health
```

**Expected Response:**

```json
{ "status": "ok", "service": "administration" }
```

If this fails, the server is not running. Start it with:

```bash
npm run dev
```

---

## 2. Check Environment Variables

Make sure your `.env` file has these required variables:

```env
# Required for JWT
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Required for Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Optional
PORT=6000
NODE_ENV=development
ENVIRONMENT=development
```

**Test:** Run the server and check for error messages about missing JWT secrets.

---

## 3. Test with Proper curl Command

Your curl command was missing the **Content-Type header**:

### ❌ Your original (missing header):

```bash
curl --location 'http://localhost:6000/auth/authAdmin' \
--data-raw '{
    "email": "ignaciorodriguez@ekoru.cl",
    "password": "Washburnxseries93@"
}'
```

### ✅ Correct curl command:

```bash
curl -X POST http://localhost:6000/auth/authAdmin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ignaciorodriguez@ekoru.cl",
    "password": "Washburnxseries93@"
  }'
```

Or with verbose output to see what's happening:

```bash
curl -X POST http://localhost:6000/auth/authAdmin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ignaciorodriguez@ekoru.cl",
    "password": "Washburnxseries93@"
  }' \
  -v
```

---

## 4. Check Server Logs

When you make the request, the server should log:

```
📥 POST /authAdmin
Headers: { ... }
Body: { email: '...', password: '...' }
Login attempt for admin: ignaciorodriguez@ekoru.cl
```

### Possible Log Messages:

✅ **Success:**

```
Login successful for admin: ignaciorodriguez@ekoru.cl
```

❌ **User not found:**

```
User not found: ignaciorodriguez@ekoru.cl
```

❌ **Invalid password:**

```
Invalid password for: ignaciorodriguez@ekoru.cl
```

❌ **Error:**

```
Login error for admin: [error details]
```

---

## 5. Verify Admin User Exists in Database

Check if the admin user exists:

```bash
# Using Prisma Studio
npx prisma studio
```

Or query directly:

```bash
# Connect to your database and run:
SELECT id, email, "isActive" FROM "Admin" WHERE email = 'ignaciorodriguez@ekoru.cl';
```

**Important checks:**

- ✅ User exists in database
- ✅ Email is exactly `ignaciorodriguez@ekoru.cl` (case-insensitive)
- ✅ `isActive` is `true`
- ✅ Password is hashed with bcrypt

---

## 6. Create Test Admin User (if needed)

If the user doesn't exist, create one:

```typescript
// Create a script: scripts/create-admin.ts
import prisma from "../src/client/prisma";
import bcrypt from "bcrypt";

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("Washburnxseries93@", 10);

  const admin = await prisma.admin.create({
    data: {
      email: "ignaciorodriguez@ekoru.cl",
      password: hashedPassword,
      name: "Ignacio",
      lastName: "Rodriguez",
      role: "SUPER_ADMIN",
      adminType: "PLATFORM",
      permissions: ["MANAGE_ADMINS", "MANAGE_USERS"],
      isActive: true,
      isEmailVerified: true,
    },
  });

  console.log("Admin created:", admin);
}

createAdmin();
```

---

## 7. Common Issues & Solutions

### Issue: Request hangs (no response)

**Causes:**

1. Missing `Content-Type: application/json` header
2. Server not parsing JSON body
3. Error in async function without try-catch
4. Database connection issue

**Solution:**

- ✅ Add Content-Type header
- ✅ Check server logs for errors
- ✅ Verify DATABASE_URL is correct
- ✅ Check body parsing middleware is before routes

---

### Issue: "No se encontró al usuario"

**Causes:**

1. Admin doesn't exist in database
2. Email case mismatch
3. Database connection issue

**Solution:**

```bash
# Check database
npx prisma studio

# Or create the admin user
```

---

### Issue: "Credenciales inválidas"

**Causes:**

1. Wrong password
2. Password not hashed correctly in database
3. Bcrypt comparison failing

**Solution:**

```bash
# Verify password hash in database
# Make sure password was hashed with bcrypt when created
```

---

### Issue: "Error al procesar el inicio de sesión"

**Causes:**

1. JWT_SECRET or JWT_REFRESH_SECRET not set
2. Database connection error
3. Unexpected error in code

**Solution:**

- Check server console for detailed error message
- Verify .env file has JWT secrets
- Check DATABASE_URL is valid

---

## 8. Test Checklist

Run through this checklist:

- [ ] Server is running (`curl http://localhost:6000/health`)
- [ ] .env file exists with JWT_SECRET and JWT_REFRESH_SECRET
- [ ] DATABASE_URL is correct in .env
- [ ] Admin user exists in database
- [ ] Admin user `isActive` is true
- [ ] curl command includes `-H "Content-Type: application/json"`
- [ ] Email and password are correct
- [ ] Server logs show the request is being received
- [ ] No errors in server console

---

## 9. Quick Test Script

Save this as `test-auth.sh`:

```bash
#!/bin/bash

echo "1. Testing Health Check..."
curl -s http://localhost:6000/health
echo -e "\n"

echo "2. Testing Admin Login..."
curl -X POST http://localhost:6000/auth/authAdmin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ignaciorodriguez@ekoru.cl",
    "password": "Washburnxseries93@"
  }' \
  -w "\nHTTP Status: %{http_code}\n"
echo -e "\n"
```

Run with:

```bash
bash test-auth.sh
```

---

## 10. Expected Successful Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Inicio de sesión exitoso"
}
```

**Cookies Set:**

- `x-o-token` (15 minutes)
- `x-o-refresh-token` (7 days)

---

## 📞 Still Having Issues?

Check the server console output when making the request. The debug middleware logs:

```
📥 POST /authAdmin
Headers: { ... }
Body: { email: '...', password: '...' }
```

This will tell you if:

1. Request is reaching the server
2. Body is being parsed correctly
3. Headers are correct

Then check the specific error message in the logs.
