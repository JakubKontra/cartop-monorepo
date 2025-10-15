'use client';

import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { WrapperFadeIn } from '@/components/organisms/animations/WrapperFadeIn';
import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils/cv';

interface ExploreCardProps {
  className?: string;
  content: string;
  imageAlt: string;
  imageSrc: string;
  setOpenInViewPort?: boolean;
  title: string;
}

export const ExploreCard = ({
  className,
  content,
  imageAlt,
  imageSrc,
  setOpenInViewPort = false,
  title,
}: ExploreCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const isInViewPort = useIntersectionObserver({
    ref,
    threshold: 1,
  });

  useEffect(() => {
    if (isInViewPort && setOpenInViewPort) {
      setIsOpen(true);
    }
  }, [isInViewPort, setOpenInViewPort]);

  return (
    <WrapperFadeIn as="div" duration={0.6} threshold={0.8}>
      <div
        ref={ref}
        className={cn(
          'relative flex aspect-[674/610] w-full items-end overflow-hidden rounded-4xl p-6',
          className,
        )}
      >
        {/* Background Image */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300',
          )}
        >
          <Image fill alt={imageAlt} className="h-full w-full object-cover" src={imageSrc} />
        </div>

        {/* Content */}
        <div
          className={cn(
            'relative z-10 flex flex-col rounded-3xl border border-white/20 bg-white/15 p-3 pl-6 backdrop-blur-sm',
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className={cn('font-semibold text-white')}>{title}</h3>
            <ButtonIcon
              icon={isOpen ? <ArrowRight /> : <Plus />}
              variant={isOpen ? 'primary-inverted' : 'secondary'}
              onClick={toggle}
            />
          </div>

          {/* Expandable Content */}
          <div
            className={cn(
              'transition-[max-height, opacity, padding] overflow-hidden duration-600',
              isOpen ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0 pt-0',
            )}
          >
            <p className="text-sm leading-relaxed text-white">{content}</p>
          </div>
        </div>
      </div>
    </WrapperFadeIn>
  );
};
