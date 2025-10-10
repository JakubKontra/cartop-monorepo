import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogColor } from './catalog-color.entity';
import { CatalogColorService } from './catalog-color.service';
import { CatalogColorPublicResolver } from './catalog-color-public.resolver';
import { CatalogColorAdminResolver } from './catalog-color-admin.resolver';
import { CatalogLegacyFieldResolver } from '../common/catalog-legacy-field.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogColor])],
  providers: [
    CatalogColorService,
    CatalogColorPublicResolver,
    CatalogColorAdminResolver,
    CatalogLegacyFieldResolver, // Shared resolver for legacy fields
  ],
  exports: [CatalogColorService],
})
export class CatalogColorModule {}
