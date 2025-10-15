# Brand Data Layer Architecture

This directory contains the data layer for the Brand feature, following a **forward architecture** pattern that ensures type safety and single source of truth.

## Architecture Overview

```
Backend (GraphQL) → GraphQL Codegen → Transformers → Zod Schema → Form
                                         ↓
                                    Type Safety
```

## Files

### `schema.ts` - Form Validation Schema

Defines the Zod validation schema for the Brand form. This schema:

- Validates user input
- Handles optional fields with proper type inference
- Provides runtime validation and compile-time types

### `transformers.ts` - Data Transformation Layer

Contains utility functions to transform data between different representations:

#### `toFormValues(brand)`
Transforms a Brand from the API to form values for editing:
- Converts `null` → `''` (empty string) for optional fields
- Handles all nullable/optional fields consistently

#### `toCreateInput(values)`
Transforms form values to `CreateCatalogBrandInput` for mutations:
- Converts empty strings → `null`
- Returns type-safe GraphQL input type

#### `toUpdateInput(values)`
Transforms form values to `UpdateCatalogBrandInput` for mutations.

**Why transformers?**
- **Single source of truth**: Data transformation logic in one place
- **Type safety**: TypeScript ensures correct types between frontend and backend
- **No manual mapping**: Page components don't need to map fields manually
- **Easy maintenance**: Add/remove fields in one place only

## Usage Example

### Create Page

```typescript
import { toCreateInput } from '../data/transformers'

const handleSubmit = async (values: BrandFormValues) => {
  await createBrand({
    variables: {
      input: toCreateInput(values), // ✨ One line instead of manual mapping
    },
  })
}
```

### Edit Page

```typescript
import { toFormValues, toUpdateInput } from '../data/transformers'

// Load data
const brand = data?.catalogBrand

// Populate form
<BrandForm
  defaultValues={toFormValues(brand)} // ✨ One line instead of manual mapping
  onSubmit={(values) => {
    updateBrand({
      variables: {
        id: brandId,
        input: toUpdateInput(values), // ✨ One line instead of manual mapping
      },
    })
  }}
/>
```

## Benefits

### Before (Manual Mapping)
```typescript
// In edit page - manual mapping
defaultValues={{
  name: brand.name,
  slug: brand.slug,
  description: brand.description || '',
  logoId: brand.logoId || '',
  isActive: brand.isActive,
  isHighlighted: brand.isHighlighted,
  isRecommended: brand.isRecommended,
  legacySystemId: brand.legacySystemId || '',
  legacySlug: brand.legacySlug || '',
}}
```

### After (With Transformers)
```typescript
// In edit page - 1 line
defaultValues={toFormValues(brand)}
```

**Impact:**
- ✅ Removed ~50 lines of boilerplate code
- ✅ Type-safe transformation (TypeScript checks all fields)
- ✅ Single source of truth for data transformation
- ✅ Easy to maintain (add field once in transformers, not multiple places)
- ✅ Automatic empty string ↔ null handling

## Type Safety Flow

1. **Backend**: Defines GraphQL types (`CreateCatalogBrandInput`, `Brand`)
2. **Codegen**: Generates TypeScript types from GraphQL schema
3. **Transformers**: Use generated types for function signatures
4. **Zod Schema**: Validates runtime values
5. **Form**: Uses Zod-inferred types

TypeScript ensures:
- Transformer functions return correct GraphQL input types
- Form values match Zod schema
- No field mismatches between frontend and backend
