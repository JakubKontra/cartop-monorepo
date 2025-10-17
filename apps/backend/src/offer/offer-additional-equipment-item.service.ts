import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { OfferAdditionalEquipmentItem } from './offer-additional-equipment-item.entity';
import { CreateOfferAdditionalEquipmentItemInput } from './dto/create-offer-additional-equipment-item.input';
import { UpdateOfferAdditionalEquipmentItemInput } from './dto/update-offer-additional-equipment-item.input';

@Injectable()
export class OfferAdditionalEquipmentItemService {
  constructor(
    @InjectRepository(OfferAdditionalEquipmentItem)
    private readonly equipmentItemRepository: Repository<OfferAdditionalEquipmentItem>,
  ) {}

  // === CREATE methods ===

  async create(
    input: CreateOfferAdditionalEquipmentItemInput,
  ): Promise<OfferAdditionalEquipmentItem> {
    const equipmentItem = this.equipmentItemRepository.create(input);
    return this.equipmentItemRepository.save(equipmentItem);
  }

  // === READ methods ===

  async findAll(): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemRepository.find({
      order: { category: 'ASC', name: 'ASC' },
    });
  }

  async findByCategory(category: string): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemRepository.find({
      where: { category },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<OfferAdditionalEquipmentItem> {
    const equipmentItem = await this.equipmentItemRepository.findOne({
      where: { id },
    });

    if (!equipmentItem) {
      throw new NotFoundException(`Equipment item with ID ${id} not found`);
    }

    return equipmentItem;
  }

  async search(searchTerm: string): Promise<OfferAdditionalEquipmentItem[]> {
    return this.equipmentItemRepository.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { category: ILike(`%${searchTerm}%`) },
        { description: ILike(`%${searchTerm}%`) },
      ],
      order: { name: 'ASC' },
      take: 50,
    });
  }

  // === UPDATE methods ===

  async update(
    id: string,
    input: UpdateOfferAdditionalEquipmentItemInput,
  ): Promise<OfferAdditionalEquipmentItem> {
    const equipmentItem = await this.findOne(id);
    Object.assign(equipmentItem, input);
    return this.equipmentItemRepository.save(equipmentItem);
  }

  // === DELETE methods ===

  async remove(id: string): Promise<boolean> {
    const equipmentItem = await this.findOne(id);
    await this.equipmentItemRepository.remove(equipmentItem);
    return true;
  }
}
