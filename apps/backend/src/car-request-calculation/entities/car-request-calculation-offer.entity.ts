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
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CarRequestCalculation } from './car-request-calculation.entity';
import { LeasingCompany } from '../../leasing-company/leasing-company.entity';
import { User } from '../../model/user/user.entity';
import { CarRequestCalculationOfferStatus } from '../enums/car-request-calculation-offer-status.enum';

/**
 * Car Request Calculation Offer Entity
 * Represents a quote from a specific leasing company for a calculation
 *
 * Design Features:
 * - Multiple offers per calculation (multi-leasing comparison)
 * - Comprehensive pricing breakdown
 * - Service package flags
 * - Quote validity tracking
 * - Flexible metadata for extensibility
 */
@ObjectType()
@Entity('car_request_calculation_offers')
@Index(['calculationId', 'leasingCompanyId'], { unique: true })
@Index(['status', 'createdAt'])
@Index(['leasingCompanyId', 'status'])
export class CarRequestCalculationOffer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Relations ===

  @Field(() => CarRequestCalculation)
  @ManyToOne(() => CarRequestCalculation, (calculation) => calculation.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calculationId' })
  calculation: CarRequestCalculation;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  calculationId: string;

  @Field(() => LeasingCompany)
  @ManyToOne(() => LeasingCompany, { nullable: false })
  @JoinColumn({ name: 'leasingCompanyId' })
  leasingCompany: LeasingCompany;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  leasingCompanyId: string;

  // === Status ===

  @Field(() => CarRequestCalculationOfferStatus)
  @Column({
    type: 'enum',
    enum: CarRequestCalculationOfferStatus,
    default: CarRequestCalculationOfferStatus.PENDING,
  })
  @Index()
  status: CarRequestCalculationOfferStatus;

  // === Pricing ===

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyPayment?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  downPayment?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  totalPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interestRate?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  adminFee?: number;

  // === Service Packages ===

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  includesService?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  includesWinterTires?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  includesGap?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  includesAssistance?: boolean;

  // === Additional Information ===

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  termsAndConditions?: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  validUntil?: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  // === Quote Author ===

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'quotedById' })
  quotedBy?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  quotedById?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  quotedAt?: Date;

  // === Extensibility ===

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  // === Timestamps ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
