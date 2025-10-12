import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Offer,
  OperationalLeasingOffer,
  DirectPurchaseOffer,
  IndividualOffer,
} from './offer.entity';
import { CreateOperationalLeasingOfferInput } from './dto/create-operational-leasing-offer.input';
import { CreateDirectPurchaseOfferInput } from './dto/create-direct-purchase-offer.input';
import { CreateIndividualOfferInput } from './dto/create-individual-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { OfferFiltersInput } from './dto/offer-filters.input';
import { OfferType } from './enums/offer-type.enum';
import { IndividualOfferStatus } from './enums/individual-offer-status.enum';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  // === CREATE methods ===

  async createOperationalLeasing(
    input: CreateOperationalLeasingOfferInput,
  ): Promise<OperationalLeasingOffer> {
    // Check slug uniqueness
    if (input.slug) {
      await this.checkSlugUniqueness(input.slug);
    }

    const offer = this.offerRepository.create({
      ...input,
      type: OfferType.OPERATIONAL_LEASING,
      isPublic: true, // Always public
    });

    const saved = await this.offerRepository.save(offer);
    return this.findOne(saved.id) as Promise<OperationalLeasingOffer>;
  }

  async createDirectPurchase(
    input: CreateDirectPurchaseOfferInput,
  ): Promise<DirectPurchaseOffer> {
    // Check slug uniqueness
    if (input.slug) {
      await this.checkSlugUniqueness(input.slug);
    }

    const offer = this.offerRepository.create({
      ...input,
      type: OfferType.DIRECT_PURCHASE,
      isPublic: true, // Always public
    });

    const saved = await this.offerRepository.save(offer);
    return this.findOne(saved.id) as Promise<DirectPurchaseOffer>;
  }

  async createIndividual(input: CreateIndividualOfferInput): Promise<IndividualOffer> {
    // Check slug uniqueness
    if (input.slug) {
      await this.checkSlugUniqueness(input.slug);
    }

    const offer = this.offerRepository.create({
      ...input,
      type: OfferType.INDIVIDUAL,
      isPublic: false, // Always private (admin-only)
      status: input.status || IndividualOfferStatus.NEW,
    });

    const saved = await this.offerRepository.save(offer);
    return this.findOne(saved.id) as Promise<IndividualOffer>;
  }

  // === READ methods ===

  async findAll(filters?: OfferFiltersInput): Promise<Offer[]> {
    const query = this.offerRepository.createQueryBuilder('offer');

    // Apply filters
    if (filters) {
      this.applyFilters(query, filters);
    }

    // Relations
    query.leftJoinAndSelect('offer.modelGeneration', 'modelGeneration');
    query.leftJoinAndSelect('offer.brand', 'brand');
    query.leftJoinAndSelect('offer.model', 'model');
    query.leftJoinAndSelect('offer.customer', 'customer');
    query.leftJoinAndSelect('offer.assignedTo', 'assignedTo');

    // Order by creation date
    query.orderBy('offer.createdAt', 'DESC');

    // Pagination
    if (filters?.limit) {
      query.take(filters.limit);
    }
    if (filters?.offset) {
      query.skip(filters.offset);
    }

    return query.getMany();
  }

  async findPublicOffers(filters?: OfferFiltersInput): Promise<Offer[]> {
    const query = this.offerRepository.createQueryBuilder('offer');

    // MUST be public and exclude individual offers
    query.where('offer.isPublic = :isPublic', { isPublic: true });
    query.andWhere('offer.isActive = :isActive', { isActive: true });
    query.andWhere('offer.type != :individualType', {
      individualType: OfferType.INDIVIDUAL,
    });

    // Apply additional filters
    if (filters) {
      this.applyFilters(query, filters, true); // Skip isPublic filter
    }

    // Relations
    query.leftJoinAndSelect('offer.modelGeneration', 'modelGeneration');
    query.leftJoinAndSelect('offer.brand', 'brand');
    query.leftJoinAndSelect('offer.model', 'model');

    // Order
    query.orderBy('offer.createdAt', 'DESC');

    // Pagination
    if (filters?.limit) {
      query.take(filters.limit);
    }
    if (filters?.offset) {
      query.skip(filters.offset);
    }

    return query.getMany();
  }

  async findIndividualOffers(filters?: OfferFiltersInput): Promise<IndividualOffer[]> {
    const query = this.offerRepository.createQueryBuilder('offer');

    // MUST be individual type
    query.where('offer.type = :type', { type: OfferType.INDIVIDUAL });

    // Apply filters
    if (filters) {
      this.applyFilters(query, filters);
    }

    // Relations
    query.leftJoinAndSelect('offer.modelGeneration', 'modelGeneration');
    query.leftJoinAndSelect('offer.brand', 'brand');
    query.leftJoinAndSelect('offer.model', 'model');
    query.leftJoinAndSelect('offer.customer', 'customer');
    query.leftJoinAndSelect('offer.assignedTo', 'assignedTo');

    // Order by status priority
    query.orderBy('offer.status', 'ASC');
    query.addOrderBy('offer.createdAt', 'DESC');

    // Pagination
    if (filters?.limit) {
      query.take(filters.limit);
    }
    if (filters?.offset) {
      query.skip(filters.offset);
    }

    return query.getMany() as Promise<IndividualOffer[]>;
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['modelGeneration', 'brand', 'model', 'customer', 'assignedTo'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    return offer;
  }

  async findBySlug(slug: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { slug },
      relations: ['modelGeneration', 'brand', 'model', 'customer'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with slug ${slug} not found`);
    }

    return offer;
  }

  async findByType(type: OfferType): Promise<Offer[]> {
    return this.offerRepository.find({
      where: { type },
      relations: ['modelGeneration', 'brand', 'model', 'customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByModelGeneration(modelGenerationId: string): Promise<Offer[]> {
    return this.offerRepository.find({
      where: {
        modelGenerationId,
        isPublic: true,
        isActive: true,
      },
      relations: ['modelGeneration', 'brand', 'model'],
      order: { createdAt: 'DESC' },
    });
  }

  // === UPDATE methods ===

  async update(id: string, input: UpdateOfferInput): Promise<Offer> {
    const offer = await this.findOne(id);

    // Check slug uniqueness if changed
    if (input.slug && input.slug !== offer.slug) {
      await this.checkSlugUniqueness(input.slug);
    }

    Object.assign(offer, input);
    return this.offerRepository.save(offer);
  }

  async updateIndividualStatus(
    id: string,
    status: IndividualOfferStatus,
  ): Promise<IndividualOffer> {
    const offer = await this.findOne(id);

    if (offer.type !== OfferType.INDIVIDUAL) {
      throw new ConflictException('Can only update status for individual offers');
    }

    offer.status = status;
    return this.offerRepository.save(offer) as Promise<IndividualOffer>;
  }

  // === DELETE methods ===

  async remove(id: string): Promise<boolean> {
    const offer = await this.findOne(id);
    await this.offerRepository.remove(offer);
    return true;
  }

  // === HELPER methods ===

  private async checkSlugUniqueness(slug: string): Promise<void> {
    const existing = await this.offerRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Offer with slug "${slug}" already exists`);
    }
  }

  private applyFilters(query: any, filters: OfferFiltersInput, skipPublic = false): void {
    if (filters.type) {
      query.andWhere('offer.type = :type', { type: filters.type });
    }

    if (filters.modelGenerationId) {
      query.andWhere('offer.modelGenerationId = :modelGenerationId', {
        modelGenerationId: filters.modelGenerationId,
      });
    }

    if (filters.brandId) {
      query.andWhere('offer.brandId = :brandId', { brandId: filters.brandId });
    }

    if (filters.modelId) {
      query.andWhere('offer.modelId = :modelId', { modelId: filters.modelId });
    }

    if (typeof filters.isActive === 'boolean' && !skipPublic) {
      query.andWhere('offer.isActive = :isActive', { isActive: filters.isActive });
    }

    if (typeof filters.isPublic === 'boolean' && !skipPublic) {
      query.andWhere('offer.isPublic = :isPublic', { isPublic: filters.isPublic });
    }

    // Price range
    if (filters.priceMin && filters.priceMax) {
      query.andWhere('offer.totalPrice BETWEEN :priceMin AND :priceMax', {
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
      });
    } else if (filters.priceMin) {
      query.andWhere('offer.totalPrice >= :priceMin', { priceMin: filters.priceMin });
    } else if (filters.priceMax) {
      query.andWhere('offer.totalPrice <= :priceMax', { priceMax: filters.priceMax });
    }

    // Individual offer filters
    if (filters.status) {
      query.andWhere('offer.status = :status', { status: filters.status });
    }

    if (filters.customerId) {
      query.andWhere('offer.customerId = :customerId', {
        customerId: filters.customerId,
      });
    }

    if (filters.assignedToId) {
      query.andWhere('offer.assignedToId = :assignedToId', {
        assignedToId: filters.assignedToId,
      });
    }
  }
}
