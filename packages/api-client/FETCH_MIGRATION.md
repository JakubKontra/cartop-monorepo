# ✅ Migration Complete: Axios → Native Fetch

## Summary

Successfully migrated from Axios to native Fetch API!

### Changes Made

| Item | Before | After |
|------|--------|-------|
| **HTTP Client** | Axios (13 KB) | Native Fetch (0 KB) |
| **Dependencies** | axios@1.12.2 | None |
| **Bundle Size** | +13 KB | **-13 KB saved!** |
| **API** | Axios API | Modern Fetch API |

---

## What Changed

### 1. **Removed Axios Dependency**
```diff
- "axios": "^1.12.2"
```

### 2. **New Fetch-Based Implementation**
`packages/api-client/src/config/custom-instance.ts`:
- ✅ Native Fetch API (zero dependencies)
- ✅ Request/response interceptors
- ✅ Auto JSON parsing
- ✅ Error handling
- ✅ AbortSignal support
- ✅ Query params handling

### 3. **Updated Exports**
```typescript
// Old (Axios)
export { AXIOS_INSTANCE, customInstance }

// New (Fetch)
export {
  customInstance,
  apiClient,
  addRequestInterceptor,
  addResponseInterceptor,
}
```

---

## Migration Guide for Existing Code

### If You Used `AXIOS_INSTANCE`

**Before:**
```typescript
import { AXIOS_INSTANCE } from '@cartop/api-client';

AXIOS_INSTANCE.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**After:**
```typescript
import { addRequestInterceptor } from '@cartop/api-client';

addRequestInterceptor((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});
```

### Generated Hooks (No Changes Needed!)

```typescript
// This still works exactly the same! ✅
import { useMarketingControllerCreateTemplate } from '@cartop/api-client';

const { mutate } = useMarketingControllerCreateTemplate();
mutate({ data: { offerIds: ['1'], templateName: 'test' } });
```

---

## New Features

### 1. **Interceptors**

**Add Request Interceptor:**
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

**Add Response Interceptor:**
```typescript
import { addResponseInterceptor } from '@cartop/api-client';

addResponseInterceptor({
  onRejected: (error) => {
    if (error.message.includes('401')) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    throw error;
  },
});
```

### 2. **Manual API Calls**

**New `apiClient` helper:**
```typescript
import { apiClient } from '@cartop/api-client';

// GET request
const users = await apiClient.get('/users');

// POST request
await apiClient.post('/users', { name: 'John' });

// With config
await apiClient.get('/users', {
  params: { limit: 10 },
  signal: abortController.signal,
});
```

---

## Benefits

| Benefit | Impact |
|---------|--------|
| **Bundle Size** | -13 KB (100% reduction in HTTP client size) |
| **Modern API** | Uses native Fetch (standard, well-supported) |
| **Zero Dependencies** | No external HTTP library to maintain |
| **Performance** | Slightly faster (native implementation) |
| **Compatibility** | Works everywhere (Node 18+, all modern browsers) |

---

## Testing

All generated hooks tested and working:
- ✅ `useMarketingControllerCreateTemplate`
- ✅ `useMarketingControllerHealthCheck`
- ✅ Request cancellation (AbortSignal)
- ✅ Error handling
- ✅ JSON parsing

---

## Environment Variables

Same as before:
```bash
# Next.js apps
NEXT_PUBLIC_API_URL=http://localhost:3000

# Vite apps
VITE_API_URL=http://localhost:3000
```

---

## Troubleshooting

### "TypeError: customInstance is not a function"

**Solution**: Run `yarn install` to link the updated package.

### "Module not found: @cartop/api-client"

**Solution**:
```bash
yarn install
```

### Type errors after migration

**Solution**: Regenerate types:
```bash
yarn generate:rest
```

---

## Technical Details

### Request Flow

```
User Code
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
Parsed JSON Response
```

### Error Handling

All API errors are instances of `ApiError` class with proper typing:

```typescript
import { ApiError } from '@cartop/api-client';

try {
  await apiClient.post('/users', data);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status);    // number (e.g., 404, 500)
    console.log(error.message);   // string (e.g., "HTTP 404: Not Found")
    console.log(error.response);  // Response object
    console.log(error.data);      // Parsed error body (if JSON)
  }
}
```

Properties:
- `status: number` - HTTP status code (fully typed)
- `message: string` - Error message
- `response: Response` - Raw Response object
- `data?: unknown` - Parsed error body (if JSON)

---

## Files Modified

1. ✅ `packages/api-client/package.json` - Removed axios
2. ✅ `packages/api-client/src/config/custom-instance.ts` - Rewritten with Fetch
3. ✅ `packages/api-client/src/index.ts` - Updated exports
4. ✅ Generated files - Regenerated with new instance

---

## Next Steps

1. **Update interceptors** if you were using `AXIOS_INSTANCE`
2. **Test your app** - Everything should work the same
3. **Enjoy smaller bundle size!** 🎉

---

Migration completed: 2025-10-10
