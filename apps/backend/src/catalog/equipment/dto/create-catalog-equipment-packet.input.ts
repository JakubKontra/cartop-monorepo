import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsUUID, IsInt, Min } from 'class-validator';

@InputType()
export class CreateCatalogEquipmentPacketInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

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
  @IsString()
  legacySystemId?: string;
}
