"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactNode } from "react";
import { useSwiper } from "@/hooks/useSwiper";
import { Autoplay } from "swiper/modules";

interface Props {
	slides: ReactNode[];
	id: string;
}

export const CardsOnRightSwiper = ({ slides, id }: Props) => {
	const { setActiveSlide, swiperRef, onSetActiveSlideToLoop, realIndex } = useSwiper();

	return (
		<div className="relative flex w-full flex-col justify-start sm:!w-[515px] 4xl:!w-[800px] 5xl:!w-[1000px]">
			<div className="mb-[20px] w-full">
				<Swiper
					id={id}
					className="w-full !overflow-visible"
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					grabCursor={true}
					spaceBetween={24}
					slidesPerView="auto"
					centeredSlides={true}
					modules={[Autoplay]}
					autoplay={{
						delay: 3000000,
						disableOnInteraction: false,
					}}
					onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
				>
					{slides.map((slide, index) => {
						const isActive = realIndex === index;
						return (
							<SwiperSlide
								key={index}
								className="max-md:px-4 sm:!w-[515px] 4xl:!w-[800px] 5xl:!w-[1000px]"
								onClick={() => onSetActiveSlideToLoop(index)}
							>
								<div
									className={`${isActive ? "scale-100" : "scale-90 opacity-50"} flex justify-center transition-[scale,opacity] duration-300`}
								>
									{slide}
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{/* <div className="flex items-center justify-center lg:justify-start lg:pl-[26px]">
				<CarouselArrowButton
					onClick={onPrevious}
					className="mr-[16px] rotate-180 border border-base-white text-base-white md:hidden"
				/>
				<div className="flex items-center justify-center lg:w-[273px]">
					<CarouselNavigation
						slides={slides}
						activeSlide={swiperRef.current?.realIndex || 0}
						activeBackgroundColorClassName="!bg-primary-blue"
						backgroundColorClassName="!bg-base-white/30"
					/>
				</div>
				<div className="flex items-center justify-center">
					<CarouselArrowButton
						onClick={onPrevious}
						className="ml-[45px] mr-[16px] rotate-180 border border-base-white text-base-white max-md:hidden"
					/>
					<CarouselArrowButton
						onClick={onNext}
						className="border border-base-white text-base-white max-md:ml-[16px]"
					/>
				</div>
			</div> */}
		</div>
	);
};
