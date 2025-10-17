import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  // Index, // TODO: Re-enable after database cleanup
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OperationalLeasingOffer } from './offer.entity';
import { OfferAdditionalEquipmentItem } from './offer-additional-equipment-item.entity';
import { PricePeriod } from './enums/price-period.enum';

/**
 * Offer Optional Equipment Entity
 * Pivot table connecting offers to equipment items with pricing per offer
 */
@ObjectType()
@Entity('offer_optional_equipment')
// @Index(['offerId', 'equipmentItemId'], { unique: true }) // TODO: Re-enable after database cleanup
export class OfferOptionalEquipment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => OperationalLeasingOffer)
  @ManyToOne(() => OperationalLeasingOffer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offerId' })
  offer: OperationalLeasingOffer;

  @Field()
  @Column({ type: 'uuid' })
  // @Index() // TODO: Re-enable after database cleanup
  offerId: string;

  @Field(() => OfferAdditionalEquipmentItem, { nullable: true })
  @ManyToOne(() => OfferAdditionalEquipmentItem, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'equipmentItemId' })
  equipmentItem?: OfferAdditionalEquipmentItem;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  // @Index() // TODO: Re-enable after database cleanup
  equipmentItemId?: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  additionalPrice?: number; // Extra cost for this option on this offer

  @Field()
  @Column({ type: 'char', length: 3, default: 'CZK' })
  currency: string;

  @Field(() => PricePeriod)
  @Column({ type: 'enum', enum: PricePeriod, default: PricePeriod.MONTHLY })
  pricePeriod: PricePeriod;

  @Field()
  @Column({ type: 'boolean', default: false })
  isDefaultSelected: boolean; // Pre-selected by default

  @Field()
  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
