import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

/**
 * Update Offer Color Variant Input
 * Partial update - all fields optional
 */
@InputType()
export class UpdateOfferColorVariantInput {
  // === Color selections ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  exteriorColorId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  interiorColorId?: string;

  // === Display ===

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  colorName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  // === Gallery ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  galleryId?: string;
}
