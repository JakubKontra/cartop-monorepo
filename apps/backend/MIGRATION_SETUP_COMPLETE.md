# MySQL to PostgreSQL Migration - Setup Complete ✅

## Summary

A complete, production-ready migration system has been successfully installed for migrating data from your legacy MySQL database to the new PostgreSQL database.

## What Was Installed

### 📦 Package Dependencies
- ✅ `mysql2` - MySQL database driver for Node.js

### 🗂️ Directory Structure Created

```
src/database/migration/
├── README.md                              # Quick reference guide
├── mysql-to-postgres.ts                  # Main migration orchestrator (533 lines)
├── config/
│   └── mysql-connection.config.ts        # Database connection configs
├── types/
│   └── migration.types.ts                # TypeScript interfaces & types
├── utils/
│   └── migration.utils.ts                # Utility functions for data transformation
└── mappers/                              # Entity mappers
    ├── user.mapper.ts                    # Example: User entity mapper
    ├── car-request.mapper.ts             # Example: CarRequest entity mapper
    └── _template.mapper.ts.example       # Template for creating new mappers
```

### 📄 Documentation Created

1. **`docs/MYSQL_MIGRATION.md`** (500+ lines)
   - Complete migration guide
   - Step-by-step instructions
   - Troubleshooting section
   - Best practices
   - Examples and use cases

2. **`src/database/migration/README.md`**
   - Quick start guide
   - Architecture overview
   - Command reference

### ⚙️ NPM Scripts Added

```json
{
  "migrate:mysql": "Run full migration",
  "migrate:mysql:dry-run": "Preview without writing data",
  "migrate:mysql:help": "Show help and options"
}
```

### 🔧 Configuration Added

- ✅ `.env.example` updated with MySQL connection variables
- ✅ Environment variable validation
- ✅ Connection pooling configuration

## Quick Start Guide

### 1. Configure Your MySQL Connection

Edit your `.env` file:

```env
# MySQL Legacy Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=cartop_old
```

### 2. Test the Connection (Dry Run)

```bash
yarn migrate:mysql:dry-run
```

This will:
- Connect to both databases
- Validate tables exist
- Show how many records would be migrated
- Display any errors WITHOUT writing data

### 3. Run the Migration

```bash
yarn migrate:mysql
```

## Key Features

### ✅ Robust & Safe
- **Transactional**: Batch processing with error handling
- **Rollback support**: Stop on error or skip failed records
- **Dry-run mode**: Preview before committing
- **Validation**: Automatic data validation before and after migration

### ✅ Efficient
- **Batch processing**: Handles millions of records efficiently
- **Configurable batch size**: Adjust for your memory/performance needs
- **Progress tracking**: Real-time ETA and progress updates
- **Connection pooling**: Optimized database connections

### ✅ Flexible
- **Mapper-based**: Easy to extend for new entity types
- **Dependency resolution**: Automatic ordering based on foreign keys
- **Data transformation**: Built-in utilities for type conversions
- **Selective migration**: Migrate specific entities only

### ✅ Developer-Friendly
- **Full TypeScript**: Type-safe migrations
- **Detailed logging**: Track every step
- **Error reporting**: Comprehensive error collection and reporting
- **Template provided**: Easy to create new mappers

## Example Mappers Included

### 1. User Mapper (`mappers/user.mapper.ts`)
Demonstrates:
- Basic field mapping
- Role parsing from various formats
- Boolean and date conversions
- Data validation

### 2. CarRequest Mapper (`mappers/car-request.mapper.ts`)
Demonstrates:
- Complex entity with many fields
- Foreign key mapping
- Enum value mapping
- Legacy system tracking
- Relationship handling

### 3. Template Mapper (`mappers/_template.mapper.ts.example`)
A comprehensive template with:
- Detailed comments
- All optional methods
- Common patterns
- Best practices
- Checklist for implementation

## Architecture Overview

```
┌────────────────────────────────────────────────────┐
│              Migration Orchestrator                 │
│            (mysql-to-postgres.ts)                  │
└─────────────────┬──────────────────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
    ┌───▼───┐ ┌──▼──┐  ┌───▼────┐
    │ MySQL │ │Types│  │ Postgres│
    │Config │ │Utils│  │ Config  │
    └───────┘ └──┬──┘  └─────────┘
                 │
         ┌───────┴────────┐
         │                │
    ┌────▼─────┐    ┌────▼─────┐
    │  User    │    │ CarReq   │
    │  Mapper  │    │  Mapper  │
    └──────────┘    └──────────┘
         │                │
         └────────┬───────┘
                  │
            ┌─────▼──────┐
            │ PostgreSQL │
            │  Entities  │
            └────────────┘
```

## Migration Process Flow

```
1. Initialize
   ├─ Load environment variables
   ├─ Connect to MySQL (source)
   └─ Connect to PostgreSQL (target)

2. Register Mappers
   ├─ Load all entity mappers
   └─ Sort by dependencies

3. Validate Source
   ├─ Check tables exist
   └─ Count records

4. Migrate Each Entity (in order)
   ├─ Fetch data in batches
   ├─ Transform with mapper
   ├─ Validate each record
   └─ Save to PostgreSQL

5. Validate Results
   ├─ Compare record counts
   └─ Run custom validations

6. Generate Report
   └─ Display summary and errors
```

## Available Command Options

```bash
# Basic usage
yarn migrate:mysql

# Advanced options
yarn migrate:mysql --dry-run              # Preview only
yarn migrate:mysql --entities User        # Specific entities
yarn migrate:mysql --batch-size 500      # Custom batch size
yarn migrate:mysql --no-validation       # Skip validation
yarn migrate:mysql --fail-fast           # Stop on first error
yarn migrate:mysql --help                # Show all options
```

## Data Transformations Handled

The migration system handles:

✅ **Type conversions**
  - MySQL `INT` → PostgreSQL `UUID` (for IDs)
  - MySQL `TINYINT(1)` → PostgreSQL `BOOLEAN`
  - MySQL `DATETIME` → PostgreSQL `TIMESTAMP WITH TIME ZONE`
  - MySQL `TEXT` → PostgreSQL `JSONB` (for JSON fields)
  - MySQL `VARCHAR` → PostgreSQL `ENUM` (for enum fields)

✅ **Data cleaning**
  - Trim whitespace
  - Normalize emails (lowercase)
  - Parse JSON safely with fallbacks
  - Handle NULL values appropriately

✅ **Relationship mapping**
  - Map old integer IDs to new UUIDs
  - Preserve foreign key relationships
  - Handle cascading updates

✅ **Legacy tracking**
  - Mark records from legacy system
  - Store original ID for reference
  - Enable data auditing

## Creating Additional Mappers

To migrate more entity types:

1. **Copy the template**:
   ```bash
   cp src/database/migration/mappers/_template.mapper.ts.example \
      src/database/migration/mappers/your-entity.mapper.ts
   ```

2. **Update the mapper**:
   - Define MySQL interface
   - Implement `map()` function
   - Set dependencies if needed

3. **Register in orchestrator**:
   ```typescript
   // In mysql-to-postgres.ts, registerMappers()
   this.mappers = [
     new UserMapper(),
     new YourEntityMapper(), // Add here
     new CarRequestMapper(),
   ];
   ```

4. **Test**:
   ```bash
   yarn migrate:mysql:dry-run --entities YourEntity
   ```

## Utility Functions Available

```typescript
// Date conversion
mysqlDateToDate(value)           // MySQL datetime → JS Date

// Boolean conversion
mysqlBoolToBoolean(value)        // MySQL tinyint(1) → boolean

// JSON parsing
safeJsonParse(value, fallback)   // Safe JSON parse with fallback

// Database operations
getTableCount(conn, table)       // Get record count
tableExists(conn, table)         // Check if table exists
fetchInBatches(conn, table, n)   // Batch iterator
validateRecordCount(...)         // Validate migration

// Data processing
chunkArray(array, size)          // Split array into chunks
formatDuration(ms)               // Format milliseconds
logProgress(...)                 // Log migration progress
```

## Error Handling

The migration system provides comprehensive error handling:

- **Record-level errors**: Continue with remaining records (default)
- **Batch errors**: Skip problematic batches
- **Fatal errors**: Abort migration with detailed error log
- **Error collection**: All errors saved for review
- **Error context**: Full record data included for debugging

Choose your error handling strategy:
```bash
# Skip errors and continue (default)
yarn migrate:mysql

# Fail on first error
yarn migrate:mysql --fail-fast
```

## Performance Tuning

For large datasets:

```bash
# Increase batch size for faster processing
yarn migrate:mysql --batch-size 5000

# Disable progress logging for speed
yarn migrate:mysql --no-progress

# Combine options
yarn migrate:mysql --batch-size 5000 --no-progress --no-validation
```

**Recommended batch sizes:**
- Small records (<50 fields): 5000-10000
- Medium records (50-100 fields): 1000-2000
- Large records (>100 fields): 100-500
- Records with BLOBs: 10-100

## Testing Strategy

Before production migration:

1. ✅ **Test with sample data** (10-100 records)
   ```bash
   # Modify mapper to limit records
   yarn migrate:mysql:dry-run --entities User
   ```

2. ✅ **Dry run on full dataset**
   ```bash
   yarn migrate:mysql:dry-run
   ```

3. ✅ **Migrate to staging database**
   ```bash
   # Update .env with staging credentials
   yarn migrate:mysql
   ```

4. ✅ **Validate in staging**
   - Check record counts
   - Test application functionality
   - Verify relationships
   - Review error logs

5. ✅ **Production migration**
   ```bash
   # Schedule maintenance window
   # Backup both databases
   # Update .env with production credentials
   yarn migrate:mysql
   ```

## Rollback Strategy

If migration fails or data is incorrect:

1. **PostgreSQL has backup** (recommended):
   ```bash
   # Restore from backup
   psql -U postgres -d cartop_v3 < backup_before_migration.sql
   ```

2. **Clear migrated data**:
   ```sql
   -- PostgreSQL - Clear data (keep schema)
   TRUNCATE users, car_requests CASCADE;
   ```

3. **Re-run migration**:
   ```bash
   yarn migrate:mysql
   ```

## Monitoring Migration

During migration, watch for:

- ⏱️ **Progress**: ETA updates every 5 batches
- ✅ **Success count**: Records successfully migrated
- ⚠️ **Skip count**: Records skipped (validation failed)
- ❌ **Error count**: Records that failed to migrate
- 📊 **Rate**: Records per second
- 💾 **Memory usage**: Monitor process memory

## Post-Migration Tasks

After successful migration:

1. ✅ **Verify data**:
   ```sql
   -- Compare counts
   SELECT COUNT(*) FROM users;

   -- Check relationships
   SELECT COUNT(*) FROM car_requests WHERE customer_id IS NULL;

   -- Verify legacy tracking
   SELECT COUNT(*) FROM car_requests WHERE is_from_legacy_system = true;
   ```

2. ✅ **Update sequences** (if using serial/identity):
   ```sql
   -- Reset sequences if needed
   SELECT setval('your_sequence_name', (SELECT MAX(id) FROM your_table));
   ```

3. ✅ **Test application**: Ensure everything works with migrated data

4. ✅ **Keep MySQL backup**: Don't delete source database immediately

5. ✅ **Document differences**: Note any data transformations made

## Support & Documentation

- 📖 **Full Guide**: `docs/MYSQL_MIGRATION.md`
- 📝 **Quick Reference**: `src/database/migration/README.md`
- 🆘 **Help Command**: `yarn migrate:mysql:help`
- 💻 **Example Mappers**: Check `user.mapper.ts` and `car-request.mapper.ts`
- 📋 **Template**: `mappers/_template.mapper.ts.example`

## Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| Connection timeout | Check MySQL credentials and network access |
| Table not found | Verify table names match MySQL schema |
| Type conversion error | Use utility functions or add custom transformation |
| Foreign key error | Ensure dependencies migrated first |
| Out of memory | Reduce batch size |
| Slow migration | Increase batch size, disable logging |

For more details, see the [Troubleshooting section](docs/MYSQL_MIGRATION.md#troubleshooting) in the full guide.

## Next Steps

1. ✅ Configure MySQL connection in `.env`
2. ✅ Run dry-run: `yarn migrate:mysql:dry-run`
3. ✅ Review output and fix any errors
4. ✅ Create additional mappers as needed
5. ✅ Run migration: `yarn migrate:mysql`
6. ✅ Validate migrated data
7. ✅ Test application functionality

## Success Criteria

Migration is successful when:
- ✅ All record counts match between MySQL and PostgreSQL
- ✅ No failed records (or acceptable failure rate)
- ✅ All relationships are preserved
- ✅ Application functions correctly with new data
- ✅ No data loss or corruption

---

**🎉 The migration system is ready to use!**

Start with `yarn migrate:mysql:dry-run` to preview the migration.

For questions or issues, refer to the comprehensive documentation in `docs/MYSQL_MIGRATION.md`.
