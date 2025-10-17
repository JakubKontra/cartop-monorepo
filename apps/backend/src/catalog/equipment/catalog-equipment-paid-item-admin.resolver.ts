import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';
import { CatalogEquipmentPaidItemService } from './catalog-equipment-paid-item.service';
import { CreateCatalogEquipmentPaidItemInput } from './dto/create-catalog-equipment-paid-item.input';
import { UpdateCatalogEquipmentPaidItemInput } from './dto/update-catalog-equipment-paid-item.input';

@Resolver(() => CatalogEquipmentPaidItem)
export class CatalogEquipmentPaidItemAdminResolver {
  constructor(
    private readonly catalogEquipmentPaidItemService: CatalogEquipmentPaidItemService,
  ) {}

  @Mutation(() => CatalogEquipmentPaidItem, {
    description: 'Create a new equipment paid item (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogEquipmentPaidItem(
    @Args('input') input: CreateCatalogEquipmentPaidItemInput,
  ): Promise<CatalogEquipmentPaidItem> {
    return this.catalogEquipmentPaidItemService.create(input);
  }

  @Mutation(() => CatalogEquipmentPaidItem, {
    description: 'Update an equipment paid item (Admin only)',
  })
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogEquipmentPaidItem(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEquipmentPaidItemInput,
  ): Promise<CatalogEquipmentPaidItem> {
    return this.catalogEquipmentPaidItemService.update(id, input);
  }

  @Mutation(() => Boolean, {
    description: 'Delete an equipment paid item (Admin only)',
  })
  @Roles(UserRole.ADMIN)
  async deleteCatalogEquipmentPaidItem(@Args('id') id: string): Promise<boolean> {
    return this.catalogEquipmentPaidItemService.remove(id);
  }
}
