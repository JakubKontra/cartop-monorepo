'use server';

/**
 * Promotional Offers Server Actions
 *
 * Server-side actions for promotional offers data fetching and cache management
 */

import { revalidatePath, revalidateTag } from 'next/cache';

import type { PromotionalOffer } from '@/lib/services/promotional-offers.service';

import {
  getDirectPurchaseOffers as getDirectPurchaseOffersService,
  getOperationalLeasingOffers as getOperationalLeasingOffersService,
  getPromotionalOffers as getPromotionalOffersService,
} from '@/lib/services/promotional-offers.service';

/**
 * Server Action: Fetch all promotional offers
 * Can be called from client or server components
 * @param filters - Optional filters for offers
 */
export async function getPromotionalOffersAction(filters?: {
  brandId?: string;
  isActive?: boolean;
  isPublic?: boolean;
  limit?: number;
  modelGenerationId?: string;
  modelId?: string;
  offset?: number;
  priceMax?: number;
  priceMin?: number;
  type?: 'DIRECT_PURCHASE' | 'INDIVIDUAL' | 'OPERATIONAL_LEASING';
}): Promise<{
  error?: string;
  offers?: PromotionalOffer[];
  success: boolean;
}> {
  try {
    const offers = await getPromotionalOffersService({ filters });
    return {
      offers,
      success: true,
    };
  } catch (error) {
    console.error('[getPromotionalOffersAction] Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Nepodařilo se načíst akční nabídky',
      success: false,
    };
  }
}

/**
 * Server Action: Fetch operational leasing offers
 */
export async function getOperationalLeasingOffersAction(filters?: {
  brandId?: string;
  isActive?: boolean;
  isPublic?: boolean;
  limit?: number;
  modelGenerationId?: string;
  modelId?: string;
  offset?: number;
  priceMax?: number;
  priceMin?: number;
}): Promise<{
  error?: string;
  offers?: PromotionalOffer[];
  success: boolean;
}> {
  try {
    const offers = await getOperationalLeasingOffersService({ filters });
    return {
      offers,
      success: true,
    };
  } catch (error) {
    console.error('[getOperationalLeasingOffersAction] Error:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Nepodařilo se načíst operativní leasingové nabídky',
      success: false,
    };
  }
}

/**
 * Server Action: Fetch direct purchase offers
 */
export async function getDirectPurchaseOffersAction(filters?: {
  brandId?: string;
  isActive?: boolean;
  isPublic?: boolean;
  limit?: number;
  modelGenerationId?: string;
  modelId?: string;
  offset?: number;
  priceMax?: number;
  priceMin?: number;
}): Promise<{
  error?: string;
  offers?: PromotionalOffer[];
  success: boolean;
}> {
  try {
    const offers = await getDirectPurchaseOffersService({ filters });
    return {
      offers,
      success: true,
    };
  } catch (error) {
    console.error('[getDirectPurchaseOffersAction] Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Nepodařilo se načíst nabídky přímého nákupu',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate promotional offers cache by tag
 */
export async function revalidatePromotionalOffersCacheAction(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    revalidateTag('promotional-offers');
    return {
      message: 'Cache akčních nabídek byl úspěšně aktualizován',
      success: true,
    };
  } catch (error) {
    console.error('[revalidatePromotionalOffersCacheAction] Error:', error);
    return {
      message: 'Nepodařilo se aktualizovat cache',
      success: false,
    };
  }
}

/**
 * Server Action: Revalidate specific offer type cache
 */
export async function revalidateOfferTypeCacheAction(
  type: 'direct-purchase' | 'operational-leasing',
): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const tag =
      type === 'operational-leasing' ? 'operational-leasing-offers' : 'direct-purchase-offers';
    revalidateTag(tag);
    return {
      message: `Cache pro ${type} byl úspěšně aktualizován`,
      success: true,
    };
  } catch (error) {
    console.error('[revalidateOfferTypeCacheAction] Error:', error);
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
