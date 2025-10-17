import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogEquipmentItemInput } from './create-catalog-equipment-item.input';

@InputType()
export class UpdateCatalogEquipmentItemInput extends PartialType(CreateCatalogEquipmentItemInput) {}
