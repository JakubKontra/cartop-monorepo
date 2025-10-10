import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

/**
 * Notification Log
 * Audit trail for all sent notifications with advanced tracking
 */
@ObjectType()
@Entity('notification_logs')
@Index(['recipient', 'sentAt'])
@Index(['provider', 'success'])
@Index(['template', 'sentAt'])
export class NotificationLog {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index()
  recipient: string; // Email address

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  userId?: string; // User ID if known

  @Field()
  @Column()
  template: string; // Template name (e.g., 'password-reset')

  @Field()
  @Column()
  provider: string; // 'mailgun' | 'ses'

  @Field()
  @Column()
  success: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  messageId?: string; // Provider's message ID

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  error?: string; // Error message if failed

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  openCount: number; // Number of times email was opened

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  clickCount: number; // Number of link clicks

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  firstOpenedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  firstClickedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional tracking data

  @Field()
  @Column({ type: 'timestamp with time zone' })
  @Index()
  sentAt: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
