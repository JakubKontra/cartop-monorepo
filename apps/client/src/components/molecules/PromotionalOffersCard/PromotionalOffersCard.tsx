import type { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cv';

import { PromotionalOffersCardActions } from './PromotionalOffersCardActions';
import { PromotionalOffersCardColorVariants } from './PromotionalOffersCardColorVariants';

export type PromotionalOffersCardProps = {
  /** Unique offer ID */
  id: string;
  /** Vehicle brand name (e.g., "Volvo") */
  brandName: string;
  /** Vehicle model title (e.g., "XC90 Plus") */
  title: string;
  /** Vehicle specs subtitle (e.g., "2.0 B4 (197 Hp) Mild Hybrid Automatic Core") */
  subtitle: string;
  /** Main image URL */
  imageUrl?: string | null;
  /** Image alt text */
  imageAlt?: string;
  /** Promotional badge text (e.g., "Do 3 měsíců") */
  badgeText?: string;
  /** Labels for the vehicle (e.g., ["Label No 1", "Label No 2"]) */
  labels?: string[];
  /** Available color variants - hex color codes */
  colorVariants?: string[];
  /** Vehicle type (e.g., "SUV") */
  vehicleType?: string;
  /** Mileage info (e.g., "0 km") */
  mileage?: string;
  /** Condition (e.g., "Nový") */
  condition?: string;
  /** Drivetrain (e.g., "4x4") */
  drivetrain?: string;
  /** VIN or identifier */
  identifier?: string;
  /** Fuel type (e.g., "Diesel") */
  fuelType?: string;
  /** Horsepower (e.g., "231 Hp") */
  horsepower?: string;
  /** Transmission type (e.g., "8° Automatická") */
  transmission?: string;
  /** Annual mileage range (e.g., "15 000 - 50 000 km") */
  annualMileage?: string;
  /** Monthly price */
  monthlyPrice?: number;
  /** Price frequency text (e.g., "Měsíčně od") */
  priceFrequencyText?: string;
  /** Currency (e.g., "Kč") */
  currency?: string;
  /** Link href */
  href: string;
  /** CTA button text */
  ctaText?: string;
  /** Optional CSS classes */
  className?: string;
  /** Show favorite icon */
  showFavorite?: boolean;
  /** Show compare icon */
  showCompare?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>;

export const PromotionalOffersCard = ({
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
  imageUrl,
  labels = [],
  mileage,
  monthlyPrice,
  priceFrequencyText = 'Měsíčně od',
  showCompare = true,
  showFavorite = true,
  subtitle,
  title,
  transmission,
  vehicleType,
  ...rest
}: PromotionalOffersCardProps) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300',
        'hover:border-primary hover:shadow-lg',
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            alt={imageAlt || title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <span>No image</span>
          </div>
        )}

        {/* Badge */}
        {badgeText && (
          <div className="absolute left-3 top-3 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
            {badgeText}
          </div>
        )}

        {/* Labels */}
        {labels.length > 0 && (
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {labels.map((label, index) => (
              <div
                key={index}
                className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm"
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Action Icons */}
        <PromotionalOffersCardActions
          offerId={id}
          showCompare={showCompare}
          showFavorite={showFavorite}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & Title */}
        <div className="mb-3">
          <div className="mb-1 text-sm font-semibold text-primary">{brandName}</div>
          <h3 className="mb-1 text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Color Variants */}
        <PromotionalOffersCardColorVariants colorVariants={colorVariants} offerId={id} />

        {/* Specs Grid */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
          {vehicleType && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-4-1a1 1 0 001 1h3M9 17h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{vehicleType}</span>
            </div>
          )}
          {mileage && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{mileage}</span>
            </div>
          )}
          {condition && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{condition}</span>
            </div>
          )}
          {drivetrain && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 15v-3a3 3 0 013-3h10a3 3 0 013 3v3m-4 4h4v-4h-4v4zm-10 0h4v-4H4v4z" />
              </svg>
              <span>{drivetrain}</span>
            </div>
          )}
          {identifier && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{identifier}</span>
            </div>
          )}
          {fuelType && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{fuelType}</span>
            </div>
          )}
          {horsepower && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
              <span>{horsepower}</span>
            </div>
          )}
          {transmission && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 3h4v4h-4V3zm0 6h4v4h-4V9zm0 6h4v4h-4v-4zM4 9h4v4H4V9zm12 0h4v4h-4V9z" />
              </svg>
              <span>{transmission}</span>
            </div>
          )}
        </div>

        {/* Annual Mileage */}
        {annualMileage && (
          <div className="mb-4 rounded-lg bg-gray-50 p-3 text-center">
            <div className="text-xs text-gray-600">Roční nájezd</div>
            <div className="font-semibold text-gray-900">{annualMileage}</div>
          </div>
        )}

        {/* Pricing & CTA */}
        <div className="mt-auto">
          {monthlyPrice !== undefined && (
            <div className="mb-4 text-center">
              <div className="text-sm text-gray-600">{priceFrequencyText}</div>
              <div className="text-3xl font-bold text-gray-900">
                {monthlyPrice.toLocaleString('cs-CZ')} {currency}
              </div>
            </div>
          )}

          <Link
            {...rest}
            className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            href={href}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};
