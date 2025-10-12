import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LeasingCompanyService } from './leasing-company.service';
import { LeasingCompany } from './leasing-company.entity';
import { CreateLeasingCompanyInput } from './dto/create-leasing-company.input';
import { UpdateLeasingCompanyInput } from './dto/update-leasing-company.input';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

/**
 * Admin Leasing Company Resolver
 * All operations require ADMIN or CATALOG_MANAGER role
 */
@Resolver(() => LeasingCompany)
export class LeasingCompanyAdminResolver {
  constructor(private readonly leasingCompanyService: LeasingCompanyService) {}

  // ==================== ADMIN QUERIES ====================

  /**
   * Get all leasing companies
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => [LeasingCompany])
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async leasingCompanies(): Promise<LeasingCompany[]> {
    return this.leasingCompanyService.findAll();
  }

  /**
   * Get a single leasing company by ID
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => LeasingCompany)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async leasingCompany(@Args('id') id: string): Promise<LeasingCompany> {
    return this.leasingCompanyService.findOne(id);
  }

  /**
   * Get leasing company by name
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => LeasingCompany, { nullable: true })
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async leasingCompanyByName(
    @Args('name') name: string,
  ): Promise<LeasingCompany | null> {
    return this.leasingCompanyService.findByName(name);
  }

  /**
   * Count all leasing companies
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => Int)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async leasingCompaniesCount(): Promise<number> {
    return this.leasingCompanyService.count();
  }

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Create a new leasing company
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Mutation(() => LeasingCompany)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async createLeasingCompany(
    @Args('input') input: CreateLeasingCompanyInput,
  ): Promise<LeasingCompany> {
    return this.leasingCompanyService.create(input);
  }

  /**
   * Update an existing leasing company
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Mutation(() => LeasingCompany)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async updateLeasingCompany(
    @Args('id') id: string,
    @Args('input') input: UpdateLeasingCompanyInput,
  ): Promise<LeasingCompany> {
    return this.leasingCompanyService.update(id, input);
  }

  /**
   * Delete a leasing company
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteLeasingCompany(@Args('id') id: string): Promise<boolean> {
    return this.leasingCompanyService.remove(id);
  }
}
