import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogModelGenerationColor } from './catalog-model-generation-color.entity';
import { CatalogModelGenerationConfiguration } from './catalog-model-generation-configuration.entity';
import { CatalogModelGenerationImage } from './catalog-model-generation-image.entity';
import { CatalogModelGenerationService } from './catalog-model-generation.service';
import { CatalogModelGenerationColorService } from './catalog-model-generation-color.service';
import { CatalogModelGenerationConfigurationService } from './catalog-model-generation-configuration.service';
import { CatalogModelGenerationImageService } from './catalog-model-generation-image.service';
import { CatalogModelGenerationPublicResolver } from './catalog-model-generation-public.resolver';
import { CatalogModelGenerationAdminResolver } from './catalog-model-generation-admin.resolver';
import { CatalogModelGenerationColorPublicResolver } from './catalog-model-generation-color-public.resolver';
import { CatalogModelGenerationColorAdminResolver } from './catalog-model-generation-color-admin.resolver';
import { CatalogModelGenerationConfigurationPublicResolver } from './catalog-model-generation-configuration-public.resolver';
import { CatalogModelGenerationConfigurationAdminResolver } from './catalog-model-generation-configuration-admin.resolver';
import { CatalogModelGenerationImagePublicResolver } from './catalog-model-generation-image-public.resolver';
import { CatalogModelGenerationImageAdminResolver } from './catalog-model-generation-image-admin.resolver';
import { CatalogModelGenerationLegacyFieldResolver } from './catalog-model-generation-legacy.resolver';
import { CatalogModelGenerationFieldResolver } from './catalog-model-generation-field.resolver';
import { CatalogEngineModule } from '../engine/catalog-engine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CatalogModelGeneration,
      CatalogModelGenerationColor,
      CatalogModelGenerationConfiguration,
      CatalogModelGenerationImage,
    ]),
    CatalogEngineModule,
  ],
  providers: [
    CatalogModelGenerationService,
    CatalogModelGenerationColorService,
    CatalogModelGenerationConfigurationService,
    CatalogModelGenerationImageService,
    CatalogModelGenerationPublicResolver,
    CatalogModelGenerationAdminResolver,
    CatalogModelGenerationColorPublicResolver,
    CatalogModelGenerationColorAdminResolver,
    CatalogModelGenerationConfigurationPublicResolver,
    CatalogModelGenerationConfigurationAdminResolver,
    CatalogModelGenerationImagePublicResolver,
    CatalogModelGenerationImageAdminResolver,
    CatalogModelGenerationLegacyFieldResolver, // Field resolver for legacy fields
    CatalogModelGenerationFieldResolver, // Field resolver for engines
  ],
  exports: [
    CatalogModelGenerationService,
    CatalogModelGenerationColorService,
    CatalogModelGenerationConfigurationService,
    CatalogModelGenerationImageService,
  ],
})
export class CatalogModelGenerationModule {}
