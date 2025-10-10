import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandService } from './catalog-brand.service';
import { CatalogBrandPublicResolver } from './catalog-brand-public.resolver';
import { CatalogBrandAdminResolver } from './catalog-brand-admin.resolver';
import { CatalogLegacyFieldResolver } from '../common/catalog-legacy-field.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogBrand])],
  providers: [
    CatalogBrandService,
    CatalogBrandPublicResolver,
    CatalogBrandAdminResolver,
    CatalogLegacyFieldResolver, // Shared resolver for legacy fields
  ],
  exports: [CatalogBrandService],
})
export class CatalogBrandModule {}
