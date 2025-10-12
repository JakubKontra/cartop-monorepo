import { Resolver, Query, Args } from '@nestjs/graphql';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';
import { OfferFiltersInput } from './dto/offer-filters.input';
import { OfferType } from './enums/offer-type.enum';

/**
 * Public Offer Resolver
 * Handles public queries for offers (excluding individual offers)
 * No authentication required
 */
@Resolver(() => Offer)
export class OfferPublicResolver {
  constructor(private readonly offerService: OfferService) {}

  /**
   * Get all public offers (operational leasing + direct purchase)
   * Excludes individual offers
   */
  @Query(() => [Offer], {
    name: 'publicOffers',
    description: 'Get all public offers (operational leasing and direct purchase)',
  })
  async publicOffers(
    @Args('filters', { type: () => OfferFiltersInput, nullable: true })
    filters?: OfferFiltersInput,
  ): Promise<Offer[]> {
    return this.offerService.findPublicOffers(filters);
  }

  /**
   * Get operational leasing offers only
   */
  @Query(() => [Offer], {
    name: 'operationalLeasingOffers',
    description: 'Get all operational leasing offers',
  })
  async operationalLeasingOffers(
    @Args('filters', { type: () => OfferFiltersInput, nullable: true })
    filters?: OfferFiltersInput,
  ): Promise<Offer[]> {
    const filtersWithType = {
      ...filters,
      type: OfferType.OPERATIONAL_LEASING,
      isPublic: true,
      isActive: true,
    };
    return this.offerService.findPublicOffers(filtersWithType);
  }

  /**
   * Get direct purchase offers only
   */
  @Query(() => [Offer], {
    name: 'directPurchaseOffers',
    description: 'Get all direct purchase offers',
  })
  async directPurchaseOffers(
    @Args('filters', { type: () => OfferFiltersInput, nullable: true })
    filters?: OfferFiltersInput,
  ): Promise<Offer[]> {
    const filtersWithType = {
      ...filters,
      type: OfferType.DIRECT_PURCHASE,
      isPublic: true,
      isActive: true,
    };
    return this.offerService.findPublicOffers(filtersWithType);
  }

  /**
   * Get single public offer by ID
   */
  @Query(() => Offer, {
    name: 'publicOffer',
    description: 'Get a single public offer by ID',
  })
  async publicOffer(@Args('id', { type: () => String }) id: string): Promise<Offer> {
    const offer = await this.offerService.findOne(id);

    // Ensure it's a public offer
    if (!offer.isPublic || offer.type === OfferType.INDIVIDUAL) {
      throw new Error('Offer not found or not accessible');
    }

    return offer;
  }

  /**
   * Get public offer by slug
   */
  @Query(() => Offer, {
    name: 'publicOfferBySlug',
    description: 'Get a single public offer by slug',
  })
  async publicOfferBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Offer> {
    const offer = await this.offerService.findBySlug(slug);

    // Ensure it's a public offer
    if (!offer.isPublic || offer.type === OfferType.INDIVIDUAL) {
      throw new Error('Offer not found or not accessible');
    }

    return offer;
  }

  /**
   * Get offers for a specific model generation
   */
  @Query(() => [Offer], {
    name: 'offersByModelGeneration',
    description: 'Get all public offers for a specific model generation',
  })
  async offersByModelGeneration(
    @Args('modelGenerationId', { type: () => String }) modelGenerationId: string,
  ): Promise<Offer[]> {
    return this.offerService.findByModelGeneration(modelGenerationId);
  }
}
