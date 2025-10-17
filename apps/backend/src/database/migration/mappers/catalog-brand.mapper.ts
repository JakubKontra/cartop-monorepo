import { EntityMapper, MigrationContext } from '../types/migration.types';
import { CatalogBrand } from '../../../catalog/brand/catalog-brand.entity';
import { BaseCatalogMapper, CommonMySQLFields } from '../utils/base-catalog-mapper';
import { ForeignKeyMapper } from '../utils/foreign-key-mapper';

/**
 * MySQL CatalogBrand table structure (actual legacy schema)
 * Based on MySQL cartop.catalog_brand table
 */
interface MySQLCatalogBrand extends CommonMySQLFields {
  logo_id?: number;
  overview?: string; // Not used in PostgreSQL schema
  scraped_data_id?: number; // Ignored
}

/**
 * CatalogBrand Mapper
 * Maps legacy MySQL catalog_brands to new PostgreSQL CatalogBrand entities
 */
export class CatalogBrandMapper
  extends BaseCatalogMapper
  implements EntityMapper<MySQLCatalogBrand, CatalogBrand>
{
  sourceTable = 'catalog_brand';
  targetEntity = CatalogBrand;
  entityName = 'CatalogBrand';
  dependencies = []; // Brands have no dependencies

  private fkMapper = new ForeignKeyMapper();

  /**
   * Map MySQL catalog_brands to PostgreSQL CatalogBrand entity
   */
  async map(
    source: MySQLCatalogBrand,
    _context: MigrationContext
  ): Promise<CatalogBrand | null> {
    try {
      const brand = new CatalogBrand();

      // Map common fields using base class
      this.mapCommonFields(brand, source, { defaultRecommended: false });

      // Logo relationship - handle in afterMigration if files were migrated
      brand.logoId = null;

      // Validation - skip records with missing required data
      if (!brand.name || !brand.slug) {
        console.warn(
          `⚠️  Skipping CatalogBrand with missing required fields: ID=${source.id}, name=${source.name}`
        );
        return null;
      }

      return brand;
    } catch (error) {
      console.error(`❌ Error mapping CatalogBrand ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all brands from MySQL
   */
  async fetchQuery(context: MigrationContext): Promise<MySQLCatalogBrand[]> {
    return context.mysqlConnection.query(`SELECT * FROM ${this.sourceTable} ORDER BY id`);
  }

  /**
   * Validate migrated brand
   */
  async validate(
    target: CatalogBrand,
    source: MySQLCatalogBrand
  ): Promise<boolean | string> {
    return this.validateCommonFields(target, source);
  }

  /**
   * Post-migration: Update logo relationships if files were migrated
   * Uses bulk queries for efficiency
   */
  async afterMigration(context: MigrationContext): Promise<void> {
    console.log('  Post-processing: Updating brand logo relationships...');

    try {
      // Check if files table exists
      if (!(await this.tableExists(context, 'files'))) {
        console.log('  ⚠️  Files table not found, skipping logo relationships');
        return;
      }

      // Get brands with logo_id from MySQL
      const mysqlBrands = await context.mysqlConnection.query<MySQLCatalogBrand[]>(
        `SELECT id, logo_id FROM ${this.sourceTable} WHERE logo_id IS NOT NULL`
      );

      if (mysqlBrands.length === 0) {
        console.log('  ℹ️  No brands with logos to update');
        return;
      }

      // Bulk map brand IDs
      const brandLegacyIds = mysqlBrands.map(b => b.id);
      const brandIdMap = await this.fkMapper.bulkMapLegacyIds(
        context,
        'catalog_brands',
        brandLegacyIds
      );

      // Bulk map file IDs
      const fileLegacyIds = mysqlBrands.map(b => b.logo_id!).filter(Boolean);
      const fileIdMap = await this.fkMapper.bulkMapLegacyIds(
        context,
        'files',
        fileLegacyIds
      );

      // Prepare batch updates
      const updates: Array<{ brandId: string; logoId: string }> = [];

      for (const mysqlBrand of mysqlBrands) {
        const brandId = brandIdMap.get(String(mysqlBrand.id));
        const logoId = fileIdMap.get(String(mysqlBrand.logo_id));

        if (brandId && logoId) {
          updates.push({ brandId, logoId });
        } else if (brandId && !logoId) {
          console.warn(
            `  ⚠️  Logo file not found for brand ${mysqlBrand.id}: file=${mysqlBrand.logo_id}`
          );
        }
      }

      // Execute batch update
      if (updates.length > 0) {
        for (const update of updates) {
          await context.postgresConnection.query(
            `UPDATE catalog_brands SET "logoId" = $1 WHERE id = $2`,
            [update.logoId, update.brandId]
          );
        }

        console.log(`  ✅ Updated ${updates.length} brand logo relationships`);
      } else {
        console.log('  ⚠️  No valid brand-logo relationships to update');
      }
    } catch (error) {
      console.error('  ❌ Error updating brand logo relationships:', error);
      // Don't throw - this is optional post-processing
    }
  }
}
