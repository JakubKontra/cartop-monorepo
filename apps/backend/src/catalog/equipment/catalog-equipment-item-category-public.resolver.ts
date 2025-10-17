import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogEquipmentItemCategoryService } from './catalog-equipment-item-category.service';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Equipment Item Category Resolver
 * Handles all public queries for browsing equipment categories
 * No authentication required - available to all users
 */
@Resolver(() => CatalogEquipmentItemCategory)
@Public()
export class CatalogEquipmentItemCategoryPublicResolver {
  constructor(private readonly categoryService: CatalogEquipmentItemCategoryService) {}

  /**
   * Get list of catalog equipment item categories
   */
  @Query(() => [CatalogEquipmentItemCategory], { name: 'catalogEquipmentItemCategories' })
  async getCatalogEquipmentItemCategories(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
  ): Promise<CatalogEquipmentItemCategory[]> {
    return this.categoryService.findAll(limit, offset);
  }

  /**
   * Get a single catalog equipment item category by ID
   */
  @Query(() => CatalogEquipmentItemCategory, { name: 'catalogEquipmentItemCategoryById' })
  async getCatalogEquipmentItemCategoryById(
    @Args('id') id: string,
  ): Promise<CatalogEquipmentItemCategory> {
    return this.categoryService.findOne(id);
  }

  /**
   * Search catalog equipment item categories by name
   */
  @Query(() => [CatalogEquipmentItemCategory], { name: 'searchCatalogEquipmentItemCategories' })
  async searchCatalogEquipmentItemCategories(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogEquipmentItemCategory[]> {
    return this.categoryService.search(query, limit);
  }
}
