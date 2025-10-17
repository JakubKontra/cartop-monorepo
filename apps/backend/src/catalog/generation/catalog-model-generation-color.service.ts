import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogModelGenerationColor } from './catalog-model-generation-color.entity';
import { CreateCatalogModelGenerationColorInput } from './dto/create-catalog-model-generation-color.input';
import { UpdateCatalogModelGenerationColorInput } from './dto/update-catalog-model-generation-color.input';

@Injectable()
export class CatalogModelGenerationColorService {
  constructor(
    @InjectRepository(CatalogModelGenerationColor)
    private readonly generationColorRepository: Repository<CatalogModelGenerationColor>,
  ) {}

  async create(input: CreateCatalogModelGenerationColorInput): Promise<CatalogModelGenerationColor> {
    const generationColor = this.generationColorRepository.create(input);
    const saved = await this.generationColorRepository.save(generationColor);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    generationId?: string,
    colorId?: string,
  ): Promise<CatalogModelGenerationColor[]> {
    const where: any = {};

    if (generationId) {
      where.generationId = generationId;
    }

    if (colorId) {
      where.colorId = colorId;
    }

    return this.generationColorRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['generation', 'color'],
    });
  }

  async findOne(id: string): Promise<CatalogModelGenerationColor> {
    const generationColor = await this.generationColorRepository.findOne({
      where: { id },
      relations: ['generation', 'color'],
    });

    if (!generationColor) {
      throw new NotFoundException(`Generation color with ID ${id} not found`);
    }

    return generationColor;
  }

  async findByGenerationId(generationId: string): Promise<CatalogModelGenerationColor[]> {
    return this.generationColorRepository.find({
      where: { generationId },
      order: { price: 'ASC' },
      relations: ['generation', 'color'],
    });
  }

  async findByColorId(colorId: string): Promise<CatalogModelGenerationColor[]> {
    return this.generationColorRepository.find({
      where: { colorId },
      order: { price: 'ASC' },
      relations: ['generation', 'color'],
    });
  }

  async update(id: string, input: UpdateCatalogModelGenerationColorInput): Promise<CatalogModelGenerationColor> {
    const generationColor = await this.findOne(id);
    Object.assign(generationColor, input);
    return this.generationColorRepository.save(generationColor);
  }

  async remove(id: string): Promise<boolean> {
    const generationColor = await this.findOne(id);
    await this.generationColorRepository.remove(generationColor);
    return true;
  }
}
