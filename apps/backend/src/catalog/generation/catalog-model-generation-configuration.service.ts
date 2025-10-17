import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogModelGenerationConfiguration } from './catalog-model-generation-configuration.entity';
import { CreateCatalogModelGenerationConfigurationInput } from './dto/create-catalog-model-generation-configuration.input';
import { UpdateCatalogModelGenerationConfigurationInput } from './dto/update-catalog-model-generation-configuration.input';

@Injectable()
export class CatalogModelGenerationConfigurationService {
  constructor(
    @InjectRepository(CatalogModelGenerationConfiguration)
    private readonly configurationRepository: Repository<CatalogModelGenerationConfiguration>,
  ) {}

  async create(input: CreateCatalogModelGenerationConfigurationInput): Promise<CatalogModelGenerationConfiguration> {
    const configuration = this.configurationRepository.create(input);
    const saved = await this.configurationRepository.save(configuration);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    generationId?: string,
    equipmentId?: string,
    engineId?: string,
    active?: boolean,
  ): Promise<CatalogModelGenerationConfiguration[]> {
    const where: any = {};

    if (generationId) {
      where.generationId = generationId;
    }

    if (equipmentId) {
      where.equipmentId = equipmentId;
    }

    if (engineId) {
      where.engineId = engineId;
    }

    if (typeof active === 'boolean') {
      where.active = active;
    }

    return this.configurationRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { priceFrom: 'ASC' },
      relations: ['generation', 'equipment', 'engine'],
    });
  }

  async findOne(id: string): Promise<CatalogModelGenerationConfiguration> {
    const configuration = await this.configurationRepository.findOne({
      where: { id },
      relations: ['generation', 'equipment', 'engine'],
    });

    if (!configuration) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }

    return configuration;
  }

  async findByGenerationId(generationId: string): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationRepository.find({
      where: { generationId },
      order: { priceFrom: 'ASC' },
      relations: ['generation', 'equipment', 'engine'],
    });
  }

  async findByEquipmentId(equipmentId: string): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationRepository.find({
      where: { equipmentId },
      order: { priceFrom: 'ASC' },
      relations: ['generation', 'equipment', 'engine'],
    });
  }

  async findByEngineId(engineId: string): Promise<CatalogModelGenerationConfiguration[]> {
    return this.configurationRepository.find({
      where: { engineId },
      order: { priceFrom: 'ASC' },
      relations: ['generation', 'equipment', 'engine'],
    });
  }

  async update(id: string, input: UpdateCatalogModelGenerationConfigurationInput): Promise<CatalogModelGenerationConfiguration> {
    const configuration = await this.findOne(id);
    Object.assign(configuration, input);
    return this.configurationRepository.save(configuration);
  }

  async remove(id: string): Promise<boolean> {
    const configuration = await this.findOne(id);
    await this.configurationRepository.remove(configuration);
    return true;
  }
}
