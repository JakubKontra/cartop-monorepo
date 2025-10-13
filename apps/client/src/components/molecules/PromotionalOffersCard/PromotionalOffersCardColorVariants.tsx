'use client';

type PromotionalOffersCardColorVariantsProps = {
  /** Available color variants - hex color codes */
  colorVariants: string[];
  /** Offer ID for tracking */
  offerId: string;
};

export const PromotionalOffersCardColorVariants = ({
  colorVariants,
  offerId,
}: PromotionalOffersCardColorVariantsProps) => {
  const handleColorClick = (e: React.MouseEvent, color: string) => {
    e.preventDefault();
    // TODO: Implement color variant selection
    console.log('Select color:', color, 'for offer:', offerId);
  };

  if (colorVariants.length === 0) return null;

  return (
    <div className="mb-4 flex gap-2">
      {colorVariants.map((color, index) => (
        <button
          key={index}
          className="size-6 rounded-full border-2 border-gray-200 transition-all hover:scale-110 hover:border-primary"
          onClick={e => handleColorClick(e, color)}
          style={{ backgroundColor: color }}
          type="button"
        />
      ))}
    </div>
  );
};
