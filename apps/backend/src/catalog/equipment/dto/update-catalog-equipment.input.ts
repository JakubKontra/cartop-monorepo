import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogEquipmentInput } from './create-catalog-equipment.input';

@InputType()
export class UpdateCatalogEquipmentInput extends PartialType(CreateCatalogEquipmentInput) {}
