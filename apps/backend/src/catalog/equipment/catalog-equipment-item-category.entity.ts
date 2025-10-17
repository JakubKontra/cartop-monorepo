import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';

/**
 * CatalogEquipmentItemCategory Entity
 * Represents categories for equipment items (e.g., "Safety", "Comfort", "Technology")
 */
@ObjectType()
@Entity('catalog_equipment_item_category')
@Auditable()
export class CatalogEquipmentItemCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field(() => [CatalogEquipment], { nullable: true })
  @OneToMany(() => CatalogEquipment, equipment => equipment.category)
  equipmentItems?: CatalogEquipment[];

  @Field(() => [CatalogEquipmentItem], { nullable: true })
  @OneToMany(() => CatalogEquipmentItem, item => item.category)
  items?: CatalogEquipmentItem[];
}
