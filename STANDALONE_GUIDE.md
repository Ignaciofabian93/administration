# Administration GraphQL Server

A standalone GraphQL API server for administration and business management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your database credentials and settings.

3. **Setup database**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:6000/graphql`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio to view/edit database

## 🌐 API Endpoints

- **GraphQL API**: `http://localhost:6000/graphql`
- **Health Check**: `http://localhost:6000/health`
- **Apollo Studio**: `https://studio.apollographql.com/sandbox?endpoint=http://localhost:6000/graphql`

## 🔐 Authentication

The server expects authentication headers in requests:

```javascript
{
  "authorization": "Bearer <your-jwt-token>",
  "x-admin-id": "<admin-user-id>",
  "x-user-id": "<user-id>" // optional
}
```

## 📱 Connecting from Web App

### Using Apollo Client (React/Next.js)

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:6000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-admin-id": adminId || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
```

### Using Fetch API

```javascript
async function graphqlRequest(query, variables = {}) {
  const response = await fetch("http://localhost:6000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      "x-admin-id": adminId,
    },
    body: JSON.stringify({ query, variables }),
  });

  return response.json();
}
```

## 📊 Example Queries

### Get All Admins

```graphql
query GetAdmins {
  getAdmins(limit: 10, isActive: true) {
    id
    name
    email
    role
    adminType
    permissions
  }
}
```

### Get My Admin Data

```graphql
query GetMyData {
  getMyData {
    id
    name
    email
    role
    permissions
    city {
      city
    }
    country {
      country
    }
  }
}
```

### Get Countries

```graphql
query GetCountries {
  getCountries {
    id
    country
  }
}
```

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
```

## 🔒 CORS Configuration

Update the allowed origins in `src/index.ts`:

```typescript
const allowedOrigins = ["http://localhost:3000", "https://your-production-domain.com"];
```

## 🏗️ Project Structure

```
src/
├── client/          # Prisma client
├── config/          # Configuration files
├── errors/          # Error handling
├── graphql/
│   ├── schema.ts    # GraphQL schema definitions
│   ├── resolvers/   # GraphQL resolvers
│   └── services/    # Business logic services
├── mail/            # Email services
├── middleware/      # Express middleware (auth, etc.)
├── types/           # TypeScript type definitions
└── index.ts         # Server entry point
```

## 🐛 Troubleshooting

### CORS Errors

Make sure your web app origin is added to the `allowedOrigins` array in `src/index.ts`.

### Authentication Errors

Ensure you're sending the correct headers with your requests:

- `authorization: Bearer <token>`
- `x-admin-id: <admin-id>`

### Database Connection Issues

Check your `DATABASE_URL` in `.env` is correct and the database is running.

## 📝 Production Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Set environment variables in your hosting platform

3. Run migrations:

   ```bash
   npx prisma migrate deploy
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🤝 Support

For issues or questions, please contact the development team.
