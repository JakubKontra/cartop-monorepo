import { cn } from '@/utils/cv';
import Image from 'next/image';
import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'w-full rounded-2xl lg:rounded-3xl text-sm lg:text-base flex items-center justify-center whitespace-nowrap transition-colors duration-300',
  variants: {
    variant: {
      primary: 'bg-white text-gunmetal',
      secondary: 'border border-white text-white bg-gunmetal hover:bg-[#FEFEFE4D]',
    },
    size: {
      base: 'px-10 lg:px-12 py-5 lg:py-6',
      icon: 'pl-1.5 lg:pl-2 pr-10 lg:pr-12 py-1.5 lg:py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'base',
  },
});

export default function FilterBar() {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-8 items-center gap-2 p-3 lg:p-4 rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: '#262D37' }}
    >
      <button className={buttonVariants({ variant: 'secondary' })}>Do 10 tisíc</button>
      <button className={buttonVariants({ variant: 'secondary' })}>Užitkové</button>
      <button className={buttonVariants({ variant: 'secondary' })}>Kategorie</button>
      <button className={buttonVariants({ variant: 'secondary' })}>Skladové</button>
      <button className={buttonVariants({ variant: 'secondary' })}>Náš výběr</button>
      <button className={buttonVariants({ variant: 'secondary' })}>Značky</button>

      <button
        className={cn(
          buttonVariants({ variant: 'primary', size: 'icon' }),
          'justify-start gap-4 col-span-2',
        )}
      >
        <span className="flex items-center justify-center w-[48px] h-[48px] rounded-[10px] lg:rounded-2xl bg-primary shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </span>
        Všechny nabídky
      </button>
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
              <button className="bg-rose-700 hover:bg-rose-600 active:bg-rose-800 text-white font-semibold px-6 py-3 lg:px-8 lg:py-4 rounded-2xl text-base lg:text-lg transition-colors cursor-pointer">
                Detail
              </button>
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
