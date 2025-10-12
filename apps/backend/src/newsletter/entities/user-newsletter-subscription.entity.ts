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
import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { User } from '../../model/user/user.entity';
import { CatalogBrand } from '../../catalog/brand/catalog-brand.entity';
import { CatalogModel } from '../../catalog/model/catalog-model.entity';
import { CatalogBodyType } from '../../common/enums/catalog/catalog-body-type.enum';
import {
  SubscriptionSource,
  SubscriptionStatus,
} from '../enums/subscription-source.enum';

/**
 * Subscription Preferences Interface
 * Complex filter preferences for newsletter subscriptions
 */
export interface SubscriptionPreferences {
  brands?: string[]; // Array of brand UUIDs
  models?: string[]; // Array of model UUIDs
  bodyTypes?: CatalogBodyType[]; // Array of body type enums
  priceRange?: {
    min?: number;
    max?: number;
  };
  frequency?: 'daily' | 'weekly' | 'monthly';
}

/**
 * User Newsletter Subscription Entity
 * Tracks newsletter subscriptions with optional user association and filter preferences
 * Syncs with Ecomail for marketing campaigns
 */
@ObjectType()
@Entity('user_newsletter_subscription')
export class UserNewsletterSubscription {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // === User Association (Optional for anonymous subscriptions) ===

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Field({ nullable: true })
  @Column({ name: 'user_id', type: 'int', nullable: true })
  @Index('IDX_11FAFCFCA76ED395')
  userId?: number;

  // === Email (Required) ===

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index('idx_email')
  email: string;

  // === Status and Source ===

  @Field(() => SubscriptionStatus)
  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  @Index('idx_status')
  status: SubscriptionStatus;

  @Field(() => SubscriptionSource)
  @Column({
    type: 'enum',
    enum: SubscriptionSource,
    default: SubscriptionSource.WEB,
  })
  @Index('idx_source')
  source: SubscriptionSource;

  // === Legacy Filter Fields (Single selections) ===
  // Kept for backward compatibility with existing table structure

  @Field(() => CatalogBrand, { nullable: true })
  @ManyToOne(() => CatalogBrand, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brand_id' })
  brand?: CatalogBrand;

  @Field({ nullable: true })
  @Column({ name: 'brand_id', type: 'int', nullable: true })
  @Index('IDX_11FAFCFC44F5D008')
  brandId?: number;

  @Field(() => CatalogModel, { nullable: true })
  @ManyToOne(() => CatalogModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'model_id' })
  model?: CatalogModel;

  @Field({ nullable: true })
  @Column({ name: 'model_id', type: 'int', nullable: true })
  @Index('IDX_11FAFCFC7975B7E7')
  modelId?: number;

  @Field(() => CatalogBodyType, { nullable: true })
  @Column({
    name: 'body_type_id',
    type: 'enum',
    enum: CatalogBodyType,
    nullable: true,
  })
  @Index('IDX_11FAFCFC2CBA3505')
  bodyTypeId?: CatalogBodyType;

  // === Extended Preferences (JSON) ===
  // For multiple selections and complex filters

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'json', nullable: true })
  preferences?: SubscriptionPreferences;

  // === Ecomail Integration ===

  @Field({ nullable: true })
  @Column({ name: 'ecomail_subscriber_id', type: 'varchar', length: 255, nullable: true })
  ecomailSubscriberId?: string;

  @Field({ nullable: true })
  @Column({ name: 'ecomail_list_id', type: 'varchar', length: 255, nullable: true })
  ecomailListId?: string;

  // === Email Verification ===

  @Field({ nullable: true })
  @Column({ name: 'verification_token', type: 'varchar', length: 255, nullable: true })
  verificationToken?: string;

  @Field({ nullable: true })
  @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  // === Timestamps ===

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
