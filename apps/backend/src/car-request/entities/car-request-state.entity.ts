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
 * Car Request State Entity
 * Represents the internal state of a car request
 */
@ObjectType()
@Entity('car_request_states')
@Auditable()
export class CarRequestState {
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
