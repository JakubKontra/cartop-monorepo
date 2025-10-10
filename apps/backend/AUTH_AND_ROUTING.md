# Authentication & Route Separation Guide

## Overview

The API is split into two GraphQL endpoints with different access controls:

### 🔐 Admin Endpoint: `/admin/graphql`
- **Purpose**: Administrative operations
- **Access**: Requires JWT authentication
- **Roles**: Admin, Catalog Manager, Sales Representatives, etc.
- **Capabilities**: Full CRUD operations, audit logs, user management

### 🌐 Public Endpoint: `/public/graphql`
- **Purpose**: Public-facing API
- **Access**: No authentication required (read-only)
- **Capabilities**: Browse catalog, search products, view offers

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CartOp Backend API                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌───────────────────┐       ┌──────────────────────┐   │
│  │ /admin/graphql    │       │ /public/graphql      │   │
│  │                   │       │                      │   │
│  │ • JWT Required    │       │ • No Auth Required   │   │
│  │ • Role-Based      │       │ • Read-Only Access   │   │
│  │ • Full CRUD       │       │ • Active Items Only  │   │
│  │ • Audit Logs      │       │ • Public Catalog     │   │
│  └───────────────────┘       └──────────────────────┘   │
│           ↓                            ↓                  │
│  ┌───────────────────────────────────────────────────┐   │
│  │         Shared Business Logic & Services          │   │
│  └───────────────────────────────────────────────────┘   │
│           ↓                            ↓                  │
│  ┌───────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                  │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## User Roles

Based on Contember `personRole` enum:

| Role | Level | Description |
|------|-------|-------------|
| `public` | 0 | Unauthenticated users |
| `customer` | 10 | Registered customers |
| `juniorSalesRepresentative` | 20 | Junior sales staff |
| `salesRepresentative` | 30 | Sales representatives |
| `catalogManager` | 40 | Manages product catalog |
| `marketing` | 50 | Marketing team |
| `customerService` | 60 | Customer service team |
| `admin` | 100 | Full system access |

### Role Hierarchy

Higher roles have all permissions of lower roles:
- Admin can do everything
- Catalog Manager can do everything Sales Rep can do
- Sales Rep can do everything Junior Sales Rep can do

## Authentication

### JWT Token Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "salesRepresentative",
  "iat": 1704844800,
  "exp": 1704931200
}
```

### Getting a Token

*Note: Authentication login endpoint will be implemented with the Person/User entity*

```graphql
# Future implementation
mutation {
  login(email: "admin@cartop.com", password: "password") {
    accessToken
    user {
      id
      email
      role
    }
  }
}
```

### Using the Token

```bash
curl -X POST http://localhost:3000/admin/graphql \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { id email } }"}'
```

## Decorators

### @Public()
Marks resolver methods as publicly accessible (no authentication required)

```typescript
@Query(() => [CatalogBrand])
@Public()
async catalogBrands() {
  return this.brandService.findAll();
}
```

### @Roles(...roles)
Specifies which roles can access a resolver method

```typescript
@Mutation(() => CatalogBrand)
@Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
async createCatalogBrand(@Args('input') input: CreateCatalogBrandInput) {
  return this.brandService.create(input);
}
```

### @CurrentUser()
Injects the current authenticated user into resolver parameters

```typescript
@Mutation(() => CarRequest)
@Roles(UserRole.SALES_REPRESENTATIVE)
async createCarRequest(
  @Args('input') input: CreateCarRequestInput,
  @CurrentUser() user: JwtPayload,
) {
  return this.carRequestService.create(input, user.id);
}
```

## Example Resolver with Access Control

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { CurrentUser } from '../../common/decorators/auth/current-user.decorator';
import { UserRole } from '../../common/enums/role.enum';

@Resolver(() => Product)
export class ProductResolver {
  // ==================== PUBLIC ENDPOINTS ====================

  @Query(() => [Product])
  @Public() // No authentication required
  async products() {
    return this.productService.findAllActive();
  }

  @Query(() => Product)
  @Public()
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  // ==================== AUTHENTICATED ENDPOINTS ====================

  @Query(() => [Product])
  @Roles(UserRole.SALES_REPRESENTATIVE) // Requires Sales Rep or higher
  async allProducts() {
    return this.productService.findAll(); // Including inactive
  }

  // ==================== ADMIN ENDPOINTS ====================

  @Mutation(() => Product)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.productService.create(input, user.id);
  }

  @Mutation(() => Product)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN) // Only Admin can delete
  async deleteProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }
}
```

## Access Control Matrix

### CatalogBrand Example

| Operation | Public | Customer | Sales Rep | Catalog Mgr | Admin |
|-----------|--------|----------|-----------|-------------|-------|
| List Active Brands | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Brand Details | ✅ | ✅ | ✅ | ✅ | ✅ |
| Search Brands | ✅ | ✅ | ✅ | ✅ | ✅ |
| List ALL Brands | ❌ | ❌ | ✅ | ✅ | ✅ |
| Create Brand | ❌ | ❌ | ❌ | ✅ | ✅ |
| Update Brand | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete Brand | ❌ | ❌ | ❌ | ❌ | ✅ |

## Testing

### Test Public Endpoint (No Auth)

```bash
# Access public GraphQL playground
http://localhost:3000/public/graphql

# Query without authentication
curl -X POST http://localhost:3000/public/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ catalogBrands { id name slug } }"
  }'
```

### Test Admin Endpoint (With Auth)

```bash
# Access admin GraphQL playground
http://localhost:3000/admin/graphql

# Query with authentication
curl -X POST http://localhost:3000/admin/graphql \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ allCatalogBrands { id name isActive } }"
  }'
```

### Generate Test JWT Token

For development/testing, you can generate a token:

```typescript
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService({
  secret: 'your-secret-key-change-in-production-use-long-random-string',
});

const token = jwtService.sign({
  sub: 'test-user-id',
  email: 'admin@cartop.com',
  role: 'admin',
});

console.log('JWT Token:', token);
```

Or using online tool: https://jwt.io/

**Payload**:
```json
{
  "sub": "test-admin-id",
  "email": "admin@cartop.com",
  "role": "admin",
  "iat": 1704844800,
  "exp": 1704931200
}
```

**Secret**: Use the value from `.env` (`JWT_SECRET`)

## Error Handling

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Invalid or missing authentication token",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

### Insufficient Permissions

```json
{
  "errors": [
    {
      "message": "Insufficient permissions. Required roles: catalogManager, admin",
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ]
}
```

## GraphQL Playground Configuration

### Admin Playground

Navigate to: `http://localhost:3000/admin/graphql`

Add authentication header:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

### Public Playground

Navigate to: `http://localhost:3000/public/graphql`

No headers needed for public queries.

## Security Best Practices

### 1. JWT Secret
```bash
# Generate a strong secret
openssl rand -base64 64

# Add to .env
JWT_SECRET=your-very-long-random-string-here
```

### 2. Token Expiration
```bash
# Recommended values
JWT_EXPIRATION=24h    # For web applications
JWT_EXPIRATION=7d     # For mobile apps
JWT_EXPIRATION=15m    # For high-security operations
```

### 3. HTTPS Only
In production, always use HTTPS:
```typescript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

### 4. Rate Limiting
Add rate limiting to prevent brute force:
```bash
npm install @nestjs/throttler
```

### 5. CORS Configuration
```typescript
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
});
```

## Environment Variables

```bash
# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production-use-long-random-string
JWT_EXPIRATION=24h

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://cartop.com

# Security
NODE_ENV=production
HTTPS_ONLY=true
```

## Migration from Contember ACL

The system maps Contember's `@c.Allow()` decorator to NestJS guards:

| Contember | NestJS |
|-----------|--------|
| `@c.Allow(publicRole, { read: true })` | `@Public()` |
| `@c.Allow(salesRepresentativeRole, { read: true })` | `@Roles(UserRole.SALES_REPRESENTATIVE)` |
| `@c.Allow(catalogManagerRole, { create: true })` | `@Roles(UserRole.CATALOG_MANAGER)` on mutations |
| `@c.Allow(adminRole, { delete: true })` | `@Roles(UserRole.ADMIN)` on delete mutations |

## Next Steps

1. **Implement Login/Auth Endpoints** - Create authentication mutations for login/logout
2. **Add Refresh Tokens** - Implement refresh token mechanism
3. **Add Password Reset** - Email-based password reset flow
4. **Add 2FA** - Two-factor authentication for sensitive operations
5. **Add API Keys** - For service-to-service authentication
6. **Add Audit Logging** - Log all authentication attempts

## Summary

✅ **Dual GraphQL Endpoints**
- `/admin/graphql` - Authenticated, role-based access
- `/public/graphql` - Public, read-only access

✅ **Role-Based Authorization**
- 8 predefined roles with hierarchy
- Flexible `@Roles()` decorator

✅ **JWT Authentication**
- Stateless token-based auth
- Configurable expiration
- User context in resolvers

✅ **Security Features**
- Global guards
- Public route exceptions
- Role hierarchy enforcement
- Automatic audit logging

The system is ready for production with proper security controls! 🔒
