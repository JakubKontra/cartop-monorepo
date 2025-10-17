import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogEquipmentItemCategory } from './catalog-equipment-item-category.entity';
import { CreateCatalogEquipmentItemCategoryInput } from './dto/create-catalog-equipment-item-category.input';
import { UpdateCatalogEquipmentItemCategoryInput } from './dto/update-catalog-equipment-item-category.input';

@Injectable()
export class CatalogEquipmentItemCategoryService {
  constructor(
    @InjectRepository(CatalogEquipmentItemCategory)
    private readonly categoryRepository: Repository<CatalogEquipmentItemCategory>,
  ) {}

  async create(
    input: CreateCatalogEquipmentItemCategoryInput,
  ): Promise<CatalogEquipmentItemCategory> {
    const category = this.categoryRepository.create(input);
    return this.categoryRepository.save(category);
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<CatalogEquipmentItemCategory[]> {
    return this.categoryRepository.find({
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CatalogEquipmentItemCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['equipmentItems'],
    });

    if (!category) {
      throw new NotFoundException(`Equipment item category with ID ${id} not found`);
    }

    return category;
  }

  async search(query: string, limit: number = 20): Promise<CatalogEquipmentItemCategory[]> {
    return this.categoryRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    input: UpdateCatalogEquipmentItemCategoryInput,
  ): Promise<CatalogEquipmentItemCategory> {
    const category = await this.findOne(id);
    Object.assign(category, input);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<boolean> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return true;
  }
}
