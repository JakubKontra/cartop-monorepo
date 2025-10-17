import { Module } from '@nestjs/common';
import { CatalogBrandModule } from './brand/catalog-brand.module';
import { CatalogColorModule } from './color/catalog-color.module';
import { CatalogModelModule } from './model/catalog-model.module';
import { CatalogModelGenerationModule } from './generation/catalog-model-generation.module';
import { CatalogEquipmentModule } from './equipment/catalog-equipment.module';

/**
 * Catalog Module - Aggregates all catalog-related entities
 *
 * Structure:
 * - brand/         - Car brands (BMW, Audi, etc.)
 * - model/         - Car models within brands
 * - color/         - Available colors with hex codes
 * - body-type/     - Body types (Sedan, SUV, etc.)
 * - equipment/     - Equipment and features
 *   - brake-type/  - Brake types (Disc, Drum, etc.)
 * - engine/        - Engine specifications (to be implemented)
 *
 * Enums (not database entities):
 * - CatalogEngineFuelType       - Petrol, Diesel, Electric, etc.
 * - CatalogEngineDriveType      - FWD, RWD, AWD, 4WD
 * - CatalogEngineTransmissionType - Manual, Automatic, CVT, DCT
 */
@Module({
  imports: [
    CatalogBrandModule,
    CatalogModelModule,
    CatalogModelGenerationModule,
    CatalogColorModule,
    CatalogEquipmentModule,
  ],
  exports: [
    CatalogBrandModule,
    CatalogModelModule,
    CatalogModelGenerationModule,
    CatalogColorModule,
    CatalogEquipmentModule,
  ],
})
export class CatalogModule {}
