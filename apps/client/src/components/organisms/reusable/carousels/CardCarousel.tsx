'use client';
import type { JSX } from 'react';
import { type HTMLAttributes, useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';

interface Props {
  slides: JSX.Element[];
  autoplayDelay?: number;
}

export const CardCarousel = ({
  slides,
  className,
  id,
  autoplayDelay = 0,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const [isItFirstInteraction, setIsItFirstInteraction] = useState(true);
  const { onNext, swiperRef, setActiveSlide } = useSwiper();

  const isActive = useIntersectionObserver({
    elementId: id + '-wrapper',
    threshold: 0.8,
  });

  useEffect(() => {
    if (isActive && isItFirstInteraction) {
      onNext();
      setIsItFirstInteraction(false);
    }
  }, [isActive, isItFirstInteraction, onNext]);

  const loopSlides = [...slides, ...slides];

  return (
    <div className={`relative overflow-hidden ${className}`} {...rest} id={id + '-wrapper'}>
      <div className="relative w-full">
        <Swiper
          speed={1000}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          grabCursor
          slidesPerView="auto"
          centeredSlides
          breakpoints={{
            900: {
              centeredSlides: false,
            },
          }}
          spaceBetween={24}
          onSlideChange={swiper => {
            setActiveSlide(swiper.realIndex);
          }}
          loop
          id={id}
          data-animate
          data-animate-start="top bottom"
          className={`${id}-swiper translate-x-6`}
          autoplay={
            autoplayDelay !== 0
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          modules={autoplayDelay !== 0 ? [Autoplay] : []}
        >
          {loopSlides.map((item, index) => {
            return (
              <SwiperSlide key={index} className="!w-auto">
                {item}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* <div className="container mt-[29px] flex !max-w-[unset] items-center justify-center md:justify-end">
				{showControls ? (
					<CarouselArrowButton
						onClick={onPrevious}
						className="mr-[16px] rotate-180 border border-base-black text-base-black md:hidden"
					/>
				) : null}
				{showIndicators && (
					<CarouselNavigation
						slides={slides}
						activeBackgroundColorClassName="bg-primary-blue"
						backgroundColorClassName="bg-grey-550"
						activeSlide={loopRealIndex}
					/>
				)}
				{showControls ? (
					<>
						<CarouselArrowButton
							onClick={onPrevious}
							className="ml-[45px] mr-[16px] rotate-180 border border-base-black text-base-black max-md:hidden"
						/>
						<CarouselArrowButton
							onClick={onNext}
							className="border border-base-black text-base-black max-md:ml-[16px]"
						/>
					</>
				) : null}
			</div> */}
    </div>
  );
};
