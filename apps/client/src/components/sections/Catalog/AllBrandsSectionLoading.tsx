import { BrandListItemSkeleton } from '@/components/molecules/BrandListItem';

export const AllBrandsSectionLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <BrandListItemSkeleton key={i} />
      ))}
    </div>
  );
};
