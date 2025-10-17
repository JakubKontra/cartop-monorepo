import { MigrationContext } from '../types/migration.types';

/**
 * ForeignKeyMapper - Utility for mapping legacy MySQL integer IDs to PostgreSQL UUIDs
 *
 * Features:
 * - Caching to prevent duplicate queries
 * - Bulk mapping support for efficient batch operations
 * - Automatic legacySystemId column handling
 */
export class ForeignKeyMapper {
  // Cache: Map<tableName, Map<legacyId, uuid>>
  private cache: Map<string, Map<string, string>> = new Map();

  /**
   * Map a single legacy ID to PostgreSQL UUID
   * Uses cache to avoid duplicate queries
   *
   * @param context Migration context with DB connections
   * @param tableName PostgreSQL table name
   * @param legacyId Legacy MySQL ID
   * @returns PostgreSQL UUID or null if not found
   */
  async mapLegacyId(
    context: MigrationContext,
    tableName: string,
    legacyId: string | number | null | undefined
  ): Promise<string | null> {
    if (!legacyId) return null;

    const legacyIdStr = String(legacyId);

    // Check cache first
    const tableCache = this.cache.get(tableName);
    if (tableCache?.has(legacyIdStr)) {
      return tableCache.get(legacyIdStr)!;
    }

    // Query database
    try {
      const result = await context.postgresConnection.query(
        `SELECT id FROM ${tableName} WHERE "legacySystemId" = $1 LIMIT 1`,
        [legacyIdStr]
      );

      if (result.length > 0) {
        const uuid = result[0].id;

        // Store in cache
        if (!this.cache.has(tableName)) {
          this.cache.set(tableName, new Map());
        }
        this.cache.get(tableName)!.set(legacyIdStr, uuid);

        return uuid;
      }

      console.warn(`⚠️  ${tableName}: Record not found with legacySystemId: ${legacyIdStr}`);
      return null;
    } catch (error) {
      console.error(`❌ Error mapping legacy ID for ${tableName}[${legacyIdStr}]:`, error);
      return null;
    }
  }

  /**
   * Bulk map multiple legacy IDs to UUIDs in a single query
   * Much more efficient than calling mapLegacyId() in a loop
   *
   * @param context Migration context
   * @param tableName PostgreSQL table name
   * @param legacyIds Array of legacy MySQL IDs
   * @returns Map of legacyId → UUID
   */
  async bulkMapLegacyIds(
    context: MigrationContext,
    tableName: string,
    legacyIds: (string | number)[]
  ): Promise<Map<string, string>> {
    const result = new Map<string, string>();
    const toFetch: string[] = [];
    const tableCache = this.cache.get(tableName);

    // Separate cached vs uncached IDs
    for (const id of legacyIds) {
      const legacyIdStr = String(id);

      if (tableCache?.has(legacyIdStr)) {
        // Use cached value
        result.set(legacyIdStr, tableCache.get(legacyIdStr)!);
      } else {
        // Need to fetch from DB
        toFetch.push(legacyIdStr);
      }
    }

    // Bulk fetch uncached IDs
    if (toFetch.length > 0) {
      try {
        const placeholders = toFetch.map((_, i) => `$${i + 1}`).join(', ');
        const query = `
          SELECT id, "legacySystemId"
          FROM ${tableName}
          WHERE "legacySystemId" IN (${placeholders})
        `;

        const rows = await context.postgresConnection.query(query, toFetch);

        // Process results and update cache
        if (!this.cache.has(tableName)) {
          this.cache.set(tableName, new Map());
        }
        const cache = this.cache.get(tableName)!;

        for (const row of rows) {
          const legacyId = row.legacySystemId;
          const uuid = row.id;

          result.set(legacyId, uuid);
          cache.set(legacyId, uuid);
        }

        // Log missing IDs
        const found = new Set(rows.map((r: any) => r.legacySystemId));
        const missing = toFetch.filter(id => !found.has(id));
        if (missing.length > 0) {
          console.warn(
            `⚠️  ${tableName}: ${missing.length} records not found with legacySystemIds: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`
          );
        }
      } catch (error) {
        console.error(`❌ Error bulk mapping legacy IDs for ${tableName}:`, error);
      }
    }

    return result;
  }

  /**
   * Clear cache for a specific table or all tables
   */
  clearCache(tableName?: string): void {
    if (tableName) {
      this.cache.delete(tableName);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats(): {tableName: string, cachedCount: number}[] {
    const stats: {tableName: string, cachedCount: number}[] = [];
    for (const [tableName, tableCache] of this.cache.entries()) {
      stats.push({
        tableName,
        cachedCount: tableCache.size
      });
    }
    return stats;
  }
}
