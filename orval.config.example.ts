import { defineConfig } from 'orval';

/**
 * Example: Multiple Orval Configurations for Tag-Based API Generation
 *
 * This shows how to generate separate API clients for:
 * - Admin app (gets Admin + Public endpoints)
 * - Client app (gets only Public endpoints)
 * - Marketing/Notification endpoints NOT exposed to any frontend
 */

export default defineConfig({
  // ========================================
  // Admin API Client
  // ========================================
  'admin-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      filters: {
        // Admin gets: Admin-tagged + Public-tagged endpoints
        tags: ['Admin', 'Public'],
      },
    },
    output: {
      target: './packages/api-client-admin/src/generated/api.ts',
      client: 'react-query',
      mode: 'tags-split', // Separate files per tag
      override: {
        mutator: {
          path: './packages/api-client-admin/src/config/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },

  // ========================================
  // Client (Public) API Client
  // ========================================
  'client-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      filters: {
        // Client gets: ONLY Public-tagged endpoints
        tags: ['Public'],
      },
    },
    output: {
      target: './packages/api-client/src/generated/api.ts',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './packages/api-client/src/config/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});

/**
 * Backend Tagging Examples:
 *
 * // Public endpoint (exposed to client)
 * @ApiTags('Public', 'Catalog')
 * @Controller('api/catalog')
 * export class CatalogController {}
 *
 * // Admin endpoint (only exposed to admin)
 * @ApiTags('Admin', 'Users')
 * @Controller('api/admin/users')
 * export class AdminUsersController {}
 *
 * // Internal endpoint (NOT exposed to any frontend)
 * @ApiTags('Internal', 'Marketing')
 * @Controller('api/marketing')
 * export class MarketingController {}
 *
 * Usage in package.json:
 * {
 *   "scripts": {
 *     "generate:admin": "orval --project admin-api",
 *     "generate:client": "orval --project client-api",
 *     "generate:rest": "yarn generate:admin && yarn generate:client"
 *   }
 * }
 */
