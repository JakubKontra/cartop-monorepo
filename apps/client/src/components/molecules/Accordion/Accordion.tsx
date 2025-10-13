import type { ReactNode } from 'react';

import { cn } from '@/utils/cv';

interface AccordionProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const Accordion = ({ children, className, ariaLabel = 'Accordion' }: AccordionProps) => {
  return (
    <ul className={cn('space-y-3', className)} role="region" aria-label={ariaLabel}>
      {children}
    </ul>
  );
};
