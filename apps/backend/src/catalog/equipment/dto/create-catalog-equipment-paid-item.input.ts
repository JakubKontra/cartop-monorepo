import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsInt, Min, IsString } from 'class-validator';

@InputType()
export class CreateCatalogEquipmentPaidItemInput {
  @Field(() => Int, { description: 'Price in cents' })
  @IsInt()
  @Min(0)
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  equipmentId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
