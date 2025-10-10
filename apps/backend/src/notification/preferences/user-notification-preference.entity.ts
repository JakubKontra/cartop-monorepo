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
  @Column({ unique: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column({ default: true })
  emailEnabled: boolean;

  @Field()
  @Column({ default: true })
  transactionalEmails: boolean; // Password reset, verification - critical emails

  @Field()
  @Column({ default: true })
  marketingEmails: boolean; // Newsletters, promotions

  @Field()
  @Column({ default: true })
  systemAlerts: boolean; // System notifications, updates

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  @Index()
  unsubscribeToken: string; // For one-click unsubscribe links

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
