import type { ReactNode } from 'react';

import { cn } from '@/utils/cv';

export type LabelVariant = 'accent' | 'dark' | 'gunmetal-outline' | 'gunmetal' | 'light';

export interface LabelProps {
  children: ReactNode;
  className?: string;
  variant?: LabelVariant;
}

const variantStyles: Record<LabelVariant, string> = {
  accent: 'bg-primary/90 text-white backdrop-blur-sm',
  dark: 'bg-gray-900/90 text-white backdrop-blur-sm',
  gunmetal: 'bg-[#262D37] text-white',
  'gunmetal-outline': 'bg-[#D9E0E6] text-[#262D37]',

  // Original variants
  light: 'bg-white/90 text-gray-900 backdrop-blur-sm',
};

export const Label = ({ children, className, variant = 'light' }: LabelProps) => {
  return (
    <div
      className={cn(
        'inline-flex flex-row items-center gap-1 rounded-[20px] px-2.5 py-1',
        'font-sora text-xs leading-[160%] font-normal tracking-[0.01em]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};
