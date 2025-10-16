import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CarRequest } from '../../car-request/entities/car-request.entity';
import { LeasingCompany } from '../../leasing-company/leasing-company.entity';
import { OnboardingDocument } from './onboarding-document.entity';

export enum OnboardingStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  EXPIRED = 'EXPIRED',
}

registerEnumType(OnboardingStatus, {
  name: 'OnboardingStatus',
  description: 'Status of the onboarding process',
});

/**
 * Onboarding Entity
 * Represents a document upload session for a car request
 */
@ObjectType()
@Entity('onboardings')
@Auditable()
export class Onboarding {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Unique Token for Public Access ===

  @Field()
  @Column({ type: 'varchar', length: 32, unique: true })
  @Index()
  token: string;

  // === Status ===

  @Field(() => OnboardingStatus)
  @Column({ type: 'enum', enum: OnboardingStatus, default: OnboardingStatus.PENDING })
  @Index()
  status: OnboardingStatus;

  // === Expiration ===

  @Field()
  @Column({ type: 'timestamp with time zone' })
  expiresAt: Date;

  // === Relations ===

  @Field(() => CarRequest)
  @OneToOne(() => CarRequest, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carRequestId' })
  carRequest: CarRequest;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  carRequestId: string;

  @Field(() => LeasingCompany)
  @ManyToOne(() => LeasingCompany, { nullable: false })
  @JoinColumn({ name: 'leasingCompanyId' })
  leasingCompany: LeasingCompany;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  leasingCompanyId: string;

  @Field(() => [OnboardingDocument], { nullable: true })
  @OneToMany(() => OnboardingDocument, (doc) => doc.onboarding)
  documents?: OnboardingDocument[];

  // === Timestamps ===

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  completedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  lastReminderSentAt?: Date;

  // === Audit ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
