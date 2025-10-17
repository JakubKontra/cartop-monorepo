import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateOfferAdditionalEquipmentItemInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

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
