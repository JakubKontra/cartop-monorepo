import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogModelGenerationConfigurationInput } from './create-catalog-model-generation-configuration.input';

@InputType()
export class UpdateCatalogModelGenerationConfigurationInput extends PartialType(
  CreateCatalogModelGenerationConfigurationInput,
) {}
