import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';
import { CatalogBrandEquipmentAssignedItem } from './catalog-brand-equipment-assigned-item.entity';
import { CatalogBrandService } from './catalog-brand.service';
import { CatalogBrandEquipmentService } from './catalog-brand-equipment.service';
import { CatalogBrandEquipmentItemService } from './catalog-brand-equipment-item.service';
import { CatalogBrandPublicResolver } from './catalog-brand-public.resolver';
import { CatalogBrandAdminResolver } from './catalog-brand-admin.resolver';
import { CatalogBrandEquipmentAdminResolver } from './catalog-brand-equipment-admin.resolver';
import { CatalogBrandEquipmentItemAdminResolver } from './catalog-brand-equipment-item-admin.resolver';
import { CatalogBrandEquipmentFieldResolver } from './catalog-brand-equipment-field.resolver';
import { CatalogBrandLegacyFieldResolver } from './catalog-brand-legacy.resolver';
import { CatalogBrandTestController } from './catalog-brand-test.controller';
import { File } from '../../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CatalogBrand,
      CatalogBrandEquipment,
      CatalogBrandEquipmentItem,
      CatalogBrandEquipmentAssignedItem, // Junction table for many-to-many
      File,
    ]), // Include File entity for logo relation
  ],
  controllers: [CatalogBrandTestController], // Development-only test endpoint
  providers: [
    CatalogBrandService,
    CatalogBrandEquipmentService,
    CatalogBrandEquipmentItemService,
    CatalogBrandPublicResolver,
    CatalogBrandAdminResolver,
    CatalogBrandEquipmentAdminResolver,
    CatalogBrandEquipmentItemAdminResolver,
    CatalogBrandEquipmentFieldResolver, // Field resolver for equipment items
    CatalogBrandLegacyFieldResolver, // Field resolver for legacy fields
  ],
  exports: [
    CatalogBrandService,
    CatalogBrandEquipmentService,
    CatalogBrandEquipmentItemService,
  ],
})
export class CatalogBrandModule {}
