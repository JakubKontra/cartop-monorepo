import { EntityMapper, MigrationContext } from '../types/migration.types';
import { User } from '../../../model/user/user.entity';
import { UserRole } from '../../../common/enums/role.enum';
import { mysqlDateToDate, mysqlBoolToBoolean } from '../utils/migration.utils';

/**
 * MySQL User table structure (legacy schema)
 * Adjust these types based on your actual MySQL schema
 */
interface MySQLUser {
  id: number | string; // Could be auto-increment int or varchar
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role?: string; // Could be single role or comma-separated
  roles?: string; // JSON or comma-separated roles
  phone?: string;
  bio?: string;
  is_active?: number | boolean; // MySQL tinyint(1) or boolean
  created_at?: Date | string;
  updated_at?: Date | string;
  avatar_id?: string | number;
  // Add other fields from your legacy schema
}

/**
 * User Entity Mapper
 * Maps legacy MySQL user records to new PostgreSQL User entities
 */
export class UserMapper implements EntityMapper<MySQLUser, User> {
  sourceTable = 'users'; // Adjust to your MySQL table name
  targetEntity = User;
  entityName = 'User';
  dependencies = []; // Users have no dependencies

  /**
   * Map MySQL user to PostgreSQL User entity
   */
  async map(source: MySQLUser, _context: MigrationContext): Promise<User | null> {
    try {
      const user = new User();

      // Note: PostgreSQL uses UUID, but MySQL might use integer IDs
      // We'll let PostgreSQL generate new UUIDs for users
      // If you need to maintain ID relationships, store the old ID in a legacy field

      // Basic fields
      user.email = source.email?.trim().toLowerCase();
      user.firstName = source.first_name?.trim() || '';
      user.lastName = source.last_name?.trim() || '';
      user.password = source.password; // Assuming password is already hashed

      // Parse roles
      user.roles = this.parseRoles(source.role || source.roles);

      // Optional fields
      user.phone = source.phone?.trim() || null;
      user.bio = source.bio?.trim() || null;
      user.isActive = source.is_active !== undefined
        ? mysqlBoolToBoolean(source.is_active)
        : true;
      user.isImpersonating = false;

      // Timestamps
      user.createdAt = mysqlDateToDate(source.created_at) || new Date();
      user.updatedAt = mysqlDateToDate(source.updated_at) || new Date();

      // Avatar relationship - we'll need to map the file ID after files are migrated
      // For now, we'll skip avatar relationships and handle them in afterMigration
      user.avatarId = null;

      // Validation
      if (!user.email || !user.firstName || !user.lastName) {
        console.warn(
          `⚠️  Skipping user with invalid data: ID=${source.id}, email=${source.email}`
        );
        return null;
      }

      return user;
    } catch (error) {
      console.error(`❌ Error mapping user ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Parse roles from various legacy formats
   */
  private parseRoles(rolesData: any): UserRole[] {
    if (!rolesData) {
      return [UserRole.CUSTOMER]; // Default role
    }

    let roles: string[] = [];

    // Handle different role formats
    if (typeof rolesData === 'string') {
      try {
        // Try parsing as JSON
        const parsed = JSON.parse(rolesData);
        roles = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // Not JSON, might be comma-separated
        roles = rolesData.split(',').map((r: string) => r.trim());
      }
    } else if (Array.isArray(rolesData)) {
      roles = rolesData;
    } else {
      roles = [String(rolesData)];
    }

    // Map legacy role names to new UserRole enum
    return roles
      .map((role) => this.mapRoleName(role))
      .filter((role): role is UserRole => role !== null);
  }

  /**
   * Map legacy role names to new UserRole enum values
   * Customize this based on your legacy role naming
   */
  private mapRoleName(legacyRole: string): UserRole | null {
    const roleLower = legacyRole.toLowerCase().trim();

    // Map common role variations
    const roleMap: Record<string, UserRole> = {
      'admin': UserRole.ADMIN,
      'administrator': UserRole.ADMIN,
      'customer': UserRole.CUSTOMER,
      'user': UserRole.CUSTOMER,
      'client': UserRole.CUSTOMER,
      'sales': UserRole.SALES_REPRESENTATIVE,
      'salesperson': UserRole.SALES_REPRESENTATIVE,
      'sales_representative': UserRole.SALES_REPRESENTATIVE,
      'junior_sales': UserRole.JUNIOR_SALES_REPRESENTATIVE,
      'junior_sales_representative': UserRole.JUNIOR_SALES_REPRESENTATIVE,
      'catalog_manager': UserRole.CATALOG_MANAGER,
      'catalogmanager': UserRole.CATALOG_MANAGER,
      'catalog-manager': UserRole.CATALOG_MANAGER,
      'marketing': UserRole.MARKETING,
      'customer_service': UserRole.CUSTOMER_SERVICE,
      'customerservice': UserRole.CUSTOMER_SERVICE,
    };

    return roleMap[roleLower] || null;
  }

  /**
   * Optional: Custom fetch query if you need to filter or join data
   */
  async fetchQuery(context: MigrationContext): Promise<MySQLUser[]> {
    // Example: Only migrate active users
    // const query = `SELECT * FROM ${this.sourceTable} WHERE is_active = 1`;
    // return context.mysqlConnection.query(query);

    // Or fetch all users (default behavior)
    return context.mysqlConnection.query(`SELECT * FROM ${this.sourceTable}`);
  }

  /**
   * Validate migrated user
   */
  async validate(target: User, source: MySQLUser): Promise<boolean | string> {
    if (target.email !== source.email.toLowerCase().trim()) {
      return `Email mismatch: ${target.email} !== ${source.email}`;
    }
    if (!target.roles || target.roles.length === 0) {
      return 'User must have at least one role';
    }
    return true;
  }

  /**
   * After all users are migrated, we can handle relationships
   * For example, mapping avatar files or other user-to-user relationships
   */
  async afterMigration(_context: MigrationContext): Promise<void> {
    console.log('  Post-processing: Updating user relationships...');

    // Example: Update avatar relationships after files are migrated
    // This would require looking up the new UUID for each file
    // based on the legacy file ID

    // const mysqlUsers = await context.mysqlConnection.query(
    //   `SELECT id, avatar_id FROM users WHERE avatar_id IS NOT NULL`
    // );

    // for (const mysqlUser of mysqlUsers) {
    //   // Find the new file UUID based on legacy file ID
    //   // Update the user's avatarId field
    // }
  }
}
