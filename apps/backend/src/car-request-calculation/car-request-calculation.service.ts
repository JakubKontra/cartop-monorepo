import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CarRequestCalculation } from './entities/car-request-calculation.entity';
import { CarRequestCalculationOffer } from './entities/car-request-calculation-offer.entity';
import { CarRequestCalculationItem } from './entities/car-request-calculation-item.entity';
import { CarRequestCalculationStatus } from './enums/car-request-calculation-status.enum';
import { CarRequestCalculationOfferStatus } from './enums/car-request-calculation-offer-status.enum';
import { CreateCalculationInput } from './dto/create-calculation.input';
import { UpdateCalculationInput } from './dto/update-calculation.input';
import { AddOfferQuoteInput } from './dto/add-offer-quote.input';
import { UpdateOfferQuoteInput } from './dto/update-offer-quote.input';

@Injectable()
export class CarRequestCalculationService {
  constructor(
    @InjectRepository(CarRequestCalculation)
    private calculationRepository: Repository<CarRequestCalculation>,
    @InjectRepository(CarRequestCalculationOffer)
    private offerRepository: Repository<CarRequestCalculationOffer>,
    @InjectRepository(CarRequestCalculationItem)
    private itemRepository: Repository<CarRequestCalculationItem>,
    private dataSource: DataSource,
  ) {}

  async createCalculation(
    input: CreateCalculationInput,
    requestedById: string,
  ): Promise<CarRequestCalculation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const calculation = this.calculationRepository.create({
        carRequestId: input.carRequestId,
        requestedById,
        durationMonths: input.durationMonths,
        annualMileageKm: input.annualMileageKm,
        deliveryExpectedAt: input.deliveryExpectedAt,
        notes: input.notes,
        internalNotes: input.internalNotes,
        metadata: input.metadata,
        status: CarRequestCalculationStatus.DRAFT,
        version: 1,
      });

      const savedCalculation = await queryRunner.manager.save(calculation);

      if (input.items && input.items.length > 0) {
        const items = input.items.map((itemInput, index) =>
          this.itemRepository.create({
            calculationId: savedCalculation.id,
            itemType: itemInput.itemType as any,
            name: itemInput.name,
            description: itemInput.description,
            catalogColorId: itemInput.catalogColorId,
            priceImpact: itemInput.priceImpact,
            isRequired: itemInput.isRequired ?? false,
            isIncluded: itemInput.isIncluded ?? true,
            displayOrder: itemInput.displayOrder ?? index,
            metadata: itemInput.metadata,
          }),
        );

        await queryRunner.manager.save(items);
      }

      await queryRunner.commitTransaction();

      return this.findOne(savedCalculation.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateCalculation(
    id: string,
    input: UpdateCalculationInput,
  ): Promise<CarRequestCalculation> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    if (calculation.status === CarRequestCalculationStatus.COMPLETED) {
      throw new BadRequestException('Cannot update completed calculation');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      Object.assign(calculation, {
        durationMonths: input.durationMonths ?? calculation.durationMonths,
        annualMileageKm: input.annualMileageKm ?? calculation.annualMileageKm,
        deliveryExpectedAt: input.deliveryExpectedAt ?? calculation.deliveryExpectedAt,
        notes: input.notes ?? calculation.notes,
        internalNotes: input.internalNotes ?? calculation.internalNotes,
        assignedToId: input.assignedToId ?? calculation.assignedToId,
        metadata: input.metadata ?? calculation.metadata,
      });

      await queryRunner.manager.save(calculation);

      if (input.items) {
        await queryRunner.manager.delete(CarRequestCalculationItem, {
          calculationId: id,
        });

        if (input.items.length > 0) {
          const items = input.items.map((itemInput, index) =>
            this.itemRepository.create({
              calculationId: id,
              itemType: itemInput.itemType as any,
              name: itemInput.name,
              description: itemInput.description,
              catalogColorId: itemInput.catalogColorId,
              priceImpact: itemInput.priceImpact,
              isRequired: itemInput.isRequired ?? false,
              isIncluded: itemInput.isIncluded ?? true,
              displayOrder: itemInput.displayOrder ?? index,
              metadata: itemInput.metadata,
            }),
          );

          await queryRunner.manager.save(items);
        }
      }

      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async submitCalculation(id: string): Promise<CarRequestCalculation> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    if (calculation.status !== CarRequestCalculationStatus.DRAFT) {
      throw new BadRequestException('Only draft calculations can be submitted');
    }

    calculation.status = CarRequestCalculationStatus.SUBMITTED;
    calculation.submittedAt = new Date();

    await this.calculationRepository.save(calculation);

    return this.findOne(id);
  }

  async startProcessing(id: string, assignedToId: string): Promise<CarRequestCalculation> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    if (calculation.status !== CarRequestCalculationStatus.SUBMITTED) {
      throw new BadRequestException('Only submitted calculations can be processed');
    }

    calculation.status = CarRequestCalculationStatus.IN_PROGRESS;
    calculation.assignedToId = assignedToId;

    await this.calculationRepository.save(calculation);

    return this.findOne(id);
  }

  async completeCalculation(id: string): Promise<CarRequestCalculation> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
      relations: ['offers'],
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    const hasQuotes = calculation.offers.some(
      (offer) => offer.status === CarRequestCalculationOfferStatus.QUOTED,
    );

    if (!hasQuotes) {
      throw new BadRequestException('Calculation must have at least one quote to be completed');
    }

    calculation.status = CarRequestCalculationStatus.COMPLETED;
    calculation.completedAt = new Date();

    await this.calculationRepository.save(calculation);

    return this.findOne(id);
  }

  async addOfferQuote(input: AddOfferQuoteInput, quotedById: string): Promise<CarRequestCalculationOffer> {
    const calculation = await this.calculationRepository.findOne({
      where: { id: input.calculationId },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${input.calculationId} not found`);
    }

    const existingOffer = await this.offerRepository.findOne({
      where: {
        calculationId: input.calculationId,
        leasingCompanyId: input.leasingCompanyId,
      },
    });

    if (existingOffer) {
      throw new BadRequestException(
        'Offer from this leasing company already exists for this calculation',
      );
    }

    const offer = this.offerRepository.create({
      calculationId: input.calculationId,
      leasingCompanyId: input.leasingCompanyId,
      monthlyPayment: input.monthlyPayment,
      downPayment: input.downPayment,
      totalPrice: input.totalPrice,
      interestRate: input.interestRate,
      adminFee: input.adminFee,
      includesService: input.includesService,
      includesWinterTires: input.includesWinterTires,
      includesGap: input.includesGap,
      includesAssistance: input.includesAssistance,
      termsAndConditions: input.termsAndConditions,
      validUntil: input.validUntil,
      notes: input.notes,
      metadata: input.metadata,
      status: CarRequestCalculationOfferStatus.QUOTED,
      quotedById,
      quotedAt: new Date(),
    });

    const savedOffer = await this.offerRepository.save(offer);

    return this.offerRepository.findOne({
      where: { id: savedOffer.id },
      relations: ['calculation', 'leasingCompany', 'quotedBy'],
    });
  }

  async updateOfferQuote(
    offerId: string,
    input: UpdateOfferQuoteInput,
  ): Promise<CarRequestCalculationOffer> {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }

    Object.assign(offer, {
      monthlyPayment: input.monthlyPayment ?? offer.monthlyPayment,
      downPayment: input.downPayment ?? offer.downPayment,
      totalPrice: input.totalPrice ?? offer.totalPrice,
      interestRate: input.interestRate ?? offer.interestRate,
      adminFee: input.adminFee ?? offer.adminFee,
      includesService: input.includesService ?? offer.includesService,
      includesWinterTires: input.includesWinterTires ?? offer.includesWinterTires,
      includesGap: input.includesGap ?? offer.includesGap,
      includesAssistance: input.includesAssistance ?? offer.includesAssistance,
      termsAndConditions: input.termsAndConditions ?? offer.termsAndConditions,
      validUntil: input.validUntil ?? offer.validUntil,
      notes: input.notes ?? offer.notes,
      metadata: input.metadata ?? offer.metadata,
    });

    await this.offerRepository.save(offer);

    return this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['calculation', 'leasingCompany', 'quotedBy'],
    });
  }

  async findOne(id: string): Promise<CarRequestCalculation> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
      relations: [
        'carRequest',
        'requestedBy',
        'assignedTo',
        'offers',
        'offers.leasingCompany',
        'offers.quotedBy',
        'items',
        'items.catalogColor',
      ],
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    return calculation;
  }

  async findByCarRequest(carRequestId: string): Promise<CarRequestCalculation[]> {
    return this.calculationRepository.find({
      where: { carRequestId },
      relations: [
        'requestedBy',
        'assignedTo',
        'offers',
        'offers.leasingCompany',
        'items',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async findPendingCalculations(): Promise<CarRequestCalculation[]> {
    return this.calculationRepository.find({
      where: [
        { status: CarRequestCalculationStatus.SUBMITTED },
        { status: CarRequestCalculationStatus.IN_PROGRESS },
      ],
      relations: [
        'carRequest',
        'requestedBy',
        'assignedTo',
        'offers',
        'items',
      ],
      order: { submittedAt: 'ASC' },
    });
  }

  async deleteCalculation(id: string): Promise<boolean> {
    const calculation = await this.calculationRepository.findOne({
      where: { id },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    if (calculation.status === CarRequestCalculationStatus.COMPLETED) {
      throw new BadRequestException('Cannot delete completed calculation');
    }

    await this.calculationRepository.remove(calculation);

    return true;
  }
}
