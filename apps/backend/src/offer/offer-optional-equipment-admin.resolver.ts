import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferOptionalEquipmentService } from './offer-optional-equipment.service';
import { CreateOfferOptionalEquipmentInput } from './dto/create-offer-optional-equipment.input';
import { UpdateOfferOptionalEquipmentInput } from './dto/update-offer-optional-equipment.input';

@Resolver(() => OfferOptionalEquipment)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OfferOptionalEquipmentAdminResolver {
  constructor(private readonly optionalEquipmentService: OfferOptionalEquipmentService) {}

  @Query(() => [OfferOptionalEquipment], { name: 'offerOptionalEquipmentListAdmin' })
  async findAll(): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentService.findAll();
  }

  @Query(() => [OfferOptionalEquipment], { name: 'offerOptionalEquipmentByOfferAdmin' })
  async findByOfferId(
    @Args('offerId', { type: () => ID }) offerId: string,
  ): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentService.findByOfferId(offerId);
  }

  @Query(() => [OfferOptionalEquipment], { name: 'offerOptionalEquipmentAvailableByOfferAdmin' })
  async findAvailableByOfferId(
    @Args('offerId', { type: () => ID }) offerId: string,
  ): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentService.findAvailableByOfferId(offerId);
  }

  @Query(() => OfferOptionalEquipment, { name: 'offerOptionalEquipmentAdmin' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<OfferOptionalEquipment> {
    return this.optionalEquipmentService.findOne(id);
  }

  @Mutation(() => OfferOptionalEquipment)
  async createOfferOptionalEquipment(
    @Args('input') input: CreateOfferOptionalEquipmentInput,
  ): Promise<OfferOptionalEquipment> {
    return this.optionalEquipmentService.create(input);
  }

  @Mutation(() => OfferOptionalEquipment)
  async updateOfferOptionalEquipment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateOfferOptionalEquipmentInput,
  ): Promise<OfferOptionalEquipment> {
    return this.optionalEquipmentService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOfferOptionalEquipment(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.optionalEquipmentService.remove(id);
  }
}
