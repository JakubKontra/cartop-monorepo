import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

import { cn } from '@/utils/cv';

const iconVariants = tv({
  base: 'shrink-0  rounded-2xl flex items-center justify-center cursor-pointer transition-colors duration-300',
  variants: {
    variant: {
      'outline-white': 'text-white bg-transparent',
      primary: 'text-primary bg-white',
      'primary-inverted': 'text-white bg-primary hover:bg-primary/80',
      secondary: 'text-gunmetal bg-white',
      'secondary-inverted': 'text-white bg-gunmetal',
      'cadet-grey': 'text-white bg-cadet-grey',
    },
    size: {
      base: 'size-11 lg:size-14',
      small: 'size-11',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconVariants> {
  icon?: ReactNode;
}

export const ButtonIcon = ({ className, icon, variant, size, ...props }: ButtonIconProps) => {
  return (
    <button className={cn(iconVariants({ variant, size }), className)} type="button" {...props}>
      {icon}
    </button>
  );
};
