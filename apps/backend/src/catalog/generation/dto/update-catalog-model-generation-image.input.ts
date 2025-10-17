import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogModelGenerationImageInput } from './create-catalog-model-generation-image.input';

@InputType()
export class UpdateCatalogModelGenerationImageInput extends PartialType(
  CreateCatalogModelGenerationImageInput,
) {}
