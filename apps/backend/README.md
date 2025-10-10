# CartOp Backend V3 - High-Performance GraphQL API with Audit Logging

A scalable NestJS GraphQL API with comprehensive audit logging system designed for high-throughput applications.

## Features

- **GraphQL API** with code-first approach using Apollo Server
- **Modular Architecture** with `/model/` pattern for easy scalability
- **Comprehensive Audit System** tracking all database changes
- **High Performance** with async queue processing and batch writes
- **TypeORM** with PostgreSQL for robust data management
- **Separate Connection Pools** for main and audit operations
- **Bull Queue** with Redis for background processing
- **Field-Level Change Tracking** for detailed audit trails
- **Time-Based Partitioning** support for audit logs
- **Database Triggers** for zero-overhead audit logging

## Architecture

```
src/
├── model/                      # Domain models
│   ├── audit/                 # Audit logging module
│   │   ├── audit-log.entity.ts
│   │   ├── audit.service.ts   # Batch processing & queuing
│   │   ├── audit.processor.ts # Bull queue processor
│   │   ├── audit.resolver.ts  # GraphQL queries
│   │   ├── audit.subscriber.ts # TypeORM hooks
│   │   └── dto/
│   └── user/                  # Example model with audit
│       ├── user.entity.ts     # @Auditable decorator
│       ├── user.service.ts
│       ├── user.resolver.ts
│       └── dto/
├── common/                    # Shared utilities
│   ├── decorators/
│   │   └── auditable.decorator.ts
│   └── interfaces/
│       └── audit.interface.ts
└── app.module.ts              # Main application module
```

## Performance Optimizations

### 1. Async Audit Processing
- Non-blocking audit writes using Bull queues
- In-memory buffer with configurable batch size
- Automatic flush on threshold or timer

### 2. Separate Connection Pool
- Dedicated PostgreSQL connection pool for audit writes
- Prevents audit operations from blocking main transactions
- Optimized pool sizes for different workloads

### 3. Batch Writes
- Accumulates audit logs in memory
- Batch inserts to reduce database round-trips
- Configurable batch size (default: 100)
- Time-based flushing (default: 5 seconds)

### 4. Database Triggers (Optional)
- Zero application overhead
- Captures ALL changes including bulk operations
- Automatic change detection at database level
- See `database/triggers/audit-trigger.sql`

### 5. Table Partitioning (Optional)
- Time-based partitioning for large audit tables
- Improved query performance
- Easy archival and cleanup
- See `database/migrations/001-partition-audit-logs.sql`

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Environment Configuration

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cartop_v3

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Application
PORT=3000
NODE_ENV=development

# Audit Configuration
AUDIT_BATCH_SIZE=100          # Number of logs before flush
AUDIT_BATCH_INTERVAL_MS=5000  # Max time between flushes
```

### Database Setup

```bash
# Create database
createdb cartop_v3

# Run migrations (optional - TypeORM sync enabled in dev)
npm run migration:run
```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Access GraphQL Playground at: `http://localhost:3000/graphql`

## Usage Examples

### Creating an Auditable Entity

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';

@ObjectType()
@Entity('products')
@Auditable()  // Enable automatic audit tracking
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

### GraphQL Mutations (Automatically Audited)

```graphql
# Create user (generates CREATE audit log)
mutation {
  createUser(input: {
    email: "john@example.com"
    firstName: "John"
    lastName: "Doe"
    password: "secure123"
  }) {
    id
    email
    createdAt
  }
}

# Update user (generates UPDATE audit log with changes)
mutation {
  updateUser(
    id: "uuid-here"
    input: { firstName: "Jane" }
  ) {
    id
    firstName
  }
}

# Delete user (generates DELETE audit log)
mutation {
  deleteUser(id: "uuid-here")
}
```

### Querying Audit Logs

```graphql
# Get all audit logs for a specific entity
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

# Get user activity
query {
  userActivity(userId: "uuid-here", limit: 50) {
    id
    entityName
    action
    createdAt
  }
}

# Search audit logs with filters
query {
  auditLogs(query: {
    entityName: "users"
    action: UPDATE
    startDate: "2025-01-01"
    endDate: "2025-12-31"
    limit: 100
  }) {
    id
    entityId
    action
    changes
    oldValue
    newValue
    createdAt
  }
}
```

## Audit System Architecture

### 3-Layer Approach

1. **Application Layer** (TypeORM Subscribers)
   - Captures context: user info, IP, metadata
   - Non-blocking async processing
   - Flexible business logic

2. **Queue Layer** (Bull + Redis)
   - Async job processing
   - Retry mechanism
   - Rate limiting

3. **Database Layer** (Optional Triggers)
   - Zero application overhead
   - Captures bulk operations
   - Always consistent

### Audit Data Structure

```typescript
{
  id: 'uuid',
  entityName: 'users',
  entityId: 'user-uuid',
  action: 'UPDATE',
  oldValue: { firstName: 'John', lastName: 'Doe' },
  newValue: { firstName: 'Jane', lastName: 'Doe' },
  changes: {
    firstName: { old: 'John', new: 'Jane' }
  },
  userId: 'admin-uuid',
  userEmail: 'admin@example.com',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  metadata: { /* custom data */ },
  createdAt: '2025-01-09T12:00:00Z'
}
```

## Performance Tuning

### Batch Size Configuration

```bash
# High-write scenarios (more frequent flushes)
AUDIT_BATCH_SIZE=50
AUDIT_BATCH_INTERVAL_MS=2000

# Low-write scenarios (larger batches)
AUDIT_BATCH_SIZE=500
AUDIT_BATCH_INTERVAL_MS=10000
```

### Connection Pool Sizing

```typescript
// Main database pool
extra: {
  max: 20,  // Increase for high concurrency
  min: 5,
}

// Audit database pool
extra: {
  max: 10,  // Dedicated write capacity
  min: 2,
}
```

### Database Indexes

Already optimized indexes on:
- `entity_name + created_at`
- `entity_id + created_at`
- `user_id + created_at`
- `created_at` (for partitioning)

## Scaling Strategy

### Horizontal Scaling
- Stateless application design
- Redis-backed Bull queues shared across instances
- Connection pooling handles multiple app servers

### Database Scaling
- Read replicas for audit queries
- Partitioning for large audit tables
- Archive old partitions to cold storage

### Queue Scaling
- Multiple Bull processors per instance
- Redis Cluster for queue redundancy
- Priority queues for critical audits

## Monitoring

### Key Metrics to Track
- Audit buffer size
- Queue length and processing time
- Failed audit writes (check Dead Letter Queue)
- Database connection pool utilization
- Audit query performance

### Logging
- Application logs include audit service events
- Failed audits logged with full context
- Buffer flush statistics

## Security

### Audit Trail Integrity
- Immutable audit logs (no UPDATE/DELETE)
- Separate schema permissions
- Encrypted sensitive data in metadata
- IP and user agent tracking

### Access Control
- Audit queries require authentication
- Role-based access to audit data
- Rate limiting on audit endpoints

## Testing

```bash
# Run tests
npm test

# Run specific test suite
npm test -- audit.service.spec.ts

# Coverage
npm run test:cov
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Disable TypeORM `synchronize`
- [ ] Set up proper database migrations
- [ ] Configure Redis with persistence
- [ ] Enable database partitioning for audits
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy for audit logs
- [ ] Review connection pool sizes
- [ ] Enable database triggers (optional)
- [ ] Set up log aggregation
- [ ] Configure rate limiting
- [ ] Review security settings

## Advanced Topics

### Custom Audit Metadata

```typescript
await this.auditService.log({
  entityName: 'users',
  entityId: user.id,
  action: AuditAction.UPDATE,
  oldValue: oldUser,
  newValue: newUser,
  userId: currentUser.id,
  userEmail: currentUser.email,
  ipAddress: request.ip,
  userAgent: request.headers['user-agent'],
  metadata: {
    reason: 'Admin override',
    ticketId: 'TICKET-123',
    approvedBy: 'manager@example.com'
  }
});
```

### Bulk Operations

```typescript
// Bulk create with automatic audit
const users = await this.userService.createBulk(inputs);
// Each user creation is automatically audited
```

### Performance Analysis

```typescript
// Analyze audit query performance
EXPLAIN ANALYZE
SELECT * FROM audit_logs
WHERE entity_name = 'users'
  AND created_at >= '2025-01-01'
ORDER BY created_at DESC
LIMIT 100;
```

## Troubleshooting

### Audit logs not appearing
1. Check Redis connection
2. Verify Bull queue is processing jobs
3. Check application logs for errors
4. Ensure entity has `@Auditable()` decorator

### Slow audit queries
1. Check indexes are created
2. Consider partitioning
3. Review query filters
4. Limit result set size

### High memory usage
1. Reduce `AUDIT_BATCH_SIZE`
2. Decrease `AUDIT_BATCH_INTERVAL_MS`
3. Monitor buffer flush rate

## Contributing

Follow the modular pattern:
1. Create model in `src/model/{name}/`
2. Add `@Auditable()` decorator to entity
3. Implement service, resolver, DTOs
4. Export module in `app.module.ts`

## License

ISC

## Support

For issues and questions:
- Check logs in application output
- Review audit queue status
- Verify database connectivity
- Check Redis connection
