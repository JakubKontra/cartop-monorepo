import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogEquipmentItemService } from './catalog-equipment-item.service';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Equipment Item Resolver
 * Handles all public queries for browsing equipment items
 * No authentication required - available to all users
 */
@Resolver(() => CatalogEquipmentItem)
@Public()
export class CatalogEquipmentItemPublicResolver {
  constructor(private readonly itemService: CatalogEquipmentItemService) {}

  /**
   * Get list of catalog equipment items
   * Optionally filter by category ID
   */
  @Query(() => [CatalogEquipmentItem], { name: 'catalogEquipmentItems' })
  async getCatalogEquipmentItems(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('categoryId', { nullable: true })
    categoryId?: string,
  ): Promise<CatalogEquipmentItem[]> {
    return this.itemService.findAll(limit, offset, categoryId);
  }

  /**
   * Get a single catalog equipment item by ID
   */
  @Query(() => CatalogEquipmentItem, { name: 'catalogEquipmentItemById' })
  async getCatalogEquipmentItemById(@Args('id') id: string): Promise<CatalogEquipmentItem> {
    return this.itemService.findOne(id);
  }

  /**
   * Get catalog equipment items by category ID
   */
  @Query(() => [CatalogEquipmentItem], { name: 'catalogEquipmentItemsByCategoryId' })
  async getCatalogEquipmentItemsByCategoryId(
    @Args('categoryId') categoryId: string,
  ): Promise<CatalogEquipmentItem[]> {
    return this.itemService.findByCategoryId(categoryId);
  }

  /**
   * Search catalog equipment items by name
   */
  @Query(() => [CatalogEquipmentItem], { name: 'searchCatalogEquipmentItems' })
  async searchCatalogEquipmentItems(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogEquipmentItem[]> {
    return this.itemService.search(query, limit);
  }
}
