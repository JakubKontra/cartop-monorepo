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
  IsEnum,
  IsDateString,
  MinLength,
  Length,
} from 'class-validator';
import { PricePeriod } from '../enums/price-period.enum';

/**
 * Update Offer Leasing Variant Input
 * Partial update - all fields optional
 */
@InputType()
export class UpdateOfferLeasingVariantInput {
  // === Leasing parameters ===

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(5000)
  @Max(100000)
  annualMileageLimit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(12)
  @Max(60)
  leasingDurationMonths?: number;

  // === Pricing ===

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  vatRate?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  priceWithoutVat?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  priceWithVat?: number;

  @Field(() => PricePeriod, { nullable: true })
  @IsOptional()
  @IsEnum(PricePeriod)
  pricePeriod?: PricePeriod;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  originalPriceWithoutVat?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  originalPriceWithVat?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  downPayment?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  securityDeposit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  setupFee?: number;

  // === Validity period ===

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  validTo?: string;

  // === Included services ===

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasServiceIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasWinterTyresIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasAssistanceServiceIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasGapIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasGlassInsuranceIncluded?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasHighwayIncluded?: boolean;

  // === Other parameters ===

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  wearTolerancePercent?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  freeMileageLimit?: number;

  // === Flags ===

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isBestOffer?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  slug?: string;

  // === Leasing company ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  leasingCompanyId?: string;
}
