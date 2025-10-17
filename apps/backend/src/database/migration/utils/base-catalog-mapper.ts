import { MigrationContext } from '../types/migration.types';
import { mysqlDateToDate, mysqlBoolToBoolean } from './migration.utils';
import slugify from 'slugify';

/**
 * Common fields present in most catalog entities
 */
export interface CommonCatalogFields {
  legacySystemId: string;
  name: string;
  description?: string | null;
  slug: string;
  legacySlug?: string | null;
  isActive: boolean;
  isHighlighted: boolean;
  isRecommended: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

/**
 * Common MySQL source fields
 */
export interface CommonMySQLFields {
  id: number;
  name: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  active?: number | boolean;
  highlighted?: number | boolean;
  recommended?: number | boolean;
}

/**
 * Base abstract class for catalog entity mappers
 * Provides common functionality for slug generation, field mapping, and validation
 */
export abstract class BaseCatalogMapper {
  // Track used slugs in memory to avoid duplicates efficiently
  protected usedSlugs: Set<string> = new Set();

  /**
   * Generate URL-friendly slug from name
   */
  protected generateSlug(name: string): string {
    return slugify(name, {
      lower: true,
      strict: true,
      locale: 'cs', // Czech locale for proper character handling
    });
  }

  /**
   * Generate unique slug, adding counter suffix if duplicate exists
   * Uses in-memory Set for efficient duplicate checking (no DB queries)
   */
  protected generateUniqueSlug(name: string): string {
    const baseSlug = this.generateSlug(name);
    let slug = baseSlug;
    let counter = 2; // Start at 2 for first duplicate

    // Check in-memory Set - O(1) operation, no DB queries
    while (this.usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Track this slug to prevent future duplicates
    this.usedSlugs.add(slug);
    return slug;
  }

  /**
   * Map common fields from MySQL to PostgreSQL entity
   * Handles: legacySystemId, name, description, slug, timestamps, booleans
   */
  protected mapCommonFields<T extends Partial<CommonCatalogFields>>(
    target: T,
    source: CommonMySQLFields,
    options?: {
      skipSlug?: boolean;
      defaultRecommended?: boolean;
    }
  ): void {
    // Store original MySQL ID for reference and foreign key mapping
    target.legacySystemId = String(source.id);

    // Basic string fields
    target.name = source.name?.trim();
    target.description = source.description?.trim() || null;

    // Generate unique slug from name (MySQL schema doesn't have slug)
    if (!options?.skipSlug) {
      target.slug = this.generateUniqueSlug(source.name);
      target.legacySlug = null; // MySQL doesn't have legacy_slug
    }

    // Boolean fields - MySQL tinyint(1) → PostgreSQL boolean
    target.isActive = source.active !== undefined
      ? mysqlBoolToBoolean(source.active)
      : false;

    target.isHighlighted = source.highlighted !== undefined
      ? mysqlBoolToBoolean(source.highlighted)
      : false;

    target.isRecommended = source.recommended !== undefined
      ? mysqlBoolToBoolean(source.recommended)
      : (options?.defaultRecommended ?? false);

    // Timestamps - MySQL datetime → PostgreSQL timestamp with time zone
    target.createdAt = mysqlDateToDate(source.created_at) || new Date();
    target.updatedAt = mysqlDateToDate(source.updated_at) || null;
  }

  /**
   * Validate common required fields
   */
  protected validateCommonFields(
    target: Partial<CommonCatalogFields>,
    source: CommonMySQLFields
  ): boolean | string {
    // Check required fields
    if (!target.name) {
      return 'Name is required';
    }

    if (!target.slug) {
      return 'Slug is required';
    }

    // Verify name matches
    if (target.name !== source.name.trim()) {
      return `Name mismatch: ${target.name} !== ${source.name}`;
    }

    // Verify legacy ID was set
    if (target.legacySystemId !== String(source.id)) {
      return `Legacy ID mismatch: ${target.legacySystemId} !== ${source.id}`;
    }

    return true;
  }

  /**
   * Check if table exists in PostgreSQL
   */
  protected async tableExists(
    context: MigrationContext,
    tableName: string
  ): Promise<boolean> {
    const result = await context.postgresConnection.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = $1
      )`,
      [tableName]
    );
    return result[0]?.exists === true;
  }

  /**
   * Map MySQL timestamp/datetime to Date object
   * Handles both Date objects and string timestamps
   */
  protected mapTimestamp(value?: Date | string | null): Date | null {
    if (!value) return null;
    return mysqlDateToDate(value);
  }

  /**
   * Get brandId from a model by querying the catalog_models table
   * Used when generation has model_id but missing brand_id
   */
  protected async getBrandIdFromModel(
    context: MigrationContext,
    modelId: string
  ): Promise<string | null> {
    try {
      const result = await context.postgresConnection.query(
        `SELECT "brandId" FROM catalog_models WHERE id = $1 LIMIT 1`,
        [modelId]
      );
      return result[0]?.brandId || null;
    } catch (error) {
      console.error(`❌ Error fetching brandId for model ${modelId}:`, error);
      return null;
    }
  }
}
