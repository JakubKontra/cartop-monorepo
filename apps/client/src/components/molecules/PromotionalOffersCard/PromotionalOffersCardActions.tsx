'use client';

type PromotionalOffersCardActionsProps = {
  /** Show favorite icon */
  showFavorite?: boolean;
  /** Show compare icon */
  showCompare?: boolean;
  /** Offer ID for tracking */
  offerId: string;
};

export const PromotionalOffersCardActions = ({
  offerId,
  showCompare = true,
  showFavorite = true,
}: PromotionalOffersCardActionsProps) => {
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

  return (
    <div className="absolute bottom-3 right-3 flex gap-2">
      {showFavorite && (
        <button
          className="flex size-10 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary"
          onClick={handleFavoriteClick}
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
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      )}
      {showCompare && (
        <button
          className="flex size-10 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary"
          onClick={handleCompareClick}
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
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
