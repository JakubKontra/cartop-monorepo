import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';
import { CatalogEquipmentService } from './catalog-equipment.service';
import { CatalogEquipmentItemCategoryService } from './catalog-equipment-item-category.service';
import { CatalogEquipmentItemService } from './catalog-equipment-item.service';
import { CatalogEquipmentPacketService } from './catalog-equipment-packet.service';
import { CatalogEquipmentPaidItemService } from './catalog-equipment-paid-item.service';
import { CatalogEquipmentPublicResolver } from './catalog-equipment-public.resolver';
import { CatalogEquipmentAdminResolver } from './catalog-equipment-admin.resolver';
import { CatalogEquipmentItemCategoryPublicResolver } from './catalog-equipment-item-category-public.resolver';
import { CatalogEquipmentItemCategoryAdminResolver } from './catalog-equipment-item-category-admin.resolver';
import { CatalogEquipmentItemPublicResolver } from './catalog-equipment-item-public.resolver';
import { CatalogEquipmentItemAdminResolver } from './catalog-equipment-item-admin.resolver';
import { CatalogEquipmentPacketPublicResolver } from './catalog-equipment-packet-public.resolver';
import { CatalogEquipmentPacketAdminResolver } from './catalog-equipment-packet-admin.resolver';
import { CatalogEquipmentPaidItemPublicResolver } from './catalog-equipment-paid-item-public.resolver';
import { CatalogEquipmentPaidItemAdminResolver } from './catalog-equipment-paid-item-admin.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CatalogEquipment,
      CatalogEquipmentItemCategory,
      CatalogEquipmentItem,
      CatalogEquipmentPacket,
      CatalogEquipmentPaidItem,
    ]),
  ],
  providers: [
    CatalogEquipmentService,
    CatalogEquipmentItemCategoryService,
    CatalogEquipmentItemService,
    CatalogEquipmentPacketService,
    CatalogEquipmentPaidItemService,
    CatalogEquipmentPublicResolver,
    CatalogEquipmentAdminResolver,
    CatalogEquipmentItemCategoryPublicResolver,
    CatalogEquipmentItemCategoryAdminResolver,
    CatalogEquipmentItemPublicResolver,
    CatalogEquipmentItemAdminResolver,
    CatalogEquipmentPacketPublicResolver,
    CatalogEquipmentPacketAdminResolver,
    CatalogEquipmentPaidItemPublicResolver,
    CatalogEquipmentPaidItemAdminResolver,
  ],
  exports: [
    CatalogEquipmentService,
    CatalogEquipmentItemCategoryService,
    CatalogEquipmentItemService,
    CatalogEquipmentPacketService,
    CatalogEquipmentPaidItemService,
  ],
})
export class CatalogEquipmentModule {}
