import { cn } from '@/utils/cv';

export interface CatalogPageHeaderProps {
  /** Optional CSS classes */
  className?: string;
}

/**
 * CatalogPageHeader Component
 *
 * Header section for the catalog page with title and description
 */
export const CatalogPageHeader = ({ className }: CatalogPageHeaderProps) => {
  return (
    <section className={cn('w-full bg-white text-gray-900 flex justify-center', className)}>
      <div className="flex flex-col gap-4 max-w-[760px] text-center">
        <h1 className="text-4xl leading-[120%] font-semibold tracking-[0.01em] text-primary sm:text-5xl">
          Katalog <span className="font-normal text-gunmetal">vozů</span>
        </h1>
        <p className="text-base leading-[160%] font-normal tracking-[0.01em] text-gunmetal-800">
          Objevte přehled vozů, které dávají smysl -promyšlené, dobře vybavené a&nbsp;připravené k
          okamžitému užívání. Chceme, abyste od nás odcházeli s&nbsp;radostí a&nbsp;pocitem
          dobrého dealu.
        </p>
      </div>
    </section>
  );
};
