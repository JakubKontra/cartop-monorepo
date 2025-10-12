import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsEnum, IsBoolean, IsNumber, Min } from 'class-validator';
import { OfferType } from '../enums/offer-type.enum';
import { IndividualOfferStatus } from '../enums/individual-offer-status.enum';

/**
 * Offer Filters Input
 * Used for filtering and searching offers
 */
@InputType()
export class OfferFiltersInput {
  @Field(() => OfferType, { nullable: true })
  @IsOptional()
  @IsEnum(OfferType)
  type?: OfferType;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  modelGenerationId?: string;

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
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMin?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMax?: number;

  // Individual offer specific filters
  @Field(() => IndividualOfferStatus, { nullable: true })
  @IsOptional()
  @IsEnum(IndividualOfferStatus)
  status?: IndividualOfferStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  // Pagination
  @Field(() => Int, { nullable: true, defaultValue: 50 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}
