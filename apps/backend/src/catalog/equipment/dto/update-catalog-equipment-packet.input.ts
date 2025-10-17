import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatalogEquipmentPacketInput } from './create-catalog-equipment-packet.input';

@InputType()
export class UpdateCatalogEquipmentPacketInput extends PartialType(
  CreateCatalogEquipmentPacketInput,
) {}
