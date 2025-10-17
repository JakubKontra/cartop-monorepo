import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateCatalogBrandEquipmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsUUID()
  brandId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
