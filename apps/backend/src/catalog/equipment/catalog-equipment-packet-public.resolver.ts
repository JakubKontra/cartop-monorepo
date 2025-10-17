import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogEquipmentPacketService } from './catalog-equipment-packet.service';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Equipment Packet Resolver
 * Handles all public queries for browsing equipment pricing packets
 * No authentication required - available to all users
 */
@Resolver(() => CatalogEquipmentPacket)
@Public()
export class CatalogEquipmentPacketPublicResolver {
  constructor(private readonly packetService: CatalogEquipmentPacketService) {}

  /**
   * Get list of catalog equipment packets
   * Optionally filter by equipment ID
   */
  @Query(() => [CatalogEquipmentPacket], { name: 'catalogEquipmentPackets' })
  async getCatalogEquipmentPackets(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('equipmentId', { nullable: true })
    equipmentId?: string,
  ): Promise<CatalogEquipmentPacket[]> {
    return this.packetService.findAll(limit, offset, equipmentId);
  }

  /**
   * Get a single catalog equipment packet by ID
   */
  @Query(() => CatalogEquipmentPacket, { name: 'catalogEquipmentPacketById' })
  async getCatalogEquipmentPacketById(@Args('id') id: string): Promise<CatalogEquipmentPacket> {
    return this.packetService.findOne(id);
  }

  /**
   * Get catalog equipment packets by equipment ID
   */
  @Query(() => [CatalogEquipmentPacket], { name: 'catalogEquipmentPacketsByEquipmentId' })
  async getCatalogEquipmentPacketsByEquipmentId(
    @Args('equipmentId') equipmentId: string,
  ): Promise<CatalogEquipmentPacket[]> {
    return this.packetService.findByEquipmentId(equipmentId);
  }

  /**
   * Search catalog equipment packets by name
   */
  @Query(() => [CatalogEquipmentPacket], { name: 'searchCatalogEquipmentPackets' })
  async searchCatalogEquipmentPackets(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogEquipmentPacket[]> {
    return this.packetService.search(query, limit);
  }
}
