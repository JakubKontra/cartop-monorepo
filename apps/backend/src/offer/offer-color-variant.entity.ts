import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OperationalLeasingOffer } from './offer.entity';
import { CatalogColor } from '../catalog/color/catalog-color.entity';

/**
 * Offer Color Variant Entity
 * Represents different color combinations for an operational leasing offer
 */
@ObjectType()
@Entity('offer_color_variants')
export class OfferColorVariant {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => OperationalLeasingOffer)
  @ManyToOne(() => OperationalLeasingOffer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offerId' })
  offer: OperationalLeasingOffer;

  @Field()
  @Column({ type: 'uuid' })
  offerId: string;

  // === Color selections ===

  @Field(() => CatalogColor)
  @ManyToOne(() => CatalogColor, { nullable: false })
  @JoinColumn({ name: 'exteriorColorId' })
  exteriorColor: CatalogColor;

  @Field()
  @Column({ type: 'uuid' })
  exteriorColorId: string;

  @Field(() => CatalogColor)
  @ManyToOne(() => CatalogColor, { nullable: false })
  @JoinColumn({ name: 'interiorColorId' })
  interiorColor: CatalogColor;

  @Field()
  @Column({ type: 'uuid' })
  interiorColorId: string;

  // === Display ===

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  colorName?: string; // e.g., "Metallic Blue + Black Leather"

  @Field()
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  // === Gallery (optional) ===
  // You can add @ManyToOne(() => Gallery) if you have that entity

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  galleryId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
