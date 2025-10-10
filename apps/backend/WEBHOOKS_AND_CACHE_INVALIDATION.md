# Webhooks & Cache Invalidation Guide

## Overview

The `@Watch()` decorator monitors entity property changes and automatically triggers webhooks. Perfect for cache invalidation in Next.js ISR/SSG applications or any external system that needs to know about data changes.

## Features

✅ **Automatic Webhook Triggers** - Monitor specific properties for changes
✅ **Debouncing** - Prevent flooding with rapid changes
✅ **Async Processing** - Non-blocking with Bull queue
✅ **Retry Logic** - Exponential backoff for failed requests
✅ **Flexible Configuration** - Per-entity webhook setup
✅ **Change Detection** - Only triggers on watched property changes
✅ **Custom Payloads** - Select which data to send

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│              Entity Change (TypeORM)                      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ WebhookSubscriber    │  ← Monitors @Watch entities
          │ (TypeORM Subscriber) │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  WebhookService      │  ← Builds payload & queues
          │  - Debouncing        │
          │  - Payload building  │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   Bull Queue         │  ← Async processing
          │   (Redis-backed)     │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  WebhookProcessor    │  ← Sends HTTP request
          │  - Retry logic       │
          │  - Error handling    │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  External Endpoint   │  ← Next.js cache invalidation
          │  POST /api/cache/... │
          └──────────────────────┘
```

## Usage

### 1. Add @Watch Decorator to Entity

```typescript
import { Entity, Column } from 'typeorm';
import { Watch } from '../../common/decorators/watch/watch.decorator';

@Entity('catalog_brands')
@Watch({
  name: 'cache_catalog_brand_watch',
  watch: ['name', 'slug', 'isActive', 'description'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'slug'],
  debounce: {
    delay: 1000,      // Wait 1 second after last change
    maxWait: 5000,    // But send after 5 seconds max
  },
  retry: {
    attempts: 3,
    delay: 2000,
    backoff: 'exponential',
  },
})
export class CatalogBrand {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  isActive: boolean;

  @Column()
  description: string;
}
```

### 2. Configuration Options

```typescript
interface WatchConfig {
  // Required
  name: string;                    // Unique identifier
  watch: string[];                 // Properties to monitor
  webhook: string;                 // URL to POST to

  // Optional
  selection?: string[];            // Data to include in payload
  method?: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;

  // Debouncing
  debounce?: {
    delay: number;                 // Milliseconds to wait
    maxWait?: number;              // Max wait before forcing
  };

  // Retry
  retry?: {
    attempts?: number;             // Number of retries
    delay?: number;                // Base delay (ms)
    backoff?: 'fixed' | 'exponential';
  };
}
```

### 3. Multiple Watch Configurations

You can add multiple `@Watch()` decorators for different use cases:

```typescript
@Entity('products')
@Watch({
  name: 'cache_invalidation',
  watch: ['name', 'price', 'isActive'],
  webhook: 'http://localhost:3000/api/cache/invalidate',
  selection: ['id', 'slug'],
})
@Watch({
  name: 'search_index_update',
  watch: ['name', 'description', 'tags'],
  webhook: 'http://search-service:8080/api/index/update',
  selection: ['id', 'name', 'description', 'tags'],
})
@Watch({
  name: 'analytics_tracking',
  watch: ['viewCount', 'purchaseCount'],
  webhook: 'http://analytics:9000/api/track',
  selection: ['id', 'viewCount', 'purchaseCount'],
})
export class Product {
  // ...
}
```

## Webhook Payload

### Structure

```typescript
{
  "watchName": "cache_catalog_brand_watch",
  "entityName": "catalog_brands",
  "action": "UPDATE",
  "timestamp": "2025-01-09T12:00:00.000Z",
  "data": {
    "id": "uuid-here",
    "slug": "bmw"
  },
  "changedProperties": ["name", "description"],
  "oldValues": {
    "name": "BMW",
    "description": "Old description"
  },
  "newValues": {
    "name": "BMW Group",
    "description": "New description"
  }
}
```

### Actions

- **INSERT** - New entity created
- **UPDATE** - Entity properties changed
- **DELETE** - Entity removed

## Next.js Integration

### 1. Create API Route Handler

```typescript
// app/api/cache/invalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { watchName, entityName, action, data, changedProperties } = body;

    console.log(`Cache invalidation: ${action} on ${entityName}`, data);

    // Invalidate specific paths
    if (entityName === 'catalog_brands') {
      // Invalidate brand list page
      revalidatePath('/brands');

      // Invalidate specific brand page
      if (data.slug) {
        revalidatePath(`/brands/${data.slug}`);
      }

      // Invalidate by tag
      revalidateTag('catalog-brands');
      revalidateTag(`brand-${data.id}`);
    }

    // Invalidate product pages if catalog changes
    if (entityName === 'catalog_models') {
      revalidateTag('products');
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cache invalidation failed:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### 2. Secure the Endpoint

```typescript
// Add authentication
export async function POST(request: NextRequest) {
  // Verify webhook signature or API key
  const authHeader = request.headers.get('Authorization');
  const expectedToken = process.env.WEBHOOK_SECRET;

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // ... rest of handler
}
```

### 3. Update @Watch Configuration

```typescript
@Watch({
  name: 'nextjs_cache',
  watch: ['name', 'slug', 'isActive'],
  webhook: 'https://your-nextjs-app.com/api/cache/invalidate',
  headers: {
    'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`,
  },
  selection: ['id', 'slug'],
})
```

## Debouncing Explained

Prevents too many webhook calls for rapid changes:

```typescript
@Watch({
  name: 'cache_invalidation',
  watch: ['name'],
  webhook: 'http://localhost:3000/api/cache/invalidate',
  debounce: {
    delay: 1000,      // Wait 1 second after last change
    maxWait: 5000,    // Force send after 5 seconds
  },
})
```

**Scenario**:
1. User updates `name` → Timer starts (1s)
2. User updates `name` again → Timer resets (1s)
3. User updates `name` again → Timer resets (1s)
4. No more changes → Webhook sent after 1s
5. **OR** if 5 seconds pass → Webhook sent (maxWait)

## Retry Logic

Automatic retries with exponential backoff:

```typescript
@Watch({
  name: 'cache_invalidation',
  watch: ['name'],
  webhook: 'http://localhost:3000/api/cache/invalidate',
  retry: {
    attempts: 3,               // Try up to 3 times
    delay: 2000,               // Start with 2 second delay
    backoff: 'exponential',    // 2s, 4s, 8s
  },
})
```

**Retry Schedule**:
- Attempt 1: Immediate
- Attempt 2: After 2 seconds
- Attempt 3: After 4 seconds (2 * 2)
- Attempt 4: After 8 seconds (2 * 2 * 2)

## Monitoring

### Check Webhook Queue

Access Bull Board (if installed):
```bash
npm install @bull-board/api @bull-board/nestjs
```

Or query Redis:
```bash
redis-cli
> KEYS bull:webhooks:*
> HGETALL bull:webhooks:5
```

### Logs

```bash
# Webhook triggers
[WebhookSubscriber] Triggered 1 webhook(s) for UPDATE catalog_brands (changed: name, description)

# Queued
[WebhookService] Queued webhook cache_catalog_brand_watch for catalog_brands:uuid

# Processing
[WebhookProcessor] Processing webhook job 123: cache_catalog_brand_watch for catalog_brands

# Success
[WebhookService] Webhook cache_catalog_brand_watch sent successfully (200)

# Retry
[WebhookProcessor] Webhook job 123 failed: Connection refused (will retry)
```

## Testing

### 1. Test Entity Update

```bash
# Update a brand via GraphQL
curl -X POST http://localhost:3000/admin/graphql \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateCatalogBrand(id: \"uuid\", input: { name: \"BMW Group\" }) { id name } }"
  }'
```

### 2. Mock Webhook Endpoint

```typescript
// test-webhook-server.ts
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/cache/invalidate', (req, res) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Mock webhook server running on :3000');
});
```

### 3. Check Queue Status

```typescript
// Add to webhook.service.ts
async getQueueStatus() {
  const waiting = await this.webhookQueue.getWaiting();
  const active = await this.webhookQueue.getActive();
  const completed = await this.webhookQueue.getCompleted();
  const failed = await this.webhookQueue.getFailed();

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length,
  };
}
```

## Common Use Cases

### 1. Next.js ISR Cache Invalidation

```typescript
@Watch({
  name: 'nextjs_isr',
  watch: ['title', 'content', 'publishedAt', 'status'],
  webhook: 'https://your-app.com/api/revalidate',
  selection: ['id', 'slug'],
  debounce: { delay: 2000 },
})
export class Article {}
```

### 2. Search Index Update

```typescript
@Watch({
  name: 'elasticsearch_update',
  watch: ['name', 'description', 'tags', 'category'],
  webhook: 'http://elasticsearch:9200/products/_update',
  method: 'POST',
  selection: ['id', 'name', 'description', 'tags'],
})
export class Product {}
```

### 3. CDN Purge

```typescript
@Watch({
  name: 'cdn_purge',
  watch: ['imageUrl', 'thumbnailUrl'],
  webhook: 'https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache',
  headers: {
    'Authorization': 'Bearer YOUR_CF_TOKEN',
  },
  selection: ['imageUrl', 'thumbnailUrl'],
})
export class Media {}
```

### 4. Real-time Notifications

```typescript
@Watch({
  name: 'user_notification',
  watch: ['status', 'assignedTo'],
  webhook: 'https://notifications.example.com/api/notify',
  selection: ['id', 'title', 'status', 'assignedTo'],
})
export class Task {}
```

## Environment Variables

```bash
# .env
CACHE_INVALIDATION_URL=http://localhost:3000/api/cache/invalidate
WEBHOOK_SECRET=your-webhook-secret-key

# Production
CACHE_INVALIDATION_URL=https://your-nextjs-app.com/api/cache/invalidate
WEBHOOK_SECRET=use-strong-secret-in-production
```

## Performance Considerations

### Debouncing

Use debouncing for frequently updated entities:
- **Fast updates**: `delay: 500ms`, `maxWait: 2000ms`
- **Normal updates**: `delay: 1000ms`, `maxWait: 5000ms`
- **Slow updates**: `delay: 5000ms`, `maxWait: 30000ms`

### Selection

Only send necessary data to reduce payload size:
```typescript
@Watch({
  selection: ['id', 'slug'],  // Not entire entity
})
```

### Conditional Webhooks

Not implemented yet, but you could add:
```typescript
@Watch({
  watch: ['status'],
  condition: (oldValue, newValue) => newValue.status === 'published',
})
```

## Troubleshooting

### Webhooks Not Triggering

1. **Check entity has @Watch decorator**
2. **Verify watched properties are changing**
3. **Check webhook URL is accessible**
4. **Review logs for errors**

### Too Many Webhook Calls

- Increase `debounce.delay`
- Add `maxWait` to force batching

### Webhooks Failing

- Check retry configuration
- Verify endpoint is accessible
- Check authentication headers
- Review failed jobs in Redis

### Duplicate Webhooks

- Ensure debouncing is configured
- Check for multiple @Watch decorators
- Verify entity isn't saved multiple times

## Migration from Contember

The `@Watch()` decorator directly maps from Contember:

**Contember**:
```typescript
@c.Watch({
  name: "cache_offer_watch",
  watch: ["price", "slug"],
  webhook: "https://...",
  selection: ["id", "publicId"],
})
```

**NestJS**:
```typescript
@Watch({
  name: "cache_offer_watch",
  watch: ["price", "slug"],
  webhook: "https://...",
  selection: ["id", "publicId"],
})
```

## Summary

✅ **@Watch Decorator** - Monitor entity properties
✅ **Automatic Triggers** - On INSERT/UPDATE/DELETE
✅ **Debouncing** - Prevent webhook flooding
✅ **Async Queue** - Non-blocking with Bull
✅ **Retry Logic** - Exponential backoff
✅ **Flexible Payloads** - Select data to send
✅ **Next.js Ready** - Perfect for ISR cache invalidation

The system is production-ready and optimized for high-performance applications! 🚀
