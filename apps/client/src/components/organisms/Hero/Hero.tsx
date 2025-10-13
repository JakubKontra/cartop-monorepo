import { Search } from 'lucide-react';
import Image from 'next/image';

import Button from '@/components/organisms/Button/Button';

const FilterBar = () => {
  return (
    <div
      className="items-center gap-2 rounded-3xl p-3 max-lg:grid max-lg:grid-cols-2 lg:flex lg:rounded-4xl lg:p-4"
      style={{ backgroundColor: '#262D37' }}
    >
      <Button size="narrow" variant="outline-white" width="full">
        Do 10 tisíc
      </Button>
      <Button size="narrow" variant="outline-white" width="full">
        Užitkové
      </Button>
      <Button size="narrow" variant="outline-white" width="full">
        Kategorie
      </Button>
      <Button size="narrow" variant="outline-white" width="full">
        Skladové
      </Button>
      <Button size="narrow" variant="outline-white" width="full">
        Náš výběr
      </Button>
      <Button size="narrow" variant="outline-white" width="full">
        Značky
      </Button>
      <Button
        className="max-lg:col-span-2"
        icon={<Search className="size-5" />}
        size="narrow"
        variant="primary-inverted"
      >
        Všechny nabídky
      </Button>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="mb-40 w-full">
      <div className="mx-auto w-full max-w-[1420px] px-4 lg:px-6">
        <div className="relative h-[600px] overflow-visible rounded-[32px] lg:h-[645px] lg:rounded-[48px]">
          <Image
            fill
            priority
            alt="Hero"
            className="rounded-[32px] object-cover lg:rounded-[48px]"
            src="/mock/mock-1-bg.jpg"
          />

          <div className="absolute inset-0 flex flex-col justify-start px-6 pt-8 lg:pt-[88px] lg:pl-[72px]">
            <h1 className="font-sora mb-4 text-3xl leading-tight font-normal text-white lg:text-[48px]">
              Nový <br />
              Volkswagen <br /> <span className="font-bold text-primary">Touareg R-line</span>
            </h1>
            <p
              className="font-sora mb-6 max-w-xl text-sm leading-[160%] font-normal tracking-[0.01em] lg:mb-8 lg:text-[16px]"
              style={{ color: '#C9CCD3' }}
            >
              Prémiové SUV za jedinečných podmínek
            </p>
            <div>
              <Button icon={<Search className="size-5" />} variant="primary">
                Prohlédnout
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 w-full max-w-7xl -translate-x-1/2 translate-y-1/2 px-6">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};
