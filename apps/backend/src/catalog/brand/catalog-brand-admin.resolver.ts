import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandService } from './catalog-brand.service';
import { CreateCatalogBrandInput } from './dto/create-catalog-brand.input';
import { UpdateCatalogBrandInput } from './dto/update-catalog-brand.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Brand Resolver
 * Handles all administrative operations for catalog brands
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogBrand)
export class CatalogBrandAdminResolver {
  constructor(private readonly brandService: CatalogBrandService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog brand
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrand)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogBrand(
    @Args('input') input: CreateCatalogBrandInput,
  ): Promise<CatalogBrand> {
    return this.brandService.create(input);
  }

  /**
   * Update an existing catalog brand
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogBrand)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogBrand(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogBrandInput,
  ): Promise<CatalogBrand> {
    return this.brandService.update(id, input);
  }

  /**
   * Delete a catalog brand
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogBrand(@Args('id') id: string): Promise<boolean> {
    return this.brandService.remove(id);
  }

  // ==================== ADMIN-ONLY QUERIES ====================

  /**
   * Get all catalog brands (including inactive)
   * Admin view that shows both active and inactive brands
   * Requires SALES_REPRESENTATIVE, CATALOG_MANAGER, or ADMIN role
   */
  @Query(() => [CatalogBrand], { name: 'allCatalogBrands' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getAllCatalogBrands(
    @Args('limit', { nullable: true, defaultValue: 100 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<CatalogBrand[]> {
    // Admin can see all brands, including inactive ones
    return this.brandService.findAll(limit, offset, false);
  }
}
