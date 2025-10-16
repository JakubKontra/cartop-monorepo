import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CarRequestCalculation } from './car-request-calculation.entity';
import { CatalogColor } from '../../catalog/color/catalog-color.entity';
import { CarRequestCalculationItemType } from '../enums/car-request-calculation-item-type.enum';

/**
 * Car Request Calculation Item Entity
 * Represents a single configuration item (color, package, accessory, etc.)
 *
 * Design Features:
 * - Type discriminator for different item types
 * - Optional relations to catalog entities
 * - Price impact tracking
 * - Required/included flags
 * - Flexible metadata for extensibility
 */
@ObjectType()
@Entity('car_request_calculation_items')
@Index(['calculationId', 'displayOrder'])
@Index(['itemType', 'calculationId'])
export class CarRequestCalculationItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Relations ===

  @Field(() => CarRequestCalculation)
  @ManyToOne(() => CarRequestCalculation, (calculation) => calculation.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calculationId' })
  calculation: CarRequestCalculation;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  calculationId: string;

  // === Item Type ===

  @Field(() => CarRequestCalculationItemType)
  @Column({
    type: 'enum',
    enum: CarRequestCalculationItemType,
  })
  @Index()
  itemType: CarRequestCalculationItemType;

  // === Optional Catalog Relations ===

  @Field(() => CatalogColor, { nullable: true })
  @ManyToOne(() => CatalogColor, { nullable: true })
  @JoinColumn({ name: 'catalogColorId' })
  catalogColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  catalogColorId?: string;

  // Note: Additional catalog relations can be added as needed:
  // - catalogPackageId (when package entity exists)
  // - catalogAccessoryId (when accessory entity exists)

  // === Item Details ===

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceImpact?: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  isRequired: boolean;

  @Field()
  @Column({ type: 'boolean', default: true })
  isIncluded: boolean;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  // === Extensibility ===

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  // === Timestamps ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
