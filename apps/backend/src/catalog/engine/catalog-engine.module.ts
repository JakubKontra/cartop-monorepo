import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEngine } from './catalog-engine.entity';
import { CatalogModelGeneration } from '../generation/catalog-model-generation.entity';
import { CatalogEngineService } from './catalog-engine.service';
import { CatalogEngineAdminResolver } from './catalog-engine-admin.resolver';
import { CatalogEnginePublicResolver } from './catalog-engine-public.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogEngine, CatalogModelGeneration]),
  ],
  providers: [
    CatalogEngineService,
    CatalogEngineAdminResolver,
    CatalogEnginePublicResolver,
  ],
  exports: [CatalogEngineService],
})
export class CatalogEngineModule {}
