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
import { OperationalLeasingOffer } from './offer.entity';
import { LeasingCompany } from '../leasing-company/leasing-company.entity';

/**
 * Leasing Offer Variant Entity
 * Represents different leasing configurations for the same vehicle
 * (different duration, mileage, company combinations)
 */
@ObjectType()
@Entity('offer_leasing_variants')
@Index(['offerId', 'isDefault'])
export class OfferLeasingVariant {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => OperationalLeasingOffer)
  @ManyToOne(() => OperationalLeasingOffer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offerId' })
  offer: OperationalLeasingOffer;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  offerId: string;

  // === Leasing parameters ===

  @Field(() => Int)
  @Column({ type: 'integer' })
  leasingDurationMonths: number; // 12, 24, 36, 48, 60

  @Field(() => Int)
  @Column({ type: 'integer' })
  annualMileageLimit: number; // 10000, 15000, 20000, atd.

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyPayment: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  downPayment?: number;

  // === Pricing ===

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number; // Total cost over the lease period

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  originalPrice?: number;

  // === Included services ===

  @Field()
  @Column({ type: 'boolean', default: false })
  hasServiceIncluded: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  hasWinterTyresIncluded: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  hasAssistanceServiceIncluded: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  hasGapIncluded: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  hasGlassInsuranceIncluded: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  hasHighwayIncluded: boolean;

  // === Other parameters ===

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: false })
  wearTolerance?: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  freeMileageLimit?: number;

  // === Flags ===

  @Field()
  @Column({ type: 'boolean', default: false })
  isDefault: boolean; // Mark one variant as default

  @Field()
  @Column({ type: 'boolean', default: false })
  isBestOffer: boolean; // Highlight as "top offer"

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  slug?: string;

  // === Leasing company ===

  @Field(() => LeasingCompany, { nullable: true })
  @ManyToOne(() => LeasingCompany, { nullable: true })
  @JoinColumn({ name: 'leasingCompanyId' })
  leasingCompany?: LeasingCompany;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  leasingCompanyId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
