/**
 * Promotional Offers Section Component
 *
 * Server component that displays promotional vehicle offers on homepage
 * Uses Next.js ISR (Incremental Static Regeneration) and Server Actions
 */

import Link from 'next/link';

import { PromotionalOffersCard } from '@/components/molecules/PromotionalOffersCard';
import type { PromotionalOffer } from '@/lib/services/promotional-offers.service';
import { getPromotionalOffers } from '@/lib/services/promotional-offers.service';

import { PromotionalOffersSectionHeader } from './PromotionalOffersSectionHeader';

// ISR revalidation: 60 seconds
export const revalidate = 60;

const DEFAULT_OFFERS_LIMIT = 3;

type PromotionalOffersSectionProps = {
  /** Highlighted part of the title */
  highlightedTitle?: string;
  /** Remaining part of the title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Maximum number of offers to display */
  limit?: number;
  /** Pre-fetched offers (optional) - allows parent to control data */
  items?: PromotionalOffer[];
  /** Filter by brand ID */
  brandId?: string;
  /** Filter by offer type */
  offerType?: 'OPERATIONAL_LEASING' | 'DIRECT_PURCHASE';
  /** Show "View all" link */
  showViewAllLink?: boolean;
  /** Background color for the section container (e.g., "#EFEFEF") */
  backgroundColor?: string;
  /** Custom CSS classes */
  className?: string;
};

export const PromotionalOffersSection = async ({
  backgroundColor,
  brandId,
  className,
  highlightedTitle = 'Akční',
  items,
  limit = DEFAULT_OFFERS_LIMIT,
  offerType,
  showViewAllLink = true,
  subtitle = 'Vyberte si z našich top možností a jeďěte výhodněji.',
  title = 'vozy',
}: PromotionalOffersSectionProps) => {
  // Use pre-fetched items if provided, otherwise fetch from service
  const offers =
    items ||
    (await getPromotionalOffers({
      filters: {
        brandId,
        isActive: true,
        isPublic: true,
        limit,
        type: offerType,
      },
    }));

  return (
    <section
      className={backgroundColor ? 'rounded-3xl p-4 lg:p-6 ml-4 mr-4' : ''}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="mx-auto max-w-[1360px] px-2 py-8 lg:py-12">
        <div>
          <PromotionalOffersSectionHeader
            highlightedTitle={highlightedTitle}
            subtitle={subtitle}
            title={title}
          />

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map(offer => {
              // Get the first image from gallery if available
              const mainImage = offer.modelGeneration.gallery?.images[0];

              // Build vehicle title
              const vehicleTitle =
                `${offer.brand?.name || ''} ${offer.modelGeneration.name}`.trim();

              // Build subtitle with model generation details
              const subtitle = [
                offer.modelGeneration.engineDisplacement
                  ? `${offer.modelGeneration.engineDisplacement}L`
                  : null,
                offer.modelGeneration.horsepower
                  ? `(${offer.modelGeneration.horsepower} Hp)`
                  : null,
                offer.modelGeneration.fuelType,
                offer.modelGeneration.transmission,
              ]
                .filter(Boolean)
                .join(' ');

              // Determine badge text based on offer type
              const badgeText =
                offer.type === 'OPERATIONAL_LEASING' ? 'Operativní leasing' : 'Přímý nákup';

              // Build color variants (mock data - you'll need to fetch actual color variants)
              const colorVariants: string[] = [];

              // Determine condition (all new for promotional offers typically)
              const condition = 'Nový';

              // Build mileage display
              const mileage = '0 km';

              // Build annual mileage range
              const annualMileage = offer.annualMileageLimit
                ? `15 000 - ${offer.annualMileageLimit.toLocaleString('cs-CZ')} km`
                : undefined;

              // Build link href
              const href = `/offers/${offer.slug || offer.id}`;

              return (
                <PromotionalOffersCard
                  key={offer.id}
                  annualMileage={annualMileage}
                  badgeText={badgeText}
                  brandName={offer.brand?.name || ''}
                  colorVariants={colorVariants}
                  condition={condition}
                  currency="Kč"
                  drivetrain={offer.modelGeneration.drivetrain || undefined}
                  fuelType={offer.modelGeneration.fuelType || undefined}
                  horsepower={
                    offer.modelGeneration.horsepower
                      ? `${offer.modelGeneration.horsepower} Hp`
                      : undefined
                  }
                  href={href}
                  id={offer.id}
                  identifier={offer.id.slice(0, 12)}
                  imageAlt={mainImage?.alt || vehicleTitle}
                  imageUrl={mainImage?.url}
                  mileage={mileage}
                  monthlyPrice={offer.monthlyPayment || offer.totalPrice}
                  priceFrequencyText={
                    offer.type === 'OPERATIONAL_LEASING' ? 'Měsíčně od' : 'Celková cena'
                  }
                  subtitle={subtitle}
                  title={vehicleTitle}
                  transmission={offer.modelGeneration.transmission || undefined}
                  vehicleType={offer.modelGeneration.bodyType || undefined}
                />
              );
            })}
          </div>

          {showViewAllLink && (
            <div className="flex w-full justify-center">
              <Link className="text-sm text-primary underline hover:no-underline" href="/offers">
                Zobrazit všechny nabídky
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
