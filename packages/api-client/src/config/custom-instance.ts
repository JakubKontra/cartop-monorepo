/**
 * Custom Fetch-based HTTP client for API calls
 * Zero dependencies, modern Fetch API
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Type for request configuration matching Orval's expectations
 */
export interface RequestConfig {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Extended Error type for API errors
 * Includes response details and parsed error body
 */
export class ApiError extends Error {
  response: Response;
  status: number;
  data?: unknown;

  constructor(message: string, response: Response, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.status = response.status;
    this.data = data;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Global request interceptor functions
 * Add auth tokens, logging, etc.
 */
const requestInterceptors: Array<(config: RequestConfig) => RequestConfig | Promise<RequestConfig>> = [];

/**
 * Global response interceptor functions
 * Handle errors, refresh tokens, etc.
 */
const responseInterceptors: Array<{
  onFulfilled?: (response: Response) => Response | Promise<Response>;
  onRejected?: (error: ApiError) => unknown;
}> = [];

/**
 * Add a request interceptor
 *
 * @example
 * addRequestInterceptor((config) => {
 *   const token = localStorage.getItem('token');
 *   if (token) {
 *     config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
 *   }
 *   return config;
 * });
 */
export function addRequestInterceptor(
  interceptor: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
): void {
  requestInterceptors.push(interceptor);
}

/**
 * Add a response interceptor
 *
 * @example
 * addResponseInterceptor({
 *   onRejected: (error) => {
 *     if (error.message.includes('401')) {
 *       // Handle unauthorized
 *       window.location.href = '/login';
 *     }
 *     throw error;
 *   }
 * });
 */
export function addResponseInterceptor(interceptor: {
  onFulfilled?: (response: Response) => Response | Promise<Response>;
  onRejected?: (error: ApiError) => unknown;
}): void {
  responseInterceptors.push(interceptor);
}

/**
 * Build query string from params object
 */
function buildQueryString(params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return '';

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Custom fetch instance used by Orval generated code
 *
 * This function signature matches what Orval expects when using custom instance
 */
export async function customInstance<T>(
  config: RequestConfig,
  options?: RequestInit
): Promise<T> {
  // Apply request interceptors
  let finalConfig = { ...config };
  for (const interceptor of requestInterceptors) {
    finalConfig = await interceptor(finalConfig);
  }

  // Build full URL with query params
  const queryString = buildQueryString(finalConfig.params);
  const url = `${BASE_URL}${finalConfig.url}${queryString}`;

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method: finalConfig.method,
    headers: {
      'Content-Type': 'application/json',
      ...finalConfig.headers,
      ...options?.headers,
    },
    signal: finalConfig.signal,
    ...options,
  };

  // Add body for non-GET requests
  if (finalConfig.data && finalConfig.method !== 'GET') {
    fetchOptions.body = JSON.stringify(finalConfig.data);
  }

  try {
    // Make the request
    let response = await fetch(url, fetchOptions);

    // Apply response interceptors (fulfilled)
    for (const interceptor of responseInterceptors) {
      if (interceptor.onFulfilled) {
        response = await interceptor.onFulfilled(response);
      }
    }

    // Handle HTTP errors
    if (!response.ok) {
      // Try to parse error body
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        // Body is not JSON, will be undefined
      }

      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response,
        errorData
      );
    }

    // Parse response
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return (await response.json()) as T;
    }

    // Return text for non-JSON responses
    return (await response.text()) as unknown as T;
  } catch (error) {
    // Apply response interceptors (rejected)
    if (error instanceof ApiError) {
      for (const interceptor of responseInterceptors) {
        if (interceptor.onRejected) {
          await interceptor.onRejected(error);
        }
      }
    }

    throw error;
  }
}

/**
 * Direct API client for manual requests (not generated code)
 *
 * @example
 * const data = await apiClient.get('/users');
 * await apiClient.post('/users', { name: 'John' });
 */
export const apiClient = {
  get: <T = unknown>(url: string, config?: Partial<RequestConfig>) =>
    customInstance<T>({ url, method: 'GET', ...config }),

  post: <T = unknown>(url: string, data?: unknown, config?: Partial<RequestConfig>) =>
    customInstance<T>({ url, method: 'POST', data, ...config }),

  put: <T = unknown>(url: string, data?: unknown, config?: Partial<RequestConfig>) =>
    customInstance<T>({ url, method: 'PUT', data, ...config }),

  patch: <T = unknown>(url: string, data?: unknown, config?: Partial<RequestConfig>) =>
    customInstance<T>({ url, method: 'PATCH', data, ...config }),

  delete: <T = unknown>(url: string, config?: Partial<RequestConfig>) =>
    customInstance<T>({ url, method: 'DELETE', ...config }),
};

// Default export for convenience
export default customInstance;
