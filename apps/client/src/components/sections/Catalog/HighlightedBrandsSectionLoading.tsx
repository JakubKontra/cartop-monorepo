import { BrandCardSkeleton } from '@/components/molecules/BrandCard';

export const HighlightedBrandsSectionLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <BrandCardSkeleton count={12} />
    </div>
  );
};
