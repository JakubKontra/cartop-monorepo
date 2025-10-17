import { Suspense } from 'react';

import Benefits from '@/components/organisms/Benefits/Benefits';
import { Hero } from '@/components/organisms/Hero/Hero';
import { BrandsSection } from '@/components/sections/Homepage/Brands/BrandsSection';
import { BrandsSectionLoading } from '@/components/sections/Homepage/Brands/BrandsSectionLoading';
import { BrandsSectionWrapper } from '@/components/sections/Homepage/Brands/BrandsSectionWrapper';
import ExploreSelection from '@/components/sections/Homepage/ExploreSelection/ExploreSelection';
import { FaqSection } from '@/components/sections/Homepage/Faq/FaqSection';
import { JourneySection } from '@/components/sections/Homepage/Journey';
import { PromotionalOffersSection } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSection';
import { PromotionalOffersSectionLoading } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSectionLoading';
import { PromotionalOffersSectionWrapper } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSectionWrapper';
import { ReliablePartner } from '@/components/sections/Homepage/ReliablePartner/ReliablePartner';
import { ReviewsSection } from '@/components/sections/Homepage/Reviews';

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <ReliablePartner />
      <PromotionalOffersSectionWrapper>
        <Suspense fallback={<PromotionalOffersSectionLoading />}>
          <PromotionalOffersSection
            backgroundColor="#EFEFEF"
            highlightedTitle="Stálá"
            limit={3}
            offerType="OPERATIONAL_LEASING"
            subtitle="Pravidelně pro vás vybíráme vozy s nejlepšími podmínkami."
            title="akční nabídka"
          />
        </Suspense>
      </PromotionalOffersSectionWrapper>
      <PromotionalOffersSectionWrapper>
        <Suspense fallback={<PromotionalOffersSectionLoading />}>
          <PromotionalOffersSection
            highlightedTitle="Přímý"
            limit={3}
            offerType="DIRECT_PURCHASE"
            title="nákup"
          />
        </Suspense>
      </PromotionalOffersSectionWrapper>
      <BrandsSectionWrapper>
        <Suspense fallback={<BrandsSectionLoading />}>
          <BrandsSection />
        </Suspense>
      </BrandsSectionWrapper>
      <JourneySection />
      <ExploreSelection />
      <ReviewsSection />
      <FaqSection />
    </>
  );
}
