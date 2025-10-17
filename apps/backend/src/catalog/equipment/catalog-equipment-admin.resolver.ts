import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogEquipmentService } from './catalog-equipment.service';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CreateCatalogEquipmentInput } from './dto/create-catalog-equipment.input';
import { UpdateCatalogEquipmentInput } from './dto/update-catalog-equipment.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Equipment Resolver
 * Handles all administrative operations for catalog equipment
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogEquipment)
export class CatalogEquipmentAdminResolver {
  constructor(private readonly equipmentService: CatalogEquipmentService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipment)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogEquipment(
    @Args('input') input: CreateCatalogEquipmentInput,
  ): Promise<CatalogEquipment> {
    return this.equipmentService.create(input);
  }

  /**
   * Update an existing catalog equipment item
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipment)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogEquipment(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEquipmentInput,
  ): Promise<CatalogEquipment> {
    return this.equipmentService.update(id, input);
  }

  /**
   * Delete a catalog equipment item
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogEquipment(@Args('id') id: string): Promise<boolean> {
    return this.equipmentService.remove(id);
  }
}
