'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ReviewCardProps } from '@/components/molecules/review/ReviewCard';

import { ReviewCard } from '@/components/molecules/review/ReviewCard';
import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';

interface ReviewsCarouselProps {
  className?: string;
  reviews: ReviewCardProps[];
}

export const ReviewsCarousel = ({ className, reviews }: ReviewsCarouselProps) => {
  const [isItFirstInteraction, setIsItFirstInteraction] = useState(true);
  const { onNext, onPrevious, onSetActiveSlideToLoop, realIndex, setActiveSlide, swiperRef } =
    useSwiper();

  const isActive = useIntersectionObserver({
    elementId: 'reviews-carousel-wrapper',
    threshold: 0.8,
  });

  useEffect(() => {
    if (isActive && isItFirstInteraction) {
      onNext();
      setIsItFirstInteraction(false);
    }
  }, [isActive, isItFirstInteraction, onNext]);

  return (
    <div className={cn('overflow-hidden pb-6 md:pb-8 lg:pb-10', className)}>
      <div className="relative" id="reviews-carousel-wrapper">
        <div className="relative w-full">
          <Swiper
            centeredSlides
            grabCursor
            loop
            className="!py-4"
            id="reviews-carousel"
            slidesPerView="auto"
            spaceBetween={20}
            speed={600}
            onSlideChange={swiper => {
              setActiveSlide(swiper.realIndex);
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
          >
            {[...reviews, ...reviews].map((item, index) => {
              const isSlideActive = realIndex === index;
              return (
                <SwiperSlide key={index} className="flex justify-center max-md:px-4 md:!w-auto">
                  <div
                    className={cn(
                      'transition-all duration-600',
                      isSlideActive ? 'scale-100' : 'scale-95',
                    )}
                  >
                    <ReviewCard
                      content={item.content}
                      date={item.date}
                      initials={item.initials}
                      name={item.name}
                      rating={item.rating}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between gap-4 px-4 md:mt-10 lg:mt-12">
          <ButtonIcon
            icon={<ArrowLeftIcon className="size-5" />}
            variant="primary-inverted"
            onClick={onPrevious}
          />
          <div className="flex gap-1.5 lg:gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`transition-width size-2 cursor-pointer rounded-full duration-300 ${
                  index === realIndex % reviews.length
                    ? 'w-8 bg-gunmetal'
                    : 'bg-gunmetal-200 hover:bg-gunmetal-700'
                }`}
                onClick={() => onSetActiveSlideToLoop(index)}
              />
            ))}
          </div>
          <ButtonIcon
            icon={<ArrowRightIcon className="size-5" />}
            variant="primary-inverted"
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};
