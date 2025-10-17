import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';
import { CatalogEquipmentPaidItemService } from './catalog-equipment-paid-item.service';

@Resolver(() => CatalogEquipmentPaidItem)
@Public()
export class CatalogEquipmentPaidItemPublicResolver {
  constructor(
    private readonly catalogEquipmentPaidItemService: CatalogEquipmentPaidItemService,
  ) {}

  @Query(() => [CatalogEquipmentPaidItem], {
    name: 'catalogEquipmentPaidItems',
    description: 'Get all equipment paid items with optional filters',
  })
  async catalogEquipmentPaidItems(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('equipmentId', { nullable: true }) equipmentId?: string,
    @Args('itemId', { nullable: true }) itemId?: string,
  ): Promise<CatalogEquipmentPaidItem[]> {
    return this.catalogEquipmentPaidItemService.findAll(limit, offset, equipmentId, itemId);
  }

  @Query(() => CatalogEquipmentPaidItem, {
    name: 'catalogEquipmentPaidItemById',
    description: 'Get a single equipment paid item by ID',
  })
  async catalogEquipmentPaidItemById(
    @Args('id') id: string,
  ): Promise<CatalogEquipmentPaidItem> {
    return this.catalogEquipmentPaidItemService.findOne(id);
  }

  @Query(() => [CatalogEquipmentPaidItem], {
    name: 'catalogEquipmentPaidItemsByEquipmentId',
    description: 'Get all paid items for a specific equipment',
  })
  async catalogEquipmentPaidItemsByEquipmentId(
    @Args('equipmentId') equipmentId: string,
  ): Promise<CatalogEquipmentPaidItem[]> {
    return this.catalogEquipmentPaidItemService.findByEquipmentId(equipmentId);
  }

  @Query(() => [CatalogEquipmentPaidItem], {
    name: 'catalogEquipmentPaidItemsByItemId',
    description: 'Get all paid item prices for a specific equipment item',
  })
  async catalogEquipmentPaidItemsByItemId(
    @Args('itemId') itemId: string,
  ): Promise<CatalogEquipmentPaidItem[]> {
    return this.catalogEquipmentPaidItemService.findByItemId(itemId);
  }
}
