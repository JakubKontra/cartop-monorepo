import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  IsEnum,
  Length,
} from 'class-validator';
import { PricePeriod } from '../enums/price-period.enum';

@InputType()
export class CreateOfferOptionalEquipmentInput {
  @Field()
  @IsUUID()
  offerId: string;

  @Field()
  @IsUUID()
  equipmentItemId: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  additionalPrice?: number;

  @Field({ defaultValue: 'CZK' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @Field(() => PricePeriod, { defaultValue: PricePeriod.MONTHLY })
  @IsOptional()
  @IsEnum(PricePeriod)
  pricePeriod?: PricePeriod;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isDefaultSelected?: boolean;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
