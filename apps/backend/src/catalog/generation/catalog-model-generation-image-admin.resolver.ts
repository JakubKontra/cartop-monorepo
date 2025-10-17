import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CatalogModelGenerationImage } from './catalog-model-generation-image.entity';
import { CatalogModelGenerationImageService } from './catalog-model-generation-image.service';
import { CreateCatalogModelGenerationImageInput } from './dto/create-catalog-model-generation-image.input';
import { UpdateCatalogModelGenerationImageInput } from './dto/update-catalog-model-generation-image.input';

@Resolver(() => CatalogModelGenerationImage)
export class CatalogModelGenerationImageAdminResolver {
  constructor(
    private readonly generationImageService: CatalogModelGenerationImageService,
  ) {}

  @Mutation(() => CatalogModelGenerationImage, {
    description: 'Create a new generation image (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogModelGenerationImage(
    @Args('input') input: CreateCatalogModelGenerationImageInput,
  ): Promise<CatalogModelGenerationImage> {
    return this.generationImageService.create(input);
  }

  @Mutation(() => CatalogModelGenerationImage, {
    description: 'Update a generation image (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogModelGenerationImage(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogModelGenerationImageInput,
  ): Promise<CatalogModelGenerationImage> {
    return this.generationImageService.update(id, input);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a generation image (Admin only)',
  })
  @Roles(UserRole.ADMIN)
  async deleteCatalogModelGenerationImage(@Args('id') id: string): Promise<boolean> {
    return this.generationImageService.remove(id);
  }
}
