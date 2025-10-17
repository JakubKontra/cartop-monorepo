import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateCatalogBrandEquipmentItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}
