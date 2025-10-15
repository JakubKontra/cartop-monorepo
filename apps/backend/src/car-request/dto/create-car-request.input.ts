import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsEnum, IsUUID, IsEmail, MaxLength, ValidateIf, IsNotEmpty } from 'class-validator';
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
  @MaxLength(255)
  requestEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  requestPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  requestFirstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  requestLastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  requestNewsletter?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  requestPostalCode?: string;

  // Car Details
  @Field(() => String)
  @IsEnum(FinancingType)
  financingType: FinancingType;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('all')
  brandId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('all')
  modelId?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.financingType === FinancingType.LEASING)
  @IsNotEmpty({ message: 'Leasing company is required when financing type is leasing' })
  @IsUUID('all')
  leasingCompanyId?: string;

  // Customer & Agent
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('all')
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('all')
  assignedAgentId?: string;

  // Workflow & Status
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  statusId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stateId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  waitingForOffer?: boolean;

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
  @MaxLength(255)
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
  @MaxLength(100)
  legacySystemId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFromLegacySystem?: boolean;
}
