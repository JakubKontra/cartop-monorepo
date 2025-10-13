import { cn } from '@/utils/cv';

interface BrandCardSkeletonProps {
  className?: string;
  count?: number;
}

export const BrandCardSkeleton = ({ className, count = 1 }: BrandCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex animate-pulse flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4',
            className,
          )}
        >
          {/* Logo skeleton - 96×96px */}
          <div className="size-24 rounded-xl bg-gray-200" />

          {/* Name skeleton */}
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
      ))}
    </>
  );
};
