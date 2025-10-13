'use client';

import { Scale, Star } from 'lucide-react';

export interface OfferCardActionsProps {
  /** Offer ID for tracking */
  offerId: string;
  /** Show compare icon */
  shouldShowCompare?: boolean;
  /** Show favorite icon */
  shouldShowFavorite?: boolean;
}

export const OfferCardActions = ({
  offerId,
  shouldShowCompare = true,
  shouldShowFavorite = true,
}: OfferCardActionsProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement favorite functionality
    console.log('Add to favorites:', offerId);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement compare functionality
    console.log('Add to compare:', offerId);
  };

  const glassButtonStyles =
    'flex size-8 cursor-pointer items-center justify-center rounded-full ' +
    'bg-white/30 text-gray-700 backdrop-blur-md ' +
    'shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ' +
    'border border-white/20 ' +
    'transition-all duration-300 ' +
    'hover:bg-white/50 hover:text-primary hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:scale-110 ' +
    'active:scale-95';

  return (
    <div className="absolute top-3 right-3 flex gap-2">
      {shouldShowFavorite && (
        <button className={glassButtonStyles} type="button" onClick={handleFavoriteClick}>
          <Star className="size-4" />
        </button>
      )}
      {shouldShowCompare && (
        <button className={glassButtonStyles} type="button" onClick={handleCompareClick}>
          <Scale className="size-4" />
        </button>
      )}
    </div>
  );
};
