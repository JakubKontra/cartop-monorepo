import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogModelGenerationInput } from './create-catalog-model-generation.input';

@InputType()
export class UpdateCatalogModelGenerationInput extends PartialType(
  CreateCatalogModelGenerationInput,
) {
  // All fields are inherited from CreateCatalogModelGenerationInput as optional
  // The id is passed as a separate parameter in the mutation, not in the input
}
