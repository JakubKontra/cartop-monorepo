import { EntityMapper, MigrationContext } from '../types/migration.types';
import { CatalogModelGeneration } from '../../../catalog/generation/catalog-model-generation.entity';
import { BaseCatalogMapper, CommonMySQLFields } from '../utils/base-catalog-mapper';
import { ForeignKeyMapper } from '../utils/foreign-key-mapper';
import { mapMySQLBodyType } from '../../../common/enums/catalog/catalog-body-type.enum';
import { mapMySQLBrakeType } from '../../../common/enums/catalog/catalog-equipment-brake-type.enum';

/**
 * MySQL CatalogModelGeneration table structure (actual legacy schema)
 * Based on MySQL cartop.catalog_model_generation table
 */
interface MySQLCatalogModelGeneration extends CommonMySQLFields {
  brand_id?: number;
  model_id: number;
  body_type_id?: number;
  ext_id?: string; // Ignored
  production_start?: Date | string;
  production_stop?: Date | string;
  wheelbase?: number;
  front_track?: number;
  rear_track?: number;
  length?: number;
  width?: number;
  height?: number;
  trunk_space_min?: number;
  trunk_space_max?: number;
  front_brakes_type_id?: number;
  rear_brakes_type_id?: number;
  scraped_data_id?: number; // Ignored
}

/**
 * CatalogModelGeneration Mapper
 * Maps legacy MySQL catalog_model_generation to new PostgreSQL CatalogModelGeneration entities
 */
export class CatalogModelGenerationMapper
  extends BaseCatalogMapper
  implements EntityMapper<MySQLCatalogModelGeneration, CatalogModelGeneration>
{
  sourceTable = 'catalog_model_generation';
  targetEntity = CatalogModelGeneration;
  entityName = 'CatalogModelGeneration';
  dependencies = ['CatalogBrand', 'CatalogModel']; // Generations depend on brands and models

  private fkMapper = new ForeignKeyMapper();

  /**
   * Map MySQL catalog_model_generation to PostgreSQL CatalogModelGeneration entity
   */
  async map(
    source: MySQLCatalogModelGeneration,
    context: MigrationContext
  ): Promise<CatalogModelGeneration | null> {
    try {
      const generation = new CatalogModelGeneration();

      // Map common fields using base class
      this.mapCommonFields(generation, source);

      // Foreign key - Map model_id from MySQL integer to PostgreSQL UUID
      generation.modelId = await this.fkMapper.mapLegacyId(
        context,
        'catalog_models',
        source.model_id
      );

      if (!generation.modelId) {
        console.warn(
          `⚠️  Skipping CatalogModelGeneration ${source.id}: Model not found (model_id=${source.model_id})`
        );
        return null;
      }

      // Foreign key - Map brand_id (if present, otherwise derive from model)
      if (source.brand_id) {
        generation.brandId = await this.fkMapper.mapLegacyId(
          context,
          'catalog_brands',
          source.brand_id
        );
      } else {
        // Derive brandId from the model
        generation.brandId = await this.getBrandIdFromModel(context, generation.modelId);
      }

      if (!generation.brandId) {
        console.warn(
          `⚠️  Skipping CatalogModelGeneration ${source.id}: Brand not found (brand_id=${source.brand_id})`
        );
        return null;
      }

      // Enum mappings using utility functions from enum files
      generation.bodyType = mapMySQLBodyType(source.body_type_id);
      generation.frontBrakesType = mapMySQLBrakeType(source.front_brakes_type_id);
      generation.rearBrakesType = mapMySQLBrakeType(source.rear_brakes_type_id);

      // Production dates
      generation.productionStart = this.mapTimestamp(source.production_start);
      generation.productionStop = this.mapTimestamp(source.production_stop);

      // Dimensions (all in millimeters)
      generation.wheelbase = source.wheelbase || null;
      generation.frontTrack = source.front_track || null;
      generation.rearTrack = source.rear_track || null;
      generation.length = source.length || null;
      generation.width = source.width || null;
      generation.height = source.height || null;

      // Trunk space (in liters)
      generation.trunkSpaceMin = source.trunk_space_min || null;
      generation.trunkSpaceMax = source.trunk_space_max || null;

      // Validation - skip records with missing required data
      if (!generation.name || !generation.slug) {
        console.warn(
          `⚠️  Skipping CatalogModelGeneration with missing required fields: ID=${source.id}, name=${source.name}`
        );
        return null;
      }

      return generation;
    } catch (error) {
      console.error(`❌ Error mapping CatalogModelGeneration ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all generations from MySQL
   */
  async fetchQuery(context: MigrationContext): Promise<MySQLCatalogModelGeneration[]> {
    return context.mysqlConnection.query(`SELECT * FROM ${this.sourceTable} ORDER BY id`);
  }

  /**
   * Validate migrated generation
   */
  async validate(
    target: CatalogModelGeneration,
    source: MySQLCatalogModelGeneration
  ): Promise<boolean | string> {
    // Validate common fields
    const commonValidation = this.validateCommonFields(target, source);
    if (commonValidation !== true) {
      return commonValidation;
    }

    // Additional generation-specific validation
    if (!target.modelId) {
      return 'Model ID is required';
    }

    if (!target.brandId) {
      return 'Brand ID is required';
    }

    // Validate dimension values are positive if present
    const dimensions = [
      target.wheelbase,
      target.frontTrack,
      target.rearTrack,
      target.length,
      target.width,
      target.height,
    ];
    for (const dim of dimensions) {
      if (dim !== null && dim < 0) {
        return 'Dimension values must be positive';
      }
    }

    // Validate trunk space values are positive if present
    // Note: We don't validate min <= max because source data has quality issues
    // This can be cleaned up later in PostgreSQL
    if (target.trunkSpaceMin !== null && target.trunkSpaceMin < 0) {
      return 'Trunk space min must be positive';
    }
    if (target.trunkSpaceMax !== null && target.trunkSpaceMax < 0) {
      return 'Trunk space max must be positive';
    }

    return true;
  }
}
