'use client';

import { useState } from 'react';

import Image from 'next/image';

type ImageType = {
  url: string;
  alt?: string;
};

export interface OfferCardCarouselProps {
  images: ImageType[];
  title: string;
}

export const OfferCardCarousel = ({ images, title }: OfferCardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        <span>No image</span>
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToIndex = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative h-full w-full">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          key={currentImage.url}
          alt={currentImage.alt || title}
          className="animate-fade-in object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={currentImage.url}
        />
      </div>

      {/* Navigation Arrows - only show if more than 1 image and on hover */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 pointer-events-none backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 group-hover:pointer-events-auto"
            onClick={goToPrevious}
            type="button"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 pointer-events-none backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 group-hover:pointer-events-auto"
            onClick={goToNext}
            type="button"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {images.map((_, index) => (
              <button
                key={index}
                className={`size-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-white' : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={e => goToIndex(e, index)}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Export with legacy name for backward compatibility
export const PromotionalOffersCardCarousel = OfferCardCarousel;
export type PromotionalOffersCardCarouselProps = OfferCardCarouselProps;
