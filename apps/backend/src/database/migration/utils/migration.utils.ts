import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import {
  MigrationStats,
  MigrationError,
  MigrationOptions,
} from '../types/migration.types';

/**
 * Default migration options
 */
export const DEFAULT_MIGRATION_OPTIONS: Required<MigrationOptions> = {
  batchSize: 1000,
  dryRun: false,
  skipOnError: true,
  logProgress: true,
  validateAfter: true,
  entities: [],
};

/**
 * Initialize migration statistics for an entity
 */
export function initStats(entityName: string): MigrationStats {
  return {
    entityName,
    totalRecords: 0,
    migratedRecords: 0,
    failedRecords: 0,
    skippedRecords: 0,
    startTime: new Date(),
    errors: [],
  };
}

/**
 * Finalize migration statistics
 */
export function finalizeStats(stats: MigrationStats): MigrationStats {
  stats.endTime = new Date();
  stats.duration = stats.endTime.getTime() - stats.startTime.getTime();
  return stats;
}

/**
 * Log progress during migration
 */
export function logProgress(
  entityName: string,
  current: number,
  total: number,
  startTime: Date
): void {
  const elapsed = Date.now() - startTime.getTime();
  const rate = current / (elapsed / 1000); // records per second
  const remaining = (total - current) / rate;
  const percentage = ((current / total) * 100).toFixed(2);

  console.log(
    `  [${entityName}] ${current}/${total} (${percentage}%) - ` +
      `${rate.toFixed(0)} rec/s - ETA: ${formatDuration(remaining * 1000)}`
  );
}

/**
 * Format duration in human-readable format
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Add error to migration stats
 */
export function addError(
  stats: MigrationStats,
  recordId: string | number,
  recordData: any,
  error: Error | string
): void {
  const migrationError: MigrationError = {
    recordId,
    recordData,
    error: typeof error === 'string' ? error : error.message,
    timestamp: new Date(),
  };
  stats.errors.push(migrationError);
  stats.failedRecords++;
}

/**
 * Fetch records from MySQL in batches
 */
export async function* fetchInBatches<T>(
  connection: DataSource,
  tableName: string,
  batchSize: number
): AsyncGenerator<T[], void, unknown> {
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const query = `SELECT * FROM ${tableName} LIMIT ${batchSize} OFFSET ${offset}`;
    const batch = await connection.query(query);

    if (batch.length === 0) {
      hasMore = false;
    } else {
      yield batch;
      offset += batchSize;
      hasMore = batch.length === batchSize;
    }
  }
}

/**
 * Get total count from a MySQL table
 */
export async function getTableCount(
  connection: DataSource,
  tableName: string
): Promise<number> {
  const result = await connection.query(`SELECT COUNT(*) as count FROM ${tableName}`);
  return parseInt(result[0].count, 10);
}

/**
 * Check if a table exists in the database
 */
export async function tableExists(
  connection: DataSource,
  tableName: string
): Promise<boolean> {
  try {
    if (connection.options.type === 'mysql') {
      const result = await connection.query(
        `SHOW TABLES LIKE '${tableName}'`
      );
      return result.length > 0;
    } else if (connection.options.type === 'postgres') {
      const result = await connection.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = '${tableName}'
        )`
      );
      return result[0].exists;
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Get column names from a table
 */
export async function getTableColumns(
  connection: DataSource,
  tableName: string
): Promise<string[]> {
  if (connection.options.type === 'mysql') {
    const result = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
    return result.map((col: any) => col.Field);
  } else if (connection.options.type === 'postgres') {
    const result = await connection.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = '${tableName}'`
    );
    return result.map((col: any) => col.column_name);
  }
  return [];
}

/**
 * Validate record count between source and target
 */
export async function validateRecordCount(
  sourceConnection: DataSource,
  targetConnection: DataSource,
  sourceTable: string,
  targetEntity: EntityTarget<ObjectLiteral>
): Promise<{ sourceCount: number; targetCount: number; isValid: boolean }> {
  const sourceCount = await getTableCount(sourceConnection, sourceTable);
  const targetRepository = targetConnection.getRepository(targetEntity);
  const targetCount = await targetRepository.count();

  return {
    sourceCount,
    targetCount,
    isValid: sourceCount === targetCount,
  };
}

/**
 * Convert MySQL datetime to JavaScript Date
 * Handles various MySQL datetime formats
 */
export function mysqlDateToDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

/**
 * Convert MySQL boolean (tinyint) to JavaScript boolean
 */
export function mysqlBoolToBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') return value === '1' || value.toLowerCase() === 'true';
  return false;
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T = any>(value: any, fallback: T | null = null): T | null {
  if (!value) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Chunk array into smaller arrays
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Sleep utility for rate limiting
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
