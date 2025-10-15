import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  size?: 'lg' | 'md' | 'sm';
}

export const ReviewStars = ({ rating, size = 'md' }: ReviewStarsProps) => {
  const sizeClasses = {
    lg: 'size-8 lg:size-10',
    md: 'size-6 lg:size-8',
    sm: 'size-5',
  };

  const starSize = sizeClasses[size];

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full red stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`${starSize} fill-red-600 text-red-600`} />);
    }

    // Half star (half red, half gray)
    if (hasHalfStar) {
      stars.push(
        <div key="half" className={`relative ${starSize}`}>
          <Star className={`${starSize} absolute fill-gray-300 text-gray-300`} />
          <div className="absolute w-1/2 overflow-hidden">
            <Star className={`${starSize} fill-red-600 text-red-600`} />
          </div>
        </div>,
      );
    }

    // Empty gray stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${starSize} fill-gray-300 text-gray-300`} />);
    }

    return stars;
  };

  return <div className="flex gap-1">{renderStars()}</div>;
};
