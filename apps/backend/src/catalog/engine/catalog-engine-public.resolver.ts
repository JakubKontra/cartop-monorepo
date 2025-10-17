import { Resolver, Query, Args } from '@nestjs/graphql';
import { CatalogEngine } from './catalog-engine.entity';
import { CatalogEngineService } from './catalog-engine.service';
import { Public } from '../../common/decorators/auth/public.decorator';
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from '../../common/enums/catalog';

@Resolver(() => CatalogEngine)
export class CatalogEnginePublicResolver {
  constructor(private readonly engineService: CatalogEngineService) {}

  @Query(() => [CatalogEngine], { name: 'activeEngines' })
  @Public()
  async getActiveEngines(
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('fuelType', { nullable: true, type: () => CatalogEngineFuelType})
    fuelType?: CatalogEngineFuelType,
    @Args('transmissionType', { nullable: true, type: () => CatalogEngineTransmissionType })
    transmissionType?: CatalogEngineTransmissionType,
    @Args('driveType', { nullable: true, type: () => CatalogEngineDriveType })
    driveType?: CatalogEngineDriveType,
  ): Promise<CatalogEngine[]> {
    return this.engineService.findAll(
      limit,
      offset,
      generationId,
      fuelType,
      transmissionType,
      driveType,
      true, // activeOnly = true
      false,
    );
  }

  @Query(() => CatalogEngine, { name: 'publicEngine' })
  @Public()
  async getPublicEngine(@Args('id') id: string): Promise<CatalogEngine> {
    const engine = await this.engineService.findOne(id);
    if (!engine.active) {
      throw new Error('Engine not found or not active');
    }
    return engine;
  }

  @Query(() => [CatalogEngine], { name: 'recommendedEngines' })
  @Public()
  async getRecommendedEngines(
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<CatalogEngine[]> {
    return this.engineService.getRecommended(limit);
  }
}
