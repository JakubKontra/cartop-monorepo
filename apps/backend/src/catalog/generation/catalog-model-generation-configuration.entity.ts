import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogEquipment } from '../equipment/catalog-equipment.entity';
import { CatalogEngine } from '../engine/catalog-engine.entity';

/**
 * CatalogModelGenerationConfiguration Entity
 * Represents a configuration that combines generation, equipment, and engine with pricing
 * This is a key entity for vehicle pricing and configuration
 */
@ObjectType()
@Entity('catalog_model_generation_configurations')
@Auditable()
export class CatalogModelGenerationConfiguration {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field(() => Float, { description: 'Price from (base price)' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceFrom: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  active: boolean;

  @Field(() => CatalogModelGeneration)
  @ManyToOne(() => CatalogModelGeneration, generation => generation.configurations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'generationId' })
  generation: CatalogModelGeneration;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  generationId: string;

  @Field(() => CatalogEquipment, { nullable: true })
  @ManyToOne(() => CatalogEquipment, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'equipmentId' })
  equipment?: CatalogEquipment;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  equipmentId?: string;

  @Field(() => CatalogEngine, { nullable: true })
  @ManyToOne(() => CatalogEngine, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'engineId' })
  engine?: CatalogEngine;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  engineId?: string;
}
