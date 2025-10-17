import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCatalogModelGenerationColorInput {
  @Field(() => Int, { description: 'Price in cents' })
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @IsUUID()
  generationId: string;

  @Field()
  @IsUUID()
  colorId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
