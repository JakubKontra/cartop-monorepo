import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogEquipmentItemService } from './catalog-equipment-item.service';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';
import { CreateCatalogEquipmentItemInput } from './dto/create-catalog-equipment-item.input';
import { UpdateCatalogEquipmentItemInput } from './dto/update-catalog-equipment-item.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Equipment Item Resolver
 * Handles all administrative operations for catalog equipment items
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogEquipmentItem)
export class CatalogEquipmentItemAdminResolver {
  constructor(private readonly itemService: CatalogEquipmentItemService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentItem)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogEquipmentItem(
    @Args('input') input: CreateCatalogEquipmentItemInput,
  ): Promise<CatalogEquipmentItem> {
    return this.itemService.create(input);
  }

  /**
   * Update an existing catalog equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentItem)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogEquipmentItem(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEquipmentItemInput,
  ): Promise<CatalogEquipmentItem> {
    return this.itemService.update(id, input);
  }

  /**
   * Delete a catalog equipment item
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogEquipmentItem(@Args('id') id: string): Promise<boolean> {
    return this.itemService.remove(id);
  }
}
