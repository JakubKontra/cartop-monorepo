import { EntityMapper, MigrationContext } from '../types/migration.types';
import { CatalogModel } from '../../../catalog/model/catalog-model.entity';
import { BaseCatalogMapper, CommonMySQLFields } from '../utils/base-catalog-mapper';
import { ForeignKeyMapper } from '../utils/foreign-key-mapper';

/**
 * MySQL CatalogModel table structure (actual legacy schema)
 * Based on MySQL cartop.catalog_model table
 */
interface MySQLCatalogModel extends CommonMySQLFields {
  brand_id: number;
  scraped_data_id?: number; // Ignored
}

/**
 * CatalogModel Mapper
 * Maps legacy MySQL catalog_models to new PostgreSQL CatalogModel entities
 */
export class CatalogModelMapper
  extends BaseCatalogMapper
  implements EntityMapper<MySQLCatalogModel, CatalogModel>
{
  sourceTable = 'catalog_model';
  targetEntity = CatalogModel;
  entityName = 'CatalogModel';
  dependencies = ['CatalogBrand']; // Models depend on brands

  private fkMapper = new ForeignKeyMapper();

  /**
   * Map MySQL catalog_models to PostgreSQL CatalogModel entity
   */
  async map(
    source: MySQLCatalogModel,
    context: MigrationContext
  ): Promise<CatalogModel | null> {
    try {
      const model = new CatalogModel();

      // Map common fields using base class
      this.mapCommonFields(model, source);

      // Foreign key - Map brand_id from MySQL integer to PostgreSQL UUID
      model.brandId = await this.fkMapper.mapLegacyId(
        context,
        'catalog_brands',
        source.brand_id
      );

      if (!model.brandId) {
        console.warn(
          `⚠️  Skipping CatalogModel ${source.id}: Brand not found (brand_id=${source.brand_id})`
        );
        return null;
      }

      // Validation - skip records with missing required data
      if (!model.name || !model.slug) {
        console.warn(
          `⚠️  Skipping CatalogModel with missing required fields: ID=${source.id}, name=${source.name}`
        );
        return null;
      }

      return model;
    } catch (error) {
      console.error(`❌ Error mapping CatalogModel ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all models from MySQL
   */
  async fetchQuery(context: MigrationContext): Promise<MySQLCatalogModel[]> {
    return context.mysqlConnection.query(`SELECT * FROM ${this.sourceTable} ORDER BY id`);
  }

  /**
   * Validate migrated model
   */
  async validate(
    target: CatalogModel,
    source: MySQLCatalogModel
  ): Promise<boolean | string> {
    // Validate common fields
    const commonValidation = this.validateCommonFields(target, source);
    if (commonValidation !== true) {
      return commonValidation;
    }

    // Additional model-specific validation
    if (!target.brandId) {
      return 'Brand ID is required';
    }

    return true;
  }
}
