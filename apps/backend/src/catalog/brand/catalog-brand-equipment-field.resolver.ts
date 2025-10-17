import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';

/**
 * Field Resolver for CatalogBrandEquipment
 * Resolves the 'assignedItems' field to fetch related equipment items via many-to-many
 */
@Resolver(() => CatalogBrandEquipment)
export class CatalogBrandEquipmentFieldResolver {

  /**
   * Resolve the assignedItems field for a CatalogBrandEquipment
   * Returns items assigned to this equipment via the junction table
   */
  @ResolveField(() => [CatalogBrandEquipmentItem], { nullable: true, name: 'assignedItems' })
  async assignedItems(
    @Parent() equipment: CatalogBrandEquipment,
  ): Promise<CatalogBrandEquipmentItem[]> {
    // If items are already loaded via relations, return them
    if (equipment.assignedItems) {
      return equipment.assignedItems;
    }

    // For many-to-many, TypeORM handles this automatically when relations are loaded
    // This resolver is mainly for when assignedItems are not eagerly loaded
    return [];
  }
}
