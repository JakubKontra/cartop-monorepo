import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateCatalogModelGenerationInput } from './create-catalog-model-generation.input';

@InputType()
export class UpdateCatalogModelGenerationInput extends PartialType(
  CreateCatalogModelGenerationInput,
) {
  @Field()
  @IsUUID()
  id: string;
}
