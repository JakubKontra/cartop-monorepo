import { Badge } from '@/components/atoms/Badge';

export interface OfferCardBadgeProps {
  className?: string;
  text?: string;
}

export const OfferCardBadge = ({ className, text }: OfferCardBadgeProps) => {
  if (!text) return null;

  return (
    <div className={`${className || ''}`}>
      <Badge variant="primary">{text}</Badge>
    </div>
  );
};
