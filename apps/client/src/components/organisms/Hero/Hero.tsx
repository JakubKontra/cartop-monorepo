import Image from 'next/image';

export default function FilterBar() {
  return (
    <div
      className="grid grid-cols-2 lg:flex lg:items-center gap-2 p-4 rounded-[32px]"
      style={{ backgroundColor: '#262D37' }}
    >
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Do 10 tisíc
      </button>
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Užitkové
      </button>
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Kategorie
      </button>
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Skladové
      </button>
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Náš výběr
      </button>
      <button className="h-[64px] lg:flex-1 px-6 rounded-[24px] border border-white text-white flex items-center justify-center">
        Značky
      </button>

      <button className="h-[64px] col-span-2 lg:col-span-1 lg:flex-shrink-0 flex items-center justify-center gap-5 pl-2 pr-9 rounded-[24px] bg-white text-gunmetal">
        <span className="flex items-center justify-center w-[48px] h-[48px] rounded-[16px] bg-primary">
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
    <section className="w-full">
      <div className="w-[1420px] mx-auto px-6">
        <div className="relative h-[645px] rounded-[48px] overflow-visible">
          <Image
            src="/mock/mock-1-bg.jpg"
            alt="Hero"
            fill
            className="object-cover rounded-[48px]"
            priority
          />

          <div className="absolute inset-0 flex flex-col justify-start pl-[72px] pt-[88px]">
            <h1 className="text-white font-sora font-normal text-[48px] mb-4 leading-tight">
              Nový <br />
              Volkswagen <br /> <span className="font-bold text-primary">Touareg R-line</span>
            </h1>
            <p
              className="font-sora font-normal text-[16px] leading-[160%] tracking-[0.01em] mb-8 max-w-xl"
              style={{ color: '#C9CCD3' }}
            >
              Prémiové SUV za jedinečných podmínek
            </p>
            <div>
              <button className="bg-rose-700 hover:bg-rose-600 active:bg-rose-800 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors cursor-pointer">
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
