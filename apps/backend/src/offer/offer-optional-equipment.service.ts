import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferOptionalEquipment } from './offer-optional-equipment.entity';
import { CreateOfferOptionalEquipmentInput } from './dto/create-offer-optional-equipment.input';
import { UpdateOfferOptionalEquipmentInput } from './dto/update-offer-optional-equipment.input';

@Injectable()
export class OfferOptionalEquipmentService {
  constructor(
    @InjectRepository(OfferOptionalEquipment)
    private readonly optionalEquipmentRepository: Repository<OfferOptionalEquipment>,
  ) {}

  // === CREATE methods ===

  async create(input: CreateOfferOptionalEquipmentInput): Promise<OfferOptionalEquipment> {
    // Check uniqueness of equipment item for this offer
    await this.checkUniqueness(input.offerId, input.equipmentItemId);

    const optionalEquipment = this.optionalEquipmentRepository.create(input);
    return this.optionalEquipmentRepository.save(optionalEquipment);
  }

  // === READ methods ===

  async findAll(): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentRepository.find({
      relations: ['offer', 'equipmentItem'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByOfferId(offerId: string): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentRepository.find({
      where: { offerId },
      relations: ['equipmentItem'],
      order: { isDefaultSelected: 'DESC', isAvailable: 'DESC' },
    });
  }

  async findAvailableByOfferId(offerId: string): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentRepository.find({
      where: { offerId, isAvailable: true },
      relations: ['equipmentItem'],
      order: { isDefaultSelected: 'DESC' },
    });
  }

  async findDefaultSelectedByOfferId(offerId: string): Promise<OfferOptionalEquipment[]> {
    return this.optionalEquipmentRepository.find({
      where: { offerId, isDefaultSelected: true, isAvailable: true },
      relations: ['equipmentItem'],
    });
  }

  async findOne(id: string): Promise<OfferOptionalEquipment> {
    const optionalEquipment = await this.optionalEquipmentRepository.findOne({
      where: { id },
      relations: ['offer', 'equipmentItem'],
    });

    if (!optionalEquipment) {
      throw new NotFoundException(`Optional equipment with ID ${id} not found`);
    }

    return optionalEquipment;
  }

  async findByOfferAndEquipmentItem(
    offerId: string,
    equipmentItemId: string,
  ): Promise<OfferOptionalEquipment | null> {
    return this.optionalEquipmentRepository.findOne({
      where: { offerId, equipmentItemId },
      relations: ['equipmentItem'],
    });
  }

  // === UPDATE methods ===

  async update(
    id: string,
    input: UpdateOfferOptionalEquipmentInput,
  ): Promise<OfferOptionalEquipment> {
    const optionalEquipment = await this.findOne(id);
    Object.assign(optionalEquipment, input);
    return this.optionalEquipmentRepository.save(optionalEquipment);
  }

  // === DELETE methods ===

  async remove(id: string): Promise<boolean> {
    const optionalEquipment = await this.findOne(id);
    await this.optionalEquipmentRepository.remove(optionalEquipment);
    return true;
  }

  async removeByOfferAndEquipmentItem(
    offerId: string,
    equipmentItemId: string,
  ): Promise<boolean> {
    const optionalEquipment = await this.findByOfferAndEquipmentItem(
      offerId,
      equipmentItemId,
    );

    if (!optionalEquipment) {
      throw new NotFoundException(
        `Optional equipment not found for offer ${offerId} and equipment item ${equipmentItemId}`,
      );
    }

    await this.optionalEquipmentRepository.remove(optionalEquipment);
    return true;
  }

  // === HELPER methods ===

  private async checkUniqueness(offerId: string, equipmentItemId: string): Promise<void> {
    const existing = await this.optionalEquipmentRepository.findOne({
      where: { offerId, equipmentItemId },
    });

    if (existing) {
      throw new ConflictException(
        'This equipment item is already assigned to this offer',
      );
    }
  }
}
