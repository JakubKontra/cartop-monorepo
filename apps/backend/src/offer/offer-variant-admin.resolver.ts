import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferCalculation, OfferCalculationFeature } from './offer-calculation.entity';
import { OfferVariantService } from './offer-variant.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

/**
 * Admin Resolver for Offer Variants
 * Handles CRUD operations for leasing variants, color variants, equipment, and calculations
 */
@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
export class OfferVariantAdminResolver {
  constructor(private readonly variantService: OfferVariantService) {}

  // === LEASING VARIANTS ===

  @Query(() => [OfferLeasingVariant], {
    name: 'leasingVariantsByOffer',
    description: 'Get all leasing variants for an offer (admin only)',
  })
  async leasingVariantsByOffer(
    @Args('offerId', { type: () => String }) offerId: string,
  ): Promise<OfferLeasingVariant[]> {
    return this.variantService.findLeasingVariantsByOffer(offerId);
  }

  @Mutation(() => OfferLeasingVariant, {
    name: 'createLeasingVariant',
    description: 'Create a new leasing variant (admin only)',
  })
  async createLeasingVariant(
    @Args('offerId', { type: () => String }) offerId: string,
    @Args('leasingDurationMonths', { type: () => Number }) leasingDurationMonths: number,
    @Args('annualMileageLimit', { type: () => Number }) annualMileageLimit: number,
    @Args('priceWithoutVat', { type: () => Number }) priceWithoutVat: number,
    @Args('priceWithVat', { type: () => Number }) priceWithVat: number,
    @Args('slug', { type: () => String }) slug: string,
    @Args('downPayment', { type: () => Number, nullable: true }) downPayment?: number,
    @Args('isDefault', { type: () => Boolean, nullable: true }) isDefault?: boolean,
    @Args('isBestOffer', { type: () => Boolean, nullable: true }) isBestOffer?: boolean,
  ): Promise<OfferLeasingVariant> {
    return this.variantService.createLeasingVariant({
      offerId,
      leasingDurationMonths,
      annualMileageLimit,
      priceWithoutVat,
      priceWithVat,
      slug,
      downPayment,
      isDefault,
      isBestOffer,
    });
  }

  @Mutation(() => Boolean, {
    name: 'deleteLeasingVariant',
    description: 'Delete a leasing variant (admin only)',
  })
  async deleteLeasingVariant(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return this.variantService.deleteLeasingVariant(id);
  }

  // === COLOR VARIANTS ===

  @Query(() => [OfferColorVariant], {
    name: 'colorVariantsByOffer',
    description: 'Get all color variants for an offer (admin only)',
  })
  async colorVariantsByOffer(
    @Args('offerId', { type: () => String }) offerId: string,
  ): Promise<OfferColorVariant[]> {
    return this.variantService.findColorVariantsByOffer(offerId);
  }

  @Mutation(() => OfferColorVariant, {
    name: 'createColorVariant',
    description: 'Create a new color variant (admin only)',
  })
  async createColorVariant(
    @Args('offerId', { type: () => String }) offerId: string,
    @Args('exteriorColorId', { type: () => String }) exteriorColorId: string,
    @Args('interiorColorId', { type: () => String }) interiorColorId: string,
    @Args('colorName', { type: () => String, nullable: true }) colorName?: string,
    @Args('isDefault', { type: () => Boolean, nullable: true }) isDefault?: boolean,
  ): Promise<OfferColorVariant> {
    return this.variantService.createColorVariant({
      offerId,
      exteriorColorId,
      interiorColorId,
      colorName,
      isDefault,
    });
  }

  @Mutation(() => Boolean, {
    name: 'deleteColorVariant',
    description: 'Delete a color variant (admin only)',
  })
  async deleteColorVariant(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.variantService.deleteColorVariant(id);
  }

  // === OPTIONAL EQUIPMENT ===

  @Query(() => [OfferOptionalEquipment], {
    name: 'optionalEquipmentByOffer',
    description: 'Get all optional equipment for an offer (admin only)',
  })
  async optionalEquipmentByOffer(
    @Args('offerId', { type: () => String }) offerId: string,
  ): Promise<OfferOptionalEquipment[]> {
    return this.variantService.findOptionalEquipmentByOffer(offerId);
  }

  @Mutation(() => OfferOptionalEquipment, {
    name: 'createOptionalEquipment',
    description: 'Create optional equipment (admin only)',
  })
  async createOptionalEquipment(
    @Args('offerId', { type: () => String }) offerId: string,
    @Args('equipmentItemId', { type: () => String }) equipmentItemId: string,
    @Args('additionalPrice', { type: () => Number, nullable: true }) additionalPrice?: number,
  ): Promise<OfferOptionalEquipment> {
    return this.variantService.createOptionalEquipment({
      offerId,
      equipmentItemId,
      additionalPrice,
    });
  }

  @Mutation(() => Boolean, {
    name: 'deleteOptionalEquipment',
    description: 'Delete optional equipment (admin only)',
  })
  async deleteOptionalEquipment(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return this.variantService.deleteOptionalEquipment(id);
  }

  // === CALCULATIONS (Individual Offers) ===

  @Query(() => [OfferCalculation], {
    name: 'calculationsByOffer',
    description: 'Get all calculations for an individual offer (admin only)',
  })
  async calculationsByOffer(
    @Args('offerId', { type: () => String }) offerId: string,
  ): Promise<OfferCalculation[]> {
    return this.variantService.findCalculationsByOffer(offerId);
  }

  @Mutation(() => OfferCalculation, {
    name: 'createCalculation',
    description: 'Create a calculation for individual offer (admin only)',
  })
  async createCalculation(
    @Args('offerId', { type: () => String }) offerId: string,
    @Args('availability', { type: () => String, nullable: true }) availability?: string,
    @Args('exteriorColorId', { type: () => String, nullable: true }) exteriorColorId?: string,
    @Args('interiorColorId', { type: () => String, nullable: true }) interiorColorId?: string,
  ): Promise<OfferCalculation> {
    return this.variantService.createCalculation({
      offerId,
      availability: availability as any,
      exteriorColorId,
      interiorColorId,
    });
  }

  @Mutation(() => OfferCalculationFeature, {
    name: 'addFeatureToCalculation',
    description: 'Add a feature to a calculation (admin only)',
  })
  async addFeatureToCalculation(
    @Args('calculationId', { type: () => String }) calculationId: string,
    @Args('featureName', { type: () => String }) featureName: string,
    @Args('featureDescription', { type: () => String, nullable: true })
    featureDescription?: string,
  ): Promise<OfferCalculationFeature> {
    return this.variantService.addFeatureToCalculation(
      calculationId,
      featureName,
      featureDescription,
    );
  }

  @Mutation(() => Boolean, {
    name: 'deleteCalculation',
    description: 'Delete a calculation (admin only)',
  })
  async deleteCalculation(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.variantService.deleteCalculation(id);
  }
}
