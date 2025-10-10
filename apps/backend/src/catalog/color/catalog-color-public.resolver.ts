import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogColorService } from './catalog-color.service';
import { CatalogColor } from './catalog-color.entity';
import { Public } from '../../common/decorators/auth/public.decorator';
import { CatalogColorType } from '../../common/enums/catalog/catalog-color-type.enum';

/**
 * Public Catalog Color Resolver
 * Handles all public queries for browsing colors
 * No authentication required - available to all users
 *
 * Field-level authorization for legacy fields (legacySystemId)
 * is handled by CatalogLegacyFieldResolver (see catalog/common/)
 */
@Resolver(() => CatalogColor)
@Public()
export class CatalogColorPublicResolver {
  constructor(private readonly colorService: CatalogColorService) {}

  /**
   * Get list of catalog colors
   * Optionally filter by type (exterior/interior)
   */
  @Query(() => [CatalogColor], { name: 'catalogColors' })
  async getCatalogColors(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('type', { type: () => CatalogColorType, nullable: true })
    type?: CatalogColorType,
  ): Promise<CatalogColor[]> {
    return this.colorService.findAll(limit, offset, type);
  }

  /**
   * Get a single catalog color by ID
   */
  @Query(() => CatalogColor, { name: 'catalogColor' })
  async getCatalogColor(@Args('id') id: string): Promise<CatalogColor> {
    return this.colorService.findOne(id);
  }

  /**
   * Get a single catalog color by slug
   * Used for SEO-friendly URLs
   */
  @Query(() => CatalogColor, { name: 'catalogColorBySlug' })
  async getCatalogColorBySlug(@Args('slug') slug: string): Promise<CatalogColor> {
    return this.colorService.findBySlug(slug);
  }

  /**
   * Get catalog colors by type (exterior or interior)
   */
  @Query(() => [CatalogColor], { name: 'catalogColorsByType' })
  async getCatalogColorsByType(
    @Args('type', { type: () => CatalogColorType }) type: CatalogColorType,
  ): Promise<CatalogColor[]> {
    return this.colorService.findByType(type);
  }

  /**
   * Search catalog colors by name
   */
  @Query(() => [CatalogColor], { name: 'searchCatalogColors' })
  async searchCatalogColors(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogColor[]> {
    return this.colorService.search(query, limit);
  }
}
