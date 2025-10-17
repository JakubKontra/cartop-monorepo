import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { OfferAdditionalEquipmentItem } from './offer-additional-equipment-item.entity';
import { OfferAdditionalEquipmentItemService } from './offer-additional-equipment-item.service';
import { CreateOfferAdditionalEquipmentItemInput } from './dto/create-offer-additional-equipment-item.input';
import { UpdateOfferAdditionalEquipmentItemInput } from './dto/update-offer-additional-equipment-item.input';

@Resolver(() => OfferAdditionalEquipmentItem)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OfferAdditionalEquipmentItemAdminResolver {
  constructor(private readonly equipmentItemService: OfferAdditionalEquipmentItemService) {}

  @Query(() => [OfferAdditionalEquipmentItem], { name: 'offerAdditionalEquipmentItemsAdmin' })
  async findAll(): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemService.findAll();
  }

  @Query(() => [OfferAdditionalEquipmentItem], {
    name: 'offerAdditionalEquipmentItemsByCategoryAdmin',
  })
  async findByCategory(
    @Args('category') category: string,
  ): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemService.findByCategory(category);
  }

  @Query(() => OfferAdditionalEquipmentItem, { name: 'offerAdditionalEquipmentItemAdmin' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<OfferAdditionalEquipmentItem> {
    return this.equipmentItemService.findOne(id);
  }

  @Query(() => [OfferAdditionalEquipmentItem], { name: 'searchOfferAdditionalEquipmentItemsAdmin' })
  async search(@Args('searchTerm') searchTerm: string): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemService.search(searchTerm);
  }

  @Mutation(() => OfferAdditionalEquipmentItem)
  async createOfferAdditionalEquipmentItem(
    @Args('input') input: CreateOfferAdditionalEquipmentItemInput,
  ): Promise<OfferAdditionalEquipmentItem> {
    return this.equipmentItemService.create(input);
  }

  @Mutation(() => OfferAdditionalEquipmentItem)
  async updateOfferAdditionalEquipmentItem(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateOfferAdditionalEquipmentItemInput,
  ): Promise<OfferAdditionalEquipmentItem> {
    return this.equipmentItemService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOfferAdditionalEquipmentItem(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.equipmentItemService.remove(id);
  }
}
