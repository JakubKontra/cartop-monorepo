'use client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ButtonIcon } from '@/components/organisms/Button/ButtonIcon';
import { ReviewCard } from '.';

export interface ReviewCardProps {
  name: string;
  initials: string;
  content: string;
  date: string;
  rating: number;
  isActive: boolean;
}

const reviewsData: Omit<ReviewCardProps, 'isActive'>[] = [
  {
    name: 'Pavel Novák',
    initials: 'PN',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    rating: 5,
  },
  {
    name: 'Pavel Novák',
    initials: 'PN',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    rating: 4.5,
  },
  {
    name: 'Pavel Novák',
    initials: 'PN',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    rating: 3.5,
  },
  {
    name: 'Pavel Novák',
    initials: 'PN',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    rating: 2.2,
  },
  {
    name: 'Pavel Novák',
    initials: 'PN',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    rating: 2,
  },
];

export const ReviewsCarousel = ({ className }: { className?: string }) => {
  const [isItFirstInteraction, setIsItFirstInteraction] = useState(true);
  const { realIndex, onNext, onPrevious, swiperRef, setActiveSlide, onSetActiveSlideToLoop } =
    useSwiper();

  const isActive = useIntersectionObserver({
    elementId: 'partner-carousel-wrapper',
    threshold: 0.8,
  });

  useEffect(() => {
    if (isActive && isItFirstInteraction) {
      onNext();
      setIsItFirstInteraction(false);
    }
  }, [isActive]);

  return (
    <div className={cn('py-8 lg:py-12 overflow-hidden', className)}>
      <div className="relative" id="partner-carousel-wrapper">
        <div className="relative w-full">
          <Swiper
            speed={600}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            grabCursor={true}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={20}
            onSlideChange={swiper => {
              setActiveSlide(swiper.realIndex);
            }}
            id="partner-carousel"
            className="!py-4"
            loop={true}
          >
            {[...reviewsData, ...reviewsData].map((item, index) => {
              const isActive = realIndex === index;
              return (
                <SwiperSlide key={index} className="flex justify-center max-md:px-4 md:!w-auto">
                  <div
                    className={cn(
                      'transition-all duration-600',
                      isActive ? 'scale-100' : 'scale-95',
                    )}
                  >
                    <ReviewCard
                      key={item.name}
                      name={item.name}
                      initials={item.initials}
                      content={item.content}
                      date={item.date}
                      rating={item.rating}
                      isActive={isActive}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex gap-4 items-center justify-between mt-10 lg:mt-14 max-w-6xl mx-auto px-4">
          <ButtonIcon
            icon={<ArrowLeftIcon className="size-5" />}
            variant="primary-inverted"
            onClick={onPrevious}
          />
          <div className="flex gap-1.5 lg:gap-3">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                className={`size-2 rounded-full transition-width duration-300 cursor-pointer ${
                  index === realIndex % reviewsData.length
                    ? 'w-8 bg-gunmetal'
                    : 'bg-gunmetal-200 hover:bg-gunmetal-700'
                }`}
                onClick={() => onSetActiveSlideToLoop(index)}
                type="button"
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
