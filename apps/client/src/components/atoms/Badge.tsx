import type { ReactNode } from 'react';

import { cn } from '@/utils/cv';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-gray-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-500 text-gray-900',
  info: 'bg-blue-600 text-white',
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
