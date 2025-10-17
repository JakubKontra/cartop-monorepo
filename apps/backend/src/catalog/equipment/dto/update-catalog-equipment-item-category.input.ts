import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogEquipmentItemCategoryInput } from './create-catalog-equipment-item-category.input';

@InputType()
export class UpdateCatalogEquipmentItemCategoryInput extends PartialType(
  CreateCatalogEquipmentItemCategoryInput,
) {}
