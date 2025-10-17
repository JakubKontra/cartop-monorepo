import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogBrandEquipmentItem } from './catalog-brand-equipment-item.entity';
import { CreateCatalogBrandEquipmentItemInput } from './dto/create-catalog-brand-equipment-item.input';
import { UpdateCatalogBrandEquipmentItemInput } from './dto/update-catalog-brand-equipment-item.input';

@Injectable()
export class CatalogBrandEquipmentItemService {
  constructor(
    @InjectRepository(CatalogBrandEquipmentItem)
    private readonly itemRepository: Repository<CatalogBrandEquipmentItem>,
  ) {}

  async create(input: CreateCatalogBrandEquipmentItemInput): Promise<CatalogBrandEquipmentItem> {
    const item = this.itemRepository.create(input);
    const saved = await this.itemRepository.save(item);
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
  ): Promise<CatalogBrandEquipmentItem[]> {
    return this.itemRepository.find({
      relations: ['equipments'],
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogBrandEquipmentItem> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['equipments'],
    });

    if (!item) {
      throw new NotFoundException(`Equipment item with ID ${id} not found`);
    }

    return item;
  }

  async search(query: string, limit: number = 20): Promise<CatalogBrandEquipmentItem[]> {
    return this.itemRepository.find({
      where: { name: ILike(`%${query}%`) },
      relations: ['equipments'],
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    input: UpdateCatalogBrandEquipmentItemInput,
  ): Promise<CatalogBrandEquipmentItem> {
    const item = await this.findOne(id);
    Object.assign(item, input);
    const saved = await this.itemRepository.save(item);
    return this.findOne(saved.id);
  }

  async remove(id: string): Promise<boolean> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
    return true;
  }

  async count(): Promise<number> {
    return this.itemRepository.count();
  }
}
