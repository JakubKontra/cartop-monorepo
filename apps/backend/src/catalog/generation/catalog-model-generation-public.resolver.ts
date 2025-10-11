import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogModelGenerationService } from './catalog-model-generation.service';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Model Generation Resolver
 * Handles all public queries for browsing model generations
 * No authentication required - available to all users
 *
 * Field-level authorization for legacy fields (legacySystemId)
 * is handled by CatalogLegacyFieldResolver (see catalog/common/)
 */
@Resolver(() => CatalogModelGeneration)
@Public()
export class CatalogModelGenerationPublicResolver {
  constructor(private readonly generationService: CatalogModelGenerationService) {}

  /**
   * Get list of catalog model generations
   * Optionally filter by model ID and/or active status
   */
  @Query(() => [CatalogModelGeneration], { name: 'catalogModelGenerations' })
  async getCatalogModelGenerations(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('modelId', { nullable: true })
    modelId?: string,
    @Args('isActive', { type: () => Boolean, nullable: true })
    isActive?: boolean,
  ): Promise<CatalogModelGeneration[]> {
    return this.generationService.findAll(limit, offset, modelId, isActive);
  }

  /**
   * Get a single catalog model generation by ID
   */
  @Query(() => CatalogModelGeneration, { name: 'catalogModelGeneration' })
  async getCatalogModelGeneration(@Args('id') id: string): Promise<CatalogModelGeneration> {
    return this.generationService.findOne(id);
  }

  /**
   * Get a single catalog model generation by slug
   * Used for SEO-friendly URLs
   */
  @Query(() => CatalogModelGeneration, { name: 'catalogModelGenerationBySlug' })
  async getCatalogModelGenerationBySlug(@Args('slug') slug: string): Promise<CatalogModelGeneration> {
    return this.generationService.findBySlug(slug);
  }

  /**
   * Get a single catalog model generation by legacy slug
   * Used for backward compatibility
   */
  @Query(() => CatalogModelGeneration, { name: 'catalogModelGenerationByLegacySlug' })
  async getCatalogModelGenerationByLegacySlug(
    @Args('legacySlug') legacySlug: string,
  ): Promise<CatalogModelGeneration> {
    return this.generationService.findByLegacySlug(legacySlug);
  }

  /**
   * Get catalog model generations by model ID
   */
  @Query(() => [CatalogModelGeneration], { name: 'catalogModelGenerationsByModelId' })
  async getCatalogModelGenerationsByModelId(
    @Args('modelId') modelId: string,
  ): Promise<CatalogModelGeneration[]> {
    return this.generationService.findByModelId(modelId);
  }

  /**
   * Search catalog model generations by name
   */
  @Query(() => [CatalogModelGeneration], { name: 'searchCatalogModelGenerations' })
  async searchCatalogModelGenerations(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogModelGeneration[]> {
    return this.generationService.search(query, limit);
  }
}
