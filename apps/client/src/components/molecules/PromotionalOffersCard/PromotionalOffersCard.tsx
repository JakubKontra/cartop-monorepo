import type { ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';

import { CarIcon } from '@/components/atoms/icons/specs/CarIcon';
import { DrivetrainIcon } from '@/components/atoms/icons/specs/DrivetrainIcon';
import { EngineIcon } from '@/components/atoms/icons/specs/EngineIcon';
import { FuelTypeIcon } from '@/components/atoms/icons/specs/FuelTypeIcon';
import { LikeIcon } from '@/components/atoms/icons/specs/LikeIcon';
import { SpeedMeterIcon } from '@/components/atoms/icons/specs/SpeedMeterIcon';
import { TransmissionTypeIcon } from '@/components/atoms/icons/specs/TransmissionTypeIcon';
import { VehicleIdIcon } from '@/components/atoms/icons/specs/VehicleIdIcon';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/utils/cv';

import type { OfferCardLabel } from './components/OfferCardLabels';
import type { OfferCardSpecItem } from './components/OfferCardSpecs';

import { OfferCardActions } from './components/OfferCardActions';
import { OfferCardAnnualMileage } from './components/OfferCardAnnualMileage';
import { OfferCardColorVariants } from './components/OfferCardColorVariants';
import { OfferCardCTA } from './components/OfferCardCTA';
import { OfferCardHeader } from './components/OfferCardHeader';
import { OfferCardLabels } from './components/OfferCardLabels';
import { OfferCardPricing } from './components/OfferCardPricing';
import { OfferCardSpecs } from './components/OfferCardSpecs';
import { OfferCardCarousel } from './OfferCardCarousel';

export type OfferCardProps = {
  /** Annual mileage range (e.g., "15 000 - 50 000 km") */
  annualMileage?: string;
  /** Promotional badge text (e.g., "Do 3 měsíců") */
  badgeText?: string;
  /** Vehicle brand name (e.g., "Volvo") */
  brandName: string;
  /** Optional CSS classes */
  className?: string;
  /** Available color variants - hex color codes */
  colorVariants?: string[];
  /** Condition (e.g., "Nový") */
  condition?: string;
  /** CTA button text */
  ctaText?: string;
  /** Currency (e.g., "Kč") */
  currency?: string;
  /** Drivetrain (e.g., "4x4") */
  drivetrain?: string;
  /** Fuel type (e.g., "Diesel") */
  fuelType?: string;
  /** Horsepower (e.g., "231 Hp") */
  horsepower?: string;
  /** Link href */
  href: string;
  /** Unique offer ID */
  id: string;
  /** VIN or identifier */
  identifier?: string;
  /** Image alt text (deprecated - use images array instead) */
  imageAlt?: string;
  /** Main image URL (deprecated - use images array instead) */
  imageUrl?: null | string;
  /** Array of image URLs for carousel */
  images?: { alt?: string; url: string }[];
  /** Labels for the vehicle - supports both string[] and OfferCardLabel[] formats */
  labels?: (OfferCardLabel | string)[];
  /** Mileage info (e.g., "0 km") */
  mileage?: string;
  /** Monthly price */
  monthlyPrice?: number;
  /** Price frequency text (e.g., "Měsíčně od") */
  priceFrequencyText?: string;
  /** Show compare icon */
  shouldShowCompare?: boolean;
  /** Show favorite icon */
  shouldShowFavorite?: boolean;
  /** Vehicle specs subtitle (e.g., "2.0 B4 (197 Hp) Mild Hybrid Automatic Core") */
  subtitle: string;
  /** Vehicle model title (e.g., "XC90 Plus") */
  title: string;
  /** Transmission type (e.g., "8° Automatická") */
  transmission?: string;
  /** Vehicle type (e.g., "SUV") */
  vehicleType?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'href'>;

export const OfferCard = ({
  annualMileage,
  badgeText,
  brandName,
  className,
  colorVariants = [],
  condition,
  ctaText = 'Zobrazit nabídku',
  currency = 'Kč',
  drivetrain,
  fuelType,
  horsepower,
  href,
  id,
  identifier,
  imageAlt,
  images,
  imageUrl,
  labels = [],
  mileage,
  monthlyPrice,
  priceFrequencyText = 'Měsíčně od',
  shouldShowCompare = true,
  shouldShowFavorite = true,
  subtitle,
  title,
  transmission,
  vehicleType,
  ...rest
}: OfferCardProps) => {
  const galleryImages = images || (imageUrl ? [{ alt: imageAlt || title, url: imageUrl }] : []);

  const specs: OfferCardSpecItem[] = [];

  if (vehicleType) {
    specs.push({
      icon: <CarIcon className="size-6 shrink-0" />,
      label: vehicleType,
    });
  }

  if (mileage) {
    specs.push({
      icon: <SpeedMeterIcon className="size-6 shrink-0" />,
      label: mileage,
    });
  }

  if (condition) {
    specs.push({
      icon: <LikeIcon className="size-6 shrink-0" />,
      label: condition,
    });
  }

  if (drivetrain) {
    specs.push({
      icon: <DrivetrainIcon className="size-6 shrink-0" />,
      label: drivetrain,
    });
  }

  if (identifier) {
    specs.push({
      icon: <VehicleIdIcon className="size-6 shrink-0" />,
      label: identifier,
    });
  }

  if (fuelType) {
    specs.push({
      icon: <FuelTypeIcon className="size-6 shrink-0" />,
      label: fuelType,
    });
  }

  if (horsepower) {
    specs.push({
      icon: <EngineIcon className="size-6 shrink-0" />,
      label: horsepower,
    });
  }

  if (transmission) {
    specs.push({
      icon: <TransmissionTypeIcon className="size-6 shrink-0" />,
      label: transmission,
    });
  }

  return (
    <div
      {...rest}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-gunmetal-200 bg-white transition-all duration-300',
        // 'hover:border-primary hover:shadow-lg',
        className,
      )}
    >
      <Link aria-label={`View ${title}`} className="absolute inset-0 z-0" href={href} />

      <div className="relative z-10 aspect-[4/3] max-h-[250px] w-full overflow-hidden rounded-b-3xl">
        <OfferCardCarousel images={galleryImages} title={title} />
        <OfferCardLabels labels={labels} />
        <OfferCardActions
          offerId={id}
          shouldShowCompare={shouldShowCompare}
          shouldShowFavorite={shouldShowFavorite}
        />
      </div>

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col gap-6 p-4">
        {badgeText && (
          <div>
            <Label variant={'accent'}>{badgeText}</Label>
          </div>
        )}
        <OfferCardHeader brandName={brandName} subtitle={subtitle} title={title} />
        <OfferCardColorVariants colorVariants={colorVariants} offerId={id} />
        <OfferCardSpecs specs={specs} />
      </div>
      <div className="padding-[24px] -mb-p pointer-events-none relative z-10 mt-auto">
        <div className="flex w-full max-w-3xl flex-col items-center rounded-t-3xl rounded-b-3xl bg-gray-50 p-6 transition-colors duration-300 group-hover:bg-[#262D37]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            {annualMileage && <OfferCardAnnualMileage mileage={annualMileage} />}
            {monthlyPrice && (
              <OfferCardPricing
                currency={currency}
                frequencyText={priceFrequencyText}
                price={monthlyPrice}
              />
            )}
            <OfferCardCTA href={href} text={ctaText} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with legacy name for backward compatibility
export const PromotionalOffersCard = OfferCard;
export type PromotionalOffersCardProps = OfferCardProps;
