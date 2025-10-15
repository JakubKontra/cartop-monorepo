import { Star } from 'lucide-react';
import { ReviewCardProps } from './ReviewsCarousel';

export function ReviewCard({ rating, content, name, date, initials }: ReviewCardProps) {
  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full red stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="size-6 lg:size-8 fill-red-600 text-red-600" />);
    }

    // Half star (half red, half gray)
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative size-6 lg:size-8">
          <Star className="size-6 lg:size-8 fill-gray-300 text-gray-300 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="size-6 lg:size-8 fill-red-600 text-red-600" />
          </div>
        </div>,
      );
    }

    // Empty gray stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="size-6 lg:size-8 fill-gray-300 text-gray-300" />,
      );
    }

    return stars;
  };

  return (
    <div className="border border-french-grey rounded-3xl max-w-2xl overflow-hidden w-full">
      <div className="p-6 lg:p-8">
        {/* Star Rating */}
        <div className="flex gap-1 mb-4 lg:mb-6">{renderStars()}</div>

        {/* Review Content */}
        <p className="text-gunmetal leading-relaxed lg:mb-6 line-clamp-6 sm:line-clamp-4">
          {content}
        </p>
      </div>
      {/* Author Info */}
      <div className="bg-gunmetal-50 rounded-t-3xl p-6 lg:p-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gunmetal-200 border border-gunmetal flex items-center justify-center text-gunmetal font-semibold">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-gunmetal text-lg lg:text-xl">{name}</div>
          <div className="text-sm text-gunmetal">{date}</div>
        </div>
      </div>
    </div>
  );
}
