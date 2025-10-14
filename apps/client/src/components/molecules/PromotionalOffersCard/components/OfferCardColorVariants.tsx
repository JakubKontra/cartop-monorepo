'use client';

export interface OfferCardColorVariantsProps {
  /** Available color variants - hex color codes */
  colorVariants: string[];
  /** Offer ID for tracking */
  offerId: string;
}

export const OfferCardColorVariants = ({ colorVariants, offerId }: OfferCardColorVariantsProps) => {
  const handleColorClick = (e: React.MouseEvent, color: string) => {
    e.preventDefault();
    // TODO: Implement color variant selection
    console.log('Select color:', color, 'for offer:', offerId);
  };

  if (colorVariants.length === 0) return null;

  return (
    <div className="pointer-events-auto flex gap-2">
      {colorVariants.map((color, index) => (
        <button
          key={index}
          className="size-6 rounded-full border-2 border-gray-200 transition-all hover:scale-110 hover:border-primary"
          style={{ backgroundColor: color }}
          type="button"
          onClick={e => handleColorClick(e, color)}
        />
      ))}
    </div>
  );
};
