'use client';
import Button from '@/components/atoms/button/Button';
import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import { MoveUpRight } from 'lucide-react';
import type React from 'react';
import { type HTMLAttributes, useEffect, useState } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

export type CarouselTheme = 'light' | 'dark';

export const ProgressBarButton = ({
  progress,
  children,
  onClick,
}: {
  progress: number;
  isActive: boolean;
  theme?: CarouselTheme;
} & HTMLAttributes<HTMLButtonElement>) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <>
      <Button
        variant="secondary-inverted"
        iconPosition="right"
        size="narrow"
        icon={<MoveUpRight className="size-5 relative" />}
        onClick={onClick}
        className="relative overflow-hidden hidden xl:flex"
      >
        <p className="relative z-10">{children}</p>
        <span
          className={`absolute -left-full top-0 z-0 h-full w-full bg-gunmetal-600 transition-transform ease-out ${progress === 0 ? 'opacity-0' : 'opacity-100'}`}
          style={{
            transform: `translateX(${progressPercentage}%)`,
            transitionDuration: progress === 0 ? '300ms' : '10ms',
          }}
        />
      </Button>
      <div className="relative xl:hidden p-2 group">
        <ButtonIcon
          icon={children}
          variant="progress-button"
          className="rounded-full size-10 lg:size-10"
          onClick={onClick}
        />
        {/* White circle with progress percentage */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8ca1b2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-[stroke-dashoffset] duration-0 group-hover/mobile-progress-bar:duration-300"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

interface AdditionalServicesCarouselProps {
  items: Array<{
    innerItem: React.ReactNode;
    buttonText: string;
  }>;
  interval?: number;
  cardClassName?: string;
  theme?: CarouselTheme;
  desktopClassName?: string;
  mobileClassName?: string;
}

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
}: AdditionalServicesCarouselProps & HTMLAttributes<HTMLDivElement>) => {
  const { activeSlide, swiperRef, onSetActiveSlide, setActiveSlide } = useSwiper();

  const [progress, setProgress] = useState(0);
  const onAutoplayTimeLeft = (_swiper: SwiperType, _timeLeft: number, percentage: number) => {
    setProgress(1 - percentage);
  };

  const isActive = useIntersectionObserver({ elementId: id + '-wrapper' });

  useEffect(() => {
    if (isActive) {
      swiperRef.current?.autoplay.start();
    } else {
      swiperRef.current?.autoplay.stop();
    }
  }, [isActive]);

  return (
    <>
      <div
        className={`relative h-full w-full ${className} ${desktopClassName}`}
        {...rest}
        id={id + '-wrapper'}
      >
        <div className="relative z-10 h-full w-full">
          <Swiper
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            onSlideChange={swiper => {
              setActiveSlide(swiper.activeIndex);
            }}
            centeredSlides={true}
            autoplay={{
              delay: interval,
              disableOnInteraction: true,
            }}
            modules={[EffectFade, Autoplay]}
            className="mySwiper h-full"
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
          >
            {items.map((item, index) => {
              return (
                <SwiperSlide key={index} className={cn('h-full overflow-hidden', cardClassName)}>
                  {item.innerItem}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div
          className={cn(
            'group/mobile-progress-bar absolute z-20 flex px-3 xxs:px-8 md:px-14',
            'bottom-4 justify-start md:bottom-14',
          )}
          onMouseEnter={() => {
            swiperRef.current?.autoplay.stop();
            setProgress(0);
          }}
          onMouseLeave={() => {
            swiperRef.current?.autoplay.start();
          }}
        >
          <div className={cn('rounded-full p-4')}>
            <div className={cn('flex xl:gap-4 flex-row gap-1')}>
              {items.map((item, index) => {
                const isActive = activeSlide === index;
                return (
                  <ProgressBarButton
                    progress={isActive ? progress : 0}
                    key={index}
                    isActive={isActive}
                    theme={theme}
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
        </div>
      </div>
    </>
  );
};
