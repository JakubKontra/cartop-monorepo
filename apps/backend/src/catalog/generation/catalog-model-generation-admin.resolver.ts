import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogModelGenerationService } from './catalog-model-generation.service';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CreateCatalogModelGenerationInput } from './dto/create-catalog-model-generation.input';
import { UpdateCatalogModelGenerationInput } from './dto/update-catalog-model-generation.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Model Generation Resolver
 * Handles all administrative operations for catalog model generations
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogModelGeneration)
export class CatalogModelGenerationAdminResolver {
  constructor(private readonly generationService: CatalogModelGenerationService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog model generation
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogModelGeneration)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogModelGeneration(
    @Args('input') input: CreateCatalogModelGenerationInput,
  ): Promise<CatalogModelGeneration> {
    return this.generationService.create(input);
  }

  /**
   * Update an existing catalog model generation
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogModelGeneration)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogModelGeneration(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogModelGenerationInput,
  ): Promise<CatalogModelGeneration> {
    return this.generationService.update(id, input);
  }

  /**
   * Delete a catalog model generation
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogModelGeneration(@Args('id') id: string): Promise<boolean> {
    return this.generationService.remove(id);
  }
}
