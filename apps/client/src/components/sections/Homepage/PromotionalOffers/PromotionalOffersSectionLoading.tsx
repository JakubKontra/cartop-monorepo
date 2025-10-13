import { PromotionalOffersCardSkeleton } from '@/components/molecules/PromotionalOffersCard';
import { SectionHeader } from '@/components/sections/Homepage/SectionHeader';

export const PromotionalOffersSectionLoading = () => {
  return (
    <section className="px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader
          highlightedWord="Akční"
          remainingTitle="vozy"
          subtitle="Vyberte si z našich top možností a jeďěte výhodněji."
        />

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PromotionalOffersCardSkeleton count={3} />
        </div>

        <div className="flex w-full justify-center">
          <div className="h-14 w-64 animate-pulse rounded-2xl bg-gray-200 lg:rounded-3xl" />
        </div>
      </div>
    </section>
  );
};
