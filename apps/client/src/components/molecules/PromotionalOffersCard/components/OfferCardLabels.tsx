import type { LabelVariant } from '@/components/atoms/Label';

import { Label } from '@/components/atoms/Label';

export type OfferCardLabelsPosition = 'top-left' | 'top-right';

export type OfferCardLabel = {
  text: string;
  variant?: LabelVariant;
};

export interface OfferCardLabelsProps {
  defaultVariant?: LabelVariant;
  labels: (OfferCardLabel | string)[];
  position?: OfferCardLabelsPosition;
}

const positionStyles: Record<OfferCardLabelsPosition, string> = {
  'top-left': 'left-3 top-3',
  'top-right': 'right-3 top-3 pr-[90px]',
};

export const OfferCardLabels = ({
  defaultVariant = 'light',
  labels,
  position = 'top-right',
}: OfferCardLabelsProps) => {
  if (labels.length === 0) return null;

  return (
    <div
      className={`absolute top-3 left-3 flex flex-wrap items-start justify-start gap-1.5 ${positionStyles[position]}`}
    >
      {labels.map((label, index) => {
        // Support both string and object format
        const labelText = typeof label === 'string' ? label : label.text;
        const labelVariant =
          typeof label === 'string' ? defaultVariant : label.variant || defaultVariant;

        return (
          <Label key={index} variant={labelVariant}>
            {labelText}
          </Label>
        );
      })}
    </div>
  );
};
