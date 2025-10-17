'use client';

import { MessageCircleQuestionMark } from 'lucide-react';

import type { ReviewCardProps } from '@/components/molecules/review/ReviewCard';

import { GoogleVerifiedBadge } from '@/components/atoms/GoogleVerifiedBadge';
import Button from '@/components/atoms/button/Button';
import { ReviewsCarousel } from '@/components/organisms/Reviews';
import { SectionHeader } from '../SectionHeader';

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
    <section className="flex flex-col items-center py-20">
      <SectionHeader
        highlightedWord="Proč si lidé"
        remainingTitle="vybírají Cartop?"
        subtitle="Proč si lidé vybírají Cartop?"
        rightSideContent={
          <div className="flex items-end">
            <GoogleVerifiedBadge />
          </div>
        }
        className="section-container"
      />
      <ReviewsCarousel className="w-full" reviews={reviewsData} />
      <div className="mt-6 flex w-full justify-center md:mt-8 lg:mt-10">
        <Button icon={<MessageCircleQuestionMark className="size-5" />} variant="primary">
          Chci být spokojený zákazník
        </Button>
      </div>
    </section>
  );
}
