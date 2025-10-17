import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import {
  createMySQLDataSource,
  createPostgresDataSource,
} from './config/mysql-connection.config';
import {
  MigrationContext,
  MigrationOptions,
  MigrationResult,
  MigrationStats,
  EntityMapper,
  ValidationResult,
} from './types/migration.types';
import {
  DEFAULT_MIGRATION_OPTIONS,
  initStats,
  finalizeStats,
  logProgress,
  formatDuration,
  addError,
  getTableCount,
  tableExists,
  validateRecordCount,
  chunkArray,
} from './utils/migration.utils';

// Import mappers
import { UserMapper } from './mappers/user.mapper';
import { CarRequestMapper } from './mappers/car-request.mapper';
import { CatalogBrandMapper } from './mappers/catalog-brand.mapper';
import { CatalogModelMapper } from './mappers/catalog-model.mapper';
import { CatalogModelGenerationMapper } from './mappers/catalog-model-generation.mapper';

/**
 * MySQL to PostgreSQL Migration Script
 *
 * This script migrates data from a legacy MySQL database to a new PostgreSQL database.
 * It handles data transformation, relationship mapping, and validation.
 *
 * Usage:
 *   yarn migrate:mysql                 # Run full migration
 *   yarn migrate:mysql --dry-run       # Preview without writing data
 *   yarn migrate:mysql --entities User # Migrate specific entities only
 */

/**
 * Main migration orchestrator class
 */
class MySQLToPostgresMigration {
  private mysqlConnection!: DataSource;
  private postgresConnection!: DataSource;
  private context!: MigrationContext;
  private mappers: EntityMapper[] = [];

  constructor(private options: Required<MigrationOptions>) {}

  /**
   * Initialize database connections
   */
  async initialize(): Promise<void> {
    console.log('🔌 Initializing database connections...\n');

    // Load environment variables
    config({ path: '.env' });

    // Create and initialize MySQL connection
    console.log('  Connecting to MySQL (source database)...');
    this.mysqlConnection = createMySQLDataSource();
    await this.mysqlConnection.initialize();
    console.log('  ✅ MySQL connected\n');

    // Create and initialize PostgreSQL connection
    console.log('  Connecting to PostgreSQL (target database)...');
    this.postgresConnection = createPostgresDataSource();
    await this.postgresConnection.initialize();
    console.log('  ✅ PostgreSQL connected\n');

    // Initialize migration context
    this.context = {
      mysqlConnection: this.mysqlConnection,
      postgresConnection: this.postgresConnection,
      options: this.options,
      stats: new Map<string, MigrationStats>(),
    };
  }

  /**
   * Register entity mappers
   * Add your custom mappers here in the correct dependency order
   */
  registerMappers(): void {
    console.log('📝 Registering entity mappers...\n');

    // Register mappers - order matters due to dependencies!
    // Entities without dependencies should be registered first
    this.mappers = [
      new UserMapper(),
      new CatalogBrandMapper(),
      new CatalogModelMapper(),
      new CatalogModelGenerationMapper(),
      // Add other mappers here as you create them:
      // new LeasingCompanyMapper(),
      // new CarRequestStatusMapper(),
      // new CarRequestStateMapper(),
      new CarRequestMapper(),
    ];

    // Filter mappers if specific entities requested
    if (this.options.entities.length > 0) {
      this.mappers = this.mappers.filter((mapper) =>
        this.options.entities.includes(mapper.entityName)
      );
    }

    // Sort by dependencies
    this.mappers = this.sortMappersByDependencies(this.mappers);

    console.log('  Registered mappers:');
    this.mappers.forEach((mapper, index) => {
      console.log(`    ${index + 1}. ${mapper.entityName}`);
    });
    console.log('');
  }

  /**
   * Sort mappers by dependencies (topological sort)
   */
  private sortMappersByDependencies(mappers: EntityMapper[]): EntityMapper[] {
    const sorted: EntityMapper[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (mapper: EntityMapper): void => {
      if (visited.has(mapper.entityName)) return;
      if (visiting.has(mapper.entityName)) {
        throw new Error(`Circular dependency detected: ${mapper.entityName}`);
      }

      visiting.add(mapper.entityName);

      // Visit dependencies first
      if (mapper.dependencies) {
        for (const depName of mapper.dependencies) {
          const depMapper = mappers.find((m) => m.entityName === depName);
          if (depMapper) {
            visit(depMapper);
          }
        }
      }

      visiting.delete(mapper.entityName);
      visited.add(mapper.entityName);
      sorted.push(mapper);
    };

    mappers.forEach((mapper) => visit(mapper));
    return sorted;
  }

  /**
   * Validate source database before migration
   */
  async validateSource(): Promise<boolean> {
    console.log('🔍 Validating source database...\n');

    let isValid = true;

    for (const mapper of this.mappers) {
      const exists = await tableExists(this.mysqlConnection, mapper.sourceTable);
      if (!exists) {
        console.error(`  ❌ Table not found: ${mapper.sourceTable}`);
        isValid = false;
      } else {
        const count = await getTableCount(this.mysqlConnection, mapper.sourceTable);
        console.log(`  ✅ ${mapper.sourceTable}: ${count} records`);
      }
    }

    console.log('');
    return isValid;
  }

  /**
   * Migrate a single entity type
   */
  async migrateEntity(mapper: EntityMapper): Promise<MigrationStats> {
    const stats = initStats(mapper.entityName);
    this.context.stats.set(mapper.entityName, stats);

    console.log(`\n📦 Migrating ${mapper.entityName}...`);
    console.log(`   Source: ${mapper.sourceTable}`);

    try {
      // Fetch source data
      const sourceRecords = mapper.fetchQuery
        ? await mapper.fetchQuery(this.context)
        : await this.mysqlConnection.query(`SELECT * FROM ${mapper.sourceTable}`);

      stats.totalRecords = sourceRecords.length;
      console.log(`   Total records: ${stats.totalRecords}`);

      if (stats.totalRecords === 0) {
        console.log('   ⚠️  No records to migrate');
        return finalizeStats(stats);
      }

      // Get repository for target entity
      const repository = this.postgresConnection.getRepository(mapper.targetEntity);

      // Process in batches
      const batches = chunkArray(sourceRecords, this.options.batchSize);
      let processed = 0;

      for (const batch of batches) {
        const mappedEntities: any[] = [];

        // Map each record
        for (const sourceRecord of batch) {
          try {
            const mapped = await mapper.map(sourceRecord, this.context);

            if (mapped === null) {
              stats.skippedRecords++;
              continue;
            }

            // Validate if validator provided
            if (mapper.validate) {
              const validationResult = await mapper.validate(mapped, sourceRecord);
              if (validationResult !== true) {
                throw new Error(
                  typeof validationResult === 'string'
                    ? validationResult
                    : 'Validation failed'
                );
              }
            }

            mappedEntities.push(mapped);
          } catch (error) {
            const recordId = (sourceRecord as any).id || 'unknown';
            const errorObj = error instanceof Error ? error : new Error(String(error));
            addError(stats, recordId, sourceRecord, errorObj);

            if (!this.options.skipOnError) {
              throw error;
            }
          }
        }

        // Save batch to database
        if (mappedEntities.length > 0 && !this.options.dryRun) {
          try {
            await repository.save(mappedEntities);
            stats.migratedRecords += mappedEntities.length;
          } catch (error) {
            console.error(`\n   ❌ Error saving batch:`, error);
            if (!this.options.skipOnError) {
              throw error;
            }
          }
        } else if (this.options.dryRun) {
          stats.migratedRecords += mappedEntities.length;
        }

        // Log progress
        processed += batch.length;
        if (this.options.logProgress && processed % (this.options.batchSize * 5) === 0) {
          logProgress(mapper.entityName, processed, stats.totalRecords, stats.startTime);
        }
      }

      // Final progress log
      if (this.options.logProgress) {
        logProgress(mapper.entityName, processed, stats.totalRecords, stats.startTime);
      }

      // Run after-migration hook
      if (mapper.afterMigration && !this.options.dryRun) {
        await mapper.afterMigration(this.context);
      }

      console.log(`   ✅ Migrated: ${stats.migratedRecords}`);
      console.log(`   ⚠️  Skipped: ${stats.skippedRecords}`);
      console.log(`   ❌ Failed: ${stats.failedRecords}`);

    } catch (error) {
      console.error(`\n   ❌ Fatal error migrating ${mapper.entityName}:`, error);
      throw error;
    }

    return finalizeStats(stats);
  }

  /**
   * Validate migrated data
   */
  async validateMigration(): Promise<ValidationResult[]> {
    console.log('\n🔍 Validating migrated data...\n');

    const results: ValidationResult[] = [];

    for (const mapper of this.mappers) {
      const validation = await validateRecordCount(
        this.mysqlConnection,
        this.postgresConnection,
        mapper.sourceTable,
        mapper.targetEntity
      );

      const result: ValidationResult = {
        entity: mapper.entityName,
        expectedCount: validation.sourceCount,
        actualCount: validation.targetCount,
        isValid: validation.isValid,
      };

      if (!result.isValid) {
        result.message = `Count mismatch: expected ${result.expectedCount}, got ${result.actualCount}`;
      }

      results.push(result);

      const icon = result.isValid ? '✅' : '❌';
      console.log(
        `  ${icon} ${result.entity}: ${result.actualCount}/${result.expectedCount}${
          result.message ? ` (${result.message})` : ''
        }`
      );
    }

    console.log('');
    return results;
  }

  /**
   * Run the migration
   */
  async migrate(): Promise<MigrationResult> {
    const startTime = Date.now();
    const entityStats: MigrationStats[] = [];

    try {
      // Initialize
      await this.initialize();
      this.registerMappers();

      // Validate source
      const isSourceValid = await this.validateSource();
      if (!isSourceValid) {
        throw new Error('Source validation failed. Aborting migration.');
      }

      if (this.options.dryRun) {
        console.log('\n🔬 DRY RUN MODE - No data will be written\n');
      }

      // Migrate each entity
      for (const mapper of this.mappers) {
        const stats = await this.migrateEntity(mapper);
        entityStats.push(stats);
      }

      // Validate if requested
      let validationResults: ValidationResult[] = [];
      if (this.options.validateAfter && !this.options.dryRun) {
        validationResults = await this.validateMigration();
      }

      // Calculate totals
      const totalRecords = entityStats.reduce((sum, s) => sum + s.totalRecords, 0);
      const migratedRecords = entityStats.reduce((sum, s) => sum + s.migratedRecords, 0);
      const failedRecords = entityStats.reduce((sum, s) => sum + s.failedRecords, 0);
      const skippedRecords = entityStats.reduce((sum, s) => sum + s.skippedRecords, 0);

      // Collect all errors
      const errors = entityStats.flatMap((stats) =>
        stats.errors.map((error) => ({
          entity: stats.entityName,
          error,
        }))
      );

      const duration = Date.now() - startTime;
      const success = failedRecords === 0 && validationResults.every((v) => v.isValid);

      return {
        success,
        totalEntities: this.mappers.length,
        totalRecords,
        migratedRecords,
        failedRecords,
        skippedRecords,
        duration,
        entityStats,
        errors,
      };
    } catch (error) {
      console.error('\n❌ Migration failed:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Clean up connections
   */
  async cleanup(): Promise<void> {
    console.log('\n🔌 Closing database connections...');

    if (this.mysqlConnection?.isInitialized) {
      await this.mysqlConnection.destroy();
      console.log('  ✅ MySQL disconnected');
    }

    if (this.postgresConnection?.isInitialized) {
      await this.postgresConnection.destroy();
      console.log('  ✅ PostgreSQL disconnected');
    }
  }

  /**
   * Print migration summary
   */
  printSummary(result: MigrationResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));

    console.log(`\nStatus: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`Duration: ${formatDuration(result.duration)}`);
    console.log(`\nEntities: ${result.totalEntities}`);
    console.log(`Total Records: ${result.totalRecords}`);
    console.log(`✅ Migrated: ${result.migratedRecords}`);
    console.log(`⚠️  Skipped: ${result.skippedRecords}`);
    console.log(`❌ Failed: ${result.failedRecords}`);

    if (result.errors.length > 0) {
      console.log(`\n⚠️  Errors (showing first 10):`);
      result.errors.slice(0, 10).forEach((err) => {
        console.log(`  - ${err.entity} [${err.error.recordId}]: ${err.error.error}`);
      });

      if (result.errors.length > 10) {
        console.log(`  ... and ${result.errors.length - 10} more errors`);
      }
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): Required<MigrationOptions> {
  const args = process.argv.slice(2);
  const options = { ...DEFAULT_MIGRATION_OPTIONS };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--no-validation':
        options.validateAfter = false;
        break;
      case '--no-progress':
        options.logProgress = false;
        break;
      case '--fail-fast':
        options.skipOnError = false;
        break;
      case '--batch-size':
        options.batchSize = parseInt(args[++i], 10);
        break;
      case '--entities':
        options.entities = args[++i].split(',').map((e) => e.trim());
        break;
      case '--help':
        printHelp();
        process.exit(0);
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
MySQL to PostgreSQL Migration Script

Usage:
  yarn migrate:mysql [options]

Options:
  --dry-run              Preview migration without writing data
  --no-validation        Skip post-migration validation
  --no-progress          Disable progress logging
  --fail-fast            Stop on first error (default: continue)
  --batch-size <number>  Records per batch (default: 1000)
  --entities <list>      Migrate specific entities (comma-separated)
  --help                 Show this help message

Examples:
  yarn migrate:mysql
  yarn migrate:mysql --dry-run
  yarn migrate:mysql --entities User,CarRequest
  yarn migrate:mysql --batch-size 500 --no-progress
  `);
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  console.log('🚀 MySQL to PostgreSQL Migration\n');

  try {
    const options = parseArgs();
    const migration = new MySQLToPostgresMigration(options);
    const result = await migration.migrate();
    migration.printSummary(result);

    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { MySQLToPostgresMigration };
