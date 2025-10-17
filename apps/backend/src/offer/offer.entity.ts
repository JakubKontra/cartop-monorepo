import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  TableInheritance,
  ChildEntity,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Auditable } from '../common/decorators/auditable.decorator';
import { CatalogModelGeneration } from '../catalog/generation/catalog-model-generation.entity';
import { CatalogBrand } from '../catalog/brand/catalog-brand.entity';
import { CatalogModel } from '../catalog/model/catalog-model.entity';
import { CatalogEngine } from '../catalog/engine/catalog-engine.entity';
import { File } from '../file/file.entity';
import { User } from '../model/user/user.entity';
import { OfferType } from './enums/offer-type.enum';
import { IndividualOfferStatus } from './enums/individual-offer-status.enum';

/**
 * Base Offer Entity - Single Table Inheritance
 * Represents all types of vehicle offers (leasing, purchase, individual)
 */
@ObjectType()
@Entity('offers')
@TableInheritance({ column: { type: 'enum', name: 'type', enum: OfferType } })
@Index(['type', 'isPublic', 'isActive'])
@Index(['modelGenerationId', 'isActive'])
@Index(['brandId', 'isActive'])
@Index(['engineId', 'isActive'])
@Index(['isPromoted', 'isActive'])
@Auditable()
export abstract class Offer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => OfferType)
  @Column({ type: 'enum', enum: OfferType })
  @Index()
  type: OfferType;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  @Index()
  legacySystemId?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  @Index()
  publicId?: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isPrivate: boolean;

  // === Common fields for all offer types ===

  @Field()
  @Column({ type: 'boolean', default: true })
  @Index()
  isPublic: boolean;

  @Field()
  @Column({ type: 'boolean', default: true })
  @Index()
  isActive: boolean;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  slug?: string;

  // === Relations ===

  @Field(() => CatalogModelGeneration)
  @ManyToOne(() => CatalogModelGeneration, { nullable: false })
  @JoinColumn({ name: 'modelGenerationId' })
  modelGeneration: CatalogModelGeneration;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  modelGenerationId: string;

  @Field(() => CatalogBrand, { nullable: true })
  @ManyToOne(() => CatalogBrand, { nullable: true })
  @JoinColumn({ name: 'brandId' })
  brand?: CatalogBrand;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  brandId?: string;

  @Field(() => CatalogModel, { nullable: true })
  @ManyToOne(() => CatalogModel, { nullable: true })
  @JoinColumn({ name: 'modelId' })
  model?: CatalogModel;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  modelId?: string;

  @Field(() => CatalogEngine, { nullable: true })
  @ManyToOne(() => CatalogEngine, { nullable: true })
  @JoinColumn({ name: 'engineId' })
  engine?: CatalogEngine;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  engineId?: string;

  @Field(() => File, { nullable: true })
  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'fileId' })
  file?: File;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  fileId?: string;

  // === Flags ===

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isRecommendedForBrand: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isRecommendedForActionPage: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isRecommendedForModel: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isPromoted: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true, default: false })
  disableCustomGallery?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  note?: string;

  // === Operational Leasing specific fields (nullable) ===

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  leasingDurationMonths?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyPayment?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  annualMileageLimit?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  downPaymentLeasing?: number;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  hasServiceIncluded?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  hasWinterTyresIncluded?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  hasAssistanceServiceIncluded?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  hasGapIncluded?: boolean;

  // === Direct Purchase specific fields (nullable) ===

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountAmount?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage?: number;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  includesWarranty?: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  warrantyYears?: number;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  financingAvailable?: boolean;

  // === Individual Offer specific fields (nullable) ===

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  customerId?: string;

  @Field(() => IndividualOfferStatus, { nullable: true })
  @Column({ type: 'enum', enum: IndividualOfferStatus, nullable: true })
  @Index()
  status?: IndividualOfferStatus;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  customRequirements?: string; // JSON string in GraphQL

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  internalNotes?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  assignedToId?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  responseDeadline?: Date;

  // === Timestamps ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // === Related entities (lazy loaded, not in base query) ===
  // These will be imported only when needed to avoid circular dependencies
  // Import statements will be added in respective child entities
}

/**
 * Operational Leasing Offer - Child Entity
 */
@ObjectType()
@ChildEntity(OfferType.OPERATIONAL_LEASING)
export class OperationalLeasingOffer extends Offer {
  // TypeScript ensures these fields are not undefined
  declare leasingDurationMonths: number;
  declare monthlyPayment: number;
  declare annualMileageLimit: number;

  // === Related collections ===
  // These will be lazy loaded via field resolvers
  @Field(() => [Object], { nullable: true })
  variants?: any[]; // Type defined in field resolver to avoid circular dependency

  @Field(() => [Object], { nullable: true })
  colorVariants?: any[];

  @Field(() => [Object], { nullable: true })
  optionalEquipment?: any[];
}

/**
 * Direct Purchase Offer - Child Entity
 */
@ObjectType()
@ChildEntity(OfferType.DIRECT_PURCHASE)
export class DirectPurchaseOffer extends Offer {
  // Optional fields specific to direct purchase
  declare discountAmount?: number;
  declare discountPercentage?: number;
  declare includesWarranty?: boolean;
  declare warrantyYears?: number;
  declare financingAvailable?: boolean;
}

/**
 * Individual (Custom) Offer - Child Entity
 * Admin-only, not visible to public
 */
@ObjectType()
@ChildEntity(OfferType.INDIVIDUAL)
export class IndividualOffer extends Offer {
  // Override isPublic to always be false
  isPublic = false;

  // TypeScript ensures these fields are present
  declare customer: User;
  declare customerId: string;
  declare status: IndividualOfferStatus;

  // === Related collections ===
  // These will be lazy loaded via field resolvers
  @Field(() => [Object], { nullable: true })
  calculations?: any[]; // Type defined in field resolver to avoid circular dependency
}
