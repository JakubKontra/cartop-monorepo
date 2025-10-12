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
} from 'class-validator';

@InputType()
export class CreateDirectPurchaseOfferInput {
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

  // === Direct Purchase specific fields ===

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

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  includesWarranty?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  warrantyYears?: number;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  financingAvailable?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
