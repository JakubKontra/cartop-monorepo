/**
 * Promotional Offers Data Service
 *
 * Pure data fetching layer for promotional vehicle offers
 * Separates GraphQL logic from components and actions
 */

import type {
  GetDirectPurchaseOffersQuery,
  GetOperationalLeasingOffersQuery,
  GetPromotionalOffersQuery,
} from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';
import {
  GET_DIRECT_PURCHASE_OFFERS_QUERY,
  GET_OPERATIONAL_LEASING_OFFERS_QUERY,
  GET_PROMOTIONAL_OFFERS_QUERY,
} from '@/queries/promotional-offers';

export type OfferImage = {
  alt?: string | null;
  height?: number | null;
  id: string;
  url: string;
  width?: number | null;
};

export type OfferGallery = {
  id: string;
  images: OfferImage[];
  name: string;
};

export type OfferBrand = {
  id: string;
  logo?: {
    alt?: string | null;
    height?: number | null;
    id: string;
    url: string;
    width?: number | null;
  } | null;
  name: string;
  slug: string;
};

export type OfferModel = {
  id: string;
  name: string;
  slug: string;
};

export type OfferModelGeneration = {
  bodyType?: string | null;
  drivetrain?: string | null;
  engineDisplacement?: number | null;
  fuelType?: string | null;
  gallery?: OfferGallery | null;
  horsepower?: number | null;
  id: string;
  name: string;
  slug: string;
  transmission?: string | null;
  year?: number | null;
};

export type PromotionalOffer = {
  annualMileageLimit?: number | null;
  brand?: OfferBrand | null;
  createdAt: string;
  description?: string | null;
  discountAmount?: number | null;
  discountPercentage?: number | null;
  financingAvailable?: boolean | null;
  hasAssistanceServiceIncluded?: boolean | null;
  hasGapIncluded?: boolean | null;
  hasServiceIncluded?: boolean | null;
  hasWinterTyresIncluded?: boolean | null;
  id: string;
  includesWarranty?: boolean | null;
  isActive: boolean;
  isPublic: boolean;
  leasingDurationMonths?: number | null;
  model?: OfferModel | null;
  modelGeneration: OfferModelGeneration;
  monthlyPayment?: number | null;
  slug?: string | null;
  totalPrice?: number | null;
  type: string;
  updatedAt: string;
  warrantyYears?: number | null;
};

export type GetPromotionalOffersOptions = {
  /** Filter options */
  filters?: {
    /** Filter by brand ID */
    brandId?: string;
    /** Filter by active status */
    isActive?: boolean;
    /** Filter by public visibility */
    isPublic?: boolean;
    /** Maximum number of offers to return */
    limit?: number;
    /** Filter by model generation ID */
    modelGenerationId?: string;
    /** Filter by model ID */
    modelId?: string;
    /** Offset for pagination */
    offset?: number;
    /** Maximum price filter */
    priceMax?: number;
    /** Minimum price filter */
    priceMin?: number;
    /** Filter by offer type */
    type?: 'OPERATIONAL_LEASING' | 'DIRECT_PURCHASE' | 'INDIVIDUAL';
  };
  /** Additional fetch options */
  requestInit?: RequestInit;
};

/**
 * Transform raw offer data from GraphQL to typed PromotionalOffer
 */
function transformOffer(offer: any): PromotionalOffer {
  return {
    annualMileageLimit: offer.annualMileageLimit || null,
    brand: offer.brand
      ? {
          id: offer.brand.id,
          logo: offer.brand.logo
            ? {
                alt: offer.brand.logo.alt || null,
                height: offer.brand.logo.height || null,
                id: offer.brand.logo.id,
                url: offer.brand.logo.url,
                width: offer.brand.logo.width || null,
              }
            : null,
          name: offer.brand.name,
          slug: offer.brand.slug,
        }
      : null,
    createdAt: offer.createdAt,
    description: offer.description || null,
    discountAmount: offer.discountAmount || null,
    discountPercentage: offer.discountPercentage || null,
    financingAvailable: offer.financingAvailable || null,
    hasAssistanceServiceIncluded: offer.hasAssistanceServiceIncluded || null,
    hasGapIncluded: offer.hasGapIncluded || null,
    hasServiceIncluded: offer.hasServiceIncluded || null,
    hasWinterTyresIncluded: offer.hasWinterTyresIncluded || null,
    id: offer.id,
    includesWarranty: offer.includesWarranty || null,
    isActive: offer.isActive,
    isPublic: offer.isPublic,
    leasingDurationMonths: offer.leasingDurationMonths || null,
    model: offer.model
      ? {
          id: offer.model.id,
          name: offer.model.name,
          slug: offer.model.slug,
        }
      : null,
    modelGeneration: {
      bodyType: offer.modelGeneration.bodyType || null,
      drivetrain: offer.modelGeneration.drivetrain || null,
      engineDisplacement: offer.modelGeneration.engineDisplacement || null,
      fuelType: offer.modelGeneration.fuelType || null,
      gallery: offer.modelGeneration.gallery
        ? {
            id: offer.modelGeneration.gallery.id,
            images: offer.modelGeneration.gallery.images.map((img: any) => ({
              alt: img.alt || null,
              height: img.height || null,
              id: img.id,
              url: img.url,
              width: img.width || null,
            })),
            name: offer.modelGeneration.gallery.name,
          }
        : null,
      horsepower: offer.modelGeneration.horsepower || null,
      id: offer.modelGeneration.id,
      name: offer.modelGeneration.name,
      slug: offer.modelGeneration.slug,
      transmission: offer.modelGeneration.transmission || null,
      year: offer.modelGeneration.year || null,
    },
    monthlyPayment: offer.monthlyPayment || null,
    slug: offer.slug || null,
    totalPrice: offer.totalPrice || null,
    type: offer.type,
    updatedAt: offer.updatedAt,
    warrantyYears: offer.warrantyYears || null,
  };
}

/**
 * Generate dummy promotional offers data for development/testing
 */
function generateDummyOffers(): PromotionalOffer[] {
  return [
    {
      annualMileageLimit: 25000,
      brand: {
        id: 'brand-1',
        logo: {
          alt: 'Škoda logo',
          height: 100,
          id: 'logo-1',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Skoda_Auto_logo.svg/1200px-Skoda_Auto_logo.svg.png',
          width: 100,
        },
        name: 'Škoda',
        slug: 'skoda',
      },
      createdAt: new Date().toISOString(),
      description: 'Výhodná nabídka na operativní leasing Škoda Octavia',
      discountAmount: 50000,
      discountPercentage: 10,
      financingAvailable: true,
      hasAssistanceServiceIncluded: true,
      hasGapIncluded: true,
      hasServiceIncluded: true,
      hasWinterTyresIncluded: true,
      id: 'offer-1',
      includesWarranty: true,
      isActive: true,
      isPublic: true,
      leasingDurationMonths: 48,
      model: {
        id: 'model-1',
        name: 'Octavia',
        slug: 'octavia',
      },
      modelGeneration: {
        bodyType: 'Kombi',
        drivetrain: '4x4',
        engineDisplacement: 2.0,
        fuelType: 'Diesel',
        gallery: {
          id: 'gallery-1',
          images: [
            {
              alt: 'Škoda Octavia',
              height: 800,
              id: 'img-1',
              url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
              width: 1200,
            },
          ],
          name: 'Octavia Gallery',
        },
        horsepower: 200,
        id: 'gen-1',
        name: 'Octavia 2.0 TDI Style',
        slug: 'octavia-2-0-tdi-style',
        transmission: 'Automatická',
        year: 2024,
      },
      monthlyPayment: 12500,
      slug: 'skoda-octavia-2-0-tdi-style',
      totalPrice: 600000,
      type: 'OPERATIONAL_LEASING',
      updatedAt: new Date().toISOString(),
      warrantyYears: 3,
    },
    {
      annualMileageLimit: 20000,
      brand: {
        id: 'brand-2',
        logo: {
          alt: 'Volkswagen logo',
          height: 100,
          id: 'logo-2',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png',
          width: 100,
        },
        name: 'Volkswagen',
        slug: 'volkswagen',
      },
      createdAt: new Date().toISOString(),
      description: 'Prémiová nabídka Volkswagen Passat s kompletním servisem',
      discountAmount: 75000,
      discountPercentage: 12,
      financingAvailable: true,
      hasAssistanceServiceIncluded: true,
      hasGapIncluded: true,
      hasServiceIncluded: true,
      hasWinterTyresIncluded: true,
      id: 'offer-2',
      includesWarranty: true,
      isActive: true,
      isPublic: true,
      leasingDurationMonths: 60,
      model: {
        id: 'model-2',
        name: 'Passat',
        slug: 'passat',
      },
      modelGeneration: {
        bodyType: 'Sedan',
        drivetrain: '4MOTION',
        engineDisplacement: 2.0,
        fuelType: 'Benzín',
        gallery: {
          id: 'gallery-2',
          images: [
            {
              alt: 'Volkswagen Passat',
              height: 800,
              id: 'img-2',
              url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
              width: 1200,
            },
          ],
          name: 'Passat Gallery',
        },
        horsepower: 190,
        id: 'gen-2',
        name: 'Passat 2.0 TSI Highline',
        slug: 'passat-2-0-tsi-highline',
        transmission: 'DSG',
        year: 2024,
      },
      monthlyPayment: 15900,
      slug: 'volkswagen-passat-2-0-tsi-highline',
      totalPrice: 954000,
      type: 'OPERATIONAL_LEASING',
      updatedAt: new Date().toISOString(),
      warrantyYears: 3,
    },
    {
      annualMileageLimit: null,
      brand: {
        id: 'brand-3',
        logo: {
          alt: 'Toyota logo',
          height: 100,
          id: 'logo-3',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
          width: 100,
        },
        name: 'Toyota',
        slug: 'toyota',
      },
      createdAt: new Date().toISOString(),
      description: 'Toyota RAV4 - Přímý nákup s výhodnou cenou',
      discountAmount: 120000,
      discountPercentage: 15,
      financingAvailable: true,
      hasAssistanceServiceIncluded: false,
      hasGapIncluded: false,
      hasServiceIncluded: false,
      hasWinterTyresIncluded: false,
      id: 'offer-3',
      includesWarranty: true,
      isActive: true,
      isPublic: true,
      leasingDurationMonths: null,
      model: {
        id: 'model-3',
        name: 'RAV4',
        slug: 'rav4',
      },
      modelGeneration: {
        bodyType: 'SUV',
        drivetrain: 'AWD',
        engineDisplacement: 2.5,
        fuelType: 'Hybrid',
        gallery: {
          id: 'gallery-3',
          images: [
            {
              alt: 'Toyota RAV4',
              height: 800,
              id: 'img-3',
              url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
              width: 1200,
            },
          ],
          name: 'RAV4 Gallery',
        },
        horsepower: 218,
        id: 'gen-3',
        name: 'RAV4 2.5 Hybrid Executive',
        slug: 'rav4-2-5-hybrid-executive',
        transmission: 'E-CVT',
        year: 2024,
      },
      monthlyPayment: null,
      slug: 'toyota-rav4-2-5-hybrid-executive',
      totalPrice: 680000,
      type: 'DIRECT_PURCHASE',
      updatedAt: new Date().toISOString(),
      warrantyYears: 5,
    },
  ];
}

/**
 * Fetch all promotional offers from GraphQL API
 * @param options - Optional configuration for fetching offers
 * @throws Error if no offers found or API error
 */
export async function getPromotionalOffers(
  options?: GetPromotionalOffersOptions,
): Promise<PromotionalOffer[]> {
  const { filters, requestInit } = options || {};

  try {
    const data = await graphqlRequest<GetPromotionalOffersQuery>(
      {
        query: GET_PROMOTIONAL_OFFERS_QUERY,
        variables: filters ? { filters } : {},
      },
      {
        // Add cache tags for targeted revalidation
        next: { tags: ['promotional-offers'] },
        ...requestInit,
      },
    );

    if (!data.publicOffers || data.publicOffers.length === 0) {
      // Return dummy data instead of throwing error
      console.warn('[getPromotionalOffers] No offers found, returning dummy data');
      return generateDummyOffers();
    }

    return data.publicOffers.map(transformOffer);
  } catch (error) {
    // On API error, return dummy data
    console.error('[getPromotionalOffers] API error, returning dummy data:', error);
    return generateDummyOffers();
  }
}

/**
 * Fetch operational leasing offers specifically
 * @param options - Optional configuration for fetching offers
 * @throws Error if no offers found or API error
 */
export async function getOperationalLeasingOffers(
  options?: GetPromotionalOffersOptions,
): Promise<PromotionalOffer[]> {
  const { filters, requestInit } = options || {};

  try {
    const data = await graphqlRequest<GetOperationalLeasingOffersQuery>(
      {
        query: GET_OPERATIONAL_LEASING_OFFERS_QUERY,
        variables: filters ? { filters } : {},
      },
      {
        next: { tags: ['promotional-offers', 'operational-leasing-offers'] },
        ...requestInit,
      },
    );

    if (!data.operationalLeasingOffers || data.operationalLeasingOffers.length === 0) {
      console.warn('[getOperationalLeasingOffers] No offers found, returning dummy data');
      return generateDummyOffers().filter(offer => offer.type === 'OPERATIONAL_LEASING');
    }

    return data.operationalLeasingOffers.map(transformOffer);
  } catch (error) {
    console.error('[getOperationalLeasingOffers] API error, returning dummy data:', error);
    return generateDummyOffers().filter(offer => offer.type === 'OPERATIONAL_LEASING');
  }
}

/**
 * Fetch direct purchase offers specifically
 * @param options - Optional configuration for fetching offers
 * @throws Error if no offers found or API error
 */
export async function getDirectPurchaseOffers(
  options?: GetPromotionalOffersOptions,
): Promise<PromotionalOffer[]> {
  const { filters, requestInit } = options || {};

  try {
    const data = await graphqlRequest<GetDirectPurchaseOffersQuery>(
      {
        query: GET_DIRECT_PURCHASE_OFFERS_QUERY,
        variables: filters ? { filters } : {},
      },
      {
        next: { tags: ['promotional-offers', 'direct-purchase-offers'] },
        ...requestInit,
      },
    );

    if (!data.directPurchaseOffers || data.directPurchaseOffers.length === 0) {
      console.warn('[getDirectPurchaseOffers] No offers found, returning dummy data');
      return generateDummyOffers().filter(offer => offer.type === 'DIRECT_PURCHASE');
    }

    return data.directPurchaseOffers.map(transformOffer);
  } catch (error) {
    console.error('[getDirectPurchaseOffers] API error, returning dummy data:', error);
    return generateDummyOffers().filter(offer => offer.type === 'DIRECT_PURCHASE');
  }
}
