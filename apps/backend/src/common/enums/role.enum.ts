/**
 * User Roles - Mapped from Contember personRole enum
 */
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER_SERVICE = 'customerService',
  MARKETING = 'marketing',
  SALES_REPRESENTATIVE = 'salesRepresentative',
  JUNIOR_SALES_REPRESENTATIVE = 'juniorSalesRepresentative',
  CATALOG_MANAGER = 'catalogManager',
  CUSTOMER = 'customer',
  PUBLIC = 'public', // Unauthenticated users
}

/**
 * Role hierarchy for permission checking
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.PUBLIC]: 0,
  [UserRole.CUSTOMER]: 10,
  [UserRole.JUNIOR_SALES_REPRESENTATIVE]: 20,
  [UserRole.SALES_REPRESENTATIVE]: 30,
  [UserRole.CATALOG_MANAGER]: 40,
  [UserRole.MARKETING]: 50,
  [UserRole.CUSTOMER_SERVICE]: 60,
  [UserRole.ADMIN]: 100,
};
