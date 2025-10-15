# Database Migration System

This directory contains the MySQL to PostgreSQL migration infrastructure.

## Structure

```
migration/
├── README.md                           # This file
├── mysql-to-postgres.ts               # Main migration orchestrator
├── config/
│   └── mysql-connection.config.ts     # Database connection configs
├── types/
│   └── migration.types.ts             # TypeScript interfaces
├── utils/
│   └── migration.utils.ts             # Utility functions
└── mappers/                           # Entity mappers
    ├── user.mapper.ts                 # User entity mapper
    ├── car-request.mapper.ts          # CarRequest entity mapper
    └── [add your mappers here]
```

## Quick Start

```bash
# 1. Configure your MySQL connection in .env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=cartop_old

# 2. Run a dry-run to preview
yarn migrate:mysql:dry-run

# 3. Run the actual migration
yarn migrate:mysql
```

## Documentation

📖 **Full Documentation**: [MYSQL_MIGRATION.md](../../../docs/MYSQL_MIGRATION.md)

The complete guide covers:
- Prerequisites and setup
- Creating custom mappers
- Configuration options
- Troubleshooting
- Best practices

## Available Commands

```bash
# Run full migration
yarn migrate:mysql

# Preview without writing data
yarn migrate:mysql:dry-run

# Show help and all options
yarn migrate:mysql:help

# Migrate specific entities only
yarn migrate:mysql --entities User,CarRequest

# Custom batch size
yarn migrate:mysql --batch-size 500
```

## Creating New Mappers

To migrate a new entity type:

1. **Create mapper file**: `mappers/your-entity.mapper.ts`
2. **Implement EntityMapper interface**:
   ```typescript
   export class YourEntityMapper implements EntityMapper {
     sourceTable = 'mysql_table_name';
     targetEntity = YourEntity;
     entityName = 'YourEntity';
     dependencies = []; // List dependencies

     async map(source, context) {
       // Transform MySQL data to PostgreSQL entity
       const entity = new YourEntity();
       entity.field = source.field;
       return entity;
     }
   }
   ```
3. **Register mapper** in `mysql-to-postgres.ts`
4. **Test with dry-run**

## Example Mappers

- `user.mapper.ts` - Basic entity with role parsing
- `car-request.mapper.ts` - Complex entity with foreign keys

Use these as templates for your own mappers.

## Key Features

✅ **Batch Processing** - Processes large datasets efficiently
✅ **Dependency Resolution** - Handles foreign keys automatically
✅ **Data Validation** - Validates before and after migration
✅ **Error Handling** - Continues on errors, logs issues
✅ **Dry Run Mode** - Preview changes before committing
✅ **Progress Tracking** - Real-time progress and ETA
✅ **Type Safety** - Full TypeScript support

## Utility Functions

Common utilities in `utils/migration.utils.ts`:

```typescript
// Date conversion
mysqlDateToDate(value) // MySQL datetime → JS Date

// Boolean conversion
mysqlBoolToBoolean(value) // MySQL tinyint(1) → boolean

// JSON parsing
safeJsonParse(value, fallback) // Safe JSON parse with fallback

// Table operations
getTableCount(connection, table) // Get record count
tableExists(connection, table)   // Check if table exists
```

## Migration Flow

```
1. Initialize Connections
   ├─ Connect to MySQL (read-only)
   └─ Connect to PostgreSQL (write)

2. Register Mappers
   ├─ Load entity mappers
   └─ Sort by dependencies

3. Validate Source
   ├─ Check tables exist
   └─ Count records

4. Migrate Entities (in dependency order)
   ├─ Fetch from MySQL in batches
   ├─ Transform with mapper
   ├─ Validate each record
   └─ Save to PostgreSQL

5. Validate Results
   ├─ Compare record counts
   └─ Run custom validations

6. Generate Report
   └─ Display summary and errors
```

## Error Handling

- **Skip on error** (default): Logs error, continues with next record
- **Fail fast**: Stops on first error (`--fail-fast`)
- All errors are collected and reported at the end

## Performance

Default settings work for most cases:
- **Batch size**: 1000 records
- **Connection pool**: 10 connections (MySQL)

For large tables (>1M records):
- Increase batch size: `--batch-size 5000`
- Disable progress logging: `--no-progress`
- Run during off-hours

## Testing

Before production migration:

1. ✅ Test on sample data first
2. ✅ Run dry-run on full dataset
3. ✅ Backup both databases
4. ✅ Verify in staging environment
5. ✅ Document any schema differences
6. ✅ Plan rollback strategy

## Support

- 📖 Read: [Full Documentation](../../../docs/MYSQL_MIGRATION.md)
- 🔧 Debug: Enable logging in connection config
- ❓ Help: Run `yarn migrate:mysql:help`

## License

Part of the Cartop backend application.
