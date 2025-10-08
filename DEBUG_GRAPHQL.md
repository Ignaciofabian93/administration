# 🐛 Debugging GraphQL getMyData Issue

## Current Situation

- ✅ REST login successful (`/session/authAdmin`)
- ✅ Cookies set: `x-o-token`, `x-o-refresh-token`
- ❌ GraphQL `getMyData` query fails

## Common Issues & Solutions

### Issue 1: Cookies Not Sent with GraphQL Request

**Problem:** Browser doesn't send cookies to GraphQL endpoint automatically.

**Solution:** Make sure your web app GraphQL client is configured to send cookies.

#### For Apollo Client:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4500/graphql",
  credentials: "include", // ⬅️ This is CRITICAL!
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

#### For fetch API:

```typescript
fetch("http://localhost:4500/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // ⬅️ This is CRITICAL!
  body: JSON.stringify({
    query: `query { getMyData { id name email } }`,
  }),
});
```

---

### Issue 2: CORS Blocking Credentials

**Problem:** CORS policy blocks cookies from being sent cross-origin.

**Check server logs for:**

```
⚠️  CORS blocked origin: http://localhost:5000
```

**Solution:** Already configured in your server, but verify:

```typescript
// In src/index.ts
const allowedOrigins = [
  "http://localhost:5000", // ✅ Should be here
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // ✅ Must be true
  }),
);
```

---

### Issue 3: Cookie Domain Mismatch

**Problem:** Cookies set for `localhost:4500` won't be sent from `localhost:5000`.

**Check:** In browser DevTools → Application → Cookies

- Domain should be `localhost` (without port)
- Path should be `/`

**Current cookie settings in your server:**

```typescript
httpOnly: environment === "production" || environment === "qa",
secure: environment === "production" || environment === "qa",
domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
```

This is correct for development (domain is undefined = uses current host).

---

### Issue 4: Web App Not Configured to Send Cookies

**Check your web app GraphQL client configuration:**

#### Next.js with Apollo Client:

```typescript
// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4500/graphql",
  credentials: "include", // Include cookies
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
```

#### Usage in component:

```typescript
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_MY_DATA = gql`
  query GetMyData {
    getMyData {
      id
      name
      email
      role
    }
  }
`;

function MyComponent() {
  const { loading, error, data } = useQuery(GET_MY_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{data.getMyData.name}</div>;
}
```

---

## Debugging Steps

### Step 1: Check Browser Network Tab

Open DevTools → Network tab and check the GraphQL request:

**Request Headers should include:**

```
Cookie: x-o-token=...; x-o-refresh-token=...
```

If cookies are missing, the issue is in your web app configuration.

---

### Step 2: Check Server Logs

When you make the GraphQL request, you should see:

```
📥 POST /graphql
Headers: { ... cookie: 'x-o-token=...' }

🔐 Creating GraphQL Context
Cookies: { 'x-o-token': '...', 'x-o-refresh-token': '...' }
✅ Admin ID extracted from x-o-token cookie: 89bf09cc-...
📋 Final Context: { adminId: '89bf09cc-...', userId: undefined }

🔍 getMyData resolver called
Context adminId: 89bf09cc-...
Fetching data for admin ID: 89bf09cc-...
```

---

### Step 3: Test with curl

Test that the server works correctly:

```bash
# First, login to get cookies
curl -X POST http://localhost:4500/session/authAdmin \
  -H "Content-Type: application/json" \
  -d '{"email":"ignaciorodriguez@ekoru.cl","password":"Washburnxseries93@"}' \
  -c cookies.txt

# Then, use those cookies for GraphQL
curl -X POST http://localhost:4500/graphql \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"query":"query { getMyData { id name email } }"}'
```

If this works, the issue is in your web app configuration.

---

## Web App Configuration Examples

### React + Apollo Client (Full Setup)

```typescript
// apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4500/graphql',
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// App.tsx or _app.tsx
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
```

---

### Custom Fetch Hook

```typescript
// useGraphQL.ts
export const useGraphQL = () => {
  const query = async (query: string, variables?: any) => {
    const response = await fetch("http://localhost:4500/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ⬅️ CRITICAL
      body: JSON.stringify({ query, variables }),
    });

    return response.json();
  };

  return { query };
};

// Usage
const MyComponent = () => {
  const { query } = useGraphQL();

  useEffect(() => {
    const fetchData = async () => {
      const result = await query(`
        query {
          getMyData {
            id
            name
            email
          }
        }
      `);
      console.log(result);
    };

    fetchData();
  }, []);
};
```

---

## Environment Variables for Web App

Create `.env.local` in your web app:

```env
NEXT_PUBLIC_API_URL=http://localhost:4500
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4500/graphql
```

---

## Quick Fix Checklist

- [ ] GraphQL client has `credentials: 'include'`
- [ ] Server allows your origin in CORS (`http://localhost:5000`)
- [ ] Server has `credentials: true` in CORS config
- [ ] Cookies visible in browser DevTools → Application → Cookies
- [ ] Network tab shows cookies being sent with GraphQL request
- [ ] Server logs show cookies received and adminId extracted
- [ ] No CORS errors in browser console

---

## Expected Flow

1. **Login (REST):**

   ```
   POST /session/authAdmin
   Response: Sets x-o-token cookie
   ```

2. **GraphQL Query:**
   ```
   POST /graphql
   Request includes: Cookie: x-o-token=...
   Server extracts adminId from cookie
   Returns admin data
   ```

---

## Still Not Working?

Share the following:

1. Browser console errors
2. Network tab screenshot (showing GraphQL request headers)
3. Server logs when making GraphQL request
4. Your web app GraphQL client configuration code
