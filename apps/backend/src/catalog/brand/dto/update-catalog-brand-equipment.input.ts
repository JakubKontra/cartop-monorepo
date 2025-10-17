import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator';

@InputType()
export class UpdateCatalogBrandEquipmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}
