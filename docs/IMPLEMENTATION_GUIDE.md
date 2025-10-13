# Quick Implementation Guide: Tag-Based API Generation

## Current Problem

Your marketing and notification endpoints are being generated for frontend, but they shouldn't be exposed:

```
packages/api-client/src/generated/
├── marketing/         ❌ Should NOT be in frontend!
└── notification/      ❌ Should NOT be in frontend!
```

## Solution in 3 Steps

### Step 1: Update Backend Tags (5 minutes)

**Marketing Controller:**
```typescript
// apps/backend/src/marketing/marketing.controller.ts
@ApiTags('Internal', 'Marketing')  // Change: Add 'Internal' tag
@Controller('api/marketing')
export class MarketingController {
  // ...
}
```

**Notification Controller:**
```typescript
// apps/backend/src/notification/notification.controller.ts
@ApiTags('Internal', 'Notification')  // Add 'Internal' tag
@Controller('notifications')
export class NotificationController {
  // ...
}
```

**Any Future Public Endpoints:**
```typescript
// Example: Catalog endpoints for client app
@ApiTags('Public', 'Catalog')
@Controller('api/catalog')
export class CatalogController {
  // Will be exposed to client app
}
```

**Any Future Admin Endpoints:**
```typescript
// Example: Admin user management
@ApiTags('Admin', 'Users')
@Controller('api/admin/users')
export class AdminUsersController {
  // Will only be exposed to admin app
}
```

### Step 2: Update Orval Config (2 minutes)

Replace `orval.config.ts` with:

```typescript
import { defineConfig } from 'orval';

export default defineConfig({
  // Admin gets: Admin + Public (excludes Internal)
  'admin-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      filters: {
        tags: ['Admin', 'Public'], // Include these tags
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
        query: { useQuery: true, useMutation: true, signal: true },
      },
    },
    hooks: { afterAllFilesWrite: 'prettier --write' },
  },

  // Client gets: ONLY Public (excludes Admin + Internal)
  'client-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      filters: {
        tags: ['Public'], // Include ONLY Public
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
        query: { useQuery: true, useMutation: true, signal: true },
      },
    },
    hooks: { afterAllFilesWrite: 'prettier --write' },
  },
});
```

### Step 3: Update Scripts (1 minute)

```json
// package.json
{
  "scripts": {
    "generate:rest": "orval --config orval.config.ts",
    "generate:admin": "orval --config orval.config.ts --project admin-api",
    "generate:client": "orval --config orval.config.ts --project client-api",
  }
}
```

## Result

**Before:**
```
packages/api-client/src/generated/
├── marketing/         ❌ Exposed to client
├── notification/      ❌ Exposed to client
└── ...
```

**After:**
```
packages/api-client/src/generated/
├── catalog/           ✅ Only Public endpoints
└── ...                ❌ NO marketing, NO notification
```

```
packages/api-client-admin/src/generated/
├── catalog/           ✅ Public endpoints
├── admin/             ✅ Admin endpoints
└── ...                ❌ NO marketing, NO notification
```

## Testing

```bash
# 1. Tag your controllers (Step 1)
# 2. Update orval.config.ts (Step 2)
# 3. Regenerate

yarn generate:rest

# 4. Check output
ls packages/api-client/src/generated/          # Should NOT have marketing/
ls packages/api-client-admin/src/generated/    # Should NOT have marketing/
```

## Tag Cheat Sheet

| Tag | Who Sees It | Example |
|-----|-------------|---------|
| `Public` | Client + Admin | Product catalog, public data |
| `Admin` | Admin only | User management, settings |
| `Internal` | Backend only | Marketing, notifications, cron |

## Optional: Create Admin Package

If you don't have `api-client-admin` yet:

```bash
# Copy existing package
cp -r packages/api-client packages/api-client-admin

# Update package.json
# Change: "name": "@cartop/api-client-admin"
```

Or keep single package with conditional exports (see TAG_BASED_GENERATION.md).

## Benefits

1. ✅ **Security**: Marketing/Notification never in frontend bundle
2. ✅ **Smaller Bundles**: Client doesn't get admin endpoints
3. ✅ **Type Safety**: Apps only see what they can access
4. ✅ **Easy to Maintain**: Just add/change tags

---

**Time to implement**: ~10 minutes
**Breaking changes**: None (if you don't have Public endpoints yet)
