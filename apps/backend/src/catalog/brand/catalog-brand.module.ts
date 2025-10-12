import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandService } from './catalog-brand.service';
import { CatalogBrandPublicResolver } from './catalog-brand-public.resolver';
import { CatalogBrandAdminResolver } from './catalog-brand-admin.resolver';
import { CatalogBrandLegacyFieldResolver } from './catalog-brand-legacy.resolver';
import { CatalogBrandTestController } from './catalog-brand-test.controller';
import { File } from '../../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogBrand, File]), // Include File entity for logo relation
  ],
  controllers: [CatalogBrandTestController], // Development-only test endpoint
  providers: [
    CatalogBrandService,
    CatalogBrandPublicResolver,
    CatalogBrandAdminResolver,
    CatalogBrandLegacyFieldResolver, // Field resolver for legacy fields
  ],
  exports: [CatalogBrandService],
})
export class CatalogBrandModule {}
