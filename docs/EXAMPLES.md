# Type Generation Usage Examples

## ✅ REST API Usage (Orval)

### Using Generated Hooks in Client/Admin App

```typescript
// Import from shared api-client package
import {
  useMarketingControllerCreateTemplate,
  useMarketingControllerHealthCheck,
  AXIOS_INSTANCE
} from '@cartop/api-client';

function CreateTemplateComponent() {
  // Mutation hook - fully typed!
  const { mutate, isPending, error } = useMarketingControllerCreateTemplate();

  // Query hook - fully typed!
  const { data: health } = useMarketingControllerHealthCheck();

  const handleCreate = () => {
    mutate({
      data: {
        offerIds: ['offer-1', 'offer-2', 'offer-3'],
        templateName: 'weekly-deals-2025-10-10',
        metadata: {
          campaign: 'weekly-deals',
        },
      },
    }, {
      onSuccess: (data) => {
        console.log('Template created:', data.id);
      },
    });
  };

  return (
    <div>
      <h1>Health: {health?.status}</h1>
      <button onClick={handleCreate} disabled={isPending}>
        Create Template
      </button>
    </div>
  );
}
```

### Configuring Authentication

```typescript
// In your app initialization (e.g., _app.tsx or main.tsx)
import { addRequestInterceptor } from '@cartop/api-client';

// Add JWT token to all requests
addRequestInterceptor((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
```

## ✅ GraphQL Usage (Client Preset)

### Writing Queries in Components

```typescript
// apps/client/src/components/BrandList.tsx
import { graphql } from '../gql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

// Define query using the graphql template literal
// This will be validated against your schema!
const GetBrandsQuery = graphql(`
  query GetBrands($limit: Float, $activeOnly: Boolean) {
    catalogBrands(limit: $limit, activeOnly: $activeOnly) {
      id
      name
      slug
      description
      isActive
      isHighlighted
    }
  }
`);

function BrandList() {
  const { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () =>
      request(
        'http://localhost:3000/graphql',
        GetBrandsQuery,
        { limit: 20, activeOnly: true }
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.catalogBrands.map((brand) => (
        <li key={brand.id}>
          <h3>{brand.name}</h3>
          <p>{brand.description}</p>
        </li>
      ))}
    </ul>
  );
}
```

### Writing Mutations

```typescript
// apps/admin/src/components/CreateBrand.tsx
import { graphql } from '../gql';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from 'graphql-request';

const CreateBrandMutation = graphql(`
  mutation CreateBrand($input: CreateCatalogBrandInput!) {
    createCatalogBrand(input: $input) {
      id
      name
      slug
      isActive
    }
  }
`);

function CreateBrandForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (input: any) =>
      request('http://localhost:3000/graphql', CreateBrandMutation, { input }),
    onSuccess: () => {
      // Invalidate brands query to refetch
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name: 'Tesla',
      slug: 'tesla',
      isActive: true,
    });
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

## 🔄 Regeneration Workflow

### After Backend Changes

```bash
# 1. Make changes to your backend (add endpoint, modify types, etc.)

# 2. Restart backend if needed
yarn dev:backend

# 3. Regenerate all types
yarn generate

# 4. Your frontend now has updated types!
```

### Continuous Development

```bash
# Terminal 1: Run backend
yarn dev:backend

# Terminal 2: Run frontend (after generation)
yarn dev:frontend

# Terminal 3: Regenerate when backend changes
yarn generate
```

## 📦 What Gets Generated

### REST API (in `packages/api-client/src/generated/`)
- ✅ TypeScript interfaces for all DTOs
- ✅ `useMutation` hooks for POST/PUT/DELETE
- ✅ `useQuery` hooks for GET requests
- ✅ Fully typed error responses
- ✅ Request/response types

### GraphQL (in `apps/*/src/gql/`)
- ✅ TypeScript types for all schema types
- ✅ Input types for mutations
- ✅ Query/Mutation argument types
- ✅ Enum types
- ✅ Type-safe query builder

## 🎯 Benefits

1. **Type Safety**: Catch errors at compile time, not runtime
2. **Autocomplete**: Full IntelliSense in your IDE
3. **Refactoring**: Change backend types and see frontend errors immediately
4. **Documentation**: Types serve as inline documentation
5. **Less Boilerplate**: No manual API client code needed
