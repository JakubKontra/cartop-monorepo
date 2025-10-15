import { cn } from '@/utils/cv';

export interface PromotionalOffersSectionHeaderProps {
  /** Optional CSS classes */
  className?: string;
  /** Zvýrazněné slovo v nadpisu */
  highlightedTitle: string;
  /** Optional podnadpis */
  subtitle?: string;
  /** Zbytek nadpisu */
  title: string;
}

/**
 * PromotionalOffersSectionHeader Component
 *
 * Specialized header component for promotional offers section
 * Uses specific typography styles from design specs
 */
export const PromotionalOffersSectionHeader = ({
  className,
  highlightedTitle,
  subtitle,
  title,
}: PromotionalOffersSectionHeaderProps) => {
  return (
    <div className={cn('mb-14 text-center lg:text-left', className)}>
      <h2 className="promotional-offers-heading">
        <span className="promotional-offers-heading-highlight">{highlightedTitle}</span> {title}
      </h2>
      {subtitle && <p className="promotional-offers-subtitle">{subtitle}</p>}
    </div>
  );
};
