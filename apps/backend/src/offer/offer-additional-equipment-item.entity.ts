import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * Offer Additional Equipment Item Entity
 * Catalog of equipment items that can be added to offers
 * (e.g., Tow Bar, Independent Heating, etc.)
 */
@ObjectType()
@Entity('offer_additional_equipment_items')
export class OfferAdditionalEquipmentItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string; // e.g., "Tow Bar", "Independent Heating"

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string; // e.g., "Towing", "Comfort", "Safety"

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
