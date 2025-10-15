export interface OfferCardHeaderProps {
  brandName: string;
  subtitle: string;
  title: string;
}

export const OfferCardHeader = ({ brandName, subtitle, title }: OfferCardHeaderProps) => {
  return (
    <div>
      <h3 className="mb-1 text-xl leading-[120%] font-semibold tracking-[1%] text-gray-900">
        <span className="text-primary">{brandName}</span> <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};
