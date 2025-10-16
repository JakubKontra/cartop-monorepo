import { Home } from 'lucide-react';
import { Suspense } from 'react';

import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import { AllBrandsSection } from '@/components/sections/Catalog/AllBrandsSection';
import { AllBrandsSectionLoading } from '@/components/sections/Catalog/AllBrandsSectionLoading';
import { AllBrandsSectionWrapper } from '@/components/sections/Catalog/AllBrandsSectionWrapper';
import { CatalogPageHeader } from '@/components/sections/Catalog/CatalogPageHeader';
import { CatalogSearchSection } from '@/components/sections/Catalog/CatalogSearchSection';
import { CatalogHeader } from '@/components/sections/Catalog/Header';
import { HighlightedBrandsSection } from '@/components/sections/Catalog/HighlightedBrandsSection';
import { HighlightedBrandsSectionLoading } from '@/components/sections/Catalog/HighlightedBrandsSectionLoading';
import { HighlightedBrandsSectionWrapper } from '@/components/sections/Catalog/HighlightedBrandsSectionWrapper';

export default function Catalog() {
  return (
    <>
      <CatalogHeader />
      <div className="mx-auto mb-4 flex max-w-[1360px] flex-col gap-4 px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full flex-col gap-4 pb-24">
          <Breadcrumbs
            items={[
              { hideLabel: true, href: '/', icon: <Home className="h-4 w-4" />, label: 'Domů' },
              { label: 'Katalog' },
            ]}
          />

          <CatalogPageHeader />

          <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-16">
            <CatalogSearchSection />

            <section className="w-full bg-white ">
              <h2 className="mb-6 text-base leading-[130%] font-semibold tracking-[0.01em] text-gunmetal">
                Nejoblíbenější značky
              </h2>
              <HighlightedBrandsSectionWrapper>
                <Suspense fallback={<HighlightedBrandsSectionLoading />}>
                  <HighlightedBrandsSection />
                </Suspense>
              </HighlightedBrandsSectionWrapper>
            </section>

            <section className="w-full bg-white">
              <h2 className="mb-6 text-base leading-[130%] font-semibold tracking-[0.01em] text-gunmetal">
                Všechny značky
              </h2>
              <AllBrandsSectionWrapper>
                <Suspense fallback={<AllBrandsSectionLoading />}>
                  <AllBrandsSection />
                </Suspense>
              </AllBrandsSectionWrapper>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
