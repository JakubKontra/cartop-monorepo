'use client';

import { MessageCircleQuestionMark } from 'lucide-react';

import type { ReviewCardProps } from '@/components/molecules/review/ReviewCard';

import { GoogleVerifiedBadge } from '@/components/atoms/GoogleVerifiedBadge';
import Button from '@/components/atoms/button/Button';
import { ReviewsCarousel } from '@/components/organisms/Reviews';

const reviewsData: ReviewCardProps[] = [
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    initials: 'PN',
    name: 'Pavel Novák',
    rating: 5,
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    initials: 'PN',
    name: 'Pavel Novák',
    rating: 4.5,
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    initials: 'PN',
    name: 'Pavel Novák',
    rating: 3.5,
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    initials: 'PN',
    name: 'Pavel Novák',
    rating: 2.2,
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem.',
    date: '17.6. 2025',
    initials: 'PN',
    name: 'Pavel Novák',
    rating: 2,
  },
];

export default function ReviewsSection() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto mb-6 flex max-w-[1360px] flex-col gap-4 px-4 md:mb-8 md:gap-6 lg:flex-row lg:gap-8">
        <h2 className="w-full text-center text-4xl lg:text-left lg:text-5xl">
          <span className="headline-highlight">Proč si lidé</span>
          <br />
          vybírají Cartop?
        </h2>
        <div className="flex items-end max-lg:hidden">
          <GoogleVerifiedBadge />
        </div>
      </div>
      <ReviewsCarousel className="w-full" reviews={reviewsData} />
      <div className="mt-6 flex w-full justify-center md:mt-8 lg:mt-10">
        <Button icon={<MessageCircleQuestionMark className="size-5" />} variant="primary">
          Chci být spokojený zákazník
        </Button>
      </div>
    </div>
  );
}
