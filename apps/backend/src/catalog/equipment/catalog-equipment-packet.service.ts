import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { CreateCatalogEquipmentPacketInput } from './dto/create-catalog-equipment-packet.input';
import { UpdateCatalogEquipmentPacketInput } from './dto/update-catalog-equipment-packet.input';

@Injectable()
export class CatalogEquipmentPacketService {
  constructor(
    @InjectRepository(CatalogEquipmentPacket)
    private readonly packetRepository: Repository<CatalogEquipmentPacket>,
  ) {}

  async create(input: CreateCatalogEquipmentPacketInput): Promise<CatalogEquipmentPacket> {
    const packet = this.packetRepository.create(input);
    const saved = await this.packetRepository.save(packet);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    equipmentId?: string,
  ): Promise<CatalogEquipmentPacket[]> {
    const where: any = {};

    if (equipmentId) {
      where.equipmentId = equipmentId;
    }

    return this.packetRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { price: 'ASC' },
      relations: ['equipment', 'items', 'availableInEquipments', 'includedInEquipments'],
    });
  }

  async findOne(id: string): Promise<CatalogEquipmentPacket> {
    const packet = await this.packetRepository.findOne({
      where: { id },
      relations: ['equipment', 'items', 'availableInEquipments', 'includedInEquipments'],
    });

    if (!packet) {
      throw new NotFoundException(`Equipment packet with ID ${id} not found`);
    }

    return packet;
  }

  async findByEquipmentId(equipmentId: string): Promise<CatalogEquipmentPacket[]> {
    return this.packetRepository.find({
      where: { equipmentId },
      order: { price: 'ASC' },
      relations: ['equipment', 'items', 'availableInEquipments', 'includedInEquipments'],
    });
  }

  async search(query: string, limit: number = 20): Promise<CatalogEquipmentPacket[]> {
    return this.packetRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: limit,
      order: { name: 'ASC' },
      relations: ['equipment', 'items', 'availableInEquipments', 'includedInEquipments'],
    });
  }

  async update(id: string, input: UpdateCatalogEquipmentPacketInput): Promise<CatalogEquipmentPacket> {
    const packet = await this.findOne(id);
    Object.assign(packet, input);
    return this.packetRepository.save(packet);
  }

  async remove(id: string): Promise<boolean> {
    const packet = await this.findOne(id);
    await this.packetRepository.remove(packet);
    return true;
  }
}
