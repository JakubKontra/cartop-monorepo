import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CarRequest } from '../../car-request/entities/car-request.entity';
import { User } from '../../model/user/user.entity';
import { CarRequestCalculationStatus } from '../enums/car-request-calculation-status.enum';
import { CarRequestCalculationOffer } from './car-request-calculation-offer.entity';
import { CarRequestCalculationItem } from './car-request-calculation-item.entity';

/**
 * Car Request Calculation Entity
 * Represents a calculation request for vehicle pricing and configuration
 *
 * Design Features:
 * - Supports multiple calculations per car request
 * - Version tracking for iterative calculations
 * - Flexible metadata storage for extensibility
 * - Full audit trail
 * - Status-based workflow
 */
@ObjectType()
@Entity('car_request_calculations')
@Index(['carRequestId', 'createdAt'])
@Index(['status', 'createdAt'])
@Index(['assignedToId', 'status'])
@Auditable()
export class CarRequestCalculation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Relations ===

  @Field(() => CarRequest)
  @ManyToOne(() => CarRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carRequestId' })
  carRequest: CarRequest;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  carRequestId: string;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'requestedById' })
  requestedBy: User;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  requestedById: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  assignedToId?: string;

  // === Version and Status ===

  @Field(() => Int)
  @Column({ type: 'integer', default: 1 })
  version: number;

  @Field(() => CarRequestCalculationStatus)
  @Column({
    type: 'enum',
    enum: CarRequestCalculationStatus,
    default: CarRequestCalculationStatus.DRAFT,
  })
  @Index()
  status: CarRequestCalculationStatus;

  // === Calculation Parameters ===

  @Field(() => Int)
  @Column({ type: 'integer' })
  durationMonths: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  annualMileageKm: number;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deliveryExpectedAt?: Date;

  // === Notes ===

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  internalNotes?: string;

  // === Extensibility ===

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  // === Related Collections ===

  @Field(() => [CarRequestCalculationOffer])
  @OneToMany(() => CarRequestCalculationOffer, (offer) => offer.calculation)
  offers: CarRequestCalculationOffer[];

  @Field(() => [CarRequestCalculationItem])
  @OneToMany(() => CarRequestCalculationItem, (item) => item.calculation)
  items: CarRequestCalculationItem[];

  // === Timestamps ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  submittedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  completedAt?: Date;
}
