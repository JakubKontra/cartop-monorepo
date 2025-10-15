# MySQL to PostgreSQL Migration Guide

This guide explains how to migrate data from your legacy MySQL database to the new PostgreSQL database.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Creating Custom Mappers](#creating-custom-mappers)
- [Running the Migration](#running-the-migration)
- [Validation and Verification](#validation-and-verification)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Overview

The migration system uses a **mapper-based architecture** that:

- ✅ Connects to both MySQL (source) and PostgreSQL (target) simultaneously
- ✅ Processes data in configurable batches for memory efficiency
- ✅ Handles data transformation and type conversions
- ✅ Maps old integer IDs to new UUIDs
- ✅ Preserves relationships and foreign keys
- ✅ Validates data integrity after migration
- ✅ Provides detailed progress tracking and error reporting
- ✅ Supports dry-run mode for preview

### Architecture

```
┌─────────────┐          ┌──────────────┐          ┌──────────────┐
│   MySQL     │  read    │   Mappers    │  write   │  PostgreSQL  │
│  (Legacy)   │ ───────> │ (Transform)  │ ───────> │    (New)     │
└─────────────┘          └──────────────┘          └──────────────┘
                                │
                                ├─ UserMapper
                                ├─ CarRequestMapper
                                ├─ [Your Custom Mappers]
                                └─ ...
```

## Prerequisites

1. **MySQL Database Access**
   - Host, port, credentials for your legacy MySQL database
   - Read-only access is sufficient

2. **PostgreSQL Database**
   - Your new PostgreSQL database should be set up
   - Schema should be in place (via migrations or synchronization)

3. **Dependencies Installed**
   ```bash
   yarn install  # mysql2 package is now included
   ```

4. **Environment Variables**
   - Configure both MySQL and PostgreSQL connections in `.env`

## Quick Start

### 1. Configure Environment Variables

Add MySQL connection details to your `.env` file:

```env
# PostgreSQL (existing)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cartop_v3

# MySQL (legacy database)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=cartop_old
```

### 2. Test Connection (Dry Run)

Preview the migration without writing any data:

```bash
yarn migrate:mysql:dry-run
```

This will:
- Connect to both databases
- Validate source tables exist
- Show how many records would be migrated
- Display any transformation errors

### 3. Run the Migration

When ready, run the full migration:

```bash
yarn migrate:mysql
```

### 4. Review Results

The script will output:
- Progress for each entity type
- Total records migrated, skipped, and failed
- Validation results comparing source and target counts
- Any errors encountered

## Configuration

### Command Line Options

```bash
# Full migration
yarn migrate:mysql

# Dry run (preview only)
yarn migrate:mysql:dry-run

# Migrate specific entities only
yarn migrate:mysql --entities User,CarRequest

# Custom batch size (default: 1000)
yarn migrate:mysql --batch-size 500

# Skip validation after migration
yarn migrate:mysql --no-validation

# Disable progress logging
yarn migrate:mysql --no-progress

# Fail on first error (default: continue)
yarn migrate:mysql --fail-fast

# Show help
yarn migrate:mysql:help
```

## Creating Custom Mappers

To migrate additional entity types, create a mapper for each entity.

### Mapper Structure

Create a new file in `src/database/migration/mappers/`:

```typescript
// src/database/migration/mappers/your-entity.mapper.ts

import { EntityMapper, MigrationContext } from '../types/migration.types';
import { YourEntity } from '../../../path/to/your-entity.entity';
import { mysqlDateToDate, mysqlBoolToBoolean } from '../utils/migration.utils';

interface MySQLYourEntity {
  // Define your MySQL table structure
  id: number;
  name: string;
  created_at: Date | string;
  // ... other fields
}

export class YourEntityMapper implements EntityMapper<MySQLYourEntity, YourEntity> {
  sourceTable = 'your_mysql_table_name';
  targetEntity = YourEntity;
  entityName = 'YourEntity';
  dependencies = []; // List dependencies if any

  async map(source: MySQLYourEntity, context: MigrationContext): Promise<YourEntity | null> {
    const entity = new YourEntity();

    // Map fields
    entity.name = source.name;
    entity.createdAt = mysqlDateToDate(source.created_at);

    // Handle transformations
    // ...

    return entity;
  }

  // Optional: Custom validation
  async validate(target: YourEntity, source: MySQLYourEntity): Promise<boolean | string> {
    if (!target.name) {
      return 'Name is required';
    }
    return true;
  }

  // Optional: Post-migration processing
  async afterMigration(context: MigrationContext): Promise<void> {
    console.log('  Post-processing complete');
  }
}
```

### Register Your Mapper

Add your mapper to the migration script:

```typescript
// src/database/migration/mysql-to-postgres.ts

import { YourEntityMapper } from './mappers/your-entity.mapper';

// In registerMappers() method:
this.mappers = [
  new UserMapper(),
  new YourEntityMapper(), // Add here
  new CarRequestMapper(),
];
```

### Mapper Utilities

Use these utility functions for common transformations:

```typescript
import {
  mysqlDateToDate,      // Convert MySQL datetime to JS Date
  mysqlBoolToBoolean,   // Convert MySQL tinyint(1) to boolean
  safeJsonParse,        // Safe JSON parsing with fallback
} from '../utils/migration.utils';

// Example usage
entity.isActive = mysqlBoolToBoolean(source.is_active);
entity.createdAt = mysqlDateToDate(source.created_at);
entity.metadata = safeJsonParse(source.metadata_json, {});
```

## Running the Migration

### Step-by-Step Process

1. **Backup Your PostgreSQL Database**
   ```bash
   pg_dump -h localhost -U postgres cartop_v3 > backup_before_migration.sql
   ```

2. **Run Dry Run First**
   ```bash
   yarn migrate:mysql:dry-run
   ```
   Review output for any errors or warnings.

3. **Run Full Migration**
   ```bash
   yarn migrate:mysql
   ```

4. **Review Migration Summary**
   The script will display:
   - Number of entities migrated
   - Total records processed
   - Success/failure counts
   - Validation results
   - Any errors encountered

### Migration Order

Entities are migrated in dependency order automatically:

1. **Independent entities** (no foreign keys): Users, Files, etc.
2. **Dependent entities** (with foreign keys): CarRequests, etc.

The migration system uses topological sorting to ensure dependencies are migrated first.

## Validation and Verification

### Automatic Validation

The migration script automatically validates:

1. **Pre-migration**: Checks that all source tables exist
2. **Per-record**: Validates each mapped record (if validator provided)
3. **Post-migration**: Compares record counts between source and target

### Manual Verification

After migration, verify your data:

```sql
-- PostgreSQL - Check record counts
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'car_requests', COUNT(*) FROM car_requests;

-- Check for missing relationships
SELECT COUNT(*) FROM car_requests WHERE customer_id IS NULL;

-- Verify legacy system tracking
SELECT COUNT(*) FROM car_requests WHERE is_from_legacy_system = true;
```

### Validation Queries

Compare source and target data:

```sql
-- MySQL (source)
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_requests FROM car_requests;

-- PostgreSQL (target)
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_requests FROM car_requests;
```

## Troubleshooting

### Common Issues

#### 1. Connection Errors

**Error**: `Cannot connect to MySQL database`

**Solution**:
- Verify MySQL credentials in `.env`
- Check MySQL server is running
- Ensure firewall allows connection
- Test connection: `mysql -h localhost -u root -p`

#### 2. Missing Tables

**Error**: `Table not found: table_name`

**Solution**:
- Verify table names in your mappers match MySQL schema
- Check table naming (case-sensitive on some systems)
- Ensure you have the correct database selected

#### 3. Type Conversion Errors

**Error**: `Invalid date format` or similar

**Solution**:
- Use utility functions: `mysqlDateToDate()`, `mysqlBoolToBoolean()`
- Add null checks before conversion
- Handle legacy data edge cases in your mapper

#### 4. Foreign Key Mapping Issues

**Error**: `Could not map foreign key`

**Solution**:
- Ensure dependencies are migrated first
- Check that related entities have `legacySystemId` or similar tracking field
- Verify foreign key values exist in source database

#### 5. Duplicate Key Violations

**Error**: `Duplicate key value violates unique constraint`

**Solution**:
- Check for duplicate data in source database
- Handle duplicates in your mapper (skip or merge)
- Clear target database if re-running migration

### Debug Mode

For detailed debugging, enable TypeORM logging:

```typescript
// In mysql-connection.config.ts
export const mysqlConfig: DataSourceOptions = {
  // ...
  logging: true,  // Enable query logging
  logger: 'advanced-console',
};
```

### Partial Migration Recovery

If migration fails partway:

1. **Identify last successful entity** from console output
2. **Clear partial data** from PostgreSQL (optional)
3. **Re-run with specific entities**:
   ```bash
   yarn migrate:mysql --entities EntityThatFailed,SubsequentEntity
   ```

## Advanced Usage

### Custom Batch Processing

For very large tables, adjust batch size:

```bash
# Smaller batches use less memory
yarn migrate:mysql --batch-size 100

# Larger batches are faster but use more memory
yarn migrate:mysql --batch-size 5000
```

### Selective Migration

Migrate only specific entities:

```bash
# Migrate just users
yarn migrate:mysql --entities User

# Migrate multiple specific entities
yarn migrate:mysql --entities User,CatalogBrand,CatalogModel
```

### Custom Fetch Queries

Override the default fetch behavior in your mapper:

```typescript
async fetchQuery(context: MigrationContext): Promise<MySQLYourEntity[]> {
  // Custom query with filtering or joins
  const query = `
    SELECT * FROM ${this.sourceTable}
    WHERE is_active = 1
    AND created_at >= '2020-01-01'
    ORDER BY id
  `;
  return context.mysqlConnection.query(query);
}
```

### Relationship Mapping

For entities with foreign keys, use the mapping helper:

```typescript
// Store legacy ID for later lookup
entity.isFromLegacySystem = true;
entity.legacySystemId = String(source.id);

// Map foreign key
entity.customerId = await this.mapForeignKey(
  context,
  'users',
  source.customer_id
);

private async mapForeignKey(
  context: MigrationContext,
  targetTable: string,
  legacyId: string | number | undefined
): Promise<string | null> {
  if (!legacyId) return null;

  const query = `
    SELECT id FROM ${targetTable}
    WHERE legacy_system_id = $1
    LIMIT 1
  `;
  const result = await context.postgresConnection.query(query, [String(legacyId)]);
  return result.length > 0 ? result[0].id : null;
}
```

### Post-Migration Processing

Use the `afterMigration` hook for cleanup or additional processing:

```typescript
async afterMigration(context: MigrationContext): Promise<void> {
  // Update computed fields
  await context.postgresConnection.query(`
    UPDATE your_table
    SET computed_field = calculate_value(some_field)
  `);

  // Update relationships that couldn't be set during initial migration
  // Clean up temporary data
  // Send notifications
  // etc.
}
```

## Best Practices

1. **Always run dry-run first** to preview and catch errors early
2. **Backup your PostgreSQL database** before running migration
3. **Test on a staging environment** before production migration
4. **Monitor memory usage** for large datasets (adjust batch size if needed)
5. **Keep legacy tracking fields** (`isFromLegacySystem`, `legacySystemId`) for debugging
6. **Document schema differences** between MySQL and PostgreSQL
7. **Plan for downtime** during production migration
8. **Verify data integrity** after migration with sample queries

## Performance Tips

- **Use appropriate batch sizes**: 1000 is default, adjust based on record size
- **Disable validation** during initial runs: `--no-validation`
- **Disable progress logging** for faster execution: `--no-progress`
- **Run during off-hours** to minimize impact on source database
- **Use indexes** on foreign key columns in both databases
- **Consider parallel migrations** for independent entities (requires code modification)

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review error messages and logs carefully
3. Consult TypeORM documentation for database-specific issues
4. Open an issue in the project repository

## Example Migration Session

```bash
# 1. Preview the migration
$ yarn migrate:mysql:dry-run

🚀 MySQL to PostgreSQL Migration

🔌 Initializing database connections...
  ✅ MySQL connected
  ✅ PostgreSQL connected

📝 Registering entity mappers...
  Registered mappers:
    1. User
    2. CarRequest

🔍 Validating source database...
  ✅ users: 1,234 records
  ✅ car_requests: 5,678 records

🔬 DRY RUN MODE - No data will be written

📦 Migrating User...
   Total records: 1,234
   ✅ Migrated: 1,234
   ⚠️  Skipped: 0
   ❌ Failed: 0

📦 Migrating CarRequest...
   Total records: 5,678
   ✅ Migrated: 5,678
   ⚠️  Skipped: 0
   ❌ Failed: 0

============================================================
📊 MIGRATION SUMMARY
============================================================

Status: ✅ SUCCESS
Duration: 45s

Entities: 2
Total Records: 6,912
✅ Migrated: 6,912
⚠️  Skipped: 0
❌ Failed: 0

============================================================

# 2. Run the actual migration
$ yarn migrate:mysql

# ... (similar output, but data is actually written) ...
```

## Conclusion

This migration system provides a robust, flexible way to migrate data from MySQL to PostgreSQL while maintaining data integrity and handling the complex transformations required for your schema differences.

Remember to:
- Test thoroughly before production migration
- Keep backups of both databases
- Document any custom mappers you create
- Monitor the migration process for errors

Happy migrating! 🚀
