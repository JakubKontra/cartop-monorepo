import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogEquipmentItem } from './catalog-equipment-item.entity';
import { CreateCatalogEquipmentItemInput } from './dto/create-catalog-equipment-item.input';
import { UpdateCatalogEquipmentItemInput } from './dto/update-catalog-equipment-item.input';

@Injectable()
export class CatalogEquipmentItemService {
  constructor(
    @InjectRepository(CatalogEquipmentItem)
    private readonly itemRepository: Repository<CatalogEquipmentItem>,
  ) {}

  async create(input: CreateCatalogEquipmentItemInput): Promise<CatalogEquipmentItem> {
    const item = this.itemRepository.create(input);
    const saved = await this.itemRepository.save(item);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    categoryId?: string,
  ): Promise<CatalogEquipmentItem[]> {
    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    return this.itemRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
      relations: ['category'],
    });
  }

  async findOne(id: string): Promise<CatalogEquipmentItem> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException(`Equipment item with ID ${id} not found`);
    }

    return item;
  }

  async findByCategoryId(categoryId: string): Promise<CatalogEquipmentItem[]> {
    return this.itemRepository.find({
      where: { categoryId },
      order: { name: 'ASC' },
      relations: ['category'],
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogEquipmentItem[]> {
    return this.itemRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: limit,
      order: { name: 'ASC' },
      relations: ['category'],
    });
  }

  async update(id: string, input: UpdateCatalogEquipmentItemInput): Promise<CatalogEquipmentItem> {
    const item = await this.findOne(id);
    Object.assign(item, input);
    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<boolean> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
    return true;
  }
}
