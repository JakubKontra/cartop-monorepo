import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferLeasingVariantService } from './offer-leasing-variant.service';
import { CreateOfferLeasingVariantInput } from './dto/create-offer-leasing-variant.input';
import { UpdateOfferLeasingVariantInput } from './dto/update-offer-leasing-variant.input';

@Resolver(() => OfferLeasingVariant)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OfferLeasingVariantAdminResolver {
  constructor(private readonly variantService: OfferLeasingVariantService) {}

  @Query(() => [OfferLeasingVariant], { name: 'offerLeasingVariantsAdmin' })
  async findAll(): Promise<OfferLeasingVariant[]> {
    return this.variantService.findAll();
  }

  @Query(() => [OfferLeasingVariant], { name: 'offerLeasingVariantsByOfferAdmin' })
  async findByOfferId(
    @Args('offerId', { type: () => ID }) offerId: string,
  ): Promise<OfferLeasingVariant[]> {
    return this.variantService.findByOfferId(offerId);
  }

  @Query(() => OfferLeasingVariant, { name: 'offerLeasingVariantAdmin' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<OfferLeasingVariant> {
    return this.variantService.findOne(id);
  }

  @Query(() => OfferLeasingVariant, { name: 'offerLeasingVariantBySlugAdmin', nullable: true })
  async findBySlug(
    @Args('offerId', { type: () => ID }) offerId: string,
    @Args('slug') slug: string,
  ): Promise<OfferLeasingVariant> {
    return this.variantService.findBySlug(offerId, slug);
  }

  @Mutation(() => OfferLeasingVariant)
  async createOfferLeasingVariant(
    @Args('input') input: CreateOfferLeasingVariantInput,
  ): Promise<OfferLeasingVariant> {
    return this.variantService.create(input);
  }

  @Mutation(() => OfferLeasingVariant)
  async updateOfferLeasingVariant(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateOfferLeasingVariantInput,
  ): Promise<OfferLeasingVariant> {
    return this.variantService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOfferLeasingVariant(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.variantService.remove(id);
  }
}
