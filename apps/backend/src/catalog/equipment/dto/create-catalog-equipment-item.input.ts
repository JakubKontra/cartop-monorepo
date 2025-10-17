import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateCatalogEquipmentItemInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
