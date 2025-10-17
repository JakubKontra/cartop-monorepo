import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogModel } from '../model/catalog-model.entity';
import { CatalogBrand } from '../brand/catalog-brand.entity';
import { CatalogBodyType } from '../../common/enums/catalog/catalog-body-type.enum';
import { CatalogEquipmentBrakeType } from '../../common/enums/catalog/catalog-equipment-brake-type.enum';
import { CatalogEngine } from '../engine/catalog-engine.entity';
import { CatalogModelGenerationColor } from './catalog-model-generation-color.entity';
import { CatalogModelGenerationConfiguration } from './catalog-model-generation-configuration.entity';
import { CatalogModelGenerationImage } from './catalog-model-generation-image.entity';

/**
 * CatalogModelGeneration Entity
 * Represents a specific generation of a vehicle model
 */
@ObjectType()
@Entity('catalog_model_generations')
@Auditable()
export class CatalogModelGeneration {
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

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  slug?: string | null;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  legacySlug?: string | null;

  @Field(() => CatalogModel)
  @ManyToOne(() => CatalogModel, model => model.generations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'modelId' })
  model: CatalogModel;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  modelId: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  productionStart?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  productionStop?: Date;

  @Field(() => Int, { nullable: true, description: 'Wheelbase in mm' })
  @Column({ type: 'integer', nullable: true })
  wheelbase?: number;

  @Field(() => Int, { nullable: true, description: 'Front track in mm' })
  @Column({ type: 'integer', nullable: true })
  frontTrack?: number;

  @Field(() => Int, { nullable: true, description: 'Rear track in mm' })
  @Column({ type: 'integer', nullable: true })
  rearTrack?: number;

  @Field(() => Int, { nullable: true, description: 'Length in mm' })
  @Column({ type: 'integer', nullable: true })
  length?: number;

  @Field(() => Int, { nullable: true, description: 'Width in mm' })
  @Column({ type: 'integer', nullable: true })
  width?: number;

  @Field(() => Int, { nullable: true, description: 'Height in mm' })
  @Column({ type: 'integer', nullable: true })
  height?: number;

  @Field(() => Int, { nullable: true, description: 'Minimum trunk space in liters' })
  @Column({ type: 'integer', nullable: true })
  trunkSpaceMin?: number;

  @Field(() => Int, { nullable: true, description: 'Maximum trunk space in liters' })
  @Column({ type: 'integer', nullable: true })
  trunkSpaceMax?: number;

  @Field(() => CatalogBrand, { nullable: true })
  @ManyToOne(() => CatalogBrand, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'brandId' })
  brand?: CatalogBrand;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  brandId?: string;

  @Field(() => CatalogBodyType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogBodyType,
    nullable: true,
  })
  bodyType?: CatalogBodyType;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isActive: boolean;

  @Field(() => CatalogEquipmentBrakeType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogEquipmentBrakeType,
    nullable: true,
  })
  frontBrakesType?: CatalogEquipmentBrakeType;

  @Field(() => CatalogEquipmentBrakeType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogEquipmentBrakeType,
    nullable: true,
  })
  rearBrakesType?: CatalogEquipmentBrakeType;

  @Field(() => [CatalogEngine], { nullable: true })
  @OneToMany(() => CatalogEngine, engine => engine.generation)
  engines?: CatalogEngine[];

  @Field(() => [CatalogModelGenerationColor], { nullable: true })
  @OneToMany(() => CatalogModelGenerationColor, color => color.generation)
  colors?: CatalogModelGenerationColor[];

  @Field(() => [CatalogModelGenerationConfiguration], { nullable: true })
  @OneToMany(() => CatalogModelGenerationConfiguration, configuration => configuration.generation)
  configurations?: CatalogModelGenerationConfiguration[];

  @Field(() => [CatalogModelGenerationImage], { nullable: true })
  @OneToMany(() => CatalogModelGenerationImage, image => image.generation)
  images?: CatalogModelGenerationImage[];
}
