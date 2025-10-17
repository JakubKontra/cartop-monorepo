import { BrandCardSkeleton } from '@/components/molecules/BrandCard';
import { SectionHeader } from '@/components/sections/Homepage/SectionHeader';

export const BrandsSectionLoading = () => {
  return (
    <section className="section-container py-16 lg:py-24">
      <SectionHeader
        highlightedWord="Všechny"
        remainingTitle="naše značky"
        subtitle="Prohlédněte si naše nejlepší nabídky a ušetřete."
      />

      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-4">
        <BrandCardSkeleton count={8} />
      </div>

      <div className="flex w-full justify-center">
        <div className="h-14 w-64 animate-pulse rounded-2xl bg-gray-200 lg:rounded-3xl" />
      </div>
    </section>
  );
};
