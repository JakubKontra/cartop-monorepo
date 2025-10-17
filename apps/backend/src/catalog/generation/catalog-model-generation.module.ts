import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogModelGenerationService } from './catalog-model-generation.service';
import { CatalogModelGenerationPublicResolver } from './catalog-model-generation-public.resolver';
import { CatalogModelGenerationAdminResolver } from './catalog-model-generation-admin.resolver';
import { CatalogModelGenerationLegacyFieldResolver } from './catalog-model-generation-legacy.resolver';
import { CatalogModelGenerationFieldResolver } from './catalog-model-generation-field.resolver';
import { CatalogEngineModule } from '../engine/catalog-engine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogModelGeneration]),
    CatalogEngineModule,
  ],
  providers: [
    CatalogModelGenerationService,
    CatalogModelGenerationPublicResolver,
    CatalogModelGenerationAdminResolver,
    CatalogModelGenerationLegacyFieldResolver, // Field resolver for legacy fields
    CatalogModelGenerationFieldResolver, // Field resolver for engines
  ],
  exports: [CatalogModelGenerationService],
})
export class CatalogModelGenerationModule {}
