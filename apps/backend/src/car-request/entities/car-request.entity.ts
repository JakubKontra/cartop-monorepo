import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { User } from '../../model/user/user.entity';
import { CatalogBrand } from '../../catalog/brand/catalog-brand.entity';
import { CatalogModel } from '../../catalog/model/catalog-model.entity';
import { LeasingCompany } from '../../leasing-company/leasing-company.entity';
import { CarRequestStatus } from './car-request-status.entity';
import { CarRequestState } from './car-request-state.entity';
import { FinancingType } from '../enums/financing-type.enum';
import { CancellationReason } from '../enums/cancellation-reason.enum';

/**
 * Car Request Entity
 * Represents a customer's car purchase/leasing request
 */
@ObjectType()
@Entity('car_requests')
@Auditable()
export class CarRequest {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Legacy System Integration ===

  @Field()
  @Column({ type: 'boolean', default: false })
  isFromLegacySystem: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  // === Basic Information ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  modifiedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Field(() => FinancingType)
  @Column({ type: 'enum', enum: FinancingType, default: FinancingType.CASH })
  financingType: FinancingType;

  // === Request Contact Information ===

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  requestEmail?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  requestPhone?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  requestFirstName?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  requestLastName?: string;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  requestNewsletter?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  requestPostalCode?: string;

  // === Relations to Users ===

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  customerId?: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedAgentId' })
  assignedAgent?: User;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  assignedAgentId?: string;

  // === Relations to Catalog ===

  @Field(() => CatalogBrand, { nullable: true })
  @ManyToOne(() => CatalogBrand, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brandId' })
  brand?: CatalogBrand;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  brandId?: string;

  @Field(() => CatalogModel, { nullable: true })
  @ManyToOne(() => CatalogModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'modelId' })
  model?: CatalogModel;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  modelId?: string;

  // === Leasing Company ===

  @Field(() => LeasingCompany, { nullable: true })
  @ManyToOne(() => LeasingCompany, { nullable: true })
  @JoinColumn({ name: 'leasingCompanyId' })
  leasingCompany?: LeasingCompany;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  leasingCompanyId?: string;

  // === Workflow and Tracking ===

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  order?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  gclid?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  noteInternal?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  completedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  nextCallAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  confirmedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  relayedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  feedbackAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  closedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true })
  waitingForOffer?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  offersSentAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deliveryExpectedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: false })
  carDelivered?: boolean;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  // === Cancellation ===

  @Field(() => CancellationReason, { nullable: true })
  @Column({
    type: 'enum',
    enum: CancellationReason,
    nullable: true,
  })
  cancellationReason?: CancellationReason;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  cancellationNote?: string;

  // === Status and State Relations ===

  @Field(() => CarRequestStatus, { nullable: true })
  @ManyToOne(() => CarRequestStatus, { nullable: true })
  @JoinColumn({ name: 'statusId' })
  status?: CarRequestStatus;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  statusId?: string;

  @Field(() => CarRequestState, { nullable: true })
  @ManyToOne(() => CarRequestState, { nullable: true })
  @JoinColumn({ name: 'stateId' })
  state?: CarRequestState;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  stateId?: string;

  // === Activity Logs ===

  @Field(() => [CarRequestLog], { nullable: true })
  @OneToMany(() => CarRequestLog, (log) => log.carRequest)
  logs?: CarRequestLog[];
}

// Import CarRequestLog at the end to avoid circular dependency issues
import { CarRequestLog } from './car-request-log.entity';
