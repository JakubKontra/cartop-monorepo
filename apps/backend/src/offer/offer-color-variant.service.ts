import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferColorVariant } from './offer-color-variant.entity';
import { CreateOfferColorVariantInput } from './dto/create-offer-color-variant.input';
import { UpdateOfferColorVariantInput } from './dto/update-offer-color-variant.input';

@Injectable()
export class OfferColorVariantService {
  constructor(
    @InjectRepository(OfferColorVariant)
    private readonly colorVariantRepository: Repository<OfferColorVariant>,
  ) {}

  // === CREATE methods ===

  async create(input: CreateOfferColorVariantInput): Promise<OfferColorVariant> {
    // Check uniqueness of color combination for this offer
    await this.checkColorCombinationUniqueness(
      input.offerId,
      input.exteriorColorId,
      input.interiorColorId,
    );

    // If marked as default, remove default flag from other color variants
    if (input.isDefault) {
      await this.clearDefaultFlag(input.offerId);
    }

    const colorVariant = this.colorVariantRepository.create(input);
    return this.colorVariantRepository.save(colorVariant);
  }

  // === READ methods ===

  async findAll(): Promise<OfferColorVariant[]> {
    return this.colorVariantRepository.find({
      relations: ['offer', 'exteriorColor', 'interiorColor', 'gallery'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByOfferId(offerId: string): Promise<OfferColorVariant[]> {
    return this.colorVariantRepository.find({
      where: { offerId },
      relations: ['exteriorColor', 'interiorColor', 'gallery'],
      order: { isDefault: 'DESC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<OfferColorVariant> {
    const colorVariant = await this.colorVariantRepository.findOne({
      where: { id },
      relations: ['offer', 'exteriorColor', 'interiorColor', 'gallery'],
    });

    if (!colorVariant) {
      throw new NotFoundException(`Color variant with ID ${id} not found`);
    }

    return colorVariant;
  }

  async findDefaultByOfferId(offerId: string): Promise<OfferColorVariant | null> {
    return this.colorVariantRepository.findOne({
      where: { offerId, isDefault: true },
      relations: ['exteriorColor', 'interiorColor', 'gallery'],
    });
  }

  // === UPDATE methods ===

  async update(id: string, input: UpdateOfferColorVariantInput): Promise<OfferColorVariant> {
    const colorVariant = await this.findOne(id);

    // Check uniqueness of color combination if changed
    if (
      (input.exteriorColorId && input.exteriorColorId !== colorVariant.exteriorColorId) ||
      (input.interiorColorId !== undefined &&
        input.interiorColorId !== colorVariant.interiorColorId)
    ) {
      await this.checkColorCombinationUniqueness(
        colorVariant.offerId,
        input.exteriorColorId || colorVariant.exteriorColorId,
        input.interiorColorId !== undefined
          ? input.interiorColorId
          : colorVariant.interiorColorId,
        id, // Exclude current variant from uniqueness check
      );
    }

    // If marked as default, remove default flag from other color variants
    if (input.isDefault && !colorVariant.isDefault) {
      await this.clearDefaultFlag(colorVariant.offerId);
    }

    Object.assign(colorVariant, input);
    return this.colorVariantRepository.save(colorVariant);
  }

  // === DELETE methods ===

  async remove(id: string): Promise<boolean> {
    const colorVariant = await this.findOne(id);
    await this.colorVariantRepository.remove(colorVariant);
    return true;
  }

  // === HELPER methods ===

  private async checkColorCombinationUniqueness(
    offerId: string,
    exteriorColorId: string,
    interiorColorId: string | null | undefined,
    excludeId?: string,
  ): Promise<void> {
    const query = this.colorVariantRepository
      .createQueryBuilder('cv')
      .where('cv.offerId = :offerId', { offerId })
      .andWhere('cv.exteriorColorId = :exteriorColorId', { exteriorColorId });

    if (interiorColorId) {
      query.andWhere('cv.interiorColorId = :interiorColorId', { interiorColorId });
    } else {
      query.andWhere('cv.interiorColorId IS NULL');
    }

    if (excludeId) {
      query.andWhere('cv.id != :excludeId', { excludeId });
    }

    const existing = await query.getOne();

    if (existing) {
      throw new ConflictException(
        'This color combination already exists for this offer',
      );
    }
  }

  private async clearDefaultFlag(offerId: string): Promise<void> {
    await this.colorVariantRepository.update(
      { offerId, isDefault: true },
      { isDefault: false },
    );
  }
}
