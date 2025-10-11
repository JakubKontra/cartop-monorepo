import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatalogModel } from './catalog-model.entity';
import { CatalogModelService } from './catalog-model.service';
import { CreateCatalogModelInput } from './dto/create-catalog-model.input';
import { UpdateCatalogModelInput } from './dto/update-catalog-model.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Model Resolver
 * Handles all administrative operations for catalog models
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogModel)
export class CatalogModelAdminResolver {
  constructor(private readonly modelService: CatalogModelService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog model
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogModel)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogModel(
    @Args('input') input: CreateCatalogModelInput,
  ): Promise<CatalogModel> {
    return this.modelService.create(input);
  }

  /**
   * Update an existing catalog model
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogModel)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogModel(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogModelInput,
  ): Promise<CatalogModel> {
    return this.modelService.update(id, input);
  }

  /**
   * Delete a catalog model
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogModel(@Args('id') id: string): Promise<boolean> {
    return this.modelService.remove(id);
  }

  // ==================== ADMIN-ONLY QUERIES ====================

  /**
   * Get all catalog models (including inactive)
   * Admin view that shows both active and inactive models
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogModel], { name: 'allCatalogModels' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getAllCatalogModels(
    @Args('limit', { nullable: true, defaultValue: 100 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<CatalogModel[]> {
    // Admin can see all models, including inactive ones
    return this.modelService.findAll(limit, offset, false);
  }
}
