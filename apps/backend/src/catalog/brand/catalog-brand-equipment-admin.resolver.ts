import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';
import { CatalogBrandEquipmentService } from './catalog-brand-equipment.service';
import { CreateCatalogBrandEquipmentInput } from './dto/create-catalog-brand-equipment.input';
import { UpdateCatalogBrandEquipmentInput } from './dto/update-catalog-brand-equipment.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Brand Equipment Resolver
 * Handles all administrative operations for catalog brand equipment
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogBrandEquipment)
export class CatalogBrandEquipmentAdminResolver {
  constructor(private readonly equipmentService: CatalogBrandEquipmentService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new brand equipment
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrandEquipment)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createBrandEquipment(
    @Args('input') input: CreateCatalogBrandEquipmentInput,
  ): Promise<CatalogBrandEquipment> {
    return this.equipmentService.create(input);
  }

  /**
   * Update an existing brand equipment
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrandEquipment)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateBrandEquipment(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogBrandEquipmentInput,
  ): Promise<CatalogBrandEquipment> {
    return this.equipmentService.update(id, input);
  }

  /**
   * Delete a brand equipment
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteBrandEquipment(@Args('id') id: string): Promise<boolean> {
    return this.equipmentService.remove(id);
  }

  // ==================== ADMIN QUERIES ====================

  /**
   * Get all brand equipment with optional brand filtering
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogBrandEquipment], { name: 'allBrandEquipments' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getAllBrandEquipments(
    @Args('limit', { nullable: true, defaultValue: 100 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Args('brandId', { nullable: true }) brandId?: string,
  ): Promise<CatalogBrandEquipment[]> {
    return this.equipmentService.findAll(limit, offset, brandId);
  }

  /**
   * Get a single brand equipment by ID
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => CatalogBrandEquipment, { name: 'brandEquipment' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getBrandEquipment(@Args('id') id: string): Promise<CatalogBrandEquipment> {
    return this.equipmentService.findOne(id);
  }

  /**
   * Search brand equipment by name or description
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogBrandEquipment], { name: 'searchBrandEquipments' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async searchBrandEquipments(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<CatalogBrandEquipment[]> {
    return this.equipmentService.search(query, limit);
  }

  /**
   * Get count of brand equipment with optional brand filtering
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => Int, { name: 'brandEquipmentsCount' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getBrandEquipmentsCount(
    @Args('brandId', { nullable: true }) brandId?: string,
  ): Promise<number> {
    return this.equipmentService.count(brandId);
  }
}
