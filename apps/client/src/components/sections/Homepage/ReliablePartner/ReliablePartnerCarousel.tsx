'use client';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ButtonIcon } from '@/components/organisms/Button/ButtonIcon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';

interface CarouselSlideProps {
  alt?: string;
  image: string;
  isActive?: boolean;
  text: string;
  title: string;
}

const CarouselSlide = ({ alt, image, isActive, text, title }: CarouselSlideProps) => {
  return (
    <div
      className={cn(
        'flex aspect-[307/444] w-56 shrink-0 flex-col items-center justify-between rounded-4xl border px-4 py-6 pt-12 transition-colors duration-1000 lg:w-80 lg:p-10 lg:pt-20',
        isActive ? 'bg-gunmetal-50 border-gunmetal' : 'bg-white border-french-grey',
      )}
    >
      <div className="relative aspect-[169/200] w-24 overflow-hidden rounded-lg lg:w-44">
        <Image fill alt={alt || title} className="object-cover" src={image} />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-center text-base font-semibold text-gunmetal">{title}</h3>
        <p
          className={cn(
            'text-center text-4xl whitespace-nowrap text-gunmetal lg:text-5xl',
            isActive ? 'font-semibold' : 'font-medium',
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const slidesData = [
  {
    image: '/images/homepage/partners/Pocet-znacek.png',
    text: '29',
    title: 'Počet značek v nabídce',
  },
  {
    image: '/images/homepage/partners/Vydejni-mista.png',
    text: '350',
    title: 'Počet výdejních míst',
  },
  {
    image: '/images/homepage/partners/Hodnota-vozu.png',
    text: '36 mld. Kč',
    title: 'Hodnota řešených vozů',
  },
  {
    image: '/images/homepage/partners/Pocet-zakazniku.png',
    text: '24 000+',
    title: 'Počer zákazníků',
  },
  {
    image: '/images/homepage/partners/Prumerna-uspora.png',
    text: '30 %',
    title: 'Průměrná úspora',
  },
  {
    image: '/images/homepage/partners/Dostupnost.png',
    text: '80 %',
    title: 'Dostupnost',
  },
  {
    image: '/images/homepage/partners/Pomoc-zakaznikum.png',
    text: '54 %',
    title: 'Zákazníkům, kterým pomůžeme s výběrem',
  },
];

export const ReliablePartnerCarousel = ({ className }: { className?: string }) => {
  const [isItFirstInteraction, setIsItFirstInteraction] = useState(true);
  const { onNext, onPrevious, onSetActiveSlideToLoop, realIndex, setActiveSlide, swiperRef } =
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
    <div className={cn('overflow-hidden py-12', className)}>
      <div className="relative" id="partner-carousel-wrapper">
        <div className="relative w-full">
          <Swiper
            centeredSlides
            grabCursor
            loop
            className="!py-4"
            id="partner-carousel"
            slidesPerView="auto"
            spaceBetween={24}
            speed={600}
            onSlideChange={swiper => {
              setActiveSlide(swiper.realIndex);
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
          >
            {[...slidesData, ...slidesData].map((item, index) => {
              const isActive = realIndex === index;
              return (
                <SwiperSlide key={index} className="!w-auto">
                  <div
                    className={cn(
                      'transition-all duration-600',
                      isActive ? 'scale-105' : 'scale-100',
                    )}
                  >
                    <CarouselSlide
                      key={item.title}
                      alt={item.title}
                      image={item.image}
                      isActive={isActive}
                      text={item.text}
                      title={item.title}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl items-center justify-between gap-4 px-4">
          <ButtonIcon
            icon={<ArrowLeftIcon className="size-5" />}
            variant="primary-inverted"
            onClick={onPrevious}
          />
          <div className="flex gap-1.5 lg:gap-3">
            {slidesData.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`transition-width size-2 cursor-pointer rounded-full duration-300 ${
                  index === realIndex % slidesData.length
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
