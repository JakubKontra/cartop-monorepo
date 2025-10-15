import type { ReactNode } from 'react';

import { cn } from '@/utils/cv';

export type BadgeVariant = 'info' | 'primary' | 'secondary' | 'success' | 'warning';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  info: 'bg-blue-600 text-white',
  primary: 'bg-primary text-white',
  secondary: 'bg-gray-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-500 text-gray-900',
};

export const Badge = ({ children, className, variant = 'primary' }: BadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-lg px-3 py-1.5 text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};
