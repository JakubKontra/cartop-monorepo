import { InputType, Field, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsDateString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IndividualOfferStatus } from '../enums/individual-offer-status.enum';

/**
 * Update Offer Input
 * Partial update - all fields optional
 * Can be used for any offer type
 */
@InputType()
export class UpdateOfferInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // === New fields ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  engineId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  legacySystemId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  publicId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  fileId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecommendedForBrand?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecommendedForActionPage?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecommendedForModel?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPromoted?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  disableCustomGallery?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  note?: string;

  // === Operational Leasing fields ===

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(12)
  @Max(60)
  leasingDurationMonths?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyPayment?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(5000)
  annualMileageLimit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasServiceIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasWinterTyresIncluded?: boolean;

  // === Direct Purchase fields ===

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  includesWarranty?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  warrantyYears?: number;

  // === Individual Offer fields ===

  @Field(() => IndividualOfferStatus, { nullable: true })
  @IsOptional()
  @IsEnum(IndividualOfferStatus)
  status?: IndividualOfferStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  customRequirements?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  internalNotes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  responseDeadline?: string;
}
