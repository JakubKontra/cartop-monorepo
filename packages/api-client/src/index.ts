/**
 * @cartop/api-client
 *
 * Shared API client for Cartop monorepo
 * Contains auto-generated REST API types and TanStack Query hooks from Orval
 * Built with native Fetch API (zero HTTP dependencies!)
 */

// Export all generated REST API types (schemas)
export * from './generated/rest-api.schemas';

// Export all generated hooks by module
export * from './generated/marketing/marketing';
export * from './generated/notification/notification';
export * from './generated/newsletter/newsletter';

// Export Fetch-based HTTP client and utilities
export {
  customInstance,
  apiClient,
  addRequestInterceptor,
  addResponseInterceptor,
  ApiError,
  type RequestConfig,
} from './config/custom-instance';
