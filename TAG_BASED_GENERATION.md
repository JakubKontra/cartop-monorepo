# Tag-Based API Generation Strategy

## Problem

You want to:
- ✅ Expose certain endpoints to **Admin** app only
- ✅ Expose certain endpoints to **Client** (public) app only
- ❌ **NOT expose** internal endpoints (Marketing, Notification) to any frontend

## Solution: Use Swagger Tags + Orval Filtering

### Step 1: Tag Your Backend Controllers

Add appropriate tags to your controllers:

```typescript
// For Admin-only endpoints
@ApiTags('Admin', 'Users')
@Controller('api/admin/users')
export class AdminUserController {
  // Only accessible by admin app
}

// For Public/Client endpoints
@ApiTags('Public', 'Catalog')
@Controller('api/catalog')
export class CatalogController {
  // Accessible by client app
}

// Internal only - NO frontend exposure
@ApiTags('Internal', 'Marketing')
@Controller('api/marketing')
export class MarketingController {
  // NOT generated for any frontend
}
```

### Step 2: Multiple Orval Configurations

Create separate generations for each frontend:

```typescript
// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  // Admin API Client
  'admin-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      // Filter: Only generate endpoints tagged with 'Admin'
      filters: {
        tags: ['Admin', 'Public'], // Admin gets both Admin and Public endpoints
      },
    },
    output: {
      target: './packages/api-client-admin/src/generated/api.ts',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './packages/api-client-admin/src/config/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },

  // Client (Public) API Client
  'client-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      // Filter: Only generate endpoints tagged with 'Public'
      filters: {
        tags: ['Public'], // Client only gets Public endpoints
      },
    },
    output: {
      target: './packages/api-client/src/generated/api.ts',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './packages/api-client/src/config/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
```

### Step 3: Example Backend Tags

```typescript
// apps/backend/src/catalog/catalog.controller.ts
@ApiTags('Public', 'Catalog')  // ✅ Exposed to client
@Controller('api/catalog')
export class CatalogController {
  @Get('brands')
  getBrands() { /* ... */ }
}

// apps/backend/src/admin/users.controller.ts
@ApiTags('Admin', 'Users')  // ✅ Only exposed to admin
@Controller('api/admin/users')
export class AdminUsersController {
  @Get()
  getAllUsers() { /* ... */ }
}

// apps/backend/src/marketing/marketing.controller.ts
@ApiTags('Internal', 'Marketing')  // ❌ NOT exposed to any frontend
@Controller('api/marketing')
export class MarketingController {
  @Post('ecomail/templates')
  createTemplate() { /* ... */ }
}

// apps/backend/src/notification/notification.controller.ts
@ApiTags('Internal', 'Notification')  // ❌ NOT exposed to any frontend
@Controller('notifications')
export class NotificationController {
  @Post('test/password-reset')
  testEmail() { /* ... */ }
}
```

### Step 4: Package Structure

```
packages/
├── api-client/              # For Client (Public) app
│   ├── src/
│   │   ├── generated/
│   │   │   ├── catalog/     # ✅ Public endpoints only
│   │   │   └── ...
│   │   └── config/
│   └── package.json
│
└── api-client-admin/        # For Admin app
    ├── src/
    │   ├── generated/
    │   │   ├── admin/       # ✅ Admin endpoints
    │   │   ├── catalog/     # ✅ Public endpoints (admin can use too)
    │   │   └── ...          # ❌ No Marketing, no Notification
    │   └── config/
    └── package.json
```

### Step 5: Updated Scripts

```json
{
  "scripts": {
    "generate:admin": "orval --config orval.config.ts --project admin-api",
    "generate:client": "orval --config orval.config.ts --project client-api",
    "generate:rest": "yarn generate:admin && yarn generate:client",
    "generate:all": "yarn generate:rest && yarn generate:gql"
  }
}
```

### Step 6: Usage in Apps

**Admin App:**
```typescript
// Can access both Admin and Public endpoints
import {
  useAdminUsersControllerGetAll,  // Admin only
  useCatalogControllerGetBrands   // Public (also available)
} from '@cartop/api-client-admin';
```

**Client App:**
```typescript
// Can only access Public endpoints
import {
  useCatalogControllerGetBrands   // ✅ Available
  // useAdminUsersController...   // ❌ Not generated!
} from '@cartop/api-client';
```

**Marketing/Notification:**
```typescript
// ❌ NOT available in ANY frontend package
// These are internal-only endpoints
```

## Tag Strategy

| Tag | Exposed To | Use Case |
|-----|-----------|----------|
| `Public` | Client, Admin | Public data (catalog, products, etc.) |
| `Admin` | Admin only | User management, settings, analytics |
| `Internal` | Backend only | Marketing, notifications, cron jobs |

## Benefits

1. ✅ **Security**: Internal endpoints never exposed to frontend
2. ✅ **Type Safety**: Each app only sees endpoints it can use
3. ✅ **Smaller Bundles**: Client doesn't get admin code
4. ✅ **Clear Separation**: Tags make it obvious what's exposed where
5. ✅ **Easy Maintenance**: Add/remove tags to control exposure

## Alternative: Single Package with Exports

If you prefer one package:

```typescript
// packages/api-client/src/index.ts
// Public exports (for client app)
export * from './generated/public';

// Admin exports (for admin app)
export * as admin from './generated/admin';

// Internal NOT exported at all
```

Then apps import what they need:
```typescript
// Client app
import { useCatalog } from '@cartop/api-client';

// Admin app
import { admin, useCatalog } from '@cartop/api-client';
admin.useUserManagement();
```

---

**Recommendation**: Use **separate packages** for clearer separation and better tree-shaking.
