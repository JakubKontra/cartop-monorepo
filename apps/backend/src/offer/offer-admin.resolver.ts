import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Offer, OperationalLeasingOffer, DirectPurchaseOffer, IndividualOffer } from './offer.entity';
import { OfferService } from './offer.service';
import { CreateOperationalLeasingOfferInput } from './dto/create-operational-leasing-offer.input';
import { CreateDirectPurchaseOfferInput } from './dto/create-direct-purchase-offer.input';
import { CreateIndividualOfferInput } from './dto/create-individual-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { OfferFiltersInput } from './dto/offer-filters.input';
import { IndividualOfferStatus } from './enums/individual-offer-status.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

/**
 * Admin Offer Resolver
 * Handles all admin operations for offers (create, update, delete, view all)
 * Requires authentication and ADMIN role
 */
@Resolver(() => Offer)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfferAdminResolver {
  constructor(private readonly offerService: OfferService) {}

  // === QUERIES ===

  /**
   * Get all offers (including individual)
   * Admin only
   */
  @Query(() => [Offer], {
    name: 'allOffers',
    description: 'Get all offers including individual offers (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async allOffers(
    @Args('filters', { type: () => OfferFiltersInput, nullable: true })
    filters?: OfferFiltersInput,
  ): Promise<Offer[]> {
    return this.offerService.findAll(filters);
  }

  /**
   * Get all individual offers
   * Admin only
   */
  @Query(() => [IndividualOffer], {
    name: 'individualOffers',
    description: 'Get all individual offers (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async individualOffers(
    @Args('filters', { type: () => OfferFiltersInput, nullable: true })
    filters?: OfferFiltersInput,
  ): Promise<IndividualOffer[]> {
    return this.offerService.findIndividualOffers(filters);
  }

  /**
   * Get single offer by ID
   * Admin only
   */
  @Query(() => Offer, {
    name: 'offer',
    description: 'Get a single offer by ID (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async offer(@Args('id', { type: () => String }) id: string): Promise<Offer> {
    return this.offerService.findOne(id);
  }

  /**
   * Get offer by slug
   * Admin only
   */
  @Query(() => Offer, {
    name: 'offerBySlug',
    description: 'Get a single offer by slug (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async offerBySlug(@Args('slug', { type: () => String }) slug: string): Promise<Offer> {
    return this.offerService.findBySlug(slug);
  }

  // === MUTATIONS ===

  /**
   * Create Operational Leasing Offer
   * Admin only
   */
  @Mutation(() => OperationalLeasingOffer, {
    name: 'createOperationalLeasingOffer',
    description: 'Create a new operational leasing offer (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async createOperationalLeasingOffer(
    @Args('input') input: CreateOperationalLeasingOfferInput,
  ): Promise<OperationalLeasingOffer> {
    return this.offerService.createOperationalLeasing(input);
  }

  /**
   * Create Direct Purchase Offer
   * Admin only
   */
  @Mutation(() => DirectPurchaseOffer, {
    name: 'createDirectPurchaseOffer',
    description: 'Create a new direct purchase offer (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async createDirectPurchaseOffer(
    @Args('input') input: CreateDirectPurchaseOfferInput,
  ): Promise<DirectPurchaseOffer> {
    return this.offerService.createDirectPurchase(input);
  }

  /**
   * Create Individual Offer
   * Admin only
   */
  @Mutation(() => IndividualOffer, {
    name: 'createIndividualOffer',
    description: 'Create a new individual (custom) offer (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async createIndividualOffer(
    @Args('input') input: CreateIndividualOfferInput,
  ): Promise<IndividualOffer> {
    return this.offerService.createIndividual(input);
  }

  /**
   * Update Offer
   * Admin only
   */
  @Mutation(() => Offer, {
    name: 'updateOffer',
    description: 'Update an existing offer (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async updateOffer(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateOfferInput,
  ): Promise<Offer> {
    return this.offerService.update(id, input);
  }

  /**
   * Update Individual Offer Status
   * Admin only
   */
  @Mutation(() => IndividualOffer, {
    name: 'updateIndividualOfferStatus',
    description: 'Update status of an individual offer (admin only)',
  })
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async updateIndividualOfferStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => IndividualOfferStatus }) status: IndividualOfferStatus,
  ): Promise<IndividualOffer> {
    return this.offerService.updateIndividualStatus(id, status);
  }

  /**
   * Delete Offer
   * Admin only
   */
  @Mutation(() => Boolean, {
    name: 'deleteOffer',
    description: 'Delete an offer (admin only)',
  })
  @Roles(UserRole.ADMIN)
  async deleteOffer(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.offerService.remove(id);
  }
}
