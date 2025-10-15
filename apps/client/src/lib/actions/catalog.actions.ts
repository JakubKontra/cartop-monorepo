'use server';

/**
 * Catalog Server Actions
 *
 * Server-side actions for catalog data fetching and cache management
 */

import { revalidatePath, revalidateTag } from 'next/cache';

import type {
  CatalogBrand,
  HighlightedCatalogBrand,
} from '@/lib/services/catalog.service';

import {
  getAllCatalogBrands as getAllCatalogBrandsService,
  getHighlightedCatalogBrands as getHighlightedCatalogBrandsService,
} from '@/lib/services/catalog.service';

/**
 * Server Action: Fetch highlighted catalog brands
 * Can be called from client or server components
 * @param limit - Optional limit for number of brands to fetch
 */
export async function getHighlightedCatalogBrandsAction(limit?: number): Promise<{
  brands?: HighlightedCatalogBrand[];
  error?: string;
  success: boolean;
}> {
  try {
    const brands = await getHighlightedCatalogBrandsService({ limit });
    return {
      brands,
      success: true,
    };
  } catch (error) {
    console.error('[getHighlightedCatalogBrandsAction] Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Nepodařilo se načíst značky',
      success: false,
    };
  }
}

/**
 * Server Action: Fetch all catalog brands
 * Can be called from client or server components
 * @param options - Options for filtering and limiting brands
 */
export async function getAllCatalogBrandsAction(options?: {
  activeOnly?: boolean;
  limit?: number;
}): Promise<{
  brands?: CatalogBrand[];
  error?: string;
  success: boolean;
}> {
  try {
    const brands = await getAllCatalogBrandsService(options);
    return {
      brands,
      success: true,
    };
  } catch (error) {
    console.error('[getAllCatalogBrandsAction] Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Nepodařilo se načíst značky',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate catalog cache by tag
 */
export async function revalidateCatalogCacheAction(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    revalidateTag('catalog');
    return {
      message: 'Cache katalogu byl úspěšně aktualizován',
      success: true,
    };
  } catch (error) {
    console.error('[revalidateCatalogCacheAction] Error:', error);
    return {
      message: 'Nepodařilo se aktualizovat cache',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate catalog page
 */
export async function revalidateCatalogPageAction(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    revalidatePath('/katalog', 'page');
    return {
      message: 'Katalog byl úspěšně aktualizován',
      success: true,
    };
  } catch (error) {
    console.error('[revalidateCatalogPageAction] Error:', error);
    return {
      message: 'Nepodařilo se aktualizovat katalog',
      success: false,
    };
  }
}
