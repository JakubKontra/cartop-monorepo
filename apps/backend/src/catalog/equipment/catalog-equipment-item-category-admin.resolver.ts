import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogEquipmentItemCategoryService } from './catalog-equipment-item-category.service';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { CreateCatalogEquipmentItemCategoryInput } from './dto/create-catalog-equipment-item-category.input';
import { UpdateCatalogEquipmentItemCategoryInput } from './dto/update-catalog-equipment-item-category.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Equipment Item Category Resolver
 * Handles all administrative operations for catalog equipment item categories
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogEquipmentItemCategory)
export class CatalogEquipmentItemCategoryAdminResolver {
  constructor(private readonly categoryService: CatalogEquipmentItemCategoryService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog equipment item category
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentItemCategory)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogEquipmentItemCategory(
    @Args('input') input: CreateCatalogEquipmentItemCategoryInput,
  ): Promise<CatalogEquipmentItemCategory> {
    return this.categoryService.create(input);
  }

  /**
   * Update an existing catalog equipment item category
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentItemCategory)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogEquipmentItemCategory(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEquipmentItemCategoryInput,
  ): Promise<CatalogEquipmentItemCategory> {
    return this.categoryService.update(id, input);
  }

  /**
   * Delete a catalog equipment item category
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogEquipmentItemCategory(@Args('id') id: string): Promise<boolean> {
    return this.categoryService.remove(id);
  }
}
