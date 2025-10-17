import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatalogEngine } from './catalog-engine.entity';
import { CatalogEngineService } from './catalog-engine.service';
import { CreateCatalogEngineInput } from './dto/create-catalog-engine.input';
import { UpdateCatalogEngineInput } from './dto/update-catalog-engine.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from '../../common/enums/catalog';

@Resolver(() => CatalogEngine)
export class CatalogEngineAdminResolver {
  constructor(private readonly engineService: CatalogEngineService) {}

  @Mutation(() => CatalogEngine)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async createEngine(@Args('input') input: CreateCatalogEngineInput): Promise<CatalogEngine> {
    return this.engineService.create(input);
  }

  @Mutation(() => CatalogEngine)
  @Roles(UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async updateEngine(
    @Args('id') id: string,
    @Args('input') input: UpdateCatalogEngineInput,
  ): Promise<CatalogEngine> {
    return this.engineService.update(id, input);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteEngine(@Args('id') id: string): Promise<boolean> {
    return this.engineService.remove(id);
  }

  @Query(() => [CatalogEngine], { name: 'allEngines' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getAllEngines(
    @Args('limit', { nullable: true, defaultValue: 100 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('fuelType', { nullable: true, type: () => CatalogEngineFuelType })
    fuelType?: CatalogEngineFuelType,
    @Args('transmissionType', { nullable: true, type: () => CatalogEngineTransmissionType })
    transmissionType?: CatalogEngineTransmissionType,
    @Args('driveType', { nullable: true, type: () => CatalogEngineDriveType })
    driveType?: CatalogEngineDriveType,
    @Args('activeOnly', { nullable: true, defaultValue: false }) activeOnly?: boolean,
    @Args('recommendedOnly', { nullable: true, defaultValue: false }) recommendedOnly?: boolean,
  ): Promise<CatalogEngine[]> {
    return this.engineService.findAll(
      limit,
      offset,
      generationId,
      fuelType,
      transmissionType,
      driveType,
      activeOnly,
      recommendedOnly,
    );
  }

  @Query(() => CatalogEngine, { name: 'engine' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getEngine(@Args('id') id: string): Promise<CatalogEngine> {
    return this.engineService.findOne(id);
  }

  @Query(() => [CatalogEngine], { name: 'searchEngines' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async searchEngines(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<CatalogEngine[]> {
    return this.engineService.search(query, limit);
  }

  @Query(() => Int, { name: 'enginesCount' })
  @Roles(UserRole.SALES_REPRESENTATIVE, UserRole.CATALOG_MANAGER, UserRole.ADMIN)
  async getEnginesCount(
    @Args('generationId', { nullable: true }) generationId?: string,
    @Args('fuelType', { nullable: true, type: () => CatalogEngineFuelType })
    fuelType?: CatalogEngineFuelType,
  ): Promise<number> {
    return this.engineService.count(generationId, fuelType);
  }
}
