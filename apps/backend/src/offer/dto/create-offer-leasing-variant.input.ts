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

@InputType()
export class CreateOfferLeasingVariantInput {
  @Field()
  @IsUUID()
  offerId: string;

  // === Leasing parameters ===

  @Field(() => Int)
  @IsInt()
  @Min(5000)
  @Max(100000)
  annualMileageLimit: number;

  @Field(() => Int)
  @IsInt()
  @Min(12)
  @Max(60)
  leasingDurationMonths: number;

  // === Pricing ===

  @Field({ defaultValue: 'CZK' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @Field(() => Float, { defaultValue: 21.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  vatRate?: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  priceWithoutVat: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  priceWithVat: number;

  @Field(() => PricePeriod, { defaultValue: PricePeriod.MONTHLY })
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

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasServiceIncluded?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasWinterTyresIncluded?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasAssistanceServiceIncluded?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasGapIncluded?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hasGlassInsuranceIncluded?: boolean;

  @Field({ defaultValue: false })
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

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  freeMileageLimit?: number;

  // === Flags ===

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isBestOffer?: boolean;

  @Field()
  @IsString()
  @MinLength(2)
  slug: string;

  // === Leasing company ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  leasingCompanyId?: string;
}
