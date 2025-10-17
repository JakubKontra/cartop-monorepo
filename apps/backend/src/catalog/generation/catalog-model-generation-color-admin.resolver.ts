import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CatalogModelGenerationColor } from './catalog-model-generation-color.entity';
import { CatalogModelGenerationColorService } from './catalog-model-generation-color.service';
import { CreateCatalogModelGenerationColorInput } from './dto/create-catalog-model-generation-color.input';
import { UpdateCatalogModelGenerationColorInput } from './dto/update-catalog-model-generation-color.input';

@Resolver(() => CatalogModelGenerationColor)
export class CatalogModelGenerationColorAdminResolver {
  constructor(
    private readonly generationColorService: CatalogModelGenerationColorService,
  ) {}

  @Mutation(() => CatalogModelGenerationColor, {
    description: 'Create a new generation color (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogModelGenerationColor(
    @Args('input') input: CreateCatalogModelGenerationColorInput,
  ): Promise<CatalogModelGenerationColor> {
    return this.generationColorService.create(input);
  }

  @Mutation(() => CatalogModelGenerationColor, {
    description: 'Update a generation color (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogModelGenerationColor(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogModelGenerationColorInput,
  ): Promise<CatalogModelGenerationColor> {
    return this.generationColorService.update(id, input);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a generation color (Admin only)',
  })
  @Roles(UserRole.ADMIN)
  async deleteCatalogModelGenerationColor(@Args('id') id: string): Promise<boolean> {
    return this.generationColorService.remove(id);
  }
}
