# Performance Optimization Guide

## Audit System Performance

### 1. Batch Processing Configuration

#### High-Write Scenarios (1000+ writes/sec)
```bash
AUDIT_BATCH_SIZE=50          # Smaller batches, more frequent writes
AUDIT_BATCH_INTERVAL_MS=1000 # Flush every second
```

#### Medium-Write Scenarios (100-1000 writes/sec)
```bash
AUDIT_BATCH_SIZE=100         # Balanced approach
AUDIT_BATCH_INTERVAL_MS=5000 # Default setting
```

#### Low-Write Scenarios (<100 writes/sec)
```bash
AUDIT_BATCH_SIZE=500         # Larger batches
AUDIT_BATCH_INTERVAL_MS=30000 # Less frequent flushes
```

### 2. Database Optimization

#### Connection Pool Tuning

```typescript
// Main database - adjust based on concurrent users
extra: {
  max: 20,              // = (core_count * 2) + effective_spindle_count
  min: 5,               // Keep warm connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

// Audit database - optimize for writes
extra: {
  max: 10,              // Fewer connections needed for writes
  min: 2,
  idleTimeoutMillis: 30000,
}
```

#### PostgreSQL Configuration

```sql
-- postgresql.conf optimizations for audit logging

-- Memory
shared_buffers = 256MB              # 25% of RAM for dedicated server
effective_cache_size = 1GB          # 50-75% of RAM
work_mem = 16MB                     # Per operation
maintenance_work_mem = 128MB        # For bulk operations

-- Write Performance
wal_buffers = 16MB
checkpoint_completion_target = 0.9
max_wal_size = 2GB

-- Async Commit for Audits (if acceptable to lose few seconds on crash)
synchronous_commit = off            # For audit database only!

-- Parallel Workers
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
```

### 3. Indexing Strategy

#### Essential Indexes (Already Implemented)
```sql
-- Time-range queries (most common)
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);

-- Entity history
CREATE INDEX idx_audit_entity ON audit_logs(entity_name, created_at DESC);
CREATE INDEX idx_audit_entity_id ON audit_logs(entity_id, created_at DESC);

-- User activity
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
```

#### Optional Indexes for Specific Use Cases
```sql
-- Search by action type
CREATE INDEX idx_audit_action ON audit_logs(action, created_at DESC);

-- Combined entity + action queries
CREATE INDEX idx_audit_entity_action ON audit_logs(entity_name, action, created_at DESC);

-- JSONB field searches (if querying specific fields)
CREATE INDEX idx_audit_changes ON audit_logs USING gin(changes);
CREATE INDEX idx_audit_metadata ON audit_logs USING gin(metadata);
```

### 4. Partitioning Implementation

#### Monthly Partitioning (Recommended)
```sql
-- Convert to partitioned table
CREATE TABLE audit_logs_partitioned (
    LIKE audit_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions for 2025
CREATE TABLE audit_logs_2025_01 PARTITION OF audit_logs_partitioned
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- ... repeat for all months

-- Automatic partition creation
CREATE OR REPLACE FUNCTION maintain_audit_partitions()
RETURNS void AS $$
DECLARE
    partition_date date;
    partition_name text;
BEGIN
    -- Create next 3 months of partitions
    FOR i IN 0..2 LOOP
        partition_date := date_trunc('month', NOW() + (i || ' months')::interval);
        partition_name := 'audit_logs_' || to_char(partition_date, 'YYYY_MM');

        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = partition_name) THEN
            EXECUTE format(
                'CREATE TABLE %I PARTITION OF audit_logs_partitioned
                FOR VALUES FROM (%L) TO (%L)',
                partition_name,
                partition_date,
                partition_date + interval '1 month'
            );

            -- Create indexes
            EXECUTE format('CREATE INDEX %I ON %I(created_at DESC)',
                partition_name || '_created_idx', partition_name);
            EXECUTE format('CREATE INDEX %I ON %I(entity_name, created_at DESC)',
                partition_name || '_entity_idx', partition_name);
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Schedule monthly (using pg_cron)
SELECT cron.schedule('maintain-partitions', '0 0 1 * *',
    'SELECT maintain_audit_partitions()');
```

#### Weekly Partitioning (High Volume)
```sql
-- For extremely high volume (millions of audits per week)
CREATE TABLE audit_logs_partitioned (
    LIKE audit_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Create weekly partitions
CREATE TABLE audit_logs_2025_w01 PARTITION OF audit_logs_partitioned
    FOR VALUES FROM ('2025-01-01') TO ('2025-01-08');
```

### 5. Query Optimization

#### Use Covering Indexes
```sql
-- Include commonly selected columns in index
CREATE INDEX idx_audit_covering ON audit_logs(
    entity_name, created_at DESC
) INCLUDE (entity_id, action, user_id);
```

#### Optimize Common Queries
```typescript
// ❌ Bad: Full table scan
const audits = await auditRepository.find({
  where: { entityName: 'users' }
});

// ✅ Good: Use time range + entity filter
const audits = await auditRepository
  .createQueryBuilder('audit')
  .where('audit.entityName = :name', { name: 'users' })
  .andWhere('audit.createdAt >= :since', { since: oneMonthAgo })
  .orderBy('audit.createdAt', 'DESC')
  .limit(100)
  .getMany();
```

### 6. Bull Queue Optimization

#### Redis Configuration
```typescript
BullModule.forRoot({
  redis: {
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    // Use Redis Cluster for high availability
    // cluster: [
    //   { host: 'redis-1', port: 6379 },
    //   { host: 'redis-2', port: 6379 },
    // ],
  },
});
```

#### Queue Settings
```typescript
await this.auditQueue.add('log-audit', data, {
  attempts: 3,                    // Retry failed jobs
  backoff: {
    type: 'exponential',
    delay: 2000,                  // Start with 2s, then 4s, 8s
  },
  removeOnComplete: 100,          // Keep last 100 completed
  removeOnFail: 1000,             // Keep last 1000 failed
  priority: 1,                    // Lower number = higher priority
});
```

#### Concurrency Settings
```typescript
@Processor('audit')
export class AuditProcessor {
  @Process({ name: 'log-audit', concurrency: 5 })
  async handleAuditLog(job: Job<AuditLogData>) {
    // Process up to 5 jobs simultaneously
  }
}
```

### 7. Database Triggers (Zero Application Overhead)

```sql
-- Apply trigger to all tables that need auditing
DROP TRIGGER IF EXISTS users_audit_trigger ON users;
CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- For high-write tables, consider trigger-based + app-based hybrid:
-- Trigger captures the change, app adds context (user info, metadata)
```

### 8. Archival Strategy

#### Move Old Audits to Archive Table
```sql
-- Create archive table (same structure, no indexes)
CREATE TABLE audit_logs_archive (LIKE audit_logs INCLUDING ALL);

-- Move old data (older than 1 year)
WITH moved AS (
    DELETE FROM audit_logs
    WHERE created_at < NOW() - INTERVAL '1 year'
    RETURNING *
)
INSERT INTO audit_logs_archive SELECT * FROM moved;

-- Or with partitions, simply detach
ALTER TABLE audit_logs_partitioned DETACH PARTITION audit_logs_2024_01;
-- Move to archive storage or drop
```

#### Compression for Archives
```sql
-- Use table compression for archive tables
ALTER TABLE audit_logs_archive SET (
    toast_tuple_target = 128,
    fillfactor = 90
);

-- Or export to compressed files
COPY (SELECT * FROM audit_logs WHERE created_at < '2024-01-01')
TO '/backups/audit_2023.csv' WITH (FORMAT csv, COMPRESSION gzip);
```

### 9. Monitoring

#### Key Metrics to Track

```typescript
// Add custom metrics in audit.service.ts
private readonly metrics = {
  bufferSize: 0,
  flushCount: 0,
  failedWrites: 0,
  avgBatchSize: 0,
};

async flushBuffer() {
  const size = this.auditBuffer.length;
  this.metrics.bufferSize = size;
  this.metrics.flushCount++;

  // ... flush logic

  this.logger.log(`Metrics: ${JSON.stringify(this.metrics)}`);
}
```

#### PostgreSQL Monitoring Queries
```sql
-- Check audit table size
SELECT
    pg_size_pretty(pg_total_relation_size('audit_logs')) as total_size,
    pg_size_pretty(pg_relation_size('audit_logs')) as table_size,
    pg_size_pretty(pg_total_relation_size('audit_logs') - pg_relation_size('audit_logs')) as index_size;

-- Check index usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'audit_logs'
ORDER BY idx_scan DESC;

-- Check write performance
SELECT
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    n_live_tup as live_tuples,
    n_dead_tup as dead_tuples
FROM pg_stat_user_tables
WHERE relname = 'audit_logs';
```

### 10. Load Testing

#### Test Audit Performance
```bash
# Install k6 or artillery
npm install -g artillery

# Create load test
cat > load-test.yml << EOF
config:
  target: 'http://localhost:3000/graphql'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Sustained load"
scenarios:
  - name: "Create users"
    weight: 1
    flow:
      - post:
          url: "/graphql"
          json:
            query: "mutation { createUser(input: {...}) { id } }"
EOF

# Run test
artillery run load-test.yml
```

## Benchmarks

### Expected Performance

| Scenario | Configuration | Throughput | Latency |
|----------|--------------|------------|---------|
| Low Load | Default | 100 audits/sec | <10ms |
| Medium Load | Tuned | 1,000 audits/sec | <50ms |
| High Load | Partitioned + Triggers | 10,000 audits/sec | <100ms |

### Scaling Limits

- **Single Instance**: ~5,000 audits/sec
- **With Redis Cluster**: ~20,000 audits/sec
- **With DB Triggers**: 50,000+ audits/sec
- **Partitioned + Replicas**: 100,000+ audits/sec

## Troubleshooting Performance Issues

### Symptom: Slow Audit Writes

**Diagnosis:**
```sql
-- Check for lock contention
SELECT * FROM pg_stat_activity
WHERE wait_event_type IS NOT NULL
  AND query LIKE '%audit_logs%';

-- Check for bloat
SELECT * FROM pgstattuple('audit_logs');
```

**Solutions:**
1. Increase batch size
2. Add more Bull workers
3. Use database triggers
4. Partition the table

### Symptom: High Memory Usage

**Diagnosis:**
- Check `this.auditBuffer.length` in logs
- Monitor Node.js heap size

**Solutions:**
1. Reduce `AUDIT_BATCH_SIZE`
2. Decrease `AUDIT_BATCH_INTERVAL_MS`
3. Add more frequent flushes

### Symptom: Slow Audit Queries

**Diagnosis:**
```sql
EXPLAIN ANALYZE
SELECT * FROM audit_logs
WHERE entity_name = 'users'
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

**Solutions:**
1. Add appropriate indexes
2. Use time-range filters
3. Enable partitioning
4. Limit result sets

## Production Recommendations

1. **Enable Partitioning** for tables with >10M rows
2. **Use Database Triggers** for critical tables
3. **Set up Archival** for data older than 1 year
4. **Monitor Queue Depth** and add workers if needed
5. **Use Redis Cluster** for high availability
6. **Enable Query Logging** to identify slow queries
7. **Set up Alerts** for failed audit writes
8. **Regular VACUUM** on audit table
9. **Benchmark** before going to production
10. **Start Conservative** and tune based on metrics
