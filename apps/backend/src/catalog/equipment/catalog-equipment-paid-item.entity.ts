import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';

/**
 * CatalogEquipmentPaidItem Entity
 * Represents individual equipment items that can be purchased separately with pricing
 * (e.g., "Add ABS for $500", "Add Leather Seats for $800")
 */
@ObjectType()
@Entity('catalog_equipment_paid_item')
@Auditable()
export class CatalogEquipmentPaidItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field(() => Int, { description: 'Price in cents' })
  @Column({ type: 'integer' })
  price: number;

  @Field(() => CatalogEquipment, { nullable: true })
  @ManyToOne(() => CatalogEquipment, equipment => equipment.paidItems, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'equipmentId' })
  equipment?: CatalogEquipment;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  equipmentId?: string;

  @Field(() => CatalogEquipmentItem, { nullable: true })
  @ManyToOne(() => CatalogEquipmentItem, item => item.paidItemPrices, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'itemId' })
  item?: CatalogEquipmentItem;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  itemId?: string;
}
