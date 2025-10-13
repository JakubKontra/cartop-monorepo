'use server';

/**
 * Brands Server Actions
 *
 * Server-side actions for brands data fetching and cache management
 */

import { revalidatePath, revalidateTag } from 'next/cache';

import type { Brand } from '@/lib/services/brands.service';

import { getHighlightedBrands as getHighlightedBrandsService } from '@/lib/services/brands.service';

/**
 * Server Action: Fetch highlighted brands
 * Can be called from client or server components
 * @param limit - Optional limit for number of brands to fetch
 */
export async function getHighlightedBrandsAction(limit?: number): Promise<{
  brands?: Brand[];
  error?: string;
  success: boolean;
}> {
  try {
    const brands = await getHighlightedBrandsService({ limit });
    return {
      brands,
      success: true,
    };
  } catch (error) {
    console.error('[getHighlightedBrandsAction] Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Nepodařilo se načíst značky',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate brands cache by tag
 */
export async function revalidateBrandsCacheAction(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    revalidateTag('brands');
    return {
      message: 'Cache značek byl úspěšně aktualizován',
      success: true,
    };
  } catch (error) {
    console.error('[revalidateBrandsCacheAction] Error:', error);
    return {
      message: 'Nepodařilo se aktualizovat cache',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate homepage
 */
export async function revalidateHomepageAction(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    revalidatePath('/', 'page');
    return {
      message: 'Homepage byla úspěšně aktualizována',
      success: true,
    };
  } catch (error) {
    console.error('[revalidateHomepageAction] Error:', error);
    return {
      message: 'Nepodařilo se aktualizovat homepage',
      success: false,
    };
  }
}
