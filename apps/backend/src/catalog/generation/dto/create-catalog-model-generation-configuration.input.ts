import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, Min, IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCatalogModelGenerationConfigurationInput {
  @Field(() => Float, { description: 'Price from (base price)' })
  @IsNumber()
  @Min(0)
  priceFrom: number;

  @Field()
  @IsBoolean()
  active: boolean;

  @Field()
  @IsUUID()
  generationId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  equipmentId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  engineId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
