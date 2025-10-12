import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OperationalLeasingOffer } from './offer.entity';

/**
 * Offer Optional Equipment Entity
 * Represents additional equipment that can be added to an offer
 * (e.g., tow bar, independent heating, etc.)
 */
@ObjectType()
@Entity('offer_optional_equipment')
@Index(['offerId', 'name'])
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
  @Index()
  offerId: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string; // e.g., "Tow Bar", "Independent Heating"

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  additionalPrice: number; // Extra cost for this option

  @Field()
  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
