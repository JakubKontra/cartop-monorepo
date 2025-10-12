import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationalLeasingOffer, IndividualOffer } from './offer.entity';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferCalculation } from './offer-calculation.entity';

/**
 * Field Resolver for Operational Leasing Offer
 * Lazy loads related collections (variants, colors, equipment)
 */
@Resolver(() => OperationalLeasingOffer)
export class OperationalLeasingOfferFieldResolver {
  constructor(
    @InjectRepository(OfferLeasingVariant)
    private readonly variantRepository: Repository<OfferLeasingVariant>,
    @InjectRepository(OfferColorVariant)
    private readonly colorVariantRepository: Repository<OfferColorVariant>,
    @InjectRepository(OfferOptionalEquipment)
    private readonly equipmentRepository: Repository<OfferOptionalEquipment>,
  ) {}

  /**
   * Lazy load leasing variants
   * Only fetched when explicitly requested in GraphQL query
   */
  @ResolveField('variants', () => [OfferLeasingVariant], { nullable: true })
  async getVariants(@Parent() offer: OperationalLeasingOffer): Promise<OfferLeasingVariant[]> {
    return this.variantRepository.find({
      where: { offerId: offer.id },
      order: { isDefault: 'DESC', leasingDurationMonths: 'ASC' },
    });
  }

  /**
   * Lazy load color variants
   */
  @ResolveField('colorVariants', () => [OfferColorVariant], { nullable: true })
  async getColorVariants(
    @Parent() offer: OperationalLeasingOffer,
  ): Promise<OfferColorVariant[]> {
    return this.colorVariantRepository.find({
      where: { offerId: offer.id },
      relations: ['exteriorColor', 'interiorColor'],
      order: { isDefault: 'DESC', createdAt: 'ASC' },
    });
  }

  /**
   * Lazy load optional equipment
   */
  @ResolveField('optionalEquipment', () => [OfferOptionalEquipment], { nullable: true })
  async getOptionalEquipment(
    @Parent() offer: OperationalLeasingOffer,
  ): Promise<OfferOptionalEquipment[]> {
    return this.equipmentRepository.find({
      where: { offerId: offer.id, isAvailable: true },
      order: { createdAt: 'ASC' },
    });
  }
}

/**
 * Field Resolver for Individual Offer
 * Lazy loads calculations
 */
@Resolver(() => IndividualOffer)
export class IndividualOfferFieldResolver {
  constructor(
    @InjectRepository(OfferCalculation)
    private readonly calculationRepository: Repository<OfferCalculation>,
  ) {}

  /**
   * Lazy load calculations with features
   */
  @ResolveField('calculations', () => [OfferCalculation], { nullable: true })
  async getCalculations(@Parent() offer: IndividualOffer): Promise<OfferCalculation[]> {
    return this.calculationRepository.find({
      where: { offerId: offer.id },
      relations: ['features', 'exteriorColor', 'interiorColor'],
      order: { createdAt: 'DESC' },
    });
  }
}
