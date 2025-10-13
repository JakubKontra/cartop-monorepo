import Image from 'next/image';

import { AnnotationInfoIcon } from '@/components/icons/AnnotationInfoIcon';

import Button from '../Button/Button';

const Benefits = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl leading-tight font-extrabold sm:text-5xl">
            <span className="text-red-600">Nový standard,</span>
            <br />
            jak si pořídit auto
          </h2>

          <p className="mt-6 text-slate-600">
            Cartop přináší chytrý a pohodlný způsob, jak získat nový vůz – ať už ho chcete vlastnit,
            nebo jezdit na operativní leasing. Naším cílem je, aby výběr vozu byl stejně jednoduchý
            a přehledný, jako když si kupujete letenku nebo vybíráte dovolenou.
          </p>

          <p className="mt-4 font-semibold text-slate-800">
            Objevte, jak snadné a férové může být pořízení nového vozu.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:auto-rows-fr lg:grid-cols-3">
          <article className="order-1 rounded-[32px] border border-slate-200 bg-white p-6 lg:order-none lg:row-span-1">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-600/10 text-red-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L10 5" />
                <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L14 19" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Ukazujeme souvislosti</h3>
            <p className="mt-2 text-slate-600">
              Často platí, že nový vůz se slevou vyjde levněji než referenční model. Upozorníme vás
              na to.
            </p>
          </article>

          <div className="relative order-3 col-span-2 h-[300px] overflow-hidden rounded-3xl sm:h-[400px] lg:order-none lg:col-span-1 lg:row-span-2 lg:h-[560px]">
            <Image
              fill
              alt="Klient s poradcem u auta"
              className="w-full rounded-[32px] object-cover lg:hidden"
              sizes="100vw"
              src="/mock/tile.mobile@2x.png"
            />
            <Image
              fill
              alt="Klient s poradcem u auta"
              className="hidden w-full rounded-[32px] object-cover lg:block"
              sizes="33vw"
              src="/mock/tile@2x.png"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />

            <div className="absolute inset-x-6 bottom-6">
              <Button
                icon={<AnnotationInfoIcon className="size-6" />}
                variant="primary"
                width="full"
              >
                Více o nás
              </Button>
            </div>
          </div>

          <article className="order-2 rounded-[32px] bg-slate-900 p-6 text-white lg:order-none lg:row-span-1">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h7M3 12h12M3 18h7M14 6h7M18 18h3" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Hledáme správný způsob pořízení</h3>
            <p className="mt-2 text-slate-300">
              Někdy je lepší koupě, jindy operativní leasing. Pomůžeme vám vybrat, co se vyplatí
              právě vám.
            </p>
          </article>

          <article className="order-4 col-span-1 rounded-[32px] border border-slate-200 bg-white p-6 lg:order-none lg:row-span-1">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-600/10 text-red-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" />
                <path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Otevíráme nové možnosti</h3>
            <p className="mt-2 text-slate-600">
              Možná zjistíte, že vůz, který jste původně neplánovali, vám nabídne lepší výbavu i
              cenu.
            </p>
          </article>

          <article className="order-5 col-span-1 rounded-[32px] border border-slate-200 bg-white p-6 lg:order-none lg:row-span-1">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-600/10 text-red-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Férové doporučení</h3>
            <p className="mt-2 text-slate-600">
              Vždy dostanete objektivní přehled a jistotu, že rozhodnutí je správné.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
