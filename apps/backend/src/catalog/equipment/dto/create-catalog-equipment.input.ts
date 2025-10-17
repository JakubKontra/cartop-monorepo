import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateCatalogEquipmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  modelGenerationId?: string;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  standard?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  customText?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
