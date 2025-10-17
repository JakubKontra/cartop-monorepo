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
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogModelGeneration } from '../generation/catalog-model-generation.entity';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';

/**
 * CatalogEquipment Entity
 * Represents equipment/features available for a specific model generation
 */
@ObjectType()
@Entity('catalog_equipment')
@Auditable()
export class CatalogEquipment {
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

  @Field(() => CatalogModelGeneration, { nullable: true })
  @ManyToOne(() => CatalogModelGeneration, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'modelGenerationId' })
  modelGeneration?: CatalogModelGeneration;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  modelGenerationId?: string;

  @Field({ nullable: true, defaultValue: true })
  @Column({ type: 'boolean', nullable: true, default: true })
  @Index()
  active?: boolean;

  @Field({ defaultValue: false })
  @Column({ type: 'boolean', default: false })
  @Index()
  standard: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  customText?: string;

  @Field(() => CatalogEquipmentItemCategory, { nullable: true })
  @ManyToOne(() => CatalogEquipmentItemCategory, category => category.equipmentItems, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category?: CatalogEquipmentItemCategory;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  categoryId?: string;

  @Field(() => [CatalogEquipmentItem], { nullable: true })
  @ManyToMany(() => CatalogEquipmentItem, item => item.equipments)
  @JoinTable({
    name: 'catalog_equipment_items',
    joinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_item_id', referencedColumnName: 'id' },
  })
  items?: CatalogEquipmentItem[];

  @Field(() => [CatalogEquipmentPacket], { nullable: true })
  @OneToMany(() => CatalogEquipmentPacket, packet => packet.equipment)
  packets?: CatalogEquipmentPacket[];

  @Field(() => [CatalogEquipmentPaidItem], { nullable: true })
  @OneToMany(() => CatalogEquipmentPaidItem, paidItem => paidItem.equipment)
  paidItems?: CatalogEquipmentPaidItem[];

  @Field(() => [CatalogEquipmentPacket], { nullable: true })
  @ManyToMany(() => CatalogEquipmentPacket, packet => packet.availableInEquipments)
  @JoinTable({
    name: 'catalog_equipment_available_packet',
    joinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_packet_id', referencedColumnName: 'id' },
  })
  availablePackets?: CatalogEquipmentPacket[];

  @Field(() => [CatalogEquipmentPacket], { nullable: true })
  @ManyToMany(() => CatalogEquipmentPacket, packet => packet.includedInEquipments)
  @JoinTable({
    name: 'catalog_equipment_included_packet',
    joinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_packet_id', referencedColumnName: 'id' },
  })
  includedPackets?: CatalogEquipmentPacket[];
}
