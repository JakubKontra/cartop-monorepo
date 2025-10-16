import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CarRequestCalculation } from './entities/car-request-calculation.entity';
import { CarRequestCalculationOffer } from './entities/car-request-calculation-offer.entity';
import { CarRequestCalculationService } from './car-request-calculation.service';
import { CreateCalculationInput } from './dto/create-calculation.input';
import { UpdateCalculationInput } from './dto/update-calculation.input';
import { AddOfferQuoteInput } from './dto/add-offer-quote.input';
import { UpdateOfferQuoteInput } from './dto/update-offer-quote.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/auth/current-user.decorator';
import { User } from '../model/user/user.entity';

@Resolver(() => CarRequestCalculation)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarRequestCalculationAdminResolver {
  constructor(
    private readonly calculationService: CarRequestCalculationService,
  ) {}

  @Mutation(() => CarRequestCalculation)
  async createCalculation(
    @Args('input') input: CreateCalculationInput,
    @CurrentUser() user: User,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.createCalculation(input, user.id);
  }

  @Mutation(() => CarRequestCalculation)
  async updateCalculation(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCalculationInput,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.updateCalculation(id, input);
  }

  @Mutation(() => CarRequestCalculation)
  async submitCalculation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.submitCalculation(id);
  }

  @Mutation(() => CarRequestCalculation)
  async startProcessingCalculation(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.startProcessing(id, user.id);
  }

  @Mutation(() => CarRequestCalculation)
  async completeCalculation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.completeCalculation(id);
  }

  @Mutation(() => CarRequestCalculationOffer)
  async addOfferQuote(
    @Args('input') input: AddOfferQuoteInput,
    @CurrentUser() user: User,
  ): Promise<CarRequestCalculationOffer> {
    return this.calculationService.addOfferQuote(input, user.id);
  }

  @Mutation(() => CarRequestCalculationOffer)
  async updateOfferQuote(
    @Args('offerId', { type: () => ID }) offerId: string,
    @Args('input') input: UpdateOfferQuoteInput,
  ): Promise<CarRequestCalculationOffer> {
    return this.calculationService.updateOfferQuote(offerId, input);
  }

  @Mutation(() => Boolean)
  async deleteCalculation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.calculationService.deleteCalculation(id);
  }

  @Query(() => CarRequestCalculation, { nullable: true })
  async calculation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CarRequestCalculation> {
    return this.calculationService.findOne(id);
  }

  @Query(() => [CarRequestCalculation])
  async calculationsByCarRequest(
    @Args('carRequestId', { type: () => ID }) carRequestId: string,
  ): Promise<CarRequestCalculation[]> {
    return this.calculationService.findByCarRequest(carRequestId);
  }

  @Query(() => [CarRequestCalculation])
  async pendingCalculations(): Promise<CarRequestCalculation[]> {
    return this.calculationService.findPendingCalculations();
  }
}
