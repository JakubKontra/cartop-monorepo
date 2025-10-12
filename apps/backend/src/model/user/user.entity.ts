import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { File } from '../../file/file.entity';

// Register UserRole enum for GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles for access control',
});

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

  @Field(() => [UserRole])
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.CUSTOMER],
  })
  roles: UserRole[];

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
  @Column({ type: 'boolean', default: false })
  isImpersonating: boolean;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  impersonatedBy?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // === Avatar ===

  @Field(() => File, { nullable: true })
  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'avatarId' })
  avatar?: File;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  avatarId?: string;
}
