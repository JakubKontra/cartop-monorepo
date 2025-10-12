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
import { Auditable } from '../common/decorators/auditable.decorator';
import { File } from '../file/file.entity';

/**
 * Leasing Company Entity
 * Represents leasing companies that provide vehicle financing
 */
@ObjectType()
@Entity('leasing_companies')
@Auditable()
export class LeasingCompany {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  link?: string;

  // === Logo ===

  @Field(() => File, { nullable: true })
  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'logoId' })
  logo?: File;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  logoId?: string;

  // === Audit ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
