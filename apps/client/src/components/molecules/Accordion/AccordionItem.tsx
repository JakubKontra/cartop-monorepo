'use client';

import type { ReactElement, ReactNode, KeyboardEvent } from 'react';
import { cloneElement, isValidElement, useState } from 'react';

import { WrapperFadeIn } from '@/components/organisms/reusable/aimation-wrappers/WrapperFadeIn';
import { cn } from '@/utils/cv';

interface AccordionItemProps {
  title: ReactNode;
  content: ReactNode;
  index: number;
  defaultOpen?: boolean;
  icon?: ReactElement<{ isOpen?: boolean }>;
  containerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

export const AccordionItem = ({
  title,
  content,
  index,
  defaultOpen = false,
  icon,
  containerClassName,
  titleClassName,
  contentClassName,
  iconClassName,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const headingId = `accordion-heading-${index}`;
  const contentId = `accordion-content-${index}`;

  return (
    <WrapperFadeIn as="li" duration={0.6} threshold={0.8}>
      <div className={cn('transition-all duration-300', containerClassName)}>
        <h3 className="m-0">
          <button
            onClick={toggle}
            onKeyDown={handleKeyDown}
            className="w-full p-4 lg:p-6 text-left flex justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-expanded={isOpen}
            aria-controls={contentId}
            id={headingId}
            type="button"
          >
            <span className={cn('font-semibold text-lg lg:text-xl pr-4 flex-1', titleClassName)}>
              {title}
            </span>
            {icon && (
              <span className={cn('flex items-center justify-center flex-shrink-0', iconClassName)}>
                {isValidElement(icon) ? cloneElement(icon, { isOpen }) : icon}
              </span>
            )}
          </button>
        </h3>
        <div
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          className={cn(
            'transition-[max-height, opacity, padding] duration-300 overflow-hidden',
            isOpen
              ? 'max-h-96 opacity-100 px-4 lg:px-6 pb-4 lg:pb-6'
              : 'max-h-0 opacity-0 px-4 lg:px-6 pb-0',
            contentClassName,
          )}
        >
          <div className="select-text">{content}</div>
        </div>
      </div>
    </WrapperFadeIn>
  );
};
