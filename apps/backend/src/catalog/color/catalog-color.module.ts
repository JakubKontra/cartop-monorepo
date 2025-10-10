import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogColor } from './catalog-color.entity';
import { CatalogColorService } from './catalog-color.service';
import { CatalogColorPublicResolver } from './catalog-color-public.resolver';
import { CatalogColorAdminResolver } from './catalog-color-admin.resolver';
import { CatalogColorLegacyFieldResolver } from './catalog-color-legacy.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogColor])],
  providers: [
    CatalogColorService,
    CatalogColorPublicResolver,
    CatalogColorAdminResolver,
    CatalogColorLegacyFieldResolver, // Field resolver for legacy fields
  ],
  exports: [CatalogColorService],
})
export class CatalogColorModule {}
