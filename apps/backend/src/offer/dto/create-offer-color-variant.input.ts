import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateOfferColorVariantInput {
  @Field()
  @IsUUID()
  offerId: string;

  // === Color selections ===

  @Field()
  @IsUUID()
  exteriorColorId: string;

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

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  // === Gallery ===

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  galleryId?: string;
}
