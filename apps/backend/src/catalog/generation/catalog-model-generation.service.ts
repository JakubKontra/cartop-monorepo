import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CreateCatalogModelGenerationInput } from './dto/create-catalog-model-generation.input';
import { UpdateCatalogModelGenerationInput } from './dto/update-catalog-model-generation.input';

@Injectable()
export class CatalogModelGenerationService {
  constructor(
    @InjectRepository(CatalogModelGeneration)
    private readonly generationRepository: Repository<CatalogModelGeneration>,
  ) {}

  async create(input: CreateCatalogModelGenerationInput): Promise<CatalogModelGeneration> {
    // Check if legacySlug already exists
    const existingByLegacySlug = await this.generationRepository.findOne({
      where: { legacySlug: input.legacySlug },
    });

    if (existingByLegacySlug) {
      throw new ConflictException('Generation with this legacySlug already exists');
    }

    // Check if slug already exists (if provided)
    if (input.slug) {
      const existingBySlug = await this.generationRepository.findOne({
        where: { slug: input.slug },
      });

      if (existingBySlug) {
        throw new ConflictException('Generation with this slug already exists');
      }
    }

    const generation = this.generationRepository.create(input);
    return this.generationRepository.save(generation);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    modelId?: string,
    isActive?: boolean,
  ): Promise<CatalogModelGeneration[]> {
    const where: any = {};

    if (modelId) {
      where.modelId = modelId;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    return this.generationRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['model', 'brand'],
    });
  }

  async findOne(id: string): Promise<CatalogModelGeneration> {
    const generation = await this.generationRepository.findOne({
      where: { id },
      relations: ['model', 'brand'],
    });

    if (!generation) {
      throw new NotFoundException(`Generation with ID ${id} not found`);
    }

    return generation;
  }

  async findBySlug(slug: string): Promise<CatalogModelGeneration> {
    const generation = await this.generationRepository.findOne({
      where: { slug },
      relations: ['model', 'brand'],
    });

    if (!generation) {
      throw new NotFoundException(`Generation with slug ${slug} not found`);
    }

    return generation;
  }

  async findByLegacySlug(legacySlug: string): Promise<CatalogModelGeneration> {
    const generation = await this.generationRepository.findOne({
      where: { legacySlug },
      relations: ['model', 'brand'],
    });

    if (!generation) {
      throw new NotFoundException(`Generation with legacySlug ${legacySlug} not found`);
    }

    return generation;
  }

  async findByModelId(modelId: string): Promise<CatalogModelGeneration[]> {
    return this.generationRepository.find({
      where: { modelId },
      order: { productionStart: 'DESC' },
      relations: ['model', 'brand'],
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogModelGeneration[]> {
    return this.generationRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { slug: ILike(`%${query}%`) },
        { legacySlug: ILike(`%${query}%`) },
      ],
      take: limit,
      order: { name: 'ASC' },
      relations: ['model', 'brand'],
    });
  }

  async update(id: string, input: UpdateCatalogModelGenerationInput): Promise<CatalogModelGeneration> {
    const generation = await this.findOne(id);

    // Check legacySlug uniqueness if being updated
    if (input.legacySlug && input.legacySlug !== generation.legacySlug) {
      const existingByLegacySlug = await this.generationRepository.findOne({
        where: { legacySlug: input.legacySlug },
      });

      if (existingByLegacySlug) {
        throw new ConflictException('Generation with this legacySlug already exists');
      }
    }

    // Check slug uniqueness if being updated
    if (input.slug && input.slug !== generation.slug) {
      const existingBySlug = await this.generationRepository.findOne({
        where: { slug: input.slug },
      });

      if (existingBySlug) {
        throw new ConflictException('Generation with this slug already exists');
      }
    }

    Object.assign(generation, input);
    return this.generationRepository.save(generation);
  }

  async remove(id: string): Promise<boolean> {
    const generation = await this.findOne(id);
    await this.generationRepository.remove(generation);
    return true;
  }
}
