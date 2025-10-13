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
        'relative size-11 lg:size-14 rounded-xl flex items-center justify-center transition-colors duration-300',
        isOpen ? 'bg-gunmetal-700' : 'bg-primary',
      )}
    >
      <Minus className="text-white size-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Minus
        className={cn(
          'text-white size-6 transition-transform duration-300',
          isOpen ? 'rotate-0' : 'rotate-90',
        )}
      />
    </div>
  );
};
