import { cn } from '@/utils/cv';
import { tv, VariantProps } from 'tailwind-variants';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonVariants = tv({
  base: 'rounded-2xl lg:rounded-3xl text-sm gap-5 lg:text-base flex items-center justify-center whitespace-nowrap cursor-pointer transition-colors duration-300',
  variants: {
    variant: {
      primary: 'border border-primary text-white bg-primary hover:bg-primary/80',
      secondary: 'bg-white text-gunmetal hover:bg-[#FEFEFE4D]',
      'primary-inverted': 'bg-white text-gunmetal',
      'secondary-inverted': 'border border-white text-white bg-gunmetal hover:bg-[#FEFEFE4D]',
    },
    size: {
      none: '',
      base: 'px-10 lg:px-12 py-5 lg:py-6',
    },
    sizeWithIcon: {
      none: '',
      base: 'pl-1.5 lg:pl-2 pr-10 lg:pr-12 py-1.5 lg:py-2',
    },
    iconPosition: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'base',
    sizeWithIcon: 'none',
    iconPosition: 'left',
    width: 'auto',
  },
});

const iconVariants = tv({
  base: 'shrink-0 size-12 rounded-2xl flex items-center justify-center',
  variants: {
    variant: {
      primary: 'text-primary bg-white',
      secondary: 'text-gunmetal bg-white',
      'primary-inverted': 'text-white bg-primary',
      'secondary-inverted': 'text-white bg-gunmetal',
    },
  },
});

type ButtonVariants = Omit<VariantProps<typeof buttonVariants>, 'sizeWithIcon'>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  children,
  icon,
  iconPosition = 'left',
  variant,
  size = 'base',
  width,
  className,
  ...props
}: ButtonProps) {
  const hasIcon = Boolean(icon);

  const realSize = hasIcon ? 'none' : size;
  const sizeWithIcon = hasIcon ? size : undefined;

  return (
    <button
      className={cn(
        buttonVariants({ variant, size: realSize, sizeWithIcon, iconPosition, width }),
        className,
      )}
      {...props}
    >
      {hasIcon ? <span className={iconVariants({ variant })}>{icon}</span> : null}
      {children}
    </button>
  );
}
