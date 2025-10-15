'use client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSwiper } from '@/hooks/useSwiper';
import { cn } from '@/utils/cv';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Button from '@/components/organisms/Button/Button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ButtonIcon } from '@/components/organisms/Button/ButtonIcon';

interface CarouselSlideProps {
  image: string;
  title: string;
  text: string;
  alt?: string;
  isActive?: boolean;
}

const CarouselSlide = ({ image, title, text, alt, isActive }: CarouselSlideProps) => {
  return (
    <div
      className={cn(
        'aspect-[307/444] w-56 lg:w-80 rounded-4xl flex flex-col justify-between items-center px-4 py-6 lg:p-10 pt-12 lg:pt-20 border shrink-0 transition-colors duration-1000',
        isActive ? 'bg-gunmetal-50 border-gunmetal' : 'bg-white border-french-grey',
      )}
    >
      <div className="relative aspect-[169/200] w-24 lg:w-44 overflow-hidden rounded-lg">
        <Image src={image} alt={alt || title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-center text-base font-semibold text-gunmetal">{title}</h3>
        <p
          className={cn(
            'text-center text-4xl lg:text-5xl text-gunmetal whitespace-nowrap',
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
    title: 'Počet značek v nabídce',
    text: '29',
  },
  {
    image: '/images/homepage/partners/Vydejni-mista.png',
    title: 'Počet výdejních míst',
    text: '350',
  },
  {
    image: '/images/homepage/partners/Hodnota-vozu.png',
    title: 'Hodnota řešených vozů',
    text: '36 mld. Kč',
  },
  {
    image: '/images/homepage/partners/Pocet-zakazniku.png',
    title: 'Počer zákazníků',
    text: '24 000+',
  },
  {
    image: '/images/homepage/partners/Prumerna-uspora.png',
    title: 'Průměrná úspora',
    text: '30 %',
  },
  {
    image: '/images/homepage/partners/Dostupnost.png',
    title: 'Dostupnost',
    text: '80 %',
  },
  {
    image: '/images/homepage/partners/Pomoc-zakaznikum.png',
    title: 'Zákazníkům, kterým pomůžeme s výběrem',
    text: '54 %',
  },
];

export const ReliablePartnerCarousel = ({ className }: { className?: string }) => {
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
    <div className={cn('py-12 overflow-hidden', className)}>
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
            spaceBetween={24}
            onSlideChange={swiper => {
              setActiveSlide(swiper.realIndex);
            }}
            id="partner-carousel"
            className="!py-4"
            loop={true}
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
                      image={item.image}
                      title={item.title}
                      text={item.text}
                      alt={item.title}
                      isActive={isActive}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex gap-4 items-center justify-between mt-14 max-w-6xl mx-auto px-4">
          <ButtonIcon
            icon={<ArrowLeftIcon className="size-5" />}
            variant="primary-inverted"
            onClick={onPrevious}
          />
          <div className="flex gap-1.5 lg:gap-3">
            {slidesData.map((_, index) => (
              <button
                key={index}
                className={`size-2 rounded-full transition-width duration-300 cursor-pointer ${
                  index === realIndex % slidesData.length
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
