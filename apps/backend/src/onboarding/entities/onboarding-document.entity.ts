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
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { Onboarding } from './onboarding.entity';
import { DocumentTemplate } from './document-template.entity';
import { File } from '../../file/file.entity';
import { User } from '../../model/user/user.entity';

export enum DocumentValidationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(DocumentValidationStatus, {
  name: 'DocumentValidationStatus',
  description: 'Validation status of an uploaded document',
});

/**
 * Onboarding Document Entity
 * Represents an individual uploaded document within an onboarding session
 */
@ObjectType()
@Entity('onboarding_documents')
@Auditable()
export class OnboardingDocument {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Relations ===

  @Field(() => Onboarding)
  @ManyToOne(() => Onboarding, (onboarding) => onboarding.documents, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'onboardingId' })
  onboarding: Onboarding;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  onboardingId: string;

  @Field(() => DocumentTemplate)
  @ManyToOne(() => DocumentTemplate, { nullable: false })
  @JoinColumn({ name: 'documentTemplateId' })
  documentTemplate: DocumentTemplate;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  documentTemplateId: string;

  @Field(() => File)
  @ManyToOne(() => File, { nullable: false })
  @JoinColumn({ name: 'fileId' })
  file: File;

  @Field()
  @Column({ type: 'uuid' })
  fileId: string;

  // === Validation ===

  @Field(() => DocumentValidationStatus)
  @Column({
    type: 'enum',
    enum: DocumentValidationStatus,
    default: DocumentValidationStatus.PENDING,
  })
  @Index()
  validationStatus: DocumentValidationStatus;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  validationNote?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'validatedById' })
  validatedBy?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  validatedById?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  validatedAt?: Date;

  // === Audit ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  uploadedAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
