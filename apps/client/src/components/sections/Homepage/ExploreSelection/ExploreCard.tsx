'use client';

import { useEffect, useRef, useState } from 'react';

import { ButtonIcon } from '@/components/organisms/Button/ButtonIcon';
import { cn } from '@/utils/cv';
import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { WrapperFadeIn } from '@/components/organisms/animations/WrapperFadeIn';

interface ExploreCardProps {
  className?: string;
  content: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
  setOpenInViewPort?: boolean;
}

export const ExploreCard = ({
  className,
  content,
  imageAlt,
  imageSrc,
  title,
  setOpenInViewPort = false,
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
        className={cn(
          'relative overflow-hidden rounded-4xl p-6 flex items-end aspect-[674/610] w-full',
          className,
        )}
        ref={ref}
      >
        {/* Background Image */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300',
          )}
        >
          <Image src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" fill />
        </div>

        {/* Content */}
        <div
          className={cn(
            'relative z-10 flex flex-col rounded-3xl p-3 pl-6 bg-white/15 backdrop-blur-sm border border-white/20',
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className={cn('font-semibold text-white')}>{title}</h3>
            <ButtonIcon
              variant={isOpen ? 'primary-inverted' : 'secondary'}
              icon={isOpen ? <ArrowRight /> : <Plus />}
              onClick={toggle}
            />
          </div>

          {/* Expandable Content */}
          <div
            className={cn(
              'overflow-hidden transition-[max-height, opacity, padding] duration-600',
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
