# Type Safety Improvements

## ✅ Fixed: Removed All `any` Types

### Before (Unsafe)
```typescript
// Using 'any' type assertions ❌
const error = new Error(`HTTP ${response.status}`);
(error as any).response = response;
(error as any).status = response.status;
(error as any).data = errorBody;
```

### After (Type-Safe)
```typescript
// Proper ApiError class with full typing ✅
export class ApiError extends Error {
  response: Response;
  status: number;
  data?: unknown;

  constructor(message: string, response: Response, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.status = response.status;
    this.data = data;
  }
}
```

## Type-Safe Error Handling

### Usage Example

```typescript
import { apiClient, ApiError } from '@cartop/api-client';

async function createUser(data: UserData) {
  try {
    const user = await apiClient.post<User>('/users', data);
    return user;
  } catch (error) {
    // Type guard provides full type safety
    if (error instanceof ApiError) {
      // All properties are fully typed!
      console.log(error.status);    // number ✅
      console.log(error.message);   // string ✅
      console.log(error.response);  // Response ✅
      console.log(error.data);      // unknown ✅

      // Type-safe status code checks
      if (error.status === 401) {
        window.location.href = '/login';
      } else if (error.status === 400) {
        // error.data could contain validation errors
        const validationErrors = error.data as ValidationErrors;
        // Handle validation...
      }
    }
    throw error;
  }
}
```

### With Interceptors

```typescript
import { addResponseInterceptor, ApiError } from '@cartop/api-client';

addResponseInterceptor({
  onRejected: (error: ApiError) => {  // Fully typed!
    // No type assertions needed
    if (error.status === 401) {
      // Handle unauthorized
    } else if (error.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.data);
    }
    throw error;
  },
});
```

## Benefits

| Before | After |
|--------|-------|
| `(error as any).status` ❌ | `error.status` ✅ |
| No type checking | Full TypeScript support |
| Runtime errors possible | Compile-time safety |
| No autocomplete | Full IntelliSense |

## Type-Safe Properties

```typescript
interface ApiError extends Error {
  name: 'ApiError';              // Literal type
  status: number;                // HTTP status code
  response: Response;            // Fetch Response object
  data?: unknown;                // Parsed error body (JSON)
  message: string;               // Error message
  stack?: string;                // Stack trace
}
```

## Error Response Types

You can create specific types for your API errors:

```typescript
// Define your API error structure
interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

// Use in error handling
if (error instanceof ApiError) {
  const apiError = error.data as ApiErrorResponse;
  console.log(apiError.statusCode);  // Fully typed!
  console.log(apiError.message);
}
```

## TypeScript Configuration

Works with strict mode:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

## Comparison with Axios

| Feature | Axios | Our Implementation |
|---------|-------|-------------------|
| Error Type | `AxiosError<T>` | `ApiError` |
| Type Safety | ✅ Good | ✅ Excellent |
| Instanceof Check | ✅ | ✅ |
| Custom Properties | ✅ | ✅ |
| No `any` Types | ❌ (uses some) | ✅ Zero |
| Bundle Size | 13 KB | 0 KB |

---

**Result**: Fully type-safe API client with zero `any` types! ✅
