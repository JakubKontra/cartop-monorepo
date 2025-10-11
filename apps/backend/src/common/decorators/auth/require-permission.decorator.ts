import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../config/permissions.config';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator to specify which permissions are required to access a resolver/endpoint
 *
 * This decorator works with the RolesGuard to check if the authenticated user
 * has the required permissions based on their roles.
 *
 * Usage:
 * ```typescript
 * @RequirePermission(Permission.CATALOG_BRANDS_CREATE)
 * async createCatalogBrand(@Args('input') input: CreateCatalogBrandInput) {
 *   return this.brandService.create(input);
 * }
 * ```
 *
 * Multiple permissions (user must have at least ONE):
 * ```typescript
 * @RequirePermission(Permission.CATALOG_BRANDS_UPDATE, Permission.CATALOG_BRANDS_DELETE)
 * async updateCatalogBrand(@Args('id') id: string) {
 *   // ...
 * }
 * ```
 *
 * @param permissions - One or more permissions required to access the endpoint
 */
export const RequirePermission = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
