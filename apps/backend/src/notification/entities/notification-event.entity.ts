import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationLog } from './notification-log.entity';

export enum NotificationEventType {
  SENT = 'sent',
  DELIVERED = 'delivered',
  OPENED = 'opened',
  CLICKED = 'clicked',
  BOUNCED = 'bounced',
  COMPLAINED = 'complained', // Spam complaint
  UNSUBSCRIBED = 'unsubscribed',
}

/**
 * Notification Event
 * Tracks individual events (opens, clicks, bounces) for notifications
 * Used for detailed analytics and tracking
 */
@ObjectType()
@Entity('notification_events')
@Index(['notificationLogId', 'eventType'])
@Index(['eventType', 'createdAt'])
export class NotificationEvent {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  @Index()
  notificationLogId: string;

  @ManyToOne(() => NotificationLog, { eager: false })
  @JoinColumn({ name: 'notificationLogId' })
  notificationLog: NotificationLog;

  @Field()
  @Column({
    type: 'enum',
    enum: NotificationEventType,
  })
  eventType: NotificationEventType;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  url?: string; // URL clicked (for CLICKED events)

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  userAgent?: string; // Browser/client info

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress?: string; // IP address of the event

  @Field({ nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional event data from provider

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Index()
  createdAt: Date;
}
