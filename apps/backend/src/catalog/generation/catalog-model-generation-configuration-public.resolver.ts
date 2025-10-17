import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { CatalogModelGenerationConfiguration } from './catalog-model-generation-configuration.entity';
import { CatalogModelGenerationConfigurationService } from './catalog-model-generation-configuration.service';

@Resolver(() => CatalogModelGenerationConfiguration)
@Public()
export class CatalogModelGenerationConfigurationPublicResolver {
  constructor(
    private readonly configurationService: CatalogModelGenerationConfigurationService,
  ) {}

  @Query(() => [CatalogModelGenerationConfiguration], {
    name: 'catalogModelGenerationConfigurations',
    description: 'Get all generation configurations with optional filters',
  })
  async catalogModelGenerationConfigurations(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('equipmentId', { nullable: true }) equipmentId?: string,
    @Args('engineId', { nullable: true }) engineId?: string,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationService.findAll(limit, offset, generationId, equipmentId, engineId, active);
  }

  @Query(() => CatalogModelGenerationConfiguration, {
    name: 'catalogModelGenerationConfigurationById',
    description: 'Get a single configuration by ID',
  })
  async catalogModelGenerationConfigurationById(
    @Args('id') id: string,
  ): Promise<CatalogModelGenerationConfiguration> {
    return this.configurationService.findOne(id);
  }

  @Query(() => [CatalogModelGenerationConfiguration], {
    name: 'catalogModelGenerationConfigurationsByGenerationId',
    description: 'Get all configurations for a specific generation',
  })
  async catalogModelGenerationConfigurationsByGenerationId(
    @Args('generationId') generationId: string,
  ): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationService.findByGenerationId(generationId);
  }

  @Query(() => [CatalogModelGenerationConfiguration], {
    name: 'catalogModelGenerationConfigurationsByEquipmentId',
    description: 'Get all configurations with specific equipment',
  })
  async catalogModelGenerationConfigurationsByEquipmentId(
    @Args('equipmentId') equipmentId: string,
  ): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationService.findByEquipmentId(equipmentId);
  }

  @Query(() => [CatalogModelGenerationConfiguration], {
    name: 'catalogModelGenerationConfigurationsByEngineId',
    description: 'Get all configurations with specific engine',
  })
  async catalogModelGenerationConfigurationsByEngineId(
    @Args('engineId') engineId: string,
  ): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationService.findByEngineId(engineId);
  }
}
