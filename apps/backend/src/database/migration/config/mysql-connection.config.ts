import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

/**
 * MySQL Connection Configuration for Legacy Database
 * Used for data migration from old MySQL database to new PostgreSQL database
 */

// Load environment variables
config({ path: '.env' });

/**
 * MySQL DataSource configuration for legacy database
 */
export const mysqlConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'cartop_old',
  // We don't use entities for MySQL since it's read-only legacy data
  // We'll query raw tables instead
  synchronize: false,
  logging: false,
  // Connection pool settings for efficient data extraction
  extra: {
    connectionLimit: 10, // Limit concurrent connections during migration
  },
};

/**
 * Create MySQL DataSource instance
 */
export function createMySQLDataSource(): DataSource {
  return new DataSource(mysqlConfig);
}

/**
 * PostgreSQL DataSource configuration for target database
 */
export const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'cartop_v3',
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  synchronize: false, // Never auto-sync during migration
  logging: false,
};

/**
 * Create PostgreSQL DataSource instance
 */
export function createPostgresDataSource(): DataSource {
  return new DataSource(postgresConfig);
}
