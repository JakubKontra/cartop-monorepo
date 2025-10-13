# Server-Side Architecture Documentation

## Overview

Tato aplikace používá **Next.js App Router** s pokročilou server-side architekturou založenou na **Server Actions**, **Server Components** a čisté separaci vrstev.

## Architektura

```
┌─────────────────────────────────────────────────────────┐
│                    Client Components                     │
│  (UI, Interactions, Error Boundaries, Loading States)   │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                   Server Components                      │
│          (Data Fetching, SSR, ISR, Streaming)           │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                    Server Actions                        │
│   ('use server' - Mutations, Revalidation, Actions)    │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                   Services Layer                         │
│         (Pure Data Fetching, Business Logic)            │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                   Data Sources                           │
│            (GraphQL API, REST APIs, Database)           │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   └── page.tsx                  # Homepage (uses Server Components)
│
├── components/
│   ├── sections/                 # Page sections
│   │   └── Homepage/
│   │       ├── Brands/
│   │       │   ├── BrandsSection.tsx          # Server Component
│   │       │   ├── BrandsSectionLoading.tsx   # Loading UI
│   │       │   ├── BrandsSectionError.tsx     # Error UI (Client)
│   │       │   └── BrandsSectionWrapper.tsx   # Error Boundary (Client)
│   │       └── Faq/
│   │           └── FaqSection.tsx
│   └── molecules/
│       └── ChoiceTile/
│
├── lib/
│   ├── actions/                  # Server Actions ('use server')
│   │   └── brands.actions.ts
│   ├── services/                 # Data fetching layer
│   │   └── brands.service.ts
│   ├── cache/                    # Cache utilities
│   │   └── cache-utils.ts
│   └── graphql-client.ts         # GraphQL client
│
├── queries/                      # GraphQL queries (typed)
│   └── brands.ts
│
└── gql/                          # Generated GraphQL types
```

## Layers Explained

### 1. Services Layer (`/lib/services/`)

**Pure data fetching functions** - žádná UI logika.

**Příklad: `brands.service.ts`**
```typescript
// Pure function - can be called from anywhere
export async function getHighlightedBrands(): Promise<Brand[]> {
  const data = await graphqlRequest(...);
  // Transform & validate
  return brands;
}
```

**Výhody:**
- ✅ Reusable napříč aplikací
- ✅ Easy to test (no dependencies on React/Next.js)
- ✅ Single source of truth pro data fetching
- ✅ Type-safe

### 2. Server Actions (`/lib/actions/`)

**Server-side mutace a akce** s `'use server'` directive.

**Příklad: `brands.actions.ts`**
```typescript
'use server';

export async function getHighlightedBrandsAction() {
  try {
    const brands = await getHighlightedBrandsService();
    return { success: true, brands };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function revalidateBrandsCacheAction() {
  revalidateTag('brands');
  return { success: true };
}
```

**Výhody:**
- ✅ Volatelné z Client Components
- ✅ Type-safe RPC
- ✅ Automatic serialization
- ✅ Progressive enhancement (funguje i bez JS)

**Kdy použít:**
- Retry mechanismy z error states
- Mutace (create, update, delete)
- Cache revalidation triggery
- Form submissions

### 3. Server Components

**React komponenty** které běží pouze na serveru.

**Příklad: `BrandsSection.tsx`**
```typescript
// No 'use client' directive = Server Component
export const BrandsSection = async () => {
  // Direct service call - fast, runs on server
  const brands = await getHighlightedBrands();

  return <div>...</div>;
};
```

**Výhody:**
- ✅ Direct database/API access
- ✅ Zero JavaScript sent to client
- ✅ Automatic code splitting
- ✅ Streaming SSR with Suspense

**Kdy použít:**
- Data fetching
- Static content
- SEO-critical content

### 4. Client Components (`'use client'`)

**React komponenty** které běží v browseru.

**Příklad: `BrandsSectionError.tsx`**
```typescript
'use client';

export const BrandsSectionError = ({ error, reset }) => {
  const [isPending, startTransition] = useTransition();

  const handleRetry = async () => {
    startTransition(async () => {
      // Call server action
      await revalidateBrandsCacheAction();
      reset();
    });
  };

  return <button onClick={handleRetry}>Retry</button>;
};
```

**Výhody:**
- ✅ Interaktivita (useState, useEffect, onClick)
- ✅ Browser APIs
- ✅ Animation libraries

**Kdy použít:**
- Interactive UI
- Error boundaries
- Forms
- Client-side state

### 5. Cache Management (`/lib/cache/`)

**Centralizované cache utilities.**

**Příklad: `cache-utils.ts`**
```typescript
export const CACHE_TAGS = {
  BRANDS: 'brands',
  BRANDS_HIGHLIGHTED: 'brands-highlighted',
} as const;

export function revalidateBrandsCache(): void {
  revalidateTag(CACHE_TAGS.BRANDS);
}
```

**Výhody:**
- ✅ Consistent tag naming
- ✅ Type-safe cache keys
- ✅ Single place to manage cache strategy

## Data Flow Examples

### Example 1: Homepage Loading Brands

```
1. User visits homepage
   ↓
2. Next.js renders page.tsx (Server Component)
   ↓
3. BrandsSection (Server Component) calls:
   → getHighlightedBrands() from brands.service.ts
   ↓
4. Service layer fetches from GraphQL API
   ↓
5. Data returned, rendered to HTML
   ↓
6. Streamed to client (Suspense boundary)
   ↓
7. User sees content (0 JavaScript needed for display!)
```

### Example 2: Error Recovery with Server Action

```
1. API fails, BrandsSection throws error
   ↓
2. BrandsSectionWrapper (Error Boundary) catches
   ↓
3. Renders BrandsSectionError (Client Component)
   ↓
4. User clicks "Zkusit znovu"
   ↓
5. onClick handler calls:
   → revalidateBrandsCacheAction() (Server Action)
   ↓
6. Server Action runs on server:
   - revalidateTag('brands')
   - Returns { success: true }
   ↓
7. Client receives response
   ↓
8. Calls reset() to retry rendering
   ↓
9. BrandsSection re-fetches with fresh cache
```

## Best Practices

### ✅ DO

1. **Use Services for data fetching**
   ```typescript
   // Good
   const brands = await getHighlightedBrands();
   ```

2. **Use Server Actions for mutations**
   ```typescript
   // Good
   'use server';
   export async function updateBrand(data) { ... }
   ```

3. **Keep Server Components async**
   ```typescript
   // Good
   export const BrandsSection = async () => { ... };
   ```

4. **Use Error Boundaries**
   ```typescript
   <BrandsSectionWrapper>
     <Suspense fallback={<Loading />}>
       <BrandsSection />
     </Suspense>
   </BrandsSectionWrapper>
   ```

5. **Centralize cache management**
   ```typescript
   // Good - use cache-utils.ts
   import { revalidateBrandsCache } from '@/lib/cache/cache-utils';
   ```

### ❌ DON'T

1. **Don't mix concerns**
   ```typescript
   // Bad - UI logic in service
   export async function getBrands() {
     const data = await fetch(...);
     toast.success('Loaded!'); // ❌
     return data;
   }
   ```

2. **Don't bypass service layer**
   ```typescript
   // Bad - direct GraphQL call in component
   export const BrandsSection = async () => {
     const data = await fetch(GRAPHQL_URL, ...); // ❌
   };
   ```

3. **Don't use 'use client' unnecessarily**
   ```typescript
   // Bad - no interactivity needed
   'use client'; // ❌
   export const BrandsSection = () => { ... };
   ```

## Testing Strategy

### Unit Tests - Services
```typescript
// brands.service.test.ts
describe('getHighlightedBrands', () => {
  it('should return brands', async () => {
    const brands = await getHighlightedBrands();
    expect(brands).toHaveLength(8);
  });
});
```

### Integration Tests - Server Actions
```typescript
// brands.actions.test.ts
describe('getHighlightedBrandsAction', () => {
  it('should return success with brands', async () => {
    const result = await getHighlightedBrandsAction();
    expect(result.success).toBe(true);
  });
});
```

### E2E Tests - Full Flow
```typescript
// brands.e2e.test.ts
test('should load and display brands', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="brands-section"]')).toBeVisible();
});
```

## Performance

### ISR (Incremental Static Regeneration)
```typescript
// Revalidate every 60 seconds
export const revalidate = 60;
```

### Streaming SSR with Suspense
```tsx
<Suspense fallback={<BrandsSectionLoading />}>
  <BrandsSection />
</Suspense>
```

### Zero Runtime for Static Content
Server Components = 0 JavaScript shipped for static UI.

## Summary

✅ **Services** - Pure data fetching
✅ **Server Actions** - Mutations & cache control
✅ **Server Components** - Default for everything
✅ **Client Components** - Only for interactivity
✅ **Cache Utils** - Centralized cache management

This architecture provides:
- 🚀 **Performance** - Minimal JavaScript, streaming SSR
- 🧪 **Testability** - Separated concerns, pure functions
- 🔒 **Type Safety** - End-to-end TypeScript
- 🎯 **Maintainability** - Clear separation of layers
