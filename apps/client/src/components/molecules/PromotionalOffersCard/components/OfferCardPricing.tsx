export interface OfferCardPricingProps {
  currency?: string;
  frequencyText?: string;
  price: number;
}

export const OfferCardPricing = ({
  currency = 'Kč',
  frequencyText = 'Měsíčně od',
  price,
}: OfferCardPricingProps) => {
  return (
    <div className="text-left">
      <div className="font-regular text-gunmetal-700 transition-colors duration-300 group-hover:text-white/70">{frequencyText}</div>
      <div className="text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">
        {price.toLocaleString('cs-CZ')} {currency}
      </div>
    </div>
  );
};
