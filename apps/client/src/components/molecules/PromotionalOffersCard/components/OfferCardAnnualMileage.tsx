export interface OfferCardAnnualMileageProps {
  label?: string;
  mileage: string;
}

export const OfferCardAnnualMileage = ({
  label = 'Roční nájezd',
  mileage,
}: OfferCardAnnualMileageProps) => {
  return (
    <div className="rounded-lg text-left">
      <div className="font-regular text-gunmetal-700 transition-colors duration-300 group-hover:text-white/70">{label}</div>
      <div className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">{mileage}</div>
    </div>
  );
};
