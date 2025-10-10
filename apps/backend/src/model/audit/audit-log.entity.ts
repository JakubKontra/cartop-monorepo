import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { AuditAction } from '../../common/interfaces/audit.interface';
import GraphQLJSON from 'graphql-type-json';

// Register enum for GraphQL
registerEnumType(AuditAction, {
  name: 'AuditAction',
  description: 'The type of action performed on the entity',
});

/**
 * Audit Log Entity - Optimized for high-volume writes
 *
 * Performance Optimizations:
 * - Uses JSONB for flexible data storage with compression
 * - Includes strategic indexes for common queries
 * - Designed for time-based partitioning (see migration)
 * - Separate database connection pool for isolation
 */
@ObjectType()
@Entity('audit_logs')
@Index(['entityName', 'createdAt']) // For entity history queries
@Index(['entityId', 'createdAt'])   // For specific record history
@Index(['userId', 'createdAt'])     // For user activity queries
@Index(['createdAt'])                // For time-range queries and partitioning
export class AuditLog {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  @Index()
  entityName: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  entityId: string;

  @Field(() => AuditAction)
  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action: AuditAction;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  oldValue?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  newValue?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  changes?: Record<string, { old: any; new: any }>;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  userId?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  userEmail?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  userAgent?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
