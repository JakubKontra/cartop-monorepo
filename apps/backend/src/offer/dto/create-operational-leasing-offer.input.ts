import { InputType, Field, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateOperationalLeasingOfferInput {
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

  // === New required fields ===

  @Field()
  @IsUUID()
  engineId: string;

  // === New optional fields ===

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

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  fileId?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isRecommendedForBrand?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isRecommendedForActionPage?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isRecommendedForModel?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isPromoted?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  disableCustomGallery?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  note?: string;

  // === Operational Leasing specific fields ===

  @Field(() => Int)
  @IsInt()
  @Min(12)
  @Max(60)
  leasingDurationMonths: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  monthlyPayment: number;

  @Field(() => Int)
  @IsInt()
  @Min(5000)
  @Max(100000)
  annualMileageLimit: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  downPaymentLeasing?: number;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasServiceIncluded?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasWinterTyresIncluded?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasAssistanceServiceIncluded?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasGapIncluded?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
