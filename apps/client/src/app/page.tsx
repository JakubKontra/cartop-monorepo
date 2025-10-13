import { Suspense } from 'react';

import Benefits from '@/components/organisms/Benefits/Benefits';
import Footer from '@/components/organisms/Footer/Footer';
import { Hero } from '@/components/organisms/Hero/Hero';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { BrandsSection } from '@/components/sections/Homepage/Brands/BrandsSection';
import { BrandsSectionLoading } from '@/components/sections/Homepage/Brands/BrandsSectionLoading';
import { BrandsSectionWrapper } from '@/components/sections/Homepage/Brands/BrandsSectionWrapper';
import { FaqSection } from '@/components/sections/Homepage/Faq/FaqSection';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Benefits />
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
