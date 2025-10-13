# Migration Guide: Server-Side Architecture

## Co se změnilo?

Aplikace byla refaktorována na moderní server-side architekturu s čistou separací vrstev.

## Před a Po

### ❌ Před (Old Pattern)

```typescript
// components/sections/BrandsSection.tsx
export const BrandsSection = async () => {
  // Direct GraphQL call in component
  const data = await graphqlRequest<GetHighlightedBrandsQuery>(
    {
      query: GET_HIGHLIGHTED_BRANDS_QUERY,
      variables: {},
    },
    { next: { tags: ['brands'] } },
  );

  if (!data.highlightedCatalogBrands) {
    throw new Error('No brands');
  }

  const brands = data.highlightedCatalogBrands.map(...);
  return <div>...</div>;
};
```

**Problémy:**
- 🔴 Těžko testovatelné
- 🔴 GraphQL logika v UI komponentě
- 🔴 Nelze reuse data fetching logic
- 🔴 Žádná centrální cache správa

### ✅ Po (New Pattern)

```typescript
// lib/services/brands.service.ts
export async function getHighlightedBrands(): Promise<Brand[]> {
  const data = await graphqlRequest(...);
  // Transform & validate
  return brands;
}

// lib/actions/brands.actions.ts
'use server';
export async function revalidateBrandsCacheAction() {
  revalidateTag('brands');
  return { success: true };
}

// components/sections/Homepage/Brands/BrandsSection.tsx
export const BrandsSection = async () => {
  // Clean service call
  const brands = await getHighlightedBrands();
  return <div>...</div>;
};

// components/sections/Homepage/Brands/BrandsSectionError.tsx
'use client';
export const BrandsSectionError = ({ error, reset }) => {
  const handleRetry = async () => {
    // Call server action
    await revalidateBrandsCacheAction();
    reset();
  };
  return <button onClick={handleRetry}>Retry</button>;
};
```

**Výhody:**
- ✅ Testovatelné (pure functions)
- ✅ Separace concerns (data ≠ UI)
- ✅ Reusable services
- ✅ Centrální cache management
- ✅ Server Actions pro interakce

## Nová Struktura

```
src/lib/
├── services/          # Data fetching layer
│   └── brands.service.ts
├── actions/           # Server Actions ('use server')
│   └── brands.actions.ts
├── cache/             # Cache utilities
│   └── cache-utils.ts
└── graphql-client.ts  # Existující GraphQL client
```

## Jak Migrovat Existující Kod?

### 1. Přesunout Data Fetching do Services

**Před:**
```typescript
// v komponentě
const data = await fetch(API_URL);
const products = data.products;
```

**Po:**
```typescript
// lib/services/products.service.ts
export async function getProducts(): Promise<Product[]> {
  const data = await fetch(API_URL);
  return data.products;
}

// v komponentě
const products = await getProducts();
```

### 2. Vytvořit Server Actions pro Mutace

**Před:**
```typescript
// Client Component
'use client';
const handleDelete = async () => {
  await fetch('/api/products/123', { method: 'DELETE' });
  router.refresh();
};
```

**Po:**
```typescript
// lib/actions/products.actions.ts
'use server';
export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath('/products');
  return { success: true };
}

// Client Component
'use client';
const handleDelete = async () => {
  const result = await deleteProductAction('123');
  if (result.success) {
    // Success feedback
  }
};
```

### 3. Přidat Cache Management

**Před:**
```typescript
// Scattered po kódu
revalidateTag('products');
revalidateTag('product-list');
revalidatePath('/products');
```

**Po:**
```typescript
// lib/cache/cache-utils.ts
export const CACHE_TAGS = {
  PRODUCTS: 'products',
  PRODUCTS_LIST: 'products-list',
} as const;

export function revalidateProductsCache() {
  revalidateTag(CACHE_TAGS.PRODUCTS);
  revalidateTag(CACHE_TAGS.PRODUCTS_LIST);
  revalidatePath('/products');
}

// Použití
import { revalidateProductsCache } from '@/lib/cache/cache-utils';
revalidateProductsCache(); // ✅ Konsistentní
```

## Příklady pro Běžné Use Cases

### Use Case 1: Nová Feature - Product List

```typescript
// 1. Service
// lib/services/products.service.ts
export async function getProducts(): Promise<Product[]> {
  const data = await graphqlRequest(...);
  return data.products;
}

// 2. Server Component
// components/sections/ProductList.tsx
export const ProductList = async () => {
  const products = await getProducts();
  return <div>{products.map(...)}</div>;
};

// 3. Server Action (pro refresh)
// lib/actions/products.actions.ts
'use server';
export async function refreshProductsAction() {
  revalidateTag('products');
  return { success: true };
}

// 4. Error Component s Retry
// components/sections/ProductListError.tsx
'use client';
export const ProductListError = ({ reset }) => {
  const handleRetry = async () => {
    await refreshProductsAction();
    reset();
  };
  return <button onClick={handleRetry}>Retry</button>;
};
```

### Use Case 2: Form Submission

```typescript
// 1. Service (API call)
// lib/services/contact.service.ts
export async function submitContact(data: ContactData) {
  return await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 2. Server Action
// lib/actions/contact.actions.ts
'use server';
export async function submitContactAction(data: ContactData) {
  try {
    await submitContact(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 3. Client Component (Form)
'use client';
export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: ContactData) => {
    startTransition(async () => {
      const result = await submitContactAction(data);
      if (result.success) {
        toast.success('Odesláno!');
      }
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Checklist pro Migraci

- [ ] Vytvoř service v `lib/services/`
- [ ] Přesuň data fetching do service
- [ ] Vytvoř server actions v `lib/actions/` (pokud je potřeba)
- [ ] Refaktoruj komponentu na použití service
- [ ] Přidej cache tags do `lib/cache/cache-utils.ts`
- [ ] Přidej Error Boundary + Error Component
- [ ] Přidej Loading State (Suspense)
- [ ] Napíš testy pro service layer
- [ ] Aktualizuj dokumentaci

## FAQ

### Q: Kdy použít Server Action vs přímé volání service?

**A:**
- **Server Component** → přímé volání service
- **Client Component** → Server Action

```typescript
// ✅ Server Component - direct service call
export const ProductList = async () => {
  const products = await getProducts(); // Direct
  return <div>...</div>;
};

// ✅ Client Component - server action
'use client';
export const ProductForm = () => {
  const handleSubmit = () => {
    await submitProductAction(data); // Server Action
  };
};
```

### Q: Musím migrovat všechno najednou?

**A:** Ne! Migruj postupně:
1. Nové features → nový pattern
2. Stávající kód → migruj když se dotýká

### Q: Jak testovat Server Actions?

**A:** Server Actions jsou běžné async funkce:

```typescript
// brands.actions.test.ts
import { getHighlightedBrandsAction } from './brands.actions';

describe('getHighlightedBrandsAction', () => {
  it('should return brands', async () => {
    const result = await getHighlightedBrandsAction();
    expect(result.success).toBe(true);
    expect(result.brands).toBeDefined();
  });
});
```

## Další Kroky

1. **Přečti** `lib/SERVER_ACTIONS_README.md` pro detailní architekturu
2. **Prohlédni** `lib/services/brands.service.ts` jako příklad
3. **Zkus** vytvořit novou feature podle nového patternu
4. **Migruj** postupně stávající kód

## Potřebuješ Pomoc?

- 📖 Docs: `lib/SERVER_ACTIONS_README.md`
- 💬 Zeptej se týmu
- 🐛 GitHub Issues
