import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandService } from './catalog-brand.service';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Brand Resolver
 * Handles all public queries for browsing the catalog
 * No authentication required - available to all users
 *
 * Field-level authorization for legacy fields (legacySystemId, legacySlug)
 * is handled by CatalogLegacyFieldResolver (see catalog/common/)
 */
@Resolver(() => CatalogBrand)
@Public()
export class CatalogBrandPublicResolver {
  constructor(private readonly brandService: CatalogBrandService) {}

  /**
   * Get list of catalog brands
   * By default, only returns active brands for public users
   */
  @Query(() => [CatalogBrand], { name: 'catalogBrands' })
  async getCatalogBrands(
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Args('activeOnly', { nullable: true, defaultValue: true }) activeOnly: boolean,
  ): Promise<CatalogBrand[]> {
    return this.brandService.findAll(limit, offset, activeOnly);
  }

  /**
   * Get a single catalog brand by ID
   */
  @Query(() => CatalogBrand, { name: 'catalogBrand' })
  async getCatalogBrand(@Args('id') id: string): Promise<CatalogBrand> {
    return this.brandService.findOne(id);
  }

  /**
   * Get a single catalog brand by slug
   * Used for SEO-friendly URLs
   */
  @Query(() => CatalogBrand, { name: 'catalogBrandBySlug' })
  async getCatalogBrandBySlug(@Args('slug') slug: string): Promise<CatalogBrand> {
    return this.brandService.findBySlug(slug);
  }

  /**
   * Search catalog brands by name
   */
  @Query(() => [CatalogBrand], { name: 'searchCatalogBrands' })
  async searchCatalogBrands(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<CatalogBrand[]> {
    return this.brandService.search(query, limit);
  }

  /**
   * Get highlighted catalog brands
   * Used for featured sections on the homepage
   */
  @Query(() => [CatalogBrand], { name: 'highlightedCatalogBrands' })
  async getHighlightedCatalogBrands(): Promise<CatalogBrand[]> {
    return this.brandService.getHighlighted();
  }

  /**
   * Get recommended catalog brands
   * Used for promotional sections
   */
  @Query(() => [CatalogBrand], { name: 'recommendedCatalogBrands' })
  async getRecommendedCatalogBrands(): Promise<CatalogBrand[]> {
    return this.brandService.getRecommended();
  }

  /**
   * Check if a slug is available for use
   * Returns the existing brand if slug is taken, null if available
   * Used for form validation - does NOT throw errors
   */
  @Query(() => CatalogBrand, {
    name: 'checkBrandSlugAvailability',
    nullable: true,
    description: 'Returns the brand if slug exists, null if available'
  })
  async checkBrandSlugAvailability(
    @Args('slug') slug: string
  ): Promise<CatalogBrand | null> {
    return this.brandService.checkSlugAvailability(slug);
  }
}
