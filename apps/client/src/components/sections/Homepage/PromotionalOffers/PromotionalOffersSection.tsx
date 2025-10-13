/**
 * Promotional Offers Section Component
 *
 * Server component that displays promotional vehicle offers on homepage
 * Uses Next.js ISR (Incremental Static Regeneration) and Server Actions
 */

import Link from 'next/link';

import type { PromotionalOffer } from '@/lib/services/promotional-offers.service';

import { PromotionalOffersCard } from '@/components/molecules/PromotionalOffersCard';
import { getPromotionalOffers } from '@/lib/services/promotional-offers.service';

import { PromotionalOffersSectionHeader } from './PromotionalOffersSectionHeader';

// ISR revalidation: 60 seconds
export const revalidate = 60;

const DEFAULT_OFFERS_LIMIT = 3;

type PromotionalOffersSectionProps = {
  /** Background color for the section container (e.g., "#EFEFEF") */
  backgroundColor?: string;
  /** Filter by brand ID */
  brandId?: string;
  /** Custom CSS classes */
  className?: string;
  /** Highlighted part of the title */
  highlightedTitle?: string;
  /** Pre-fetched offers (optional) - allows parent to control data */
  items?: PromotionalOffer[];
  /** Maximum number of offers to display */
  limit?: number;
  /** Filter by offer type */
  offerType?: 'DIRECT_PURCHASE' | 'OPERATIONAL_LEASING';
  /** Show "View all" link */
  showViewAllLink?: boolean;
  /** Custom subtitle */
  subtitle?: string;
  /** Remaining part of the title */
  title?: string;
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
      className={backgroundColor ? 'mr-4 ml-4 rounded-3xl p-4 lg:p-6' : ''}
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
              // Get all images from gallery
              const galleryImages =
                offer.modelGeneration.gallery?.images.map(img => ({
                  alt: img.alt || undefined,
                  url: img.url,
                })) || [];

              // Build vehicle title (without brand name, as it's displayed separately)
              const vehicleTitle = offer.modelGeneration.name;

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
              const badgeText = 'Do 3 měsíců';

              // Build color variants - example data showcasing different vehicle colors
              const colorVariants: string[] = [
                '#FFFFFF', // White
                '#000000', // Black
                '#C0C0C0', // Silver
                '#1E3A8A', // Blue
                '#DC2626', // Red
                '#16A34A', // Green
              ];

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

              // Build labels with different variants to showcase the feature
              const labels: {
                text: string;
                variant: 'accent' | 'dark' | 'gunmetal-outline' | 'gunmetal' | 'light';
              }[] = [];

              // Add condition label with gunmetal variant
              if (condition) {
                labels.push({ text: condition, variant: 'gunmetal' });
              }

              // Add availability label with gunmetal-outline variant
              labels.push({ text: 'Skladem', variant: 'gunmetal-outline' });
              // Add special offer label for operational leasing with accent variant
              if (offer.type === 'OPERATIONAL_LEASING') {
                labels.push({ text: 'Top nabídka', variant: 'accent' });
              }

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
                  href={href}
                  id={offer.id}
                  identifier={offer.id.slice(0, 12)}
                  images={galleryImages}
                  labels={labels}
                  mileage={mileage}
                  monthlyPrice={offer.monthlyPayment || offer.totalPrice}
                  subtitle={subtitle}
                  title={vehicleTitle}
                  transmission={offer.modelGeneration.transmission || undefined}
                  vehicleType={offer.modelGeneration.bodyType || undefined}
                  horsepower={
                    offer.modelGeneration.horsepower
                      ? `${offer.modelGeneration.horsepower} Hp`
                      : undefined
                  }
                  priceFrequencyText={
                    offer.type === 'OPERATIONAL_LEASING' ? 'Měsíčně od' : 'Celková cena'
                  }
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
