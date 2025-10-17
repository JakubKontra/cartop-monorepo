import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { CatalogModelGenerationImage } from './catalog-model-generation-image.entity';
import { CatalogModelGenerationImageService } from './catalog-model-generation-image.service';
import { CatalogImageType } from '../../common/enums/catalog/catalog-image-type.enum';

@Resolver(() => CatalogModelGenerationImage)
@Public()
export class CatalogModelGenerationImagePublicResolver {
  constructor(
    private readonly generationImageService: CatalogModelGenerationImageService,
  ) {}

  @Query(() => [CatalogModelGenerationImage], {
    name: 'catalogModelGenerationImages',
    description: 'Get all generation images with optional filters',
  })
  async catalogModelGenerationImages(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('imageId', { nullable: true }) imageId?: string,
    @Args('active', { nullable: true }) active?: boolean,
    @Args('imageType', { type: () => CatalogImageType, nullable: true }) imageType?: CatalogImageType,
    @Args('exteriorColorId', { nullable: true }) exteriorColorId?: string,
    @Args('interiorColorId', { nullable: true }) interiorColorId?: string,
  ): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageService.findAll(
      limit,
      offset,
      generationId,
      imageId,
      active,
      imageType,
      exteriorColorId,
      interiorColorId,
    );
  }

  @Query(() => CatalogModelGenerationImage, {
    name: 'catalogModelGenerationImageById',
    description: 'Get a single generation image by ID',
  })
  async catalogModelGenerationImageById(
    @Args('id') id: string,
  ): Promise<CatalogModelGenerationImage> {
    return this.generationImageService.findOne(id);
  }

  @Query(() => [CatalogModelGenerationImage], {
    name: 'catalogModelGenerationImagesByGenerationId',
    description: 'Get all images for a specific generation',
  })
  async catalogModelGenerationImagesByGenerationId(
    @Args('generationId') generationId: string,
  ): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageService.findByGenerationId(generationId);
  }

  @Query(() => [CatalogModelGenerationImage], {
    name: 'catalogModelGenerationImagesByImageId',
    description: 'Get all generations using a specific image',
  })
  async catalogModelGenerationImagesByImageId(
    @Args('imageId') imageId: string,
  ): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageService.findByImageId(imageId);
  }

  @Query(() => [CatalogModelGenerationImage], {
    name: 'catalogModelGenerationImagesByColorCombination',
    description: 'Get images for a specific generation and color combination',
  })
  async catalogModelGenerationImagesByColorCombination(
    @Args('generationId') generationId: string,
    @Args('exteriorColorId', { nullable: true }) exteriorColorId?: string,
    @Args('interiorColorId', { nullable: true }) interiorColorId?: string,
    @Args('imageType', { type: () => CatalogImageType, nullable: true }) imageType?: CatalogImageType,
  ): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageService.findByColorCombination(
      generationId,
      exteriorColorId,
      interiorColorId,
      imageType,
    );
  }

  @Query(() => [CatalogModelGenerationImage], {
    name: 'catalogModelGeneration360Gallery',
    description: 'Get 360° gallery images for a specific generation and optional exterior color',
  })
  async catalogModelGeneration360Gallery(
    @Args('generationId') generationId: string,
    @Args('exteriorColorId', { nullable: true }) exteriorColorId?: string,
  ): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageService.find360Gallery(generationId, exteriorColorId);
  }
}
