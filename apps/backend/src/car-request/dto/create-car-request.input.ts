import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsInt, IsEnum, IsUUID, IsEmail, IsDate } from 'class-validator';
import { FinancingType } from '../enums/financing-type.enum';
import { CancellationReason } from '../enums/cancellation-reason.enum';

/**
 * Create Car Request Input
 */
@InputType()
export class CreateCarRequestInput {
  // Request Information
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  requestEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestFirstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestLastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  requestNewsletter?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestPostalCode?: string;

  // Car Details
  @Field(() => String)
  @IsEnum(FinancingType)
  financingType: FinancingType;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  modelId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  leasingCompanyId?: string;

  // Customer & Agent
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedAgentId?: string;

  // Workflow & Status
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  stateId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  waitingForOffer?: boolean;

  // Dates
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  nextCallAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  confirmedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  relayedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  feedbackAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  closedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  completedAt?: Date;

  // Notes
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  noteInternal?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  gclid?: string;

  // Cancellation
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(CancellationReason)
  cancellationReason?: CancellationReason;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cancellationNote?: string;

  // Legacy
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFromLegacySystem?: boolean;
}
