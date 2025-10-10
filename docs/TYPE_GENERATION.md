# Type Generation Guide

This document explains the type generation system for the Cartop monorepo, which automatically generates TypeScript types and API clients from your backend.

## Overview

The monorepo now has automated type generation for both REST and GraphQL APIs:

- **REST API**: Uses Orval to generate types and TanStack Query hooks from OpenAPI/Swagger
- **GraphQL API**: Uses GraphQL Code Generator to generate types from the GraphQL schema

## Package Structure

### `@cartop/api-client`

A shared package containing all generated REST API types and hooks. Both frontend applications (client & admin) can import from this package.

**Location**: `packages/api-client/`

## Available Scripts

Run these from the monorepo root:

```bash
# Generate all types (REST + GraphQL)
yarn generate

# Generate only REST API types
yarn generate:rest

# Generate only GraphQL types (all apps)
yarn generate:gql

# Generate GraphQL types for specific app
yarn generate:gql:client
yarn generate:gql:admin
```

## Usage

### REST API (via Orval)

**Prerequisites**: Backend must be running on port 3000 for generation.

```bash
# Start backend
yarn dev:backend

# In another terminal, generate REST types
yarn generate:rest
```

#### Using Generated REST Hooks

```typescript
// Import generated hooks from the shared package
import { useMarketingControllerCreateTemplate } from '@cartop/api-client';

function MyComponent() {
  const { mutate, isPending, error } = useMarketingControllerCreateTemplate();

  const handleSubmit = () => {
    mutate({
      data: {
        offerIds: ['offer-1', 'offer-2'],
        templateName: 'weekly-deals',
      },
    });
  };

  return <button onClick={handleSubmit}>Create Template</button>;
}
```

#### Customizing the Axios Instance

```typescript
import { AXIOS_INSTANCE } from '@cartop/api-client';

// Add authentication token
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### GraphQL API (via GraphQL Codegen)

**Prerequisites**: Backend must be running on port 3000 for generation.

```bash
# Start backend
yarn dev:backend

# In another terminal, generate GraphQL types
yarn generate:gql
```

#### Using Generated GraphQL Types

Create GraphQL queries in your components:

```typescript
// apps/client/src/components/BrandList.tsx
import { graphql } from '../gql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

// Define your query using the gql template literal
const BrandsQuery = graphql(`
  query GetBrands($limit: Float) {
    catalogBrands(limit: $limit) {
      id
      name
      slug
      description
    }
  }
`);

function BrandList() {
  const { data } = useQuery({
    queryKey: ['brands'],
    queryFn: async () =>
      request('http://localhost:3000/graphql', BrandsQuery, { limit: 10 }),
  });

  return (
    <ul>
      {data?.catalogBrands.map((brand) => (
        <li key={brand.id}>{brand.name}</li>
      ))}
    </ul>
  );
}
```

The GraphQL Code Generator will:
- Validate your queries against the schema
- Generate fully typed `useQuery` and `useMutation` hooks
- Provide autocomplete for all fields
- Catch errors at build time

## Configuration Files

### Orval Configuration

**File**: `orval.config.ts` (root)

```typescript
export default defineConfig({
  'cartop-rest-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
    },
    output: {
      target: './packages/api-client/src/generated/rest-api.ts',
      client: 'react-query',
    },
  },
});
```

### GraphQL Codegen Configuration

**Client**: `apps/client/codegen.ts`
**Admin**: `apps/admin/codegen.ts`

Both are configured to read from `http://localhost:3000/graphql`

## Environment Variables

You can customize the API URLs using environment variables:

**Client App** (Next.js):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql
```

**Admin App** (Vite):
```bash
VITE_API_URL=http://localhost:3000
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

## Development Workflow

### Adding a New REST Endpoint

1. Add endpoint in backend with Swagger decorators (`@ApiProperty`, etc.)
2. Ensure backend is running
3. Run `yarn generate:rest`
4. Use the generated hooks in your frontend

### Adding a New GraphQL Query/Mutation

1. Add resolver/type in backend with GraphQL decorators (`@Field`, etc.)
2. Backend auto-generates `schema.gql`
3. Write your query in a frontend component using the `graphql()` function
4. Run `yarn generate:gql` to generate types
5. Types are now available with full autocomplete

## CI/CD Integration

You can add type generation to your CI pipeline:

```yaml
# Example GitHub Actions workflow
- name: Generate Types
  run: |
    yarn dev:backend &
    BACKEND_PID=$!
    sleep 10 # Wait for backend to start
    yarn generate:all
    kill $BACKEND_PID
```

## Troubleshooting

### "Cannot connect to backend"

Ensure the backend is running on port 3000:
```bash
yarn dev:backend
```

### "Generated files are empty"

Check that:
1. Backend is fully started (check logs)
2. Swagger docs are accessible at `http://localhost:3000/api/docs`
3. GraphQL endpoint is accessible at `http://localhost:3000/graphql`

### "Type errors after generation"

Run type check to see specific errors:
```bash
yarn type-check
```

## Best Practices

1. **Regenerate after backend changes**: Always run `yarn generate` after modifying backend APIs
2. **Commit generated files**: Include generated files in version control for consistent builds
3. **Use TypeScript strict mode**: Leverage the generated types with strict type checking
4. **Don't modify generated files**: They will be overwritten on next generation

## Additional Resources

- [Orval Documentation](https://orval.dev/)
- [GraphQL Code Generator Documentation](https://the-guild.dev/graphql/codegen)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
