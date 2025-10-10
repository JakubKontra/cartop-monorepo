import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Shared Legacy Field Resolver
 * Handles field-level authorization for legacy fields across ALL catalog entities
 *
 * This resolver provides a single source of truth for controlling access to:
 * - legacySystemId: ID from the old system (for data migration tracking)
 * - legacySlug: Slug from the old system (for URL migration)
 *
 * These fields are only visible to ADMIN and CATALOG_MANAGER roles.
 * Public and unauthenticated users will see null.
 *
 * Usage: Register this resolver in each catalog module alongside entity-specific resolvers.
 */
@Resolver()
export class CatalogLegacyFieldResolver {
  /**
   * Legacy System ID field resolver
   * Works for any catalog entity with a legacySystemId field
   */
  @ResolveField('legacySystemId', () => String, { nullable: true })
  resolveLegacySystemId(
    @Parent() entity: any,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySystemId, context);
  }

  /**
   * Legacy Slug field resolver
   * Works for any catalog entity with a legacySlug field
   */
  @ResolveField('legacySlug', () => String, { nullable: true })
  resolveLegacySlug(
    @Parent() entity: any,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySlug, context);
  }

  /**
   * Check if user has permission to see legacy fields
   * Only ADMIN and CATALOG_MANAGER roles can view legacy data
   *
   * @param value - The field value from the entity
   * @param context - GraphQL context containing request with user info
   * @returns The field value if authorized, null otherwise
   */
  private checkLegacyFieldAccess(
    value: string | undefined,
    context: any,
  ): string | null {
    const user = context.req?.user;

    // Only admins and catalog managers can see legacy fields
    if (
      user &&
      (user.role === UserRole.ADMIN || user.role === UserRole.CATALOG_MANAGER)
    ) {
      return value || null;
    }

    // Hide from public users and unauthenticated requests
    return null;
  }
}
