# HTTP Client Comparison for Cartop

## The Winner: Native Fetch + Thin Wrapper 🏆

### Why This is Best for Your Stack

You're using **TanStack Query** which already provides:
- ✅ Request retries
- ✅ Caching & deduplication
- ✅ Loading/error states
- ✅ Request cancellation

**You don't need Axios's features!**

## Comparison

| Feature | Native Fetch | ky | Axios |
|---------|--------------|----|----- |
| **Size** | 0 KB | 4 KB | 13 KB |
| **Modern API** | ✅ | ✅ | ❌ |
| **JSON Auto-parse** | Manual | ✅ | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ |
| **Interceptors** | Manual | ✅ | ✅ |
| **Works with Orval** | ✅ | ✅ | ✅ |
| **Bundle Impact** | None | Minimal | Noticeable |

## Recommendation by Use Case

### Option 1: **Native Fetch** (Recommended)
**Best for**: Your current setup with TanStack Query

```typescript
// Simple, lightweight, no dependencies
const api = (url: string, options?: RequestInit) =>
  fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }).then(res => res.json());
```

**Pros:**
- ✅ 0 KB bundle size
- ✅ Standard API, works everywhere
- ✅ TanStack Query handles complexity
- ✅ Easy to debug

**Cons:**
- ❌ Manual JSON parsing
- ❌ Need to write interceptor wrapper

---

### Option 2: **ky** (If you want better DX)
**Best for**: If you want nicer API + small size

```typescript
import ky from 'ky';

const api = ky.create({
  prefixUrl: 'http://localhost:3000',
  timeout: 10000,
  retry: 0, // TanStack Query handles retries
});
```

**Pros:**
- ✅ Only 4 KB
- ✅ Modern, clean API
- ✅ Auto JSON parsing
- ✅ Better error handling
- ✅ Built-in hooks

**Cons:**
- ❌ Another dependency

---

### Option 3: **Axios** (Current)
**Best for**: Legacy projects, complex server-side needs

**Pros:**
- ✅ Mature, well-known
- ✅ Rich ecosystem
- ✅ Good docs

**Cons:**
- ❌ 13 KB (3x larger than ky)
- ❌ XMLHttpRequest based (old)
- ❌ Features overlap with TanStack Query
- ❌ Older API design

---

## My Recommendation

### For Your Monorepo: **Native Fetch**

Since you have:
1. ✅ TanStack Query (handles retries, caching, etc.)
2. ✅ Type generation (Orval provides types)
3. ✅ Modern stack (Next.js 15, Node 22+)

You don't need Axios. Here's the config:

```typescript
// packages/api-client/src/config/custom-instance.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const customInstance = async <T>(
  config: { url: string; method: string; data?: unknown; signal?: AbortSignal },
  options?: RequestInit
): Promise<T> => {
  const url = `${BASE_URL}${config.url}`;

  const response = await fetch(url, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      // Add auth token here
      ...options?.headers,
    },
    body: config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
```

### If You Want Better DX: **ky**

Add interceptors, retry logic easily, but still lightweight.

---

## Decision Matrix

| If you need... | Use |
|----------------|-----|
| Smallest bundle | Native Fetch |
| Best DX + small size | ky |
| Familiar API | Axios |
| Complex interceptors | ky or Axios |
| Server-side only | Node's native fetch |

---

## What to Do Now

**Keep Axios for now** (it works!), but consider migrating to Native Fetch when:
- Optimizing bundle size
- Refactoring API layer
- Team is comfortable with modern Fetch

**Quick Win**: Your current Axios setup works perfectly with Orval. No need to change unless you want to optimize.

---

## Final Verdict

For your modern monorepo with TanStack Query:

🥇 **Native Fetch** - Best performance, zero deps
🥈 **ky** - Best DX, tiny bundle
🥉 **Axios** - Safe choice, works fine (current)

**Bottom line**: You can keep Axios, but Native Fetch is more aligned with your modern stack.
