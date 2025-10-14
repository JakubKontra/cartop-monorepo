import { Suspense } from 'react';

import Benefits from '@/components/organisms/Benefits/Benefits';
import Footer from '@/components/organisms/Footer/Footer';
import { Hero } from '@/components/organisms/Hero/Hero';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { BrandsSection } from '@/components/sections/Homepage/Brands/BrandsSection';
import { BrandsSectionLoading } from '@/components/sections/Homepage/Brands/BrandsSectionLoading';
import { BrandsSectionWrapper } from '@/components/sections/Homepage/Brands/BrandsSectionWrapper';
import { FaqSection } from '@/components/sections/Homepage/Faq/FaqSection';
import { JourneySection } from '@/components/sections/Homepage/Journey';
import { PromotionalOffersSectionWrapper } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSectionWrapper';
import { PromotionalOffersSectionLoading } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSectionLoading';
import { PromotionalOffersSection } from '@/components/sections/Homepage/PromotionalOffers/PromotionalOffersSection';
import { ReliablePartner } from '@/components/sections/Homepage/ReliablePartner/ReliablePartner';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Benefits />
      <JourneySection />
      <div>
        <ReliablePartner />
        <PromotionalOffersSectionWrapper>
          <Suspense fallback={<PromotionalOffersSectionLoading />}>
            <PromotionalOffersSection
              highlightedTitle="Stálá"
              title="akční nabídka"
              subtitle="Pravidelně pro vás vybíráme vozy s nejlepšími podmínkami."
              backgroundColor="#EFEFEF"
              limit={3}
              offerType="OPERATIONAL_LEASING"
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
      </div>
      <BrandsSectionWrapper>
        <Suspense fallback={<BrandsSectionLoading />}>
          <BrandsSection />
        </Suspense>
      </BrandsSectionWrapper>
      <FaqSection />
      <Footer />
    </div>
  );
}
