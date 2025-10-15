import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CarRequest } from './car-request.entity';
import { User } from '../../model/user/user.entity';
import { CarRequestLogAction } from '../enums/car-request-log-action.enum';

/**
 * Car Request Log Entity
 *
 * Tracks all actions and changes made to a car request for full audit trail.
 *
 * Design Features:
 * - JSONB metadata for flexible, action-specific data storage
 * - Indexed for efficient timeline queries
 * - Cascade delete with parent CarRequest
 * - Nullable author for system-generated logs
 * - Legacy system integration support
 */
@ObjectType()
@Entity('car_request_logs')
@Index(['carRequestId', 'createdAt']) // For timeline queries
@Index(['actionType', 'createdAt'])    // For filtering by action type
@Index(['authorId', 'createdAt'])      // For user activity queries
export class CarRequestLog {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Index()
  createdAt: Date;

  @Field()
  @Column({ type: 'text' })
  message: string;

  @Field(() => CarRequestLogAction)
  @Column({
    type: 'enum',
    enum: CarRequestLogAction,
  })
  @Index()
  actionType: CarRequestLogAction;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  // === Relations ===

  @Field(() => CarRequest)
  @ManyToOne(() => CarRequest, (carRequest) => carRequest.logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carRequestId' })
  carRequest: CarRequest;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  @Index()
  carRequestId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  authorId?: string;

  // === Legacy System Integration ===

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;
}
