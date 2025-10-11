import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogModel } from './catalog-model.entity';
import { CreateCatalogModelInput } from './dto/create-catalog-model.input';
import { UpdateCatalogModelInput } from './dto/update-catalog-model.input';

@Injectable()
export class CatalogModelService {
  constructor(
    @InjectRepository(CatalogModel)
    private readonly modelRepository: Repository<CatalogModel>,
  ) {}

  async create(input: CreateCatalogModelInput): Promise<CatalogModel> {
    // Check if slug already exists
    const existingBySlug = await this.modelRepository.findOne({
      where: { slug: input.slug },
    });

    if (existingBySlug) {
      throw new ConflictException('Model with this slug already exists');
    }

    const model = this.modelRepository.create(input);
    return this.modelRepository.save(model);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    activeOnly: boolean = false,
  ): Promise<CatalogModel[]> {
    const where = activeOnly ? { isActive: true } : {};

    return this.modelRepository.find({
      where,
      relations: ['brand'],
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogModel> {
    const model = await this.modelRepository.findOne({
      where: { id },
      relations: ['brand'],
    });

    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }

    return model;
  }

  async findBySlug(slug: string): Promise<CatalogModel> {
    const model = await this.modelRepository.findOne({
      where: { slug },
      relations: ['brand'],
    });

    if (!model) {
      throw new NotFoundException(`Model with slug ${slug} not found`);
    }

    return model;
  }

  async findByBrand(brandId: string, limit: number = 50): Promise<CatalogModel[]> {
    return this.modelRepository.find({
      where: { brandId, isActive: true },
      relations: ['brand'],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogModel[]> {
    return this.modelRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { slug: ILike(`%${query}%`) },
      ],
      relations: ['brand'],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(id: string, input: UpdateCatalogModelInput): Promise<CatalogModel> {
    const model = await this.findOne(id);

    // Check slug uniqueness if being updated
    if (input.slug && input.slug !== model.slug) {
      const existingBySlug = await this.modelRepository.findOne({
        where: { slug: input.slug },
      });

      if (existingBySlug) {
        throw new ConflictException('Model with this slug already exists');
      }
    }

    Object.assign(model, input);
    return this.modelRepository.save(model);
  }

  async remove(id: string): Promise<boolean> {
    const model = await this.findOne(id);
    await this.modelRepository.remove(model);
    return true;
  }

  async getHighlighted(): Promise<CatalogModel[]> {
    return this.modelRepository.find({
      where: { isHighlighted: true, isActive: true },
      relations: ['brand'],
      order: { name: 'ASC' },
    });
  }

  async getRecommended(): Promise<CatalogModel[]> {
    return this.modelRepository.find({
      where: { isRecommended: true, isActive: true },
      relations: ['brand'],
      order: { name: 'ASC' },
    });
  }
}
