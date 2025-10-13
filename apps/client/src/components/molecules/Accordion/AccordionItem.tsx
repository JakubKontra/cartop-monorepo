'use client';

import type { ReactElement, ReactNode, KeyboardEvent } from 'react';
import { cloneElement, isValidElement, useState } from 'react';

import { WrapperFadeIn } from '@/components/organisms/reusable/aimation-wrappers/WrapperFadeIn';
import { cn } from '@/utils/cv';

interface AccordionItemProps {
  title: ReactNode;
  content: ReactNode;
  index: number;
  isDefaultOpen?: boolean;
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
  isDefaultOpen = false,
  icon,
  containerClassName,
  titleClassName,
  contentClassName,
  iconClassName,
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
            onClick={toggle}
            onKeyDown={handleKeyDown}
            className="flex w-full justify-between gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:p-6"
            aria-expanded={isOpen}
            aria-controls={contentId}
            id={headingId}
            type="button"
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
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          className={cn(
            'transition-[max-height, opacity, padding] overflow-hidden duration-300',
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
