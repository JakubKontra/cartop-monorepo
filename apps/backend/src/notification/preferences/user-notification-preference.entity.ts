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
import { User } from '../../model/user/user.entity';

/**
 * User Notification Preferences
 * Manages user's email and notification opt-in/opt-out preferences
 */
@ObjectType()
@Entity('user_notification_preferences')
export class UserNotificationPreference {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'uuid', unique: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column({ type: 'boolean', default: true })
  emailEnabled: boolean;

  @Field()
  @Column({ type: 'boolean', default: true })
  transactionalEmails: boolean; // Password reset, verification - critical emails

  @Field()
  @Column({ type: 'boolean', default: true })
  marketingEmails: boolean; // Newsletters, promotions

  @Field()
  @Column({ type: 'boolean', default: true })
  systemAlerts: boolean; // System notifications, updates

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  @Index()
  unsubscribeToken: string; // For one-click unsubscribe links

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
