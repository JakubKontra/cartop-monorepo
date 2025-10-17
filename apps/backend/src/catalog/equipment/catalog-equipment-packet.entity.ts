import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';

/**
 * CatalogEquipmentPacket Entity
 * Represents pricing packets/variants for equipment configurations
 * (e.g., "Standard Package - $1000", "Premium Package - $1500")
 */
@ObjectType()
@Entity('catalog_equipment_packet')
@Auditable()
export class CatalogEquipmentPacket {
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

  @Field(() => Int, { description: 'Price in cents' })
  @Column({ type: 'integer' })
  price: number;

  @Field(() => CatalogEquipment, { nullable: true })
  @ManyToOne(() => CatalogEquipment, equipment => equipment.packets, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'equipmentId' })
  equipment?: CatalogEquipment;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  equipmentId?: string;

  @Field(() => [CatalogEquipmentItem], { nullable: true })
  @ManyToMany(() => CatalogEquipmentItem, item => item.packets)
  @JoinTable({
    name: 'catalog_equipment_packet_items',
    joinColumn: { name: 'equipment_packet_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_item_id', referencedColumnName: 'id' },
  })
  items?: CatalogEquipmentItem[];

  @Field(() => [CatalogEquipment], { nullable: true })
  @ManyToMany(() => CatalogEquipment, equipment => equipment.availablePackets)
  availableInEquipments?: CatalogEquipment[];

  @Field(() => [CatalogEquipment], { nullable: true })
  @ManyToMany(() => CatalogEquipment, equipment => equipment.includedPackets)
  includedInEquipments?: CatalogEquipment[];
}
