import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { Watch } from '../../common/decorators/watch/watch.decorator';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';

@ObjectType()
@Entity('catalog_brand_equipment_items')
@Auditable()
@Watch({
  name: 'cache_catalog_brand_equipment_item_watch',
  watch: ['name'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id'],
  headers: {
    Authorization: `Bearer ${process.env.CACHE_INVALIDATION_SECRET || 'dev-secret-change-in-production'}`,
  },
  debounce: {
    delay: 1000,
    maxWait: 5000,
  },
  retry: {
    attempts: 3,
    delay: 2000,
    backoff: 'exponential',
  },
})
export class CatalogBrandEquipmentItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  // === Many-to-Many Relationship with Equipment ===
  // This is managed through the CatalogBrandEquipmentAssignedItem junction table

  @Field(() => [CatalogBrandEquipment], { nullable: true })
  @ManyToMany(() => CatalogBrandEquipment, (equipment) => equipment.assignedItems)
  equipments?: CatalogBrandEquipment[];
}
