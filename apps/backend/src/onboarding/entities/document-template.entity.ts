import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { LeasingCompany } from '../../leasing-company/leasing-company.entity';

/**
 * Document Template Entity
 * Defines required documents for each leasing company's onboarding
 *
 * Templates can be:
 * - Global (leasingCompanyId = null): Available to all leasing companies
 * - Specific (leasingCompanyId != null): Only for a specific leasing company
 *
 * Specific templates override global templates with the same fieldName
 */
@ObjectType()
@Entity('document_templates')
@Unique('UQ_document_template_field_name_company', ['fieldName', 'leasingCompanyId'])
@Auditable()
export class DocumentTemplate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Basic Information ===

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  @Index()
  fieldName: string; // e.g., "id_card_front", "proof_of_income"

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  helpText?: string;

  // === Requirements ===

  @Field()
  @Column({ type: 'boolean', default: true })
  isRequired: boolean;

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  acceptedFormats: string[]; // e.g., ["pdf", "jpg", "png"]

  @Field(() => Int)
  @Column({ type: 'integer', default: 5242880 }) // 5MB default
  maxSizeBytes: number;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  // === Leasing Company Relation ===
  // Nullable - allows global templates (null = available to all companies)

  @Field(() => LeasingCompany, { nullable: true })
  @ManyToOne(() => LeasingCompany, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leasingCompanyId' })
  leasingCompany?: LeasingCompany;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  leasingCompanyId?: string | null;

  // === Computed Fields ===

  /**
   * Check if this is a global template (available to all leasing companies)
   */
  @Field()
  get isGlobal(): boolean {
    return this.leasingCompanyId === null || this.leasingCompanyId === undefined;
  }

  // === Audit ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
