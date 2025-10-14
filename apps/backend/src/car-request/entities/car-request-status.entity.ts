import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';

/**
 * Car Request Status Entity
 * Represents the status of a car request in the workflow
 */
@ObjectType()
@Entity('car_request_statuses')
@Auditable()
export class CarRequestStatus {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  code: string;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  columnDisplayOrder: number;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  isFinal: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 7, nullable: true })
  colorHex?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
