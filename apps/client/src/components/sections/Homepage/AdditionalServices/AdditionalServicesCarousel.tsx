'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import { ProgressBarButton } from './ProgressBarButton';
import type { CarouselItem, CarouselTheme } from './types';
import type React from 'react';
import { type HTMLAttributes, useEffect, useState, useCallback, useMemo } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

interface AdditionalServicesCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  interval?: number;
  cardClassName?: string;
  theme?: CarouselTheme;
  desktopClassName?: string;
  mobileClassName?: string;
}

// Custom hook for carousel logic
const useCarouselLogic = (id: string) => {
  const { activeSlide, swiperRef, onSetActiveSlide, setActiveSlide } = useSwiper();
  const [progress, setProgress] = useState(0);
  const isActive = useIntersectionObserver({ elementId: id + '-wrapper' });

  const handleAutoplayTimeLeft = useCallback(
    (_swiper: SwiperType, _timeLeft: number, percentage: number) => {
      setProgress(1 - percentage);
    },
    [],
  );

  const handleSwiperInit = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
    },
    [swiperRef],
  );

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      setActiveSlide(swiper.activeIndex);
    },
    [setActiveSlide],
  );

  const handleMouseEnter = useCallback(() => {
    swiperRef.current?.autoplay.stop();
    setProgress(0);
  }, [swiperRef]);

  const handleMouseLeave = useCallback(() => {
    swiperRef.current?.autoplay.start();
  }, [swiperRef]);

  useEffect(() => {
    if (isActive) {
      swiperRef.current?.autoplay.start();
    } else {
      swiperRef.current?.autoplay.stop();
    }
  }, [isActive, swiperRef]);

  return {
    activeSlide,
    progress,
    handleAutoplayTimeLeft,
    handleSwiperInit,
    handleSlideChange,
    handleMouseEnter,
    handleMouseLeave,
    onSetActiveSlide,
  };
};

// Progress Bar Controls Component
const ProgressBarControls = ({
  items,
  activeSlide,
  progress,
  onSetActiveSlide,
  onMouseEnter,
  onMouseLeave,
}: {
  items: CarouselItem[];
  activeSlide: number;
  progress: number;
  onSetActiveSlide: (index: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <div
      className={cn(
        'group/mobile-progress-bar absolute w-full z-20 flex px-3 xxs:px-8 md:px-10 xl:px-16',
        'bottom-4 justify-center xl:justify-start xl:bottom-16',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={cn('flex xl:gap-4 flex-row gap-1')}>
        {items.map((item, index) => {
          const isActiveItem = activeSlide === index;
          return (
            <ProgressBarButton
              progress={isActiveItem ? progress : 0}
              key={index}
              onClick={() => onSetActiveSlide(index)}
            >
              <div className="flex w-full items-center gap-3 justify-center">
                <div className="flex xl:hidden text-white">{String(index + 1)}</div>
                <p className="text-md relative whitespace-nowrap xxs:font-semibold hidden xl:block">
                  {item.buttonText}
                </p>
              </div>
            </ProgressBarButton>
          );
        })}
      </div>
    </div>
  );
};

// Main Carousel Component
export const AdditionalServicesCarousel = ({
  items,
  interval = 5000,
  className,
  id,
  cardClassName,
  theme = 'dark',
  desktopClassName,
  mobileClassName,
  ...rest
}: AdditionalServicesCarouselProps) => {
  const {
    activeSlide,
    progress,
    handleAutoplayTimeLeft,
    handleSwiperInit,
    handleSlideChange,
    handleMouseEnter,
    handleMouseLeave,
    onSetActiveSlide,
  } = useCarouselLogic(id!);

  const wrapperClassName = useMemo(
    () => cn('relative h-full w-full', className, desktopClassName),
    [className, desktopClassName],
  );

  const swiperConfig = useMemo(
    () => ({
      centeredSlides: true,
      autoplay: {
        delay: interval,
        disableOnInteraction: true,
      },
      modules: [EffectFade, Autoplay],
      className: 'mySwiper h-full',
      effect: 'fade' as const,
      fadeEffect: {
        crossFade: true,
      },
    }),
    [interval],
  );

  return (
    <div className={wrapperClassName} {...rest} id={id + '-wrapper'}>
      <div className="relative z-10 h-full w-full">
        <Swiper
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          onAutoplayTimeLeft={handleAutoplayTimeLeft}
          {...swiperConfig}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className={cn('!h-auto overflow-hidden', cardClassName)}>
              {item.innerItem}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProgressBarControls
        items={items}
        activeSlide={activeSlide}
        progress={progress}
        onSetActiveSlide={onSetActiveSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
