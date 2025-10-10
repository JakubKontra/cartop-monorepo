import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogColor } from './catalog-color.entity';
import { CreateCatalogColorInput } from './dto/create-catalog-color.input';
import { UpdateCatalogColorInput } from './dto/update-catalog-color.input';
import { CatalogColorType } from '../../common/enums/catalog/catalog-color-type.enum';

@Injectable()
export class CatalogColorService {
  constructor(
    @InjectRepository(CatalogColor)
    private readonly colorRepository: Repository<CatalogColor>,
  ) {}

  async create(input: CreateCatalogColorInput): Promise<CatalogColor> {
    // Check if slug already exists
    const existingBySlug = await this.colorRepository.findOne({
      where: { slug: input.slug },
    });

    if (existingBySlug) {
      throw new ConflictException('Color with this slug already exists');
    }

    const color = this.colorRepository.create(input);
    return this.colorRepository.save(color);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    type?: CatalogColorType,
  ): Promise<CatalogColor[]> {
    const where = type ? { type } : {};

    return this.colorRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogColor> {
    const color = await this.colorRepository.findOne({ where: { id } });

    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }

    return color;
  }

  async findBySlug(slug: string): Promise<CatalogColor> {
    const color = await this.colorRepository.findOne({ where: { slug } });

    if (!color) {
      throw new NotFoundException(`Color with slug ${slug} not found`);
    }

    return color;
  }

  async findByType(type: CatalogColorType): Promise<CatalogColor[]> {
    return this.colorRepository.find({
      where: { type },
      order: { name: 'ASC' },
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogColor[]> {
    return this.colorRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { slug: ILike(`%${query}%`) },
      ],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(id: string, input: UpdateCatalogColorInput): Promise<CatalogColor> {
    const color = await this.findOne(id);

    // Check slug uniqueness if being updated
    if (input.slug && input.slug !== color.slug) {
      const existingBySlug = await this.colorRepository.findOne({
        where: { slug: input.slug },
      });

      if (existingBySlug) {
        throw new ConflictException('Color with this slug already exists');
      }
    }

    Object.assign(color, input);
    return this.colorRepository.save(color);
  }

  async remove(id: string): Promise<boolean> {
    const color = await this.findOne(id);
    await this.colorRepository.remove(color);
    return true;
  }
}
