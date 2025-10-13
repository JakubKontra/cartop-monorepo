import Button from '@/components/organisms/Button/Button';
import { Search } from 'lucide-react';
import Image from 'next/image';

export default function FilterBar() {
  return (
    <div
      className="max-lg:grid max-lg:grid-cols-2 lg:flex items-center gap-2 p-3 lg:p-4 rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: '#262D37' }}
    >
      <Button variant="outline-white" width="full" size="narrow">
        Do 10 tisíc
      </Button>
      <Button variant="outline-white" width="full" size="narrow">
        Užitkové
      </Button>
      <Button variant="outline-white" width="full" size="narrow">
        Kategorie
      </Button>
      <Button variant="outline-white" width="full" size="narrow">
        Skladové
      </Button>
      <Button variant="outline-white" width="full" size="narrow">
        Náš výběr
      </Button>
      <Button variant="outline-white" width="full" size="narrow">
        Značky
      </Button>
      <Button
        variant="primary-inverted"
        icon={<Search className="size-5" />}
        size="narrow"
        className="max-lg:col-span-2"
      >
        Všechny nabídky
      </Button>
    </div>
  );
}

export const Hero = () => {
  return (
    <section className="w-full mb-40">
      <div className="w-full max-w-[1420px] mx-auto px-4 lg:px-6">
        <div className="relative h-[600px] lg:h-[645px] rounded-[32px] lg:rounded-[48px] overflow-visible">
          <Image
            src="/mock/mock-1-bg.jpg"
            alt="Hero"
            fill
            className="object-cover rounded-[32px] lg:rounded-[48px]"
            priority
          />

          <div className="absolute inset-0 flex flex-col justify-start px-6 pt-8 lg:pl-[72px] lg:pt-[88px]">
            <h1 className="text-white font-sora font-normal text-3xl lg:text-[48px] mb-4 leading-tight">
              Nový <br />
              Volkswagen <br /> <span className="font-bold text-primary">Touareg R-line</span>
            </h1>
            <p
              className="font-sora font-normal text-sm lg:text-[16px] leading-[160%] tracking-[0.01em] mb-6 lg:mb-8 max-w-xl"
              style={{ color: '#C9CCD3' }}
            >
              Prémiové SUV za jedinečných podmínek
            </p>
            <div>
              <Button variant="primary" icon={<Search className="size-5" />}>
                Prohlédnout
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-7xl px-6">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};
