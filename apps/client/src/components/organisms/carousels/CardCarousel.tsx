'use client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import { type HTMLAttributes, JSX, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  slides: JSX.Element[];
  autoplayDelay?: number;
  showIndicators?: boolean;
  showControls?: boolean;
}

export const CardCarousel = ({
  slides,
  className,
  id,
  autoplayDelay = 0,
  showIndicators = false,
  showControls = true,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const [isItFirstInteraction, setIsItFirstInteraction] = useState(true);
  const { realIndex, onNext, onPrevious, swiperRef, setActiveSlide } = useSwiper();

  const isActive = useIntersectionObserver({
    elementId: id + '-wrapper',
    threshold: 0.8,
  });

  useEffect(() => {
    if (isActive && isItFirstInteraction) {
      onNext();
      setIsItFirstInteraction(false);
    }
  }, [isActive]);

  const loopSlides = [...slides, ...slides];

  return (
    <div className={`relative overflow-hidden ${className}`} {...rest} id={id + '-wrapper'}>
      <div className="relative w-full">
        <Swiper
          speed={1000}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          onSlideChange={swiper => {
            setActiveSlide(swiper.realIndex);
          }}
          id={id}
        >
          {loopSlides.map((item, index) => {
            const isActive = realIndex === index;
            return (
              <SwiperSlide key={index} className="!w-auto">
                <div
                  className={cn(
                    'transition-all duration-1000',
                    isActive ? 'scale-100' : 'scale-95',
                  )}
                >
                  {item}
                </div>
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
