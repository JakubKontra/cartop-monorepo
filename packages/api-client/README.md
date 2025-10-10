# @cartop/api-client

> Shared API client for Cartop monorepo - Built with **native Fetch** (zero HTTP dependencies!)

## Features

- ✅ **Zero Dependencies** - Uses native Fetch API (0 KB HTTP client)
- ✅ **Auto-Generated Types** - From OpenAPI/Swagger via Orval
- ✅ **TanStack Query Hooks** - Ready-to-use React hooks
- ✅ **TypeScript** - Fully typed API calls
- ✅ **Interceptors** - Request/response middleware
- ✅ **Modern** - Fetch-based, works everywhere

## Installation

Already installed as workspace dependency:

```json
{
  "dependencies": {
    "@cartop/api-client": "workspace:*"
  }
}
```

## Usage

### Generated Hooks (Recommended)

```typescript
import { useMarketingControllerCreateTemplate } from '@cartop/api-client';

function CreateTemplate() {
  const { mutate, isPending } = useMarketingControllerCreateTemplate();

  const handleCreate = () => {
    mutate({
      data: {
        offerIds: ['offer-1', 'offer-2'],
        templateName: 'weekly-deals',
      },
    }, {
      onSuccess: (data) => console.log('Created:', data.id),
      onError: (error) => console.error('Error:', error),
    });
  };

  return (
    <button onClick={handleCreate} disabled={isPending}>
      Create Template
    </button>
  );
}
```

### Manual API Calls

```typescript
import { apiClient } from '@cartop/api-client';

// GET request
const users = await apiClient.get('/users');

// POST request
await apiClient.post('/users', { name: 'John' });

// With options
await apiClient.get('/users', {
  params: { limit: 10 },
  headers: { 'X-Custom': 'value' },
  signal: abortController.signal,
});
```

### Interceptors

**Add Authentication:**
```typescript
import { addRequestInterceptor } from '@cartop/api-client';

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

**Handle Errors:**
```typescript
import { addResponseInterceptor } from '@cartop/api-client';

addResponseInterceptor({
  onRejected: (error) => {
    if (error.message.includes('401')) {
      // Redirect to login
      window.location.href = '/login';
    }
    throw error;
  },
});
```

## Configuration

Set base URL via environment variables:

```bash
# Next.js apps
NEXT_PUBLIC_API_URL=http://localhost:3000

# Vite apps
VITE_API_URL=http://localhost:3000
```

## Type Generation

Types are auto-generated from your backend API:

```bash
# Regenerate all types
yarn generate:rest

# Types are output to:
# packages/api-client/src/generated/
```

## Exports

```typescript
// Generated hooks (by module)
export * from './generated/marketing/marketing';
export * from './generated/notification/notification';

// Generated types
export * from './generated/rest-api.schemas';

// HTTP client utilities
export {
  customInstance,      // Used by generated code
  apiClient,          // For manual API calls
  addRequestInterceptor,
  addResponseInterceptor,
  type RequestConfig,
};
```

## Architecture

```
Your Component
  ↓
Generated Hook (useMarketingController...)
  ↓
customInstance (Fetch wrapper)
  ↓
Request Interceptors
  ↓
Native Fetch API
  ↓
Response Interceptors
  ↓
TanStack Query (caching, retries, etc.)
  ↓
Your Component (data/error/loading)
```

## Migration from Axios

See [FETCH_MIGRATION.md](./FETCH_MIGRATION.md) for migration guide.

**TL;DR**: Generated hooks work exactly the same. Only manual `AXIOS_INSTANCE` usage needs updating.

## Benefits vs Axios

| Feature | Native Fetch | Axios |
|---------|--------------|-------|
| **Bundle Size** | 0 KB | 13 KB |
| **Modern API** | ✅ | ❌ |
| **Built-in** | ✅ Node 18+ | ❌ |
| **TanStack Query** | ✅ | ✅ |
| **TypeScript** | ✅ | ✅ |

## Examples

See [EXAMPLES.md](../../EXAMPLES.md) for more usage examples.

## Documentation

- [Type Generation Guide](../../docs/TYPE_GENERATION.md)
- [Migration Guide](./FETCH_MIGRATION.md)
- [Examples](../../EXAMPLES.md)

---

Built with ❤️ using native Fetch API
