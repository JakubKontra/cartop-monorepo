import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';

/**
 * CatalogEquipmentItem Entity
 * Represents individual equipment items that can be categorized
 * (e.g., "ABS", "Airbags", "Leather Seats", etc.)
 */
@ObjectType()
@Entity('catalog_equipment_item')
@Auditable()
export class CatalogEquipmentItem {
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

  @Field(() => CatalogEquipmentItemCategory, { nullable: true })
  @ManyToOne(() => CatalogEquipmentItemCategory, category => category.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category?: CatalogEquipmentItemCategory;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  categoryId?: string;

  @Field(() => [CatalogEquipment], { nullable: true })
  @ManyToMany(() => CatalogEquipment, equipment => equipment.items)
  equipments?: CatalogEquipment[];

  @Field(() => [CatalogEquipmentPacket], { nullable: true })
  @ManyToMany(() => CatalogEquipmentPacket, packet => packet.items)
  packets?: CatalogEquipmentPacket[];

  @Field(() => [CatalogEquipmentPaidItem], { nullable: true })
  @OneToMany(() => CatalogEquipmentPaidItem, paidItem => paidItem.item)
  paidItemPrices?: CatalogEquipmentPaidItem[];
}
