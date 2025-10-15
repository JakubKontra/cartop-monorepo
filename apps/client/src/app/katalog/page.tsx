import { Home } from 'lucide-react';
import { Suspense } from 'react';

import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import { AllBrandsSection } from '@/components/sections/Catalog/AllBrandsSection';
import { AllBrandsSectionLoading } from '@/components/sections/Catalog/AllBrandsSectionLoading';
import { AllBrandsSectionWrapper } from '@/components/sections/Catalog/AllBrandsSectionWrapper';
import { CatalogHeader } from '@/components/sections/Catalog/Header';
import { CatalogPageHeader } from '@/components/sections/Catalog/CatalogPageHeader';
import { CatalogSearchSection } from '@/components/sections/Catalog/CatalogSearchSection';
import { HighlightedBrandsSection } from '@/components/sections/Catalog/HighlightedBrandsSection';
import { HighlightedBrandsSectionLoading } from '@/components/sections/Catalog/HighlightedBrandsSectionLoading';
import { HighlightedBrandsSectionWrapper } from '@/components/sections/Catalog/HighlightedBrandsSectionWrapper';

export default function Catalog() {
  return (
    <>
      <CatalogHeader />
      <div className="mx-auto mb-4 flex max-w-[1360px] flex-col gap-4 px-4 lg:flex-row lg:gap-8">
        <div className="w-full flex flex-col gap-4">
          <Breadcrumbs
            items={[
              { hideLabel: true, href: '/', icon: <Home className="h-4 w-4" />, label: 'Domů' },
              { label: 'Katalog' },
            ]}
          />

          <CatalogPageHeader />

          <div className="mx-auto w-full max-w-[1000px] flex flex-col gap-8">
            <CatalogSearchSection />

            <section className="w-full bg-white">
              <h2 className="mb-6 text-2xl font-semibold text-gunmetal">Nejoblíbenější značky</h2>
              <HighlightedBrandsSectionWrapper>
                <Suspense fallback={<HighlightedBrandsSectionLoading />}>
                  <HighlightedBrandsSection />
                </Suspense>
              </HighlightedBrandsSectionWrapper>
            </section>

            <section className="w-full bg-white">
              <h2 className="mb-6 text-2xl font-semibold text-gunmetal">Všechny značky</h2>
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
