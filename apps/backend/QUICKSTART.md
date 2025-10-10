# Quick Start Guide

## Prerequisites

Ensure you have the following installed:
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start PostgreSQL and Redis

**Option A: Using Docker**
```bash
# PostgreSQL
docker run -d \
  --name cartop-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=cartop_v3 \
  -p 5432:5432 \
  postgres:14

# Redis
docker run -d \
  --name cartop-redis \
  -p 6379:6379 \
  redis:7-alpine
```

**Option B: Using Homebrew (macOS)**
```bash
brew install postgresql@14 redis
brew services start postgresql@14
brew services start redis

# Create database
createdb cartop_v3
```

### 3. Configure Environment
```bash
# .env file is already created with defaults
# Verify connection settings match your setup
cat .env
```

### 4. Start the Application
```bash
npm run start:dev
```

### 5. Test the API

Open your browser to: **http://localhost:3000/graphql**

Try this mutation:
```graphql
mutation {
  createUser(input: {
    email: "test@example.com"
    firstName: "John"
    lastName: "Doe"
    password: "password123"
  }) {
    id
    email
    firstName
    createdAt
  }
}
```

Query the audit logs:
```graphql
query {
  auditLogs(query: {
    entityName: "users"
    limit: 10
  }) {
    id
    action
    entityId
    newValue
    createdAt
  }
}
```

## Project Structure

```
src/
├── model/
│   ├── audit/          # Audit logging system
│   │   ├── audit-log.entity.ts
│   │   ├── audit.service.ts
│   │   ├── audit.processor.ts
│   │   ├── audit.resolver.ts
│   │   └── audit.subscriber.ts
│   └── user/           # Example model
│       ├── user.entity.ts
│       ├── user.service.ts
│       └── user.resolver.ts
├── common/
│   ├── decorators/
│   │   └── auditable.decorator.ts
│   └── interfaces/
└── app.module.ts
```

## How It Works

### 1. Create a New Model

Create a new entity with `@Auditable()` decorator:

```typescript
// src/model/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';

@ObjectType()
@Entity('products')
@Auditable()  // This enables automatic audit tracking
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('decimal')
  price: number;
}
```

### 2. Every Change is Automatically Tracked

When you perform any operation:
- **CREATE** - Logs the new entity
- **UPDATE** - Logs old vs new values with field-level changes
- **DELETE** - Logs the deleted entity

Example audit log:
```json
{
  "id": "uuid",
  "entityName": "products",
  "entityId": "product-uuid",
  "action": "UPDATE",
  "oldValue": { "price": 100 },
  "newValue": { "price": 150 },
  "changes": {
    "price": { "old": 100, "new": 150 }
  },
  "createdAt": "2025-01-09T..."
}
```

### 3. Query Audit History

```graphql
# Get history for a specific entity
query {
  entityHistory(
    entityName: "products"
    entityId: "product-uuid"
  ) {
    action
    changes
    createdAt
  }
}

# Get all changes in a time range
query {
  auditLogs(query: {
    startDate: "2025-01-01"
    endDate: "2025-01-31"
    limit: 100
  }) {
    entityName
    action
    createdAt
  }
}
```

## Performance Features

### 1. Async Processing
All audit logs are processed asynchronously using Bull queues. Your API responses remain fast.

### 2. Batch Writes
Audit logs are batched and written in bulk to minimize database load:
- Default batch size: 100 logs
- Default flush interval: 5 seconds

### 3. Separate Connection Pool
Audit writes use a dedicated database connection pool, preventing audit operations from impacting your main application.

### 4. Configurable
Adjust performance settings in `.env`:
```bash
AUDIT_BATCH_SIZE=100          # Logs per batch
AUDIT_BATCH_INTERVAL_MS=5000  # Max time between flushes
```

## Adding Your Own Models

1. **Create entity folder:**
```bash
mkdir -p src/model/product
```

2. **Create entity, service, resolver, module:**
```typescript
// src/model/product/product.entity.ts
@Entity('products')
@Auditable()  // ← Add this decorator
export class Product { ... }

// src/model/product/product.service.ts
export class ProductService { ... }

// src/model/product/product.resolver.ts
export class ProductResolver { ... }

// src/model/product/product.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
```

3. **Register in app.module.ts:**
```typescript
import { ProductModule } from './model/product/product.module';

@Module({
  imports: [
    // ... existing imports
    ProductModule,  // ← Add here
  ],
})
export class AppModule {}
```

4. **That's it!** All CRUD operations are now automatically audited.

## Advanced Features

### Database Triggers (Optional)
For even better performance, enable PostgreSQL triggers:

```bash
# Connect to your database
psql cartop_v3

# Load the trigger function
\i database/triggers/audit-trigger.sql

# Apply to your tables
CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

### Table Partitioning (Optional)
For high-volume audit logs (millions of records):

```bash
# Connect to database
psql cartop_v3

# Load partitioning script
\i database/migrations/001-partition-audit-logs.sql
```

## Troubleshooting

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Connection Issues
```bash
# Check PostgreSQL
psql -h localhost -U postgres -d cartop_v3

# Check Redis
redis-cli ping
```

### Audit Logs Not Appearing
1. Ensure entity has `@Auditable()` decorator
2. Check Redis connection: `redis-cli ping`
3. Check application logs for errors
4. Verify Bull queue is processing: Check Redis for keys like `bull:audit:*`

## Next Steps

- Read [README.md](README.md) for complete documentation
- Review [PERFORMANCE.md](PERFORMANCE.md) for optimization tips
- Check out the User model as an example
- Start building your own models!

## Common GraphQL Queries

### Create User
```graphql
mutation {
  createUser(input: {
    email: "user@example.com"
    firstName: "Jane"
    lastName: "Smith"
    password: "secure123"
    phone: "+1234567890"
  }) {
    id
    email
  }
}
```

### Update User
```graphql
mutation {
  updateUser(
    id: "uuid-here"
    input: { firstName: "UpdatedName" }
  ) {
    id
    firstName
  }
}
```

### Get All Users
```graphql
query {
  users(limit: 10) {
    id
    email
    firstName
    lastName
    createdAt
  }
}
```

### Search Users
```graphql
query {
  searchUsers(query: "john", limit: 10) {
    id
    email
    firstName
  }
}
```

### View Audit Trail
```graphql
query {
  entityHistory(
    entityName: "users"
    entityId: "uuid-here"
  ) {
    id
    action
    changes
    createdAt
  }
}
```

Happy coding! 🚀
