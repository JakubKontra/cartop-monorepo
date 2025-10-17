import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  Length,
} from 'class-validator';
import { PricePeriod } from '../enums/price-period.enum';

/**
 * Update Offer Optional Equipment Input
 * Partial update - all fields optional
 */
@InputType()
export class UpdateOfferOptionalEquipmentInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  additionalPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @Field(() => PricePeriod, { nullable: true })
  @IsOptional()
  @IsEnum(PricePeriod)
  pricePeriod?: PricePeriod;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isDefaultSelected?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
