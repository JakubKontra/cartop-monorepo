import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';

import Link from 'next/link';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/cv';

const choiceTileVariants = tv({
  compoundVariants: [
    {
      class: {
        base: 'cursor-pointer hover:border-primary hover:shadow-md',
      },
      disabled: false,
      selected: false,
    },
    {
      class: {
        base: 'border-primary bg-primary/5 shadow-sm',
      },
      selected: true,
    },
    {
      class: {
        leading: 'rounded-xl bg-gray-50 p-3',
      },
      variant: 'icon',
    },
    {
      class: {
        leading: 'rounded-xl',
      },
      variant: 'media',
    },
  ],
  defaultVariants: {
    disabled: false,
    selected: false,
    size: 'md',
    tone: 'default',
    variant: 'icon',
  },
  slots: {
    base: 'group relative flex items-center gap-3 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    content: 'flex flex-1 flex-col justify-center',
    leading: 'flex shrink-0 items-center justify-center overflow-hidden',
    subtitle: 'text-sm text-gray-600',
    title: 'font-semibold',
  },
  variants: {
    disabled: {
      false: '',
      true: 'cursor-not-allowed opacity-50',
    },
    selected: {
      false: 'border-gray-200 bg-white',
      true: 'border-primary bg-primary/5 shadow-sm',
    },
    size: {
      lg: {
        base: 'p-5',
        leading: 'size-20',
        subtitle: 'text-base',
        title: 'text-xl',
      },
      md: {
        base: 'p-4',
        leading: 'size-16',
        subtitle: 'text-sm',
        title: 'text-lg',
      },
      sm: {
        base: 'p-3',
        leading: 'size-12',
        subtitle: 'text-xs',
        title: 'text-base',
      },
    },
    tone: {
      default: '',
      soft: {
        base: 'bg-gray-50/50',
      },
    },
    variant: {
      icon: '',
      media: '',
    },
  },
});

type ChoiceTileVariants = VariantProps<typeof choiceTileVariants>;

type BaseChoiceTileProps = {
  className?: string;
  disabled?: boolean;
  leading?: ReactNode;
  selected?: boolean;
  size?: ChoiceTileVariants['size'];
  subtitle?: string;
  title: string;
  tone?: ChoiceTileVariants['tone'];
  variant?: ChoiceTileVariants['variant'];
};

// Type for button usage
type ChoiceTileAsButton = BaseChoiceTileProps & {
  as?: 'button';
  href?: never;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | keyof BaseChoiceTileProps>;

// Type for link usage (external)
type ChoiceTileAsAnchor = BaseChoiceTileProps & {
  as: 'a';
  href: string;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick' | keyof BaseChoiceTileProps>;

// Type for Next.js Link usage (internal)
type ChoiceTileAsLink = BaseChoiceTileProps & {
  as?: 'link';
  href: string;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'onClick' | keyof BaseChoiceTileProps>;

// Union type for all possible usages
export type ChoiceTileProps = ChoiceTileAsAnchor | ChoiceTileAsButton | ChoiceTileAsLink;

export const ChoiceTile = ({
  as,
  className,
  disabled = false,
  href,
  leading,
  onClick,
  selected = false,
  size = 'md',
  subtitle,
  title,
  tone = 'default',
  variant = 'icon',
  ...rest
}: ChoiceTileProps) => {
  const styles = choiceTileVariants({ disabled, selected, size, tone, variant });

  // Determine which component to render
  const isExternalLink = as === 'a';
  const isInternalLink = (as === 'link' || href) && !isExternalLink;

  // Common props for all variants
  const commonProps = {
    'aria-disabled': disabled ? true : undefined,
    className: cn(styles.base(), className),
    onClick: disabled ? undefined : onClick,
    tabIndex: disabled ? -1 : 0,
  };

  // Render content
  const content = (
    <>
      {leading && <div className={styles.leading()}>{leading}</div>}
      <div className={styles.content()}>
        <div className={styles.title()}>{title}</div>
        {subtitle && <div className={styles.subtitle()}>{subtitle}</div>}
      </div>
    </>
  );

  // Render as Next.js Link (internal navigation)
  if (isInternalLink && href) {
    return (
      <Link
        {...commonProps}
        {...(rest as ComponentPropsWithoutRef<typeof Link>)}
        aria-current={selected ? 'page' : undefined}
        href={href}
      >
        {content}
      </Link>
    );
  }

  // Render as anchor (external link)
  if (isExternalLink && href) {
    return (
      <a
        {...commonProps}
        {...(rest as ComponentPropsWithoutRef<'a'>)}
        aria-current={selected ? 'page' : undefined}
        href={href}
      >
        {content}
      </a>
    );
  }

  // Render as button (default)
  return (
    <button
      {...commonProps}
      {...(rest as ComponentPropsWithoutRef<'button'>)}
      aria-pressed={selected}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );
};
