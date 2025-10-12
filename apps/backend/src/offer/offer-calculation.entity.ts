import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IndividualOffer } from './offer.entity';
import { CatalogColor } from '../catalog/color/catalog-color.entity';

export enum OfferCalculationAvailability {
  IN_STOCK = 'in_stock',
  NOT_AVAILABLE = 'not_available',
  ON_ORDER = 'on_order',
}

registerEnumType(OfferCalculationAvailability, {
  name: 'OfferCalculationAvailability',
  description: 'Availability status for offer calculation',
});

/**
 * Offer Calculation Entity
 * Represents a custom calculation for an individual offer
 */
@ObjectType()
@Entity('offer_calculations')
@Index(['offerId', 'createdAt'])
export class OfferCalculation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => IndividualOffer)
  @ManyToOne(() => IndividualOffer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offerId' })
  offer: IndividualOffer;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  offerId: string;

  @Field(() => OfferCalculationAvailability)
  @Column({
    type: 'enum',
    enum: OfferCalculationAvailability,
    default: OfferCalculationAvailability.IN_STOCK,
  })
  availability: OfferCalculationAvailability;

  // === Colors ===

  @Field(() => CatalogColor, { nullable: true })
  @ManyToOne(() => CatalogColor, { nullable: true })
  @JoinColumn({ name: 'exteriorColorId' })
  exteriorColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  exteriorColorId?: string;

  @Field(() => CatalogColor, { nullable: true })
  @ManyToOne(() => CatalogColor, { nullable: true })
  @JoinColumn({ name: 'interiorColorId' })
  interiorColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  interiorColorId?: string;

  // === Custom features ===

  @Field(() => [OfferCalculationFeature])
  @OneToMany(() => OfferCalculationFeature, feature => feature.calculation)
  features: OfferCalculationFeature[];

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}

/**
 * Offer Calculation Feature Entity
 * Individual features/equipment items for a calculation
 */
@ObjectType()
@Entity('offer_calculation_features')
export class OfferCalculationFeature {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => OfferCalculation)
  @ManyToOne(() => OfferCalculation, calculation => calculation.features, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calculationId' })
  calculation: OfferCalculation;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  calculationId: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  featureName: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  featureDescription?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
