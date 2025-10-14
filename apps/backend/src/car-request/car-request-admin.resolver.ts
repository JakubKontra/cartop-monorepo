import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CarRequestService } from './car-request.service';
import { CarRequest } from './entities/car-request.entity';
import { CreateCarRequestInput } from './dto/create-car-request.input';
import { UpdateCarRequestInput } from './dto/update-car-request.input';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

/**
 * Admin Car Request Resolver
 * All operations require ADMIN or SALES_MANAGER role
 */
@Resolver(() => CarRequest)
export class CarRequestAdminResolver {
  constructor(private readonly carRequestService: CarRequestService) {}

  // ==================== ADMIN QUERIES ====================

  /**
   * Get all car requests with pagination
   * Requires ADMIN or SALES_MANAGER role
   */
  @Query(() => [CarRequest])
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async allCarRequests(
    @Args('limit', { type: () => Float, nullable: true }) limit?: number,
    @Args('offset', { type: () => Float, nullable: true }) offset?: number,
  ): Promise<CarRequest[]> {
    return this.carRequestService.findAll(limit, offset);
  }

  /**
   * Get a single car request by ID
   * Requires ADMIN or SALES_MANAGER role
   */
  @Query(() => CarRequest)
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async carRequest(@Args('id') id: string): Promise<CarRequest> {
    return this.carRequestService.findOne(id);
  }

  /**
   * Count all car requests
   * Requires ADMIN or SALES_MANAGER role
   */
  @Query(() => Int)
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async carRequestsCount(): Promise<number> {
    return this.carRequestService.count();
  }

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new car request
   * Requires ADMIN or SALES_MANAGER role
   */
  @Mutation(() => CarRequest)
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async createCarRequest(@Args('input') input: CreateCarRequestInput): Promise<CarRequest> {
    return this.carRequestService.create(input);
  }

  /**
   * Update an existing car request
   * Requires ADMIN or SALES_MANAGER role
   */
  @Mutation(() => CarRequest)
  @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
  async updateCarRequest(
    @Args('id') id: string,
    @Args('input') input: UpdateCarRequestInput,
  ): Promise<CarRequest> {
    return this.carRequestService.update(id, input);
  }

  /**
   * Delete a car request
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteCarRequest(@Args('id') id: string): Promise<boolean> {
    return this.carRequestService.remove(id);
  }
}
