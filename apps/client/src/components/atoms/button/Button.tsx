import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

import { cn } from '@/utils/cv';

const buttonVariants = tv({
  base: 'rounded-2xl lg:rounded-3xl text-sm gap-5 lg:text-base flex items-center whitespace-nowrap cursor-pointer transition-colors duration-300',
  defaultVariants: {
    iconPosition: 'left',
    size: 'base',
    sizeWithIcon: 'none',
    variant: 'primary',
    width: 'auto',
  },
  variants: {
    iconPosition: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
    size: {
      base: 'px-10 lg:px-12 py-5',
      narrow: 'px-4 py-5',
      none: '',
    },
    sizeWithIcon: {
      base: 'pl-1.5 lg:pl-2 pr-10 lg:pr-12 py-1.5 lg:py-2',
      narrow: 'pl-1.5 lg:pl-2 pr-4 lg:pr-8 py-1.5 lg:py-2',
      'base-reverse': 'pl-10 lg:pl-12 pr-1.5 lg:pr-2 py-1.5 lg:py-2',
      'narrow-reverse': 'pl-4 lg:pl-8 pr-1.5 lg:pr-2 py-1.5 lg:py-2',
      none: '',
    },
    variant: {
      'outline-white': 'border border-white text-white bg-transparent hover:bg-white/10',
      primary: 'border border-primary text-white bg-primary hover:bg-primary/80',
      'primary-inverted': 'bg-white text-gunmetal',
      secondary: 'bg-white text-gunmetal hover:bg-[#FEFEFE4D]',
      'secondary-inverted': 'border border-white text-white bg-gunmetal hover:bg-gunmetal-700',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
    },
  },
});

const iconVariants = tv({
  base: 'shrink-0 size-12 rounded-2xl flex items-center justify-center',
  variants: {
    variant: {
      'outline-white': 'text-white bg-transparent',
      primary: 'text-primary bg-white',
      'primary-inverted': 'text-white bg-primary',
      secondary: 'text-gunmetal bg-white',
      'secondary-inverted': 'text-primary bg-white',
    },
  },
});

type ButtonVariants = Omit<VariantProps<typeof buttonVariants>, 'sizeWithIcon'>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  children: ReactNode;
  icon?: ReactNode;
}

const Button = ({
  children,
  className,
  icon,
  iconPosition = 'left',
  size = 'base',
  variant,
  width,
  ...props
}: ButtonProps) => {
  const hasIcon = Boolean(icon);

  const realSize = hasIcon ? 'none' : size;
  const sizeWithIcon = hasIcon
    ? iconPosition === 'left'
      ? size
      : (`${size}-reverse` as VariantProps<typeof buttonVariants>['sizeWithIcon'])
    : undefined;

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ iconPosition, size: realSize, sizeWithIcon, variant, width }),
        className,
      )}
      {...props}
    >
      {hasIcon ? <span className={iconVariants({ variant })}>{icon}</span> : null}
      {children ? <span className="flex-1">{children}</span> : null}
    </button>
  );
};

export default Button;
