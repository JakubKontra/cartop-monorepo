import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogEquipment } from './catalog-equipment.entity';
import { CreateCatalogEquipmentInput } from './dto/create-catalog-equipment.input';
import { UpdateCatalogEquipmentInput } from './dto/update-catalog-equipment.input';

@Injectable()
export class CatalogEquipmentService {
  constructor(
    @InjectRepository(CatalogEquipment)
    private readonly equipmentRepository: Repository<CatalogEquipment>,
  ) {}

  async create(input: CreateCatalogEquipmentInput): Promise<CatalogEquipment> {
    const equipment = this.equipmentRepository.create(input);
    const saved = await this.equipmentRepository.save(equipment);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    modelGenerationId?: string,
    active?: boolean,
    standard?: boolean,
  ): Promise<CatalogEquipment[]> {
    const where: any = {};

    if (modelGenerationId) {
      where.modelGenerationId = modelGenerationId;
    }

    if (typeof active === 'boolean') {
      where.active = active;
    }

    if (typeof standard === 'boolean') {
      where.standard = standard;
    }

    return this.equipmentRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['modelGeneration', 'category', 'items', 'availablePackets', 'includedPackets'],
    });
  }

  async findOne(id: string): Promise<CatalogEquipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      relations: ['modelGeneration', 'category', 'items', 'availablePackets', 'includedPackets'],
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return equipment;
  }

  async findByModelGenerationId(modelGenerationId: string): Promise<CatalogEquipment[]> {
    return this.equipmentRepository.find({
      where: { modelGenerationId },
      order: { name: 'ASC' },
      relations: ['modelGeneration', 'category', 'items', 'availablePackets', 'includedPackets'],
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogEquipment[]> {
    return this.equipmentRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { customText: ILike(`%${query}%`) },
      ],
      take: limit,
      order: { name: 'ASC' },
      relations: ['modelGeneration', 'category', 'items', 'availablePackets', 'includedPackets'],
    });
  }

  async update(id: string, input: UpdateCatalogEquipmentInput): Promise<CatalogEquipment> {
    const equipment = await this.findOne(id);
    Object.assign(equipment, input);
    return this.equipmentRepository.save(equipment);
  }

  async remove(id: string): Promise<boolean> {
    const equipment = await this.findOne(id);
    await this.equipmentRepository.remove(equipment);
    return true;
  }
}
