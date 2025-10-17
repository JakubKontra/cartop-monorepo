import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatalogEquipmentPacketService } from './catalog-equipment-packet.service';
import { CatalogEquipmentPacket } from './catalog-equipment-packet.entity';
import { CreateCatalogEquipmentPacketInput } from './dto/create-catalog-equipment-packet.input';
import { UpdateCatalogEquipmentPacketInput } from './dto/update-catalog-equipment-packet.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Admin Catalog Equipment Packet Resolver
 * Handles all administrative operations for catalog equipment packets
 * Requires authentication and appropriate roles
 */
@Resolver(() => CatalogEquipmentPacket)
export class CatalogEquipmentPacketAdminResolver {
  constructor(private readonly packetService: CatalogEquipmentPacketService) {}

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new catalog equipment packet
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentPacket)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createCatalogEquipmentPacket(
    @Args('input') input: CreateCatalogEquipmentPacketInput,
  ): Promise<CatalogEquipmentPacket> {
    return this.packetService.create(input);
  }

  /**
   * Update an existing catalog equipment packet
   * Requires CATALOG_MANAGER or ADMIN role
   */
  @Mutation(() => CatalogEquipmentPacket)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateCatalogEquipmentPacket(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEquipmentPacketInput,
  ): Promise<CatalogEquipmentPacket> {
    return this.packetService.update(id, input);
  }

  /**
   * Delete a catalog equipment packet
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCatalogEquipmentPacket(@Args('id') id: string): Promise<boolean> {
    return this.packetService.remove(id);
  }
}
