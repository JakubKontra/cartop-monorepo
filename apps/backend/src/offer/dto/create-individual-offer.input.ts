import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsEnum,
  IsNumber,
  Min,
  MinLength,
  IsDateString,
} from 'class-validator';
import { IndividualOfferStatus } from '../enums/individual-offer-status.enum';

@InputType()
export class CreateIndividualOfferInput {
  @Field()
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @Field()
  @IsUUID()
  modelGenerationId: string;

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
  @IsString()
  @MinLength(2)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // === Individual Offer specific fields ===

  @Field()
  @IsUUID()
  customerId: string;

  @Field(() => IndividualOfferStatus, { defaultValue: IndividualOfferStatus.NEW })
  @IsOptional()
  @IsEnum(IndividualOfferStatus)
  status?: IndividualOfferStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  customRequirements?: string; // JSON string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  internalNotes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  responseDeadline?: string;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
