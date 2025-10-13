import type { ReactNode } from 'react';

import { cn } from '@/utils/cv';

interface AccordionProps {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
}

export const Accordion = ({ ariaLabel = 'Accordion', children, className }: AccordionProps) => {
  return (
    <ul aria-label={ariaLabel} className={cn('space-y-3', className)} role="region">
      {children}
    </ul>
  );
};
