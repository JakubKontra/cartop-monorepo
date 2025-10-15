import { cn } from '@/utils/cv';

export interface BrandListItemSkeletonProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * BrandListItemSkeleton Component
 *
 * Loading skeleton for BrandListItem
 */
export const BrandListItemSkeleton = ({ className }: BrandListItemSkeletonProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 animate-pulse',
        className,
      )}
    >
      <div className="size-[45px] shrink-0 rounded-lg bg-gray-200" />
      <div className="h-5 w-24 rounded bg-gray-200" />
    </div>
  );
};
