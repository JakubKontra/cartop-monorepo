import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogEquipmentService } from './catalog-equipment.service';
import { CatalogEquipment } from './catalog-equipment.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Public Catalog Equipment Resolver
 * Handles all public queries for browsing equipment
 * No authentication required - available to all users
 */
@Resolver(() => CatalogEquipment)
@Public()
export class CatalogEquipmentPublicResolver {
  constructor(private readonly equipmentService: CatalogEquipmentService) {}

  /**
   * Get list of catalog equipment
   * Optionally filter by model generation ID, active status, and standard flag
   */
  @Query(() => [CatalogEquipment], { name: 'catalogEquipment' })
  async getCatalogEquipment(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 50 })
    limit: number,
    @Args('offset', { type: () => Number, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('modelGenerationId', { nullable: true })
    modelGenerationId?: string,
    @Args('active', { type: () => Boolean, nullable: true })
    active?: boolean,
    @Args('standard', { type: () => Boolean, nullable: true })
    standard?: boolean,
  ): Promise<CatalogEquipment[]> {
    return this.equipmentService.findAll(limit, offset, modelGenerationId, active, standard);
  }

  /**
   * Get a single catalog equipment item by ID
   */
  @Query(() => CatalogEquipment, { name: 'catalogEquipmentById' })
  async getCatalogEquipmentById(@Args('id') id: string): Promise<CatalogEquipment> {
    return this.equipmentService.findOne(id);
  }

  /**
   * Get catalog equipment by model generation ID
   */
  @Query(() => [CatalogEquipment], { name: 'catalogEquipmentByModelGenerationId' })
  async getCatalogEquipmentByModelGenerationId(
    @Args('modelGenerationId') modelGenerationId: string,
  ): Promise<CatalogEquipment[]> {
    return this.equipmentService.findByModelGenerationId(modelGenerationId);
  }

  /**
   * Search catalog equipment by name or custom text
   */
  @Query(() => [CatalogEquipment], { name: 'searchCatalogEquipment' })
  async searchCatalogEquipment(
    @Args('query') query: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 20 })
    limit: number,
  ): Promise<CatalogEquipment[]> {
    return this.equipmentService.search(query, limit);
  }
}
