import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogEngine } from '../engine/catalog-engine.entity';
import { CatalogEngineService } from '../engine/catalog-engine.service';

@Resolver(() => CatalogModelGeneration)
export class CatalogModelGenerationFieldResolver {
  constructor(private readonly engineService: CatalogEngineService) {}

  @ResolveField(() => [CatalogEngine])
  async engines(@Parent() generation: CatalogModelGeneration): Promise<CatalogEngine[]> {
    return this.engineService.findByGenerationId(generation.id);
  }
}
