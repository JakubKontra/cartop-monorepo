import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogColorService } from './catalog-color.service';
import { CatalogColor } from './catalog-color.entity';
import { CreateCatalogColorInput } from './dto/create-catalog-color.input';
import { UpdateCatalogColorInput } from './dto/update-catalog-color.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Color Resolver
 * Handles all administrative operations for catalog colors
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogColor)
export class CatalogColorAdminResolver {
  constructor(private readonly colorService: CatalogColorService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog color
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogColor)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogColor(
    @Args('input') input: CreateCatalogColorInput,
  ): Promise<CatalogColor> {
    return this.colorService.create(input);
  }

  /**
   * Update an existing catalog color
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogColor)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogColor(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogColorInput,
  ): Promise<CatalogColor> {
    return this.colorService.update(id, input);
  }

  /**
   * Delete a catalog color
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogColor(@Args('id') id: string): Promise<boolean> {
    return this.colorService.remove(id);
  }
}
