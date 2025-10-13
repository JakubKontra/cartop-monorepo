export interface OfferCardHeaderProps {
  brandName: string;
  subtitle: string;
  title: string;
}

export const OfferCardHeader = ({ brandName, subtitle, title }: OfferCardHeaderProps) => {
  return (
    <div>
      <h3 className="mb-1 text-lg text-gray-900">
        <span className="font-semibold text-primary">{brandName}</span>{' '}
        <span className="font-bold">{title}</span>
      </h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};
