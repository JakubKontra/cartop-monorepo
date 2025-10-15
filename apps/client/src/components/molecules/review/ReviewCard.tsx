import { ReviewStars } from './ReviewStars';

export interface ReviewCardProps {
  content: string;
  date: string;
  initials: string;
  name: string;
  rating: number;
}

export const ReviewCard = ({ content, date, initials, name, rating }: ReviewCardProps) => (
  <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-french-grey">
    <div className="p-4 sm:p-6 md:p-8">
      {/* Star Rating */}
      <div className="mb-3 md:mb-4 lg:mb-6">
        <ReviewStars rating={rating} />
      </div>

      {/* Review Content */}
      <p className="line-clamp-6 leading-relaxed text-gunmetal sm:line-clamp-4 lg:mb-6">
        {content}
      </p>
    </div>
    {/* Author Info */}
    <div className="flex items-center gap-3 rounded-t-3xl bg-gunmetal-50 p-4 sm:p-6 md:gap-4 md:p-8">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gunmetal bg-gunmetal-200 font-semibold text-gunmetal">
        {initials}
      </div>
      <div>
        <div className="text-lg font-semibold text-gunmetal lg:text-xl">{name}</div>
        <div className="text-sm text-gunmetal">{date}</div>
      </div>
    </div>
  </div>
);
