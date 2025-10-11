import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModel } from './catalog-model.entity';
import { CatalogModelService } from './catalog-model.service';
import { CatalogModelAdminResolver } from './catalog-model-admin.resolver';
import { CatalogModelPublicResolver } from './catalog-model-public.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogModel])],
  providers: [
    CatalogModelService,
    CatalogModelAdminResolver,
    CatalogModelPublicResolver,
  ],
  exports: [CatalogModelService],
})
export class CatalogModelModule {}
