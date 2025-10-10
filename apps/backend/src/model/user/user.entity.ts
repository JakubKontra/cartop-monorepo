import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';

/**
 * User Entity - Example model with audit tracking
 * Uses @Auditable decorator to enable automatic change tracking
 */
@ObjectType()
@Entity('users')
@Auditable() // Enable automatic audit logging
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index()
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Not exposed in GraphQL

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
