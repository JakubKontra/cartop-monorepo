import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';
import { CatalogBrandEquipmentItemService } from './catalog-brand-equipment-item.service';
import { CreateCatalogBrandEquipmentItemInput } from './dto/create-catalog-brand-equipment-item.input';
import { UpdateCatalogBrandEquipmentItemInput } from './dto/update-catalog-brand-equipment-item.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Brand Equipment Item Resolver
 * Handles all administrative operations for equipment items
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogBrandEquipmentItem)
export class CatalogBrandEquipmentItemAdminResolver {
  constructor(private readonly itemService: CatalogBrandEquipmentItemService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrandEquipmentItem)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createEquipmentItem(
    @Args('input') input: CreateCatalogBrandEquipmentItemInput,
  ): Promise<CatalogBrandEquipmentItem> {
    return this.itemService.create(input);
  }

  /**
   * Update an existing equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrandEquipmentItem)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateEquipmentItem(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogBrandEquipmentItemInput,
  ): Promise<CatalogBrandEquipmentItem> {
    return this.itemService.update(id, input);
  }

  /**
   * Delete an equipment item
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteEquipmentItem(@Args('id') id: string): Promise<boolean> {
    return this.itemService.remove(id);
  }

  // ==================== ADMIN QUERIES ====================

  /**
   * Get all equipment items
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogBrandEquipmentItem], { name: 'allEquipmentItems' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getAllEquipmentItems(
    @Args('limit', { nullable: true, defaultValue: 100 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<CatalogBrandEquipmentItem[]> {
    return this.itemService.findAll(limit, offset);
  }

  /**
   * Get a single equipment item by ID
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => CatalogBrandEquipmentItem, { name: 'equipmentItem' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getEquipmentItem(@Args('id') id: string): Promise<CatalogBrandEquipmentItem> {
    return this.itemService.findOne(id);
  }

  /**
   * Search equipment items by name
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogBrandEquipmentItem], { name: 'searchEquipmentItems' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async searchEquipmentItems(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<CatalogBrandEquipmentItem[]> {
    return this.itemService.search(query, limit);
  }

  /**
   * Get count of equipment items
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => Int, { name: 'equipmentItemsCount' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getEquipmentItemsCount(): Promise<number> {
    return this.itemService.count();
  }
}
