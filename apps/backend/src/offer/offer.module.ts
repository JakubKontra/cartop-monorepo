import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferCalculation, OfferCalculationFeature } from './offer-calculation.entity';
import { OfferService } from './offer.service';
import { OfferVariantService } from './offer-variant.service';
import { OfferPublicResolver } from './offer-public.resolver';
import { OfferAdminResolver } from './offer-admin.resolver';
import { OfferVariantAdminResolver } from './offer-variant-admin.resolver';
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
      OfferCalculation,
      OfferCalculationFeature,
    ]),
  ],
  providers: [
    // Services
    OfferService,
    OfferVariantService,
    // Resolvers
    OfferPublicResolver,
    OfferAdminResolver,
    OfferVariantAdminResolver,
    // Field Resolvers
    OperationalLeasingOfferFieldResolver,
    IndividualOfferFieldResolver,
  ],
  exports: [OfferService, OfferVariantService],
})
export class OfferModule {}
