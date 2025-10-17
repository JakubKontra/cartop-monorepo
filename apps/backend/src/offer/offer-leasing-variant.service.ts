import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferLeasingVariant } from './offer-leasing-variant.entity';
import { CreateOfferLeasingVariantInput } from './dto/create-offer-leasing-variant.input';
import { UpdateOfferLeasingVariantInput } from './dto/update-offer-leasing-variant.input';

@Injectable()
export class OfferLeasingVariantService {
  constructor(
    @InjectRepository(OfferLeasingVariant)
    private readonly variantRepository: Repository<OfferLeasingVariant>,
  ) {}

  // === CREATE methods ===

  async create(input: CreateOfferLeasingVariantInput): Promise<OfferLeasingVariant> {
    // Check slug uniqueness for this offer
    await this.checkSlugUniqueness(input.offerId, input.slug);

    // If marked as default, remove default flag from other variants
    if (input.isDefault) {
      await this.clearDefaultFlag(input.offerId);
    }

    // If marked as best offer, remove best offer flag from other variants
    if (input.isBestOffer) {
      await this.clearBestOfferFlag(input.offerId);
    }

    const variant = this.variantRepository.create(input);
    return this.variantRepository.save(variant);
  }

  // === READ methods ===

  async findAll(): Promise<OfferLeasingVariant[]> {
    return this.variantRepository.find({
      relations: ['offer', 'leasingCompany'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByOfferId(offerId: string): Promise<OfferLeasingVariant[]> {
    return this.variantRepository.find({
      where: { offerId },
      relations: ['leasingCompany'],
      order: { isDefault: 'DESC', isBestOffer: 'DESC', priceWithVat: 'ASC' },
    });
  }

  async findOne(id: string): Promise<OfferLeasingVariant> {
    const variant = await this.variantRepository.findOne({
      where: { id },
      relations: ['offer', 'leasingCompany'],
    });

    if (!variant) {
      throw new NotFoundException(`Leasing variant with ID ${id} not found`);
    }

    return variant;
  }

  async findBySlug(offerId: string, slug: string): Promise<OfferLeasingVariant> {
    const variant = await this.variantRepository.findOne({
      where: { offerId, slug },
      relations: ['offer', 'leasingCompany'],
    });

    if (!variant) {
      throw new NotFoundException(
        `Leasing variant with slug "${slug}" not found for offer ${offerId}`,
      );
    }

    return variant;
  }

  async findDefaultByOfferId(offerId: string): Promise<OfferLeasingVariant | null> {
    return this.variantRepository.findOne({
      where: { offerId, isDefault: true },
      relations: ['leasingCompany'],
    });
  }

  async findBestOfferByOfferId(offerId: string): Promise<OfferLeasingVariant | null> {
    return this.variantRepository.findOne({
      where: { offerId, isBestOffer: true },
      relations: ['leasingCompany'],
    });
  }

  // === UPDATE methods ===

  async update(id: string, input: UpdateOfferLeasingVariantInput): Promise<OfferLeasingVariant> {
    const variant = await this.findOne(id);

    // Check slug uniqueness if changed
    if (input.slug && input.slug !== variant.slug) {
      await this.checkSlugUniqueness(variant.offerId, input.slug);
    }

    // If marked as default, remove default flag from other variants
    if (input.isDefault && !variant.isDefault) {
      await this.clearDefaultFlag(variant.offerId);
    }

    // If marked as best offer, remove best offer flag from other variants
    if (input.isBestOffer && !variant.isBestOffer) {
      await this.clearBestOfferFlag(variant.offerId);
    }

    Object.assign(variant, input);
    return this.variantRepository.save(variant);
  }

  // === DELETE methods ===

  async remove(id: string): Promise<boolean> {
    const variant = await this.findOne(id);
    await this.variantRepository.remove(variant);
    return true;
  }

  // === HELPER methods ===

  private async checkSlugUniqueness(offerId: string, slug: string): Promise<void> {
    const existing = await this.variantRepository.findOne({
      where: { offerId, slug },
    });

    if (existing) {
      throw new ConflictException(
        `Leasing variant with slug "${slug}" already exists for this offer`,
      );
    }
  }

  private async clearDefaultFlag(offerId: string): Promise<void> {
    await this.variantRepository.update(
      { offerId, isDefault: true },
      { isDefault: false },
    );
  }

  private async clearBestOfferFlag(offerId: string): Promise<void> {
    await this.variantRepository.update(
      { offerId, isBestOffer: true },
      { isBestOffer: false },
    );
  }
}
