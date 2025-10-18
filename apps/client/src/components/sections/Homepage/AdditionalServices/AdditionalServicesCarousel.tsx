'use client';
import Button from '@/components/atoms/button/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import gsap from 'gsap';
import { MoveUpRight } from 'lucide-react';
import type React from 'react';
import { type HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

export type CarouselTheme = 'light' | 'dark';

export const ProgressBarButton = ({
  progress,
  children,
  onClick,
  isActive,
  theme = 'dark',
}: {
  progress: number;
  isActive: boolean;
  theme?: CarouselTheme;
} & HTMLAttributes<HTMLButtonElement>) => {
  const barRef = useRef<HTMLDivElement>(null);

  //   useGSAP(() => {
  //     let timeout: NodeJS.Timeout;
  //     if (progress === 0) {
  //       timeout = setTimeout(() => {
  //         gsap.killTweensOf(barRef.current);
  //         gsap.set(barRef.current, {
  //           width: '0%',
  //         });
  //       }, 300);
  //     } else {
  //       gsap.to(barRef.current, {
  //         width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
  //         duration: 0.2,
  //         ease: 'power2.out',
  //       });
  //     }
  //     return () => clearTimeout(timeout);
  //   }, [progress]);

  return (
    <Button
      variant="secondary-inverted"
      iconPosition="right"
      icon={<MoveUpRight className="size-5" />}
      onClick={onClick}
    >
      <span
        ref={barRef}
        className={`absolute left-0 top-0 z-0 h-full bg-primary-blue-hover transition-opacity duration-300 ${progress === 0 ? 'opacity-0' : 'opacity-100'}`}
        style={{ width: '0%' }}
      />
      {children}
    </Button>
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

  // const progress = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const onAutoplayTimeLeft = (swiper: SwiperType, timeLeft: number, percentage: number) => {
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
            'absolute z-20 flex px-3 xxs:px-8 md:px-14',
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
            <div className={cn('flex md:gap-4 flex-row gap-2')}>
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
                    <div className="flex w-full items-center gap-3">
                      <div className="flex lg:hidden text-white">{String(index + 1)}</div>
                      <p className="text-md relative whitespace-nowrap xxs:font-semibold hidden lg:block">
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
