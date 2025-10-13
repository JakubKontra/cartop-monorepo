/**
 * Cache Management Utilities
 *
 * Centralized cache revalidation and management
 */

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Cache tags used across the application
 */
export const CACHE_TAGS = {
  BRANDS: 'brands',
  BRANDS_HIGHLIGHTED: 'brands-highlighted',
  BRANDS_LIST: 'brands-list',
} as const;

/**
 * Cache paths used across the application
 */
export const CACHE_PATHS = {
  BRANDS: '/brands',
  BRANDS_SLUG: '/brands/[slug]',
  HOME: '/',
} as const;

/**
 * Revalidate brands cache by tag
 */
export function revalidateBrandsCache(): void {
  revalidateTag(CACHE_TAGS.BRANDS);
  revalidateTag(CACHE_TAGS.BRANDS_HIGHLIGHTED);
}

/**
 * Revalidate brands list page
 */
export function revalidateBrandsPage(): void {
  revalidatePath(CACHE_PATHS.BRANDS);
}

/**
 * Revalidate homepage
 */
export function revalidateHomepage(): void {
  revalidatePath(CACHE_PATHS.HOME, 'page');
}

/**
 * Revalidate all brands related caches
 */
export function revalidateAllBrands(): void {
  revalidateBrandsCache();
  revalidateBrandsPage();
  revalidateHomepage();
}
