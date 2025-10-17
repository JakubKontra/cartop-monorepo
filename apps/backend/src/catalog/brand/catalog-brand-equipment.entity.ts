import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { Watch } from '../../common/decorators/watch/watch.decorator';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';
import { CatalogBrandEquipmentAssignedItem } from './catalog-brand-equipment-assigned-item.entity';

@ObjectType()
@Entity('catalog_brand_equipments')
@Auditable()
@Watch({
  name: 'cache_catalog_brand_equipment_watch',
  watch: ['name', 'description'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'brandId'],
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
export class CatalogBrandEquipment {
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

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  // === Brand Relationship ===

  @Field(() => CatalogBrand)
  @ManyToOne(() => CatalogBrand, (brand) => brand.equipments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CatalogBrand;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  brandId: string;

  // === Items (Many-to-Many) ===

  @Field(() => [CatalogBrandEquipmentItem], { nullable: true })
  @ManyToMany(() => CatalogBrandEquipmentItem, (item) => item.equipments)
  @JoinTable({
    name: 'catalog_brand_equipment_assigned_items',
    joinColumn: { name: 'equipmentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'itemId', referencedColumnName: 'id' },
  })
  assignedItems?: CatalogBrandEquipmentItem[];

  // OneToMany relation to the junction table (for direct access if needed)
  @OneToMany(
    () => CatalogBrandEquipmentAssignedItem,
    (assignedItem) => assignedItem.equipment,
  )
  assignedItemsRelation?: CatalogBrandEquipmentAssignedItem[];
}
