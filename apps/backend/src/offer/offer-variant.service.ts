import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { OfferColorVariant } from './offer-color-variant.entity';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { OfferCalculation, OfferCalculationFeature } from './offer-calculation.entity';
import { OfferService } from './offer.service';
import { OfferType } from './enums/offer-type.enum';

/**
 * Service for managing offer variants (leasing variants, color variants, equipment, calculations)
 */
@Injectable()
export class OfferVariantService {
  constructor(
    @InjectRepository(OfferLeasingVariant)
    private readonly leasingVariantRepository: Repository<OfferLeasingVariant>,
    @InjectRepository(OfferColorVariant)
    private readonly colorVariantRepository: Repository<OfferColorVariant>,
    @InjectRepository(OfferOptionalEquipment)
    private readonly equipmentRepository: Repository<OfferOptionalEquipment>,
    @InjectRepository(OfferCalculation)
    private readonly calculationRepository: Repository<OfferCalculation>,
    @InjectRepository(OfferCalculationFeature)
    private readonly featureRepository: Repository<OfferCalculationFeature>,
    private readonly offerService: OfferService,
  ) {}

  // === LEASING VARIANTS ===

  async createLeasingVariant(data: Partial<OfferLeasingVariant>): Promise<OfferLeasingVariant> {
    // Verify offer exists and is operational leasing
    const offer = await this.offerService.findOne(data.offerId!);
    if (offer.type !== OfferType.OPERATIONAL_LEASING) {
      throw new BadRequestException('Can only add leasing variants to operational leasing offers');
    }

    // If this is marked as default, unset other defaults
    if (data.isDefault) {
      await this.leasingVariantRepository.update(
        { offerId: data.offerId },
        { isDefault: false },
      );
    }

    const variant = this.leasingVariantRepository.create(data);
    return this.leasingVariantRepository.save(variant);
  }

  async findLeasingVariantsByOffer(offerId: string): Promise<OfferLeasingVariant[]> {
    return this.leasingVariantRepository.find({
      where: { offerId },
      order: { isDefault: 'DESC', leasingDurationMonths: 'ASC' },
    });
  }

  async updateLeasingVariant(
    id: string,
    data: Partial<OfferLeasingVariant>,
  ): Promise<OfferLeasingVariant> {
    const variant = await this.leasingVariantRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Leasing variant with ID ${id} not found`);
    }

    // If setting as default, unset others
    if (data.isDefault && !variant.isDefault) {
      await this.leasingVariantRepository.update(
        { offerId: variant.offerId, id: { $ne: id } as any },
        { isDefault: false },
      );
    }

    Object.assign(variant, data);
    return this.leasingVariantRepository.save(variant);
  }

  async deleteLeasingVariant(id: string): Promise<boolean> {
    const variant = await this.leasingVariantRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Leasing variant with ID ${id} not found`);
    }

    await this.leasingVariantRepository.remove(variant);
    return true;
  }

  // === COLOR VARIANTS ===

  async createColorVariant(data: Partial<OfferColorVariant>): Promise<OfferColorVariant> {
    // Verify offer exists and is operational leasing
    const offer = await this.offerService.findOne(data.offerId!);
    if (offer.type !== OfferType.OPERATIONAL_LEASING) {
      throw new BadRequestException('Can only add color variants to operational leasing offers');
    }

    // If this is marked as default, unset other defaults
    if (data.isDefault) {
      await this.colorVariantRepository.update(
        { offerId: data.offerId },
        { isDefault: false },
      );
    }

    const variant = this.colorVariantRepository.create(data);
    return this.colorVariantRepository.save(variant);
  }

  async findColorVariantsByOffer(offerId: string): Promise<OfferColorVariant[]> {
    return this.colorVariantRepository.find({
      where: { offerId },
      relations: ['exteriorColor', 'interiorColor'],
      order: { isDefault: 'DESC', createdAt: 'ASC' },
    });
  }

  async updateColorVariant(
    id: string,
    data: Partial<OfferColorVariant>,
  ): Promise<OfferColorVariant> {
    const variant = await this.colorVariantRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Color variant with ID ${id} not found`);
    }

    // If setting as default, unset others
    if (data.isDefault && !variant.isDefault) {
      await this.colorVariantRepository.update(
        { offerId: variant.offerId, id: { $ne: id } as any },
        { isDefault: false },
      );
    }

    Object.assign(variant, data);
    return this.colorVariantRepository.save(variant);
  }

  async deleteColorVariant(id: string): Promise<boolean> {
    const variant = await this.colorVariantRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Color variant with ID ${id} not found`);
    }

    await this.colorVariantRepository.remove(variant);
    return true;
  }

  // === OPTIONAL EQUIPMENT ===

  async createOptionalEquipment(
    data: Partial<OfferOptionalEquipment>,
  ): Promise<OfferOptionalEquipment> {
    // Verify offer exists and is operational leasing
    const offer = await this.offerService.findOne(data.offerId!);
    if (offer.type !== OfferType.OPERATIONAL_LEASING) {
      throw new BadRequestException(
        'Can only add optional equipment to operational leasing offers',
      );
    }

    const equipment = this.equipmentRepository.create(data);
    return this.equipmentRepository.save(equipment);
  }

  async findOptionalEquipmentByOffer(offerId: string): Promise<OfferOptionalEquipment[]> {
    return this.equipmentRepository.find({
      where: { offerId },
      order: { createdAt: 'ASC' },
    });
  }

  async updateOptionalEquipment(
    id: string,
    data: Partial<OfferOptionalEquipment>,
  ): Promise<OfferOptionalEquipment> {
    const equipment = await this.equipmentRepository.findOne({ where: { id } });
    if (!equipment) {
      throw new NotFoundException(`Optional equipment with ID ${id} not found`);
    }

    Object.assign(equipment, data);
    return this.equipmentRepository.save(equipment);
  }

  async deleteOptionalEquipment(id: string): Promise<boolean> {
    const equipment = await this.equipmentRepository.findOne({ where: { id } });
    if (!equipment) {
      throw new NotFoundException(`Optional equipment with ID ${id} not found`);
    }

    await this.equipmentRepository.remove(equipment);
    return true;
  }

  // === CALCULATIONS (for Individual Offers) ===

  async createCalculation(data: Partial<OfferCalculation>): Promise<OfferCalculation> {
    // Verify offer exists and is individual
    const offer = await this.offerService.findOne(data.offerId!);
    if (offer.type !== OfferType.INDIVIDUAL) {
      throw new BadRequestException('Can only add calculations to individual offers');
    }

    const calculation = this.calculationRepository.create(data);
    return this.calculationRepository.save(calculation);
  }

  async findCalculationsByOffer(offerId: string): Promise<OfferCalculation[]> {
    return this.calculationRepository.find({
      where: { offerId },
      relations: ['features', 'exteriorColor', 'interiorColor'],
      order: { createdAt: 'DESC' },
    });
  }

  async addFeatureToCalculation(
    calculationId: string,
    featureName: string,
    featureDescription?: string,
  ): Promise<OfferCalculationFeature> {
    const calculation = await this.calculationRepository.findOne({
      where: { id: calculationId },
    });
    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${calculationId} not found`);
    }

    const feature = this.featureRepository.create({
      calculationId,
      featureName,
      featureDescription,
    });
    return this.featureRepository.save(feature);
  }

  async deleteCalculation(id: string): Promise<boolean> {
    const calculation = await this.calculationRepository.findOne({ where: { id } });
    if (!calculation) {
      throw new NotFoundException(`Calculation with ID ${id} not found`);
    }

    // Features will be cascade deleted
    await this.calculationRepository.remove(calculation);
    return true;
  }
}
