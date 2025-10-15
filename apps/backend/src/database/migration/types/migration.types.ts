import { DataSource, EntityTarget } from 'typeorm';

/**
 * Migration statistics for tracking progress
 */
export interface MigrationStats {
  entityName: string;
  totalRecords: number;
  migratedRecords: number;
  failedRecords: number;
  skippedRecords: number;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in milliseconds
  errors: MigrationError[];
}

/**
 * Migration error details
 */
export interface MigrationError {
  recordId: string | number;
  recordData: any;
  error: string;
  timestamp: Date;
}

/**
 * Migration options for controlling the migration process
 */
export interface MigrationOptions {
  batchSize?: number; // Number of records to process in each batch (default: 1000)
  dryRun?: boolean; // If true, don't actually write to database (default: false)
  skipOnError?: boolean; // Continue migration even if some records fail (default: true)
  logProgress?: boolean; // Log progress during migration (default: true)
  validateAfter?: boolean; // Validate data after migration (default: true)
  entities?: string[]; // Specific entities to migrate (if empty, migrate all)
}

/**
 * Migration context passed to mappers
 */
export interface MigrationContext {
  mysqlConnection: DataSource;
  postgresConnection: DataSource;
  options: Required<MigrationOptions>;
  stats: Map<string, MigrationStats>;
}

/**
 * Base interface for entity mappers
 */
export interface EntityMapper<TSource = any, TTarget = any> {
  /**
   * Name of the source table in MySQL
   */
  sourceTable: string;

  /**
   * Target entity class in PostgreSQL
   */
  targetEntity: EntityTarget<TTarget>;

  /**
   * Human-readable name for logging
   */
  entityName: string;

  /**
   * Dependencies - other mappers that must be migrated first
   * Used to handle foreign key relationships
   */
  dependencies?: string[];

  /**
   * Map a single record from MySQL format to PostgreSQL entity
   * @param source - Source record from MySQL
   * @param context - Migration context with connections and utilities
   * @returns Mapped entity ready for insertion, or null to skip
   */
  map(source: TSource, context: MigrationContext): Promise<TTarget | null>;

  /**
   * Optional: Custom query for fetching data from MySQL
   * If not provided, will fetch all records from sourceTable
   */
  fetchQuery?(context: MigrationContext): Promise<TSource[]>;

  /**
   * Optional: Validate a migrated record
   * @param target - Migrated record
   * @param source - Original source record
   * @returns true if valid, error message if invalid
   */
  validate?(target: TTarget, source: TSource): Promise<boolean | string>;

  /**
   * Optional: Post-migration hook for additional processing
   * Called after all records have been migrated
   */
  afterMigration?(context: MigrationContext): Promise<void>;
}

/**
 * Migration result summary
 */
export interface MigrationResult {
  success: boolean;
  totalEntities: number;
  totalRecords: number;
  migratedRecords: number;
  failedRecords: number;
  skippedRecords: number;
  duration: number; // in milliseconds
  entityStats: MigrationStats[];
  errors: Array<{
    entity: string;
    error: MigrationError;
  }>;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  entity: string;
  expectedCount: number;
  actualCount: number;
  message?: string;
}
