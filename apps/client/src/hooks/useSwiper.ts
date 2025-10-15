import type { Swiper as SwiperType } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';

export const useSwiper = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const swiperRef = useRef<null | SwiperType>(null);

  const realIndex = swiperRef.current?.realIndex || 0;

  const onPrevious = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const onNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const onSetActiveSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const onSetActiveSlideToLoop = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  useEffect(() => {
    setActiveSlide(realIndex);
  }, [realIndex]);

  const isFirst = 0 === activeSlide;
  const isLast = (swiperRef.current?.slides?.length || 0) - 1 === activeSlide;

  return {
    activeSlide,
    isFirst,
    isLast,
    onNext,
    onPrevious,
    onSetActiveSlide,
    onSetActiveSlideToLoop,
    realIndex,
    setActiveSlide,
    swiperRef,
  };
};
