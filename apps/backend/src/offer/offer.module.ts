import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferAdditionalEquipmentItem } from './offer-additional-equipment-item.entity';
import { OfferCalculation, OfferCalculationFeature } from './offer-calculation.entity';
import { OfferService } from './offer.service';
import { OfferVariantService } from './offer-variant.service';
import { OfferLeasingVariantService } from './offer-leasing-variant.service';
import { OfferColorVariantService } from './offer-color-variant.service';
import { OfferAdditionalEquipmentItemService } from './offer-additional-equipment-item.service';
import { OfferOptionalEquipmentService } from './offer-optional-equipment.service';
import { OfferPublicResolver } from './offer-public.resolver';
import { OfferAdminResolver } from './offer-admin.resolver';
import { OfferVariantAdminResolver } from './offer-variant-admin.resolver';
import { OfferLeasingVariantAdminResolver } from './offer-leasing-variant-admin.resolver';
import { OfferColorVariantAdminResolver } from './offer-color-variant-admin.resolver';
import { OfferAdditionalEquipmentItemAdminResolver } from './offer-additional-equipment-item-admin.resolver';
import { OfferOptionalEquipmentAdminResolver } from './offer-optional-equipment-admin.resolver';
import {
  OperationalLeasingOfferFieldResolver,
  IndividualOfferFieldResolver,
} from './offer-field.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Offer,
      OfferLeasingVariant,
      OfferColorVariant,
      OfferOptionalEquipment,
      OfferAdditionalEquipmentItem,
      OfferCalculation,
      OfferCalculationFeature,
    ]),
  ],
  providers: [
    // Services
    OfferService,
    OfferVariantService,
    OfferLeasingVariantService,
    OfferColorVariantService,
    OfferAdditionalEquipmentItemService,
    OfferOptionalEquipmentService,
    // Resolvers
    OfferPublicResolver,
    OfferAdminResolver,
    OfferVariantAdminResolver,
    OfferLeasingVariantAdminResolver,
    OfferColorVariantAdminResolver,
    OfferAdditionalEquipmentItemAdminResolver,
    OfferOptionalEquipmentAdminResolver,
    // Field Resolvers
    OperationalLeasingOfferFieldResolver,
    IndividualOfferFieldResolver,
  ],
  exports: [
    OfferService,
    OfferVariantService,
    OfferLeasingVariantService,
    OfferColorVariantService,
    OfferAdditionalEquipmentItemService,
    OfferOptionalEquipmentService,
  ],
})
export class OfferModule {}
