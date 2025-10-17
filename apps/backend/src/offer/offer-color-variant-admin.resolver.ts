import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferColorVariantService } from './offer-color-variant.service';
import { CreateOfferColorVariantInput } from './dto/create-offer-color-variant.input';
import { UpdateOfferColorVariantInput } from './dto/update-offer-color-variant.input';

@Resolver(() => OfferColorVariant)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OfferColorVariantAdminResolver {
  constructor(private readonly colorVariantService: OfferColorVariantService) {}

  @Query(() => [OfferColorVariant], { name: 'offerColorVariantsAdmin' })
  async findAll(): Promise<OfferColorVariant[]> {
    return this.colorVariantService.findAll();
  }

  @Query(() => [OfferColorVariant], { name: 'offerColorVariantsByOfferAdmin' })
  async findByOfferId(
    @Args('offerId', { type: () => ID }) offerId: string,
  ): Promise<OfferColorVariant[]> {
    return this.colorVariantService.findByOfferId(offerId);
  }

  @Query(() => OfferColorVariant, { name: 'offerColorVariantAdmin' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<OfferColorVariant> {
    return this.colorVariantService.findOne(id);
  }

  @Mutation(() => OfferColorVariant)
  async createOfferColorVariant(
    @Args('input') input: CreateOfferColorVariantInput,
  ): Promise<OfferColorVariant> {
    return this.colorVariantService.create(input);
  }

  @Mutation(() => OfferColorVariant)
  async updateOfferColorVariant(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateOfferColorVariantInput,
  ): Promise<OfferColorVariant> {
    return this.colorVariantService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOfferColorVariant(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.colorVariantService.remove(id);
  }
}
