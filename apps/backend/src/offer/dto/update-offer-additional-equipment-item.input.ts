import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

/**
 * Update Offer Additional Equipment Item Input
 * Partial update - all fields optional
 */
@InputType()
export class UpdateOfferAdditionalEquipmentItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
