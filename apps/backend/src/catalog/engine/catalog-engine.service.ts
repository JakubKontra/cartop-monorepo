import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { CatalogEngine } from './catalog-engine.entity';
import { CatalogModelGeneration } from '../generation/catalog-model-generation.entity';
import { CreateCatalogEngineInput } from './dto/create-catalog-engine.input';
import { UpdateCatalogEngineInput } from './dto/update-catalog-engine.input';
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from '../../common/enums/catalog';

@Injectable()
export class CatalogEngineService {
  constructor(
    @InjectRepository(CatalogEngine)
    private readonly engineRepository: Repository<CatalogEngine>,
    @InjectRepository(CatalogModelGeneration)
    private readonly generationRepository: Repository<CatalogModelGeneration>,
  ) {}

  async create(input: CreateCatalogEngineInput): Promise<CatalogEngine> {
    // Verify generation exists
    const generation = await this.generationRepository.findOne({
      where: { id: input.generationId },
    });

    if (!generation) {
      throw new NotFoundException(`Generation with ID ${input.generationId} not found`);
    }

    const engine = this.engineRepository.create(input);
    const saved = await this.engineRepository.save(engine);
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    generationId?: string,
    fuelType?: CatalogEngineFuelType,
    transmissionType?: CatalogEngineTransmissionType,
    driveType?: CatalogEngineDriveType,
    activeOnly: boolean = false,
    recommendedOnly: boolean = false,
  ): Promise<CatalogEngine[]> {
    const where: FindOptionsWhere<CatalogEngine> = {};

    if (generationId) where.generationId = generationId;
    if (fuelType) where.fuelType = fuelType;
    if (transmissionType) where.transmissionType = transmissionType;
    if (driveType) where.driveType = driveType;
    if (activeOnly) where.active = true;
    if (recommendedOnly) where.recommended = true;

    return this.engineRepository.find({
      where,
      relations: ['generation'],
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogEngine> {
    const engine = await this.engineRepository.findOne({
      where: { id },
      relations: ['generation'],
    });

    if (!engine) {
      throw new NotFoundException(`Engine with ID ${id} not found`);
    }

    return engine;
  }

  async findByGenerationId(generationId: string): Promise<CatalogEngine[]> {
    return this.engineRepository.find({
      where: { generationId },
      relations: ['generation'],
      order: { name: 'ASC' },
    });
  }

  async search(
    query: string,
    limit: number = 20,
    activeOnly: boolean = false,
  ): Promise<CatalogEngine[]> {
    const where: FindOptionsWhere<CatalogEngine> = {
      name: ILike(`%${query}%`),
    };

    if (activeOnly) where.active = true;

    return this.engineRepository.find({
      where,
      relations: ['generation'],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(id: string, input: UpdateCatalogEngineInput): Promise<CatalogEngine> {
    const engine = await this.findOne(id);

    // Verify new generation exists if being updated
    if (input.generationId && input.generationId !== engine.generationId) {
      const generation = await this.generationRepository.findOne({
        where: { id: input.generationId },
      });

      if (!generation) {
        throw new NotFoundException(`Generation with ID ${input.generationId} not found`);
      }

      // Clear the generation relation so TypeORM detects the change
      engine.generation = undefined;
    }

    Object.assign(engine, input);
    const saved = await this.engineRepository.save(engine);
    return this.findOne(saved.id);
  }

  async remove(id: string): Promise<boolean> {
    const engine = await this.findOne(id);
    await this.engineRepository.remove(engine);
    return true;
  }

  async count(
    generationId?: string,
    fuelType?: CatalogEngineFuelType,
    activeOnly: boolean = false,
  ): Promise<number> {
    const where: FindOptionsWhere<CatalogEngine> = {};

    if (generationId) where.generationId = generationId;
    if (fuelType) where.fuelType = fuelType;
    if (activeOnly) where.active = true;

    return this.engineRepository.count({ where });
  }

  async getRecommended(limit?: number): Promise<CatalogEngine[]> {
    return this.engineRepository.find({
      where: { recommended: true, active: true },
      relations: ['generation'],
      order: { name: 'ASC' },
      ...(limit && { take: limit }),
    });
  }
}
