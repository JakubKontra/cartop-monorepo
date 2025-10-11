import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogModel } from './catalog-model.entity';
import { CatalogModelService } from './catalog-model.service';

/**
 * Public Catalog Model Resolver
 * Handles public-facing queries for catalog models
 * No authentication required
 */
@Resolver(() => CatalogModel)
export class CatalogModelPublicResolver {
  constructor(private readonly modelService: CatalogModelService) {}

  // ==================== PUBLIC QUERIES ====================

  /**
   * Get active catalog models
   * Public endpoint that only shows active models
   */
  @Query(() => [CatalogModel], { name: 'catalogModels' })
  async getCatalogModels(
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Args('activeOnly', { nullable: true, defaultValue: true }) activeOnly: boolean,
  ): Promise<CatalogModel[]> {
    return this.modelService.findAll(limit, offset, activeOnly);
  }

  /**
   * Get a single catalog model by ID
   */
  @Query(() => CatalogModel, { name: 'catalogModel' })
  async getCatalogModel(@Args('id') id: string): Promise<CatalogModel> {
    return this.modelService.findOne(id);
  }

  /**
   * Get a catalog model by slug
   */
  @Query(() => CatalogModel, { name: 'catalogModelBySlug' })
  async getCatalogModelBySlug(@Args('slug') slug: string): Promise<CatalogModel> {
    return this.modelService.findBySlug(slug);
  }

  /**
   * Get models by brand
   */
  @Query(() => [CatalogModel], { name: 'catalogModelsByBrand' })
  async getCatalogModelsByBrand(
    @Args('brandId') brandId: string,
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
  ): Promise<CatalogModel[]> {
    return this.modelService.findByBrand(brandId, limit);
  }

  /**
   * Search catalog models
   */
  @Query(() => [CatalogModel], { name: 'searchCatalogModels' })
  async searchCatalogModels(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<CatalogModel[]> {
    return this.modelService.search(query, limit);
  }

  /**
   * Get highlighted catalog models
   */
  @Query(() => [CatalogModel], { name: 'highlightedCatalogModels' })
  async getHighlightedCatalogModels(): Promise<CatalogModel[]> {
    return this.modelService.getHighlighted();
  }

  /**
   * Get recommended catalog models
   */
  @Query(() => [CatalogModel], { name: 'recommendedCatalogModels' })
  async getRecommendedCatalogModels(): Promise<CatalogModel[]> {
    return this.modelService.getRecommended();
  }
}
