import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { CatalogModelGenerationColor } from './catalog-model-generation-color.entity';
import { CatalogModelGenerationColorService } from './catalog-model-generation-color.service';

@Resolver(() => CatalogModelGenerationColor)
@Public()
export class CatalogModelGenerationColorPublicResolver {
  constructor(
    private readonly generationColorService: CatalogModelGenerationColorService,
  ) {}

  @Query(() => [CatalogModelGenerationColor], {
    name: 'catalogModelGenerationColors',
    description: 'Get all generation colors with optional filters',
  })
  async catalogModelGenerationColors(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('colorId', { nullable: true }) colorId?: string,
  ): Promise<CatalogModelGenerationColor[]> {
    return this.generationColorService.findAll(limit, offset, generationId, colorId);
  }

  @Query(() => CatalogModelGenerationColor, {
    name: 'catalogModelGenerationColorById',
    description: 'Get a single generation color by ID',
  })
  async catalogModelGenerationColorById(
    @Args('id') id: string,
  ): Promise<CatalogModelGenerationColor> {
    return this.generationColorService.findOne(id);
  }

  @Query(() => [CatalogModelGenerationColor], {
    name: 'catalogModelGenerationColorsByGenerationId',
    description: 'Get all colors for a specific generation',
  })
  async catalogModelGenerationColorsByGenerationId(
    @Args('generationId') generationId: string,
  ): Promise<CatalogModelGenerationColor[]> {
    return this.generationColorService.findByGenerationId(generationId);
  }

  @Query(() => [CatalogModelGenerationColor], {
    name: 'catalogModelGenerationColorsByColorId',
    description: 'Get all generations that have a specific color',
  })
  async catalogModelGenerationColorsByColorId(
    @Args('colorId') colorId: string,
  ): Promise<CatalogModelGenerationColor[]> {
    return this.generationColorService.findByColorId(colorId);
  }
}
