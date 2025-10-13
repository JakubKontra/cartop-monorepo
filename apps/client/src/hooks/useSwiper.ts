import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";

export const useSwiper = () => {
	const [activeSlide, setActiveSlide] = useState(0);

	const swiperRef = useRef<SwiperType | null>(null);

	const slidesLength = swiperRef.current?.slides?.length || 0;

	const realIndex = swiperRef.current?.realIndex || 0;

	const onPrevious = () => {
		if (swiperRef.current) {
			const newSlideIndex = Math.max((realIndex - 1) % slidesLength, 0); // Ensure it doesn't go below 0
			setActiveSlide(newSlideIndex);
			swiperRef.current.slidePrev();
		}
	};

	const onNext = () => {
		if (swiperRef.current) {
			const newSlideIndex = Math.min((realIndex + 1) % slidesLength, slidesLength); // Ensure it doesn't exceed the number of slides
			setActiveSlide(newSlideIndex);
			swiperRef.current.slideNext();
		}
	};

	const onSetActiveSlide = (index: number) => {
		if (swiperRef.current) {
			const newSlideIndex = Math.min(index % slidesLength, slidesLength);
			setActiveSlide(newSlideIndex);
			swiperRef.current.slideTo(newSlideIndex);
		}
	};

	const onSetActiveSlideToLoop = (index: number) => {
		setActiveSlide(index);
		swiperRef.current?.slideToLoop(index);
	};

	const isFirst = 0 === activeSlide;
	const isLast = (swiperRef.current?.slides?.length || 0) - 1 === activeSlide;

	return {
		activeSlide,
		realIndex,
		setActiveSlide,
		onNext,
		onPrevious,
		swiperRef,
		isFirst,
		isLast,
		onSetActiveSlide,
		onSetActiveSlideToLoop,
	};
};
