import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogEquipmentPaidItemInput } from './create-catalog-equipment-paid-item.input';

@InputType()
export class UpdateCatalogEquipmentPaidItemInput extends PartialType(
  CreateCatalogEquipmentPaidItemInput,
) {}
