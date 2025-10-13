import Image from 'next/image';
import Button from '../Button/Button';
import { AnnotationInfoIcon } from '@/components/icons/AnnotationInfoIcon';

export default function Benefits() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
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

        <div className="mt-14 grid gap-5 grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          <article className="rounded-[32px] border border-slate-200 p-6 bg-white order-1 lg:order-none lg:row-span-1">
            <div className="h-10 w-10 rounded-xl bg-red-600/10 text-red-600 grid place-items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

          <div className="relative rounded-3xl overflow-hidden col-span-2 order-3 lg:col-span-1 lg:order-none lg:row-span-2 h-[300px] sm:h-[400px] lg:h-[560px]">
            <Image
              src="/mock/tile.mobile@2x.png"
              alt="Klient s poradcem u auta"
              fill
              sizes="100vw"
              className="w-full object-cover rounded-[32px] lg:hidden"
            />
            <Image
              src="/mock/tile@2x.png"
              alt="Klient s poradcem u auta"
              fill
              sizes="33vw"
              className="w-full object-cover rounded-[32px] hidden lg:block"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5"></div>

            <div className="absolute inset-x-6 bottom-6">
              <Button
                variant="primary"
                icon={<AnnotationInfoIcon className="size-6" />}
                width="full"
              >
                Více o nás
              </Button>
            </div>
          </div>

          <article className="rounded-[32px] p-6 bg-slate-900 text-white order-2 lg:order-none lg:row-span-1">
            <div className="h-10 w-10 rounded-xl bg-white/10 text-white grid place-items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

          <article className="rounded-[32px] border border-slate-200 p-6 bg-white col-span-1 order-4 lg:order-none lg:row-span-1">
            <div className="h-10 w-10 rounded-xl bg-red-600/10 text-red-600 grid place-items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

          <article className="rounded-[32px] border border-slate-200 p-6 bg-white col-span-1 order-5 lg:order-none lg:row-span-1">
            <div className="h-10 w-10 rounded-xl bg-red-600/10 text-red-600 grid place-items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
}
