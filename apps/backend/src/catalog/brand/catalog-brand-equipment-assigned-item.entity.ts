import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';

/**
 * Junction table for many-to-many relationship between Equipment and Items
 * An equipment can have multiple items, and an item can be assigned to multiple equipments
 */
@ObjectType()
@Entity('catalog_brand_equipment_assigned_items')
export class CatalogBrandEquipmentAssignedItem {
  // === Composite Primary Key ===

  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid', name: 'equipmentId' })
  equipmentId: string;

  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid', name: 'itemId' })
  itemId: string;

  // === Relationships ===

  @Field(() => CatalogBrandEquipment)
  @ManyToOne(() => CatalogBrandEquipment, equipment => equipment.assignedItemsRelation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'equipmentId' })
  @Index()
  equipment: CatalogBrandEquipment;

  @Field(() => CatalogBrandEquipmentItem)
  @ManyToOne(() => CatalogBrandEquipmentItem, item => item.equipments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itemId' })
  @Index()
  item: CatalogBrandEquipmentItem;
}
