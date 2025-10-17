import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogEquipmentPaidItem } from './catalog-equipment-paid-item.entity';
import { CreateCatalogEquipmentPaidItemInput } from './dto/create-catalog-equipment-paid-item.input';
import { UpdateCatalogEquipmentPaidItemInput } from './dto/update-catalog-equipment-paid-item.input';

@Injectable()
export class CatalogEquipmentPaidItemService {
  constructor(
    @InjectRepository(CatalogEquipmentPaidItem)
    private readonly paidItemRepository: Repository<CatalogEquipmentPaidItem>,
  ) {}

  async create(input: CreateCatalogEquipmentPaidItemInput): Promise<CatalogEquipmentPaidItem> {
    const paidItem = this.paidItemRepository.create(input);
    const saved = await this.paidItemRepository.save(paidItem);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    equipmentId?: string,
    itemId?: string,
  ): Promise<CatalogEquipmentPaidItem[]> {
    const where: any = {};

    if (equipmentId) {
      where.equipmentId = equipmentId;
    }

    if (itemId) {
      where.itemId = itemId;
    }

    return this.paidItemRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { price: 'ASC' },
      relations: ['equipment', 'item'],
    });
  }

  async findOne(id: string): Promise<CatalogEquipmentPaidItem> {
    const paidItem = await this.paidItemRepository.findOne({
      where: { id },
      relations: ['equipment', 'item'],
    });

    if (!paidItem) {
      throw new NotFoundException(`Equipment paid item with ID ${id} not found`);
    }

    return paidItem;
  }

  async findByEquipmentId(equipmentId: string): Promise<CatalogEquipmentPaidItem[]> {
    return this.paidItemRepository.find({
      where: { equipmentId },
      order: { price: 'ASC' },
      relations: ['equipment', 'item'],
    });
  }

  async findByItemId(itemId: string): Promise<CatalogEquipmentPaidItem[]> {
    return this.paidItemRepository.find({
      where: { itemId },
      order: { price: 'ASC' },
      relations: ['equipment', 'item'],
    });
  }

  async update(id: string, input: UpdateCatalogEquipmentPaidItemInput): Promise<CatalogEquipmentPaidItem> {
    const paidItem = await this.findOne(id);
    Object.assign(paidItem, input);
    return this.paidItemRepository.save(paidItem);
  }

  async remove(id: string): Promise<boolean> {
    const paidItem = await this.findOne(id);
    await this.paidItemRepository.remove(paidItem);
    return true;
  }
}
