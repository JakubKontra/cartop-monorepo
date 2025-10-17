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
import { PricePeriod } from './enums/price-period.enum';

/**
 * Leasing Offer Variant Entity
 * Represents different leasing configurations for the same vehicle
 * (different duration, mileage, company combinations)
 */
@ObjectType()
@Entity('offer_leasing_variants')
@Index(['offerId', 'isDefault'])
@Index(['offerId', 'slug'], { unique: true })
@Index(['annualMileageLimit'])
@Index(['leasingDurationMonths'])
@Index(['priceWithVat'])
@Index(['leasingCompanyId'])
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
  @Column({ type: 'integer', default: 10000 })
  @Index()
  annualMileageLimit: number; // 10000, 15000, 20000, etc.

  @Field(() => Int)
  @Column({ type: 'integer', default: 24 })
  @Index()
  leasingDurationMonths: number; // 12, 24, 36, 48, 60 months

  // === Pricing ===

  @Field()
  @Column({ type: 'char', length: 3, default: 'CZK' })
  currency: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 21.0 })
  vatRate: number; // VAT rate in percentage

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  @Index()
  priceWithoutVat?: number; // Monthly price without VAT

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  @Index()
  priceWithVat?: number; // Monthly price with VAT

  @Field(() => PricePeriod)
  @Column({ type: 'enum', enum: PricePeriod, default: PricePeriod.MONTHLY })
  pricePeriod: PricePeriod;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  originalPriceWithoutVat?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  originalPriceWithVat?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  downPayment?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  securityDeposit?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  setupFee?: number;

  // === Validity period ===

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  validFrom?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  validTo?: Date;

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

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  wearTolerancePercent?: number; // Tolerance in percentage

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true, default: 0 })
  freeMileageLimit?: number; // Free mileage buffer in km

  // === Flags ===

  @Field()
  @Column({ type: 'boolean', default: true })
  @Index()
  isActive: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  isDefault: boolean; // Mark one variant as default per offer

  @Field()
  @Column({ type: 'boolean', default: false })
  isBestOffer: boolean; // Highlight as "top offer" per offer

  @Field()
  @Column({ type: 'varchar', length: 255 })
  slug: string;

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
