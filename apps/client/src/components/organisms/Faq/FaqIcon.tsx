'use client';

import { Minus } from 'lucide-react';

import { cn } from '@/utils/cv';

interface FaqIconProps {
  isOpen?: boolean;
}

export const FaqIcon = ({ isOpen = false }: FaqIconProps) => {
  return (
    <div
      className={cn(
        'relative flex size-11 items-center justify-center rounded-xl transition-colors duration-300 lg:size-14',
        isOpen ? 'bg-gunmetal-700' : 'bg-primary',
      )}
    >
      <Minus className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-white" />
      <Minus
        className={cn(
          'size-6 text-white transition-transform duration-300',
          isOpen ? 'rotate-0' : 'rotate-90',
        )}
      />
    </div>
  );
};
