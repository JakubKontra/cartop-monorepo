import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CatalogModelGenerationConfiguration } from './catalog-model-generation-configuration.entity';
import { CatalogModelGenerationConfigurationService } from './catalog-model-generation-configuration.service';
import { CreateCatalogModelGenerationConfigurationInput } from './dto/create-catalog-model-generation-configuration.input';
import { UpdateCatalogModelGenerationConfigurationInput } from './dto/update-catalog-model-generation-configuration.input';

@Resolver(() => CatalogModelGenerationConfiguration)
export class CatalogModelGenerationConfigurationAdminResolver {
  constructor(
    private readonly configurationService: CatalogModelGenerationConfigurationService,
  ) {}

  @Mutation(() => CatalogModelGenerationConfiguration, {
    description: 'Create a new generation configuration (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogModelGenerationConfiguration(
    @Args('input') input: CreateCatalogModelGenerationConfigurationInput,
  ): Promise<CatalogModelGenerationConfiguration> {
    return this.configurationService.create(input);
  }

  @Mutation(() => CatalogModelGenerationConfiguration, {
    description: 'Update a generation configuration (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogModelGenerationConfiguration(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogModelGenerationConfigurationInput,
  ): Promise<CatalogModelGenerationConfiguration> {
    return this.configurationService.update(id, input);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a generation configuration (Admin only)',
  })
  @Roles(UserRole.ADMIN)
  async deleteCatalogModelGenerationConfiguration(@Args('id') id: string): Promise<boolean> {
    return this.configurationService.remove(id);
  }
}
