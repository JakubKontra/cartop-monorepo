import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogBrand } from './catalog-brand.entity';
import { CreateCatalogBrandInput } from './dto/create-catalog-brand.input';
import { UpdateCatalogBrandInput } from './dto/update-catalog-brand.input';

@Injectable()
export class CatalogBrandService {
  constructor(
    @InjectRepository(CatalogBrand)
    private readonly brandRepository: Repository<CatalogBrand>,
  ) {}

  async create(input: CreateCatalogBrandInput): Promise<CatalogBrand> {
    // Check if slug already exists
    const existingBySlug = await this.brandRepository.findOne({
      where: { slug: input.slug },
    });

    if (existingBySlug) {
      throw new ConflictException('Brand with this slug already exists');
    }

    const brand = this.brandRepository.create(input);
    return this.brandRepository.save(brand);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    activeOnly: boolean = false,
  ): Promise<CatalogBrand[]> {
    const where = activeOnly ? { isActive: true } : {};

    return this.brandRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogBrand> {
    const brand = await this.brandRepository.findOne({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return brand;
  }

  async findBySlug(slug: string): Promise<CatalogBrand> {
    const brand = await this.brandRepository.findOne({ where: { slug } });

    if (!brand) {
      throw new NotFoundException(`Brand with slug ${slug} not found`);
    }

    return brand;
  }

  async search(query: string, limit: number = 20): Promise<CatalogBrand[]> {
    return this.brandRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { slug: ILike(`%${query}%`) },
      ],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(id: string, input: UpdateCatalogBrandInput): Promise<CatalogBrand> {
    const brand = await this.findOne(id);

    // Check slug uniqueness if being updated
    if (input.slug && input.slug !== brand.slug) {
      const existingBySlug = await this.brandRepository.findOne({
        where: { slug: input.slug },
      });

      if (existingBySlug) {
        throw new ConflictException('Brand with this slug already exists');
      }
    }

    Object.assign(brand, input);
    return this.brandRepository.save(brand);
  }

  async remove(id: string): Promise<boolean> {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand);
    return true;
  }

  async getHighlighted(): Promise<CatalogBrand[]> {
    return this.brandRepository.find({
      where: { isHighlighted: true, isActive: true },
      order: { name: 'ASC' },
    });
  }

  async getRecommended(): Promise<CatalogBrand[]> {
    return this.brandRepository.find({
      where: { isRecommended: true, isActive: true },
      order: { name: 'ASC' },
    });
  }

  /**
   * Check if a slug is available (not used by any brand)
   * Returns the existing brand if slug is taken, null if available
   * Used for form validation without throwing errors
   */
  async checkSlugAvailability(slug: string): Promise<CatalogBrand | null> {
    return this.brandRepository.findOne({ where: { slug } });
  }
}
