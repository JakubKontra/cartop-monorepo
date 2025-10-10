# Catalog Brand Frontend Implementation & Cache Invalidation

## Overview

This implementation demonstrates the complete type-safe data flow from backend to frontend with automatic cache invalidation:

1. **Backend**: CatalogBrand entity with `@Watch` decorator
2. **Type Generation**: GraphQL Code Generator creates TypeScript types
3. **Frontend**: Next.js pages with ISR (Incremental Static Regeneration)
4. **Cache Invalidation**: Webhook-based automatic revalidation

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND (Port 3000)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CatalogBrand Entity (@Watch decorator)                         │
│         │                                                       │
│         │ When brand changes (name, slug, etc.)                │
│         ↓                                                       │
│  WebhookService (with debouncing & retry)                      │
│         │                                                       │
│         │ POST to CACHE_INVALIDATION_URL                       │
│         │ Authorization: Bearer <secret>                        │
│         │                                                       │
└─────────┼───────────────────────────────────────────────────────┘
          │
          │ Webhook Payload:
          │ {
          │   entity: "CatalogBrand",
          │   action: "UPDATE",
          │   data: { id, slug }
          │ }
          │
          ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT APP (Port 3001)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  /api/revalidate (API Route)                                    │
│         │                                                       │
│         │ 1. Verify Authorization header                        │
│         │ 2. Parse entity & action                              │
│         │ 3. Call Next.js revalidation APIs                     │
│         │                                                       │
│         ├─→ revalidatePath('/brands')                          │
│         ├─→ revalidateTag('brands')                            │
│         ├─→ revalidatePath('/brands/[slug]')                   │
│         └─→ revalidateTag('brand-${slug}')                     │
│                                                                 │
│  Frontend Pages (ISR with 60s revalidation)                    │
│         │                                                       │
│         ├─→ /brands (List all brands)                          │
│         │   - Fetches via GraphQL                              │
│         │   - Cache tags: ['brands']                           │
│         │   - Shows featured + regular brands                  │
│         │                                                       │
│         └─→ /brands/[slug] (Individual brand page)             │
│             - Fetches via GraphQL                              │
│             - Cache tags: ['brands', 'brand-${slug}']          │
│             - Shows brand details                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Files Created

### 1. GraphQL Queries

**`apps/client/src/queries/brands.ts`**
- Type-safe GraphQL queries using generated `graphql()` function
- Queries:
  - `GET_BRANDS_QUERY`: Fetch all active brands
  - `GET_HIGHLIGHTED_BRANDS_QUERY`: Fetch featured brands
  - `GET_BRAND_BY_SLUG_QUERY`: Fetch single brand by slug

### 2. API Route for Revalidation

**`apps/client/src/app/api/revalidate/route.ts`**
- Webhook endpoint that receives notifications from backend
- Verifies `Authorization: Bearer <secret>` header
- Calls Next.js `revalidatePath()` and `revalidateTag()` APIs
- Supports multiple entity types (CatalogBrand, CatalogColor, etc.)

### 3. Frontend Pages

**`apps/client/src/app/brands/page.tsx`**
- Server component that fetches all brands at build time
- Uses ISR with 60-second revalidation
- Cache tags: `['brands']`
- Features:
  - Separates highlighted/featured brands from regular brands
  - Grid layout with responsive design
  - Links to individual brand pages

**`apps/client/src/app/brands/[slug]/page.tsx`**
- Dynamic route for individual brand pages
- Uses ISR with slug-specific cache tags
- Cache tags: `['brands', 'brand-${slug}']`
- Features:
  - Brand header with badges (Featured, Recommended, Active)
  - Description and metadata
  - SEO metadata generation via `generateMetadata()`

### 4. GraphQL Client Helper

**`apps/client/src/lib/graphql-client.ts`**
- Utility function for server-side GraphQL requests
- Error handling for HTTP and GraphQL errors
- Supports Next.js cache options (tags, revalidation)

## Configuration Files Updated

### Backend

**`apps/backend/.env`**
```bash
# Cache Invalidation Webhook
CACHE_INVALIDATION_URL=http://localhost:3001/api/revalidate
CACHE_INVALIDATION_SECRET=dev-secret-change-in-production
```

**`apps/backend/.env.example`**
- Added `CACHE_INVALIDATION_URL` and `CACHE_INVALIDATION_SECRET`

**`apps/backend/src/catalog/brand/catalog-brand.entity.ts`**
```typescript
@Watch({
  name: 'cache_catalog_brand_watch',
  watch: ['name', 'slug', 'isActive', 'isHighlighted', 'isRecommended', 'description'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'slug'],
  headers: {
    Authorization: `Bearer ${process.env.CACHE_INVALIDATION_SECRET || 'dev-secret-change-in-production'}`,
  },
  debounce: { delay: 1000, maxWait: 5000 },
  retry: { attempts: 3, delay: 2000, backoff: 'exponential' },
})
export class CatalogBrand { /* ... */ }
```

### Client

**`apps/client/.env.local`** (created)
```bash
# Backend API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql

# Cache Revalidation
REVALIDATION_SECRET=dev-secret-change-in-production
```

**`apps/client/.env.example`**
- Added `NEXT_PUBLIC_GRAPHQL_URL` and `REVALIDATION_SECRET`

## How It Works

### Data Flow

1. **Initial Page Load (Build Time)**
   ```
   User visits /brands
   → Next.js server fetches data via GraphQL
   → Renders page with all brands
   → Page cached for 60 seconds (ISR)
   ```

2. **User Updates Brand in Backend**
   ```
   Admin updates BMW brand name via GraphQL mutation
   → TypeORM entity updated in database
   → @Watch decorator detects change to 'name' field
   → WebhookService triggers (after 1s debounce delay)
   → POST to http://localhost:3001/api/revalidate
   → Includes Authorization header with secret
   ```

3. **Cache Invalidation**
   ```
   Client receives webhook
   → Verifies Authorization header
   → Parses entity (CatalogBrand) and data (id, slug)
   → Calls revalidatePath('/brands')
   → Calls revalidateTag('brands')
   → Calls revalidatePath('/brands/bmw')
   → Calls revalidateTag('brand-bmw')
   → Returns success response
   ```

4. **Next Page Load**
   ```
   User refreshes /brands or /brands/bmw
   → Cache is stale, Next.js re-fetches data
   → User sees updated brand name
   → New cache entry created
   ```

### Watch Decorator Features

- **Debouncing**: Waits 1 second before sending webhook (prevents spam for rapid changes)
- **Max Wait**: Forces webhook after 5 seconds even if changes keep coming
- **Retry Logic**: Retries failed webhooks 3 times with exponential backoff
- **Field Selection**: Only sends `id` and `slug` to minimize payload size
- **Authentication**: Uses Bearer token to prevent unauthorized cache invalidation

## Testing the Implementation

### 1. Start Backend (Already Running)

The backend should already be running on port 3000. Verify:

```bash
curl http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ catalogBrands(activeOnly: true, limit: 5) { id name slug } }"}'
```

### 2. Start Client App

```bash
cd apps/client
yarn dev
```

This starts the Next.js app on port 3001.

### 3. View Brands Page

Open browser to: `http://localhost:3001/brands`

You should see:
- A list of all catalog brands
- Featured brands section (if any)
- Regular brands section

### 4. View Individual Brand

Click on any brand, or visit directly: `http://localhost:3001/brands/bmw`

You should see:
- Brand name, slug, description
- Badges (Featured, Recommended, Active)
- Created/Updated dates

### 5. Test Cache Invalidation

**Option A: Via GraphQL Playground**

1. Open GraphQL playground: `http://localhost:3000/graphql`

2. Run mutation to update a brand:
```graphql
mutation {
  updateCatalogBrand(
    id: "<brand-id>",
    input: {
      name: "BMW - Updated Name"
    }
  ) {
    id
    name
    slug
  }
}
```

3. Check backend logs for webhook notification:
```
[WebhookService] Sending POST webhook to http://localhost:3001/api/revalidate
[WebhookService] Webhook cache_catalog_brand_watch sent successfully (200)
```

4. Check client logs for revalidation:
```
[Revalidation] Received webhook: CatalogBrand - UPDATE
[Revalidation] Revalidated brand pages
```

5. Refresh `/brands` or `/brands/bmw` to see updated data

**Option B: Manual Webhook Test**

Test the webhook endpoint directly:

```bash
# With valid token (should succeed)
curl -X POST http://localhost:3001/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dev-secret-change-in-production" \
  -d '{
    "entity": "CatalogBrand",
    "action": "UPDATE",
    "data": {
      "id": "test-id",
      "slug": "bmw"
    }
  }'

# Expected response:
# {
#   "success": true,
#   "revalidated": true,
#   "entity": "CatalogBrand",
#   "action": "UPDATE",
#   "timestamp": "2025-10-10T..."
# }

# With invalid token (should fail with 401)
curl -X POST http://localhost:3001/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer wrong-token" \
  -d '{
    "entity": "CatalogBrand",
    "action": "UPDATE",
    "data": { "id": "test", "slug": "bmw" }
  }'

# Expected response:
# { "error": "Unauthorized" }
```

### 6. Verify Type Safety

Open any of the brand pages in VS Code and observe:

- GraphQL queries are fully typed
- `data.catalogBrands` has TypeScript autocomplete
- Properties like `brand.name`, `brand.slug` are type-checked
- No `any` types used

Try to access a non-existent property (e.g., `brand.nonExistent`) and TypeScript will show an error.

## Key Features

### ✅ Type Safety
- GraphQL queries generate TypeScript types automatically
- No manual type definitions needed
- Full IntelliSense support in VS Code

### ✅ Performance
- ISR with 60-second revalidation reduces backend load
- On-demand revalidation ensures data freshness
- Debouncing prevents excessive webhooks

### ✅ Security
- Bearer token authentication on webhook endpoint
- Environment variable configuration
- No sensitive data in webhook payload

### ✅ Reliability
- Exponential backoff retry logic
- Queue-based webhook processing
- Error handling at every layer

### ✅ Developer Experience
- Hot reload in development
- Clear cache tags for debugging
- Dev-only cache info displayed on pages

## Environment Variables Reference

### Backend (`apps/backend/.env`)
```bash
# Required for cache invalidation
CACHE_INVALIDATION_URL=http://localhost:3001/api/revalidate
CACHE_INVALIDATION_SECRET=dev-secret-change-in-production
```

### Client (`apps/client/.env.local`)
```bash
# Required for GraphQL queries
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql

# Required for webhook authentication
REVALIDATION_SECRET=dev-secret-change-in-production
```

**Important**: The `CACHE_INVALIDATION_SECRET` (backend) must match `REVALIDATION_SECRET` (client).

## Production Considerations

### 1. Update Secrets

Change the default secret to something secure:

```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update both .env files with the generated secret
```

### 2. Update URLs

```bash
# Backend .env
CACHE_INVALIDATION_URL=https://your-client-domain.com/api/revalidate
CACHE_INVALIDATION_SECRET=<secure-secret>

# Client .env
NEXT_PUBLIC_GRAPHQL_URL=https://your-backend-domain.com/graphql
REVALIDATION_SECRET=<same-secure-secret>
```

### 3. Adjust ISR Timing

For production, you might want longer revalidation periods:

```typescript
// apps/client/src/app/brands/page.tsx
export const revalidate = 300; // 5 minutes instead of 60 seconds
```

### 4. Monitoring

Add logging/monitoring for:
- Webhook delivery success/failure rates
- Revalidation API response times
- Cache hit/miss ratios

### 5. Error Handling

The current implementation handles:
- Network failures (retry with backoff)
- Invalid tokens (401 response)
- GraphQL errors (logged and shown as 404)

Consider adding:
- Alerting for repeated webhook failures
- Fallback to full revalidation if tag-specific fails
- Rate limiting on the revalidation endpoint

## Extending to Other Entities

To add cache invalidation for other entities (e.g., `CatalogColor`, `Vehicle`):

### 1. Add @Watch Decorator to Entity

```typescript
@Watch({
  name: 'cache_catalog_color_watch',
  watch: ['name', 'hexCode', 'isActive'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'name'],
  headers: {
    Authorization: `Bearer ${process.env.CACHE_INVALIDATION_SECRET}`,
  },
  debounce: { delay: 1000, maxWait: 5000 },
  retry: { attempts: 3, delay: 2000, backoff: 'exponential' },
})
export class CatalogColor { /* ... */ }
```

### 2. Update Revalidation API Route

```typescript
// apps/client/src/app/api/revalidate/route.ts
switch (entity) {
  case 'CatalogBrand':
    // existing code
    break;

  case 'CatalogColor':
    revalidatePath('/colors');
    revalidateTag('colors');
    if (data?.name) {
      revalidatePath(`/colors/${data.name}`);
      revalidateTag(`color-${data.name}`);
    }
    break;
}
```

### 3. Create Frontend Pages

Follow the same pattern as brands:
- `/colors/page.tsx` - List page
- `/colors/[name]/page.tsx` - Detail page

## Troubleshooting

### Webhook Not Firing

1. Check backend logs for errors
2. Verify `CACHE_INVALIDATION_URL` is set correctly
3. Test URL is reachable: `curl http://localhost:3001/api/revalidate`
4. Check if debounce is delaying the webhook (wait 1-5 seconds)

### 401 Unauthorized Error

1. Verify `CACHE_INVALIDATION_SECRET` matches `REVALIDATION_SECRET`
2. Check environment variables are loaded (restart backend if changed)
3. Test with curl using the correct token

### Cache Not Invalidating

1. Check client logs for `[Revalidation]` messages
2. Verify the correct paths/tags are being revalidated
3. Try a hard refresh in browser (Cmd+Shift+R / Ctrl+Shift+R)
4. Check Next.js cache: `rm -rf apps/client/.next/cache`

### GraphQL Errors

1. Verify backend GraphQL endpoint is running: `http://localhost:3000/graphql`
2. Test query in GraphQL playground
3. Check `NEXT_PUBLIC_GRAPHQL_URL` is set correctly
4. Regenerate types: `yarn generate:gql:client`

## Summary

This implementation demonstrates a complete, production-ready pattern for:

- ✅ Type-safe data fetching from GraphQL backend
- ✅ Automatic type generation with GraphQL Code Generator
- ✅ ISR-based caching with Next.js 15
- ✅ Webhook-based cache invalidation with authentication
- ✅ Debouncing and retry logic for reliability
- ✅ Targeted revalidation using cache tags
- ✅ Development and production configurations

The pattern can be extended to any entity in the backend by adding the `@Watch` decorator and updating the revalidation API route.
