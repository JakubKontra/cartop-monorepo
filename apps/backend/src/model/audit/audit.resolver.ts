import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuditLog } from './audit-log.entity';
import { AuditService } from './audit.service';
import { AuditQueryInput } from './dto/audit-query.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Audit Resolver
 * All audit log queries require ADMIN role
 * Audit logs contain sensitive information about system changes
 */
@Resolver(() => AuditLog)
export class AuditResolver {
  constructor(private readonly auditService: AuditService) {}

  /**
   * Query audit logs with filters
   * Requires ADMIN role
   */
  @Query(() => [AuditLog], { name: 'auditLogs' })
  @Roles(UserRole.ADMIN)
  async getAuditLogs(@Args('query') query: AuditQueryInput): Promise<AuditLog[]> {
    return this.auditService.query(query);
  }

  /**
   * Get complete history of changes for a specific entity
   * Requires ADMIN role
   */
  @Query(() => [AuditLog], { name: 'entityHistory' })
  @Roles(UserRole.ADMIN)
  async getEntityHistory(
    @Args('entityName') entityName: string,
    @Args('entityId') entityId: string,
  ): Promise<AuditLog[]> {
    return this.auditService.getEntityHistory(entityName, entityId);
  }

  /**
   * Get all activity by a specific user
   * Requires ADMIN role
   */
  @Query(() => [AuditLog], { name: 'userActivity' })
  @Roles(UserRole.ADMIN)
  async getUserActivity(
    @Args('userId') userId: string,
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
  ): Promise<AuditLog[]> {
    return this.auditService.getUserActivity(userId, limit);
  }
}
