import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogModelGenerationColorInput } from './create-catalog-model-generation-color.input';

@InputType()
export class UpdateCatalogModelGenerationColorInput extends PartialType(
  CreateCatalogModelGenerationColorInput,
) {}
