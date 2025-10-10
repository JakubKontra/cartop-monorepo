import { UserRole } from '../../common/enums/role.enum';

/**
 * Base Legacy Field Resolver
 * Provides field-level authorization logic for legacy fields across ALL catalog entities
 *
 * This class provides a single source of truth for controlling access to:
 * - legacySystemId: ID from the old system (for data migration tracking)
 * - legacySlug: Slug from the old system (for URL migration)
 *
 * These fields are only visible to ADMIN and CATALOG_MANAGER roles.
 * Public and unauthenticated users will see null.
 *
 * Usage: Extend this class in each catalog module with @Resolver(() => EntityType)
 * and implement the field resolvers using @ResolveField decorators
 */
export abstract class CatalogLegacyFieldResolver {
  /**
   * Check if user has permission to see legacy fields
   * Only ADMIN and CATALOG_MANAGER roles can view legacy data
   *
   * @param value - The field value from the entity
   * @param context - GraphQL context containing request with user info
   * @returns The field value if authorized, null otherwise
   */
  protected checkLegacyFieldAccess(
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
