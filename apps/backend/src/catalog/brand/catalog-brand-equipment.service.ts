import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogBrandEquipment } from './catalog-brand-equipment.entity';
import { CatalogBrand } from './catalog-brand.entity';
import { CreateCatalogBrandEquipmentInput } from './dto/create-catalog-brand-equipment.input';
import { UpdateCatalogBrandEquipmentInput } from './dto/update-catalog-brand-equipment.input';

@Injectable()
export class CatalogBrandEquipmentService {
  constructor(
    @InjectRepository(CatalogBrandEquipment)
    private readonly equipmentRepository: Repository<CatalogBrandEquipment>,
    @InjectRepository(CatalogBrand)
    private readonly brandRepository: Repository<CatalogBrand>,
  ) {}

  async create(input: CreateCatalogBrandEquipmentInput): Promise<CatalogBrandEquipment> {
    // Verify brand exists
    const brand = await this.brandRepository.findOne({
      where: { id: input.brandId },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${input.brandId} not found`);
    }

    const equipment = this.equipmentRepository.create(input);
    const saved = await this.equipmentRepository.save(equipment);
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    brandId?: string,
  ): Promise<CatalogBrandEquipment[]> {
    const where = brandId ? { brandId } : {};

    return this.equipmentRepository.find({
      where,
      relations: ['brand'],
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogBrandEquipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      relations: ['brand'],
    });

    if (!equipment) {
      throw new NotFoundException(`Brand equipment with ID ${id} not found`);
    }

    return equipment;
  }

  async findByBrandId(brandId: string): Promise<CatalogBrandEquipment[]> {
    return this.equipmentRepository.find({
      where: { brandId },
      relations: ['brand'],
      order: { name: 'ASC' },
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogBrandEquipment[]> {
    return this.equipmentRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
      relations: ['brand'],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    input: UpdateCatalogBrandEquipmentInput,
  ): Promise<CatalogBrandEquipment> {
    const equipment = await this.findOne(id);

    // Verify new brand exists if brandId is being updated
    if (input.brandId && input.brandId !== equipment.brandId) {
      const brand = await this.brandRepository.findOne({
        where: { id: input.brandId },
      });

      if (!brand) {
        throw new NotFoundException(`Brand with ID ${input.brandId} not found`);
      }

      // Clear the brand relation so TypeORM detects the change
      equipment.brand = undefined;
    }

    Object.assign(equipment, input);
    const saved = await this.equipmentRepository.save(equipment);
    return this.findOne(saved.id);
  }

  async remove(id: string): Promise<boolean> {
    const equipment = await this.findOne(id);
    await this.equipmentRepository.remove(equipment);
    return true;
  }

  async count(brandId?: string): Promise<number> {
    const where = brandId ? { brandId } : {};
    return this.equipmentRepository.count({ where });
  }
}
