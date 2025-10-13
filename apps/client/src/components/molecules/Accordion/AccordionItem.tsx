'use client';

import type { KeyboardEvent, ReactElement, ReactNode } from 'react';

import { cloneElement, isValidElement, useState } from 'react';

import { WrapperFadeIn } from '@/components/organisms/animations/WrapperFadeIn';
import { cn } from '@/utils/cv';

interface AccordionItemProps {
  containerClassName?: string;
  content: ReactNode;
  contentClassName?: string;
  icon?: ReactElement<{ isOpen?: boolean }>;
  iconClassName?: string;
  index: number;
  isDefaultOpen?: boolean;
  title: ReactNode;
  titleClassName?: string;
}

export const AccordionItem = ({
  containerClassName,
  content,
  contentClassName,
  icon,
  iconClassName,
  index,
  isDefaultOpen = false,
  title,
  titleClassName,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

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
            aria-controls={contentId}
            aria-expanded={isOpen}
            className="flex w-full cursor-pointer justify-between gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:p-6"
            id={headingId}
            type="button"
            onClick={toggle}
            onKeyDown={handleKeyDown}
          >
            <span className={cn('flex-1 pr-4 text-lg font-semibold lg:text-xl', titleClassName)}>
              {title}
            </span>
            {icon && (
              <span className={cn('flex flex-shrink-0 items-center justify-center', iconClassName)}>
                {isValidElement(icon) ? cloneElement(icon, { isOpen }) : icon}
              </span>
            )}
          </button>
        </h3>
        <div
          aria-labelledby={headingId}
          id={contentId}
          role="region"
          className={cn(
            'transition-[max-height, opacity, padding] overflow-hidden duration-300',
            isOpen
              ? 'max-h-96 opacity-100 px-4 lg:px-6 pb-4 lg:pb-6'
              : 'max-h-0 opacity-0 px-4 lg:px-6 pb-0',
            contentClassName,
          )}
        >
          <div className="max-w-[960px] select-text">{content}</div>
        </div>
      </div>
    </WrapperFadeIn>
  );
};
