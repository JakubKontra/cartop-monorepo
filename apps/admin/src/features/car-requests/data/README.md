# CarRequest Data Layer Architecture

This directory contains the data layer for the CarRequest feature, following a **forward architecture** pattern that ensures type safety and single source of truth.

## Architecture Overview

```
Backend (GraphQL) → GraphQL Codegen → Transformers → Zod Schema → Form
                                         ↓
                                    Type Safety
```

## Files

### `schema.ts` - Form Validation Schema

Defines the Zod validation schema for the CarRequest form. This schema:

- Validates user input
- Transforms empty strings to `undefined` automatically
- Handles optional fields with proper type inference
- Provides runtime validation and compile-time types

**Key features:**
- `optionalString()` helper: Automatically converts `''` → `undefined`
- `optionalEmail()` helper: Email validation + empty string handling
- All transformations happen at validation time, not in submit handlers

### `transformers.ts` - Data Transformation Layer

Contains utility functions to transform data between different representations:

#### `toFormValues(carRequest)`
Transforms a CarRequest from the API to form values for editing:
- Converts `null` → `''` (empty string) for optional fields
- Converts ISO date strings → Date objects
- Handles all nullable/optional fields consistently

#### `toCreateInput(values)`
Transforms form values to `CreateCarRequestInput` for mutations:
- Converts empty strings → `undefined` (handled by Zod)
- Converts Date objects → ISO strings
- Returns type-safe GraphQL input type

#### `toUpdateInput(values)`
Same as `toCreateInput` but returns `UpdateCarRequestInput` type.

**Why transformers?**
- **Single source of truth**: Data transformation logic in one place
- **Type safety**: TypeScript ensures correct types between frontend and backend
- **No manual mapping**: Page components don't need to map 30+ fields manually
- **Easy maintenance**: Add/remove fields in one place only

## Usage Example

### Create Page

```typescript
import { toCreateInput } from '../data/transformers'

const handleSubmit = async (values: CarRequestFormValues) => {
  await createCarRequest({
    variables: {
      input: toCreateInput(values), // ✨ One line instead of 30+
    },
  })
}
```

### Edit Page

```typescript
import { toFormValues, toUpdateInput } from '../data/transformers'

// Load data
const carRequest = data?.carRequest

// Populate form
<CarRequestForm
  defaultValues={toFormValues(carRequest)} // ✨ One line instead of 30+
  onSubmit={(values) => {
    updateCarRequest({
      variables: {
        id: carRequestId,
        input: toUpdateInput(values), // ✨ One line instead of 30+
      },
    })
  }}
/>
```

## Benefits Over Previous Approach

### Before (Manual Mapping)
```typescript
// In create page - 53 lines of manual mapping
input: {
  requestEmail: values.requestEmail || null,
  requestPhone: values.requestPhone || null,
  requestFirstName: values.requestFirstName || null,
  // ... 30+ more fields
}

// In edit page - 30 lines of manual mapping
defaultValues={{
  requestEmail: carRequest.requestEmail || '',
  requestPhone: carRequest.requestPhone || '',
  requestFirstName: carRequest.requestFirstName || '',
  // ... 30+ more fields
  nextCallAt: carRequest.nextCallAt ? new Date(carRequest.nextCallAt) : undefined,
  // ... more date conversions
}}
```

### After (With Transformers)
```typescript
// In create page - 1 line
input: toCreateInput(values)

// In edit page - 1 line
defaultValues={toFormValues(carRequest)}
```

**Impact:**
- ✅ Removed ~100 lines of boilerplate code
- ✅ Type-safe transformation (TypeScript checks all fields)
- ✅ Single source of truth for data transformation
- ✅ Easy to maintain (add field once in transformers, not 5 places)
- ✅ Automatic empty string → null/undefined handling
- ✅ Automatic Date ↔ ISO string conversions

## Type Safety Flow

1. **Backend**: Defines GraphQL types (`CreateCarRequestInput`, `CarRequest`)
2. **Codegen**: Generates TypeScript types from GraphQL schema
3. **Transformers**: Use generated types for function signatures
4. **Zod Schema**: Validates runtime values
5. **Form**: Uses Zod-inferred types

TypeScript ensures:
- Transformer functions return correct GraphQL input types
- Form values match Zod schema
- No field mismatches between frontend and backend

## Future Improvements

Consider these enhancements:

1. **Generic transformer factory**: Create a reusable pattern for other features
2. **Stricter Zod schema**: Use Zod's `z.strictObject()` for exhaustive type checking
3. **Generated Zod from GraphQL**: Tools like `graphql-codegen-typescript-validation-schema` can auto-generate Zod schemas from GraphQL
4. **Generic CRUD hooks**: Abstract create/update mutations into reusable hooks
