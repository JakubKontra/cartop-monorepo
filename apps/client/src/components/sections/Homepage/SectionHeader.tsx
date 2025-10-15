import { cn } from '@/utils/cv';

export interface SectionHeaderProps {
  /** Optional CSS classes */
  className?: string;
  /** Zvýrazněné slovo (první řádek) */
  highlightedWord: string;
  /** Zbytek nadpisu (druhý řádek) */
  remainingTitle: string;
  /** Optional podnadpis */
  subtitle?: string;
  /** Theme variant for text colors */
  variant?: 'dark' | 'light';
}

/**
 * SectionHeader Component
 *
 * Reusable section header for homepage sections
 * Displays title with highlighted first word and optional subtitle
 */
export const SectionHeader = ({
  className,
  highlightedWord,
  remainingTitle,
  subtitle,
  variant = 'dark',
}: SectionHeaderProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subtitleColor = variant === 'light' ? 'text-gray-300' : 'text-gunmetal-800';

  return (
    <div className={cn('mb-14 text-center lg:text-left', className)}>
      <h2 className={cn('mb-4 text-4xl leading-[120%] tracking-[1%] lg:text-5xl', textColor)}>
        <span className="headline-highlight">{highlightedWord}</span>
        <br />
        <span className="font-normal">{remainingTitle}</span>
      </h2>
      {subtitle && <p className={cn('text-base lg:text-lg', subtitleColor)}>{subtitle}</p>}
    </div>
  );
};
