import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OperationalLeasingOffer } from './offer.entity';
import { CatalogColor } from '../catalog/color/catalog-color.entity';
// import { Gallery } from '../gallery/gallery.entity'; // TODO: Add Gallery entity when implemented

/**
 * Offer Color Variant Entity
 * Represents different color combinations for an operational leasing offer
 */
@ObjectType()
@Entity('offer_color_variants')
@Index(['offerId', 'exteriorColorId', 'interiorColorId'], { unique: true })
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

  @Field(() => CatalogColor, { nullable: true })
  @ManyToOne(() => CatalogColor, { nullable: true })
  @JoinColumn({ name: 'interiorColorId' })
  interiorColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  interiorColorId?: string;

  // === Display ===

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  colorName?: string; // Custom name e.g., "Metallic Blue + Black Leather"

  @Field()
  @Column({ type: 'boolean', default: false })
  isDefault: boolean; // Mark one color variant as default per offer

  // === Gallery ===

  // @Field(() => Gallery, { nullable: true })
  // @ManyToOne(() => Gallery, { nullable: true, onDelete: 'SET NULL' })
  // @JoinColumn({ name: 'galleryId' })
  // gallery?: Gallery;

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
