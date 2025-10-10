import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCatalogColorInput } from './create-catalog-color.input';

@InputType()
export class UpdateCatalogColorInput extends PartialType(CreateCatalogColorInput) {}
