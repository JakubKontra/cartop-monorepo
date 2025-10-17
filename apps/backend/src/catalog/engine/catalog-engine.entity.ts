import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { Watch } from '../../common/decorators/watch/watch.decorator';
import { CatalogModelGeneration } from '../generation/catalog-model-generation.entity';
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from '../../common/enums/catalog';

@ObjectType()
@Entity('catalog_engines')
@Auditable()
@Watch({
  name: 'cache_catalog_engine_watch',
  watch: ['name', 'active', 'recommended'],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'generationId'],
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
export class CatalogEngine {
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
  name: string;

  // === Relationships ===

  @Field(() => CatalogModelGeneration)
  @ManyToOne(() => CatalogModelGeneration, generation => generation.engines, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'generationId' })
  generation: CatalogModelGeneration;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  generationId: string;

  // === Engine Type Properties ===

  @Field(() => CatalogEngineFuelType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogEngineFuelType,
    nullable: true,
  })
  fuelType?: CatalogEngineFuelType;

  @Field(() => CatalogEngineTransmissionType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogEngineTransmissionType,
    nullable: true,
  })
  transmissionType?: CatalogEngineTransmissionType;

  @Field(() => CatalogEngineDriveType, { nullable: true })
  @Column({
    type: 'enum',
    enum: CatalogEngineDriveType,
    nullable: true,
  })
  driveType?: CatalogEngineDriveType;

  // === Consumption (l/100km or kWh/100km for electric) ===

  @Field(() => Float, { nullable: true, description: 'Combined fuel consumption (l/100km)' })
  @Column({ type: 'float', nullable: true })
  consumptionCombined?: number;

  @Field(() => Float, { nullable: true, description: 'City fuel consumption (l/100km)' })
  @Column({ type: 'float', nullable: true })
  consumptionCity?: number;

  @Field(() => Float, { nullable: true, description: 'Highway fuel consumption (l/100km)' })
  @Column({ type: 'float', nullable: true })
  consumptionOutOfCity?: number;

  // === Performance ===

  @Field(() => Int, { nullable: true, description: 'Power in kW' })
  @Column({ type: 'integer', nullable: true })
  performance?: number;

  @Field(() => Int, { nullable: true, description: 'Torque in Nm' })
  @Column({ type: 'integer', nullable: true })
  torque?: number;

  @Field(() => Int, { nullable: true, description: 'Engine volume in cm³' })
  @Column({ type: 'integer', nullable: true })
  volume?: number;

  @Field(() => Int, { nullable: true, description: 'CO2 emissions in g/km' })
  @Column({ type: 'integer', nullable: true })
  emission?: number;

  @Field(() => Int, { nullable: true, description: 'Range in km (for electric vehicles)' })
  @Column({ type: 'integer', nullable: true })
  rangeKm?: number;

  @Field(() => Float, { nullable: true, description: 'Acceleration 0-100 km/h in seconds' })
  @Column({ type: 'float', nullable: true })
  acceleration?: number;

  @Field(() => Int, { nullable: true, description: 'Fuel tank volume in liters' })
  @Column({ type: 'integer', nullable: true })
  fuelTankVolume?: number;

  @Field(() => Int, { nullable: true, description: 'Number of cylinders' })
  @Column({ type: 'integer', nullable: true })
  cylinderCount?: number;

  @Field(() => Int, { nullable: true, description: 'Maximum speed in km/h' })
  @Column({ type: 'integer', nullable: true })
  maxSpeed?: number;

  @Field(() => Int, { nullable: true, description: 'Weight in kg' })
  @Column({ type: 'integer', nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true, description: 'Number of gears' })
  @Column({ type: 'integer', nullable: true })
  gearsCount?: number;

  // === Production Period ===

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  productionStart?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  productionStop?: Date;

  // === Flags ===

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index('K_CatalogEngine_Active')
  active: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  recommended: boolean;
}
