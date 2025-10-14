import { cn } from '@/utils/cv';

export interface OfferCardSkeletonProps {
  className?: string;
  count?: number;
}

export const OfferCardSkeleton = ({ className, count = 1 }: OfferCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white',
            'animate-pulse',
            className,
          )}
        >
          {/* Image skeleton */}
          <div className="aspect-[4/3] w-full bg-gray-200" />

          {/* Content skeleton */}
          <div className="flex flex-1 flex-col p-4">
            {/* Brand & Title skeleton */}
            <div className="mb-3">
              <div className="mb-2 h-4 w-20 rounded bg-gray-200" />
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
            </div>

            {/* Color variants skeleton */}
            <div className="mb-4 flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="size-6 rounded-full bg-gray-200" />
              ))}
            </div>

            {/* Specs grid skeleton */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-gray-200" />
              ))}
            </div>

            {/* Annual mileage skeleton */}
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <div className="mx-auto mb-1 h-3 w-24 rounded bg-gray-200" />
              <div className="mx-auto h-4 w-32 rounded bg-gray-200" />
            </div>

            {/* Pricing & CTA skeleton */}
            <div className="mt-auto">
              <div className="mb-4 text-center">
                <div className="mx-auto mb-1 h-3 w-20 rounded bg-gray-200" />
                <div className="mx-auto h-8 w-32 rounded bg-gray-200" />
              </div>
              <div className="h-12 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Export with legacy name for backward compatibility
export const PromotionalOffersCardSkeleton = OfferCardSkeleton;
export type PromotionalOffersCardSkeletonProps = OfferCardSkeletonProps;
