import type { ReactNode } from 'react';

import { OfferCardSpec } from './OfferCardSpec';

export interface OfferCardSpecItem {
  icon: ReactNode;
  label: string;
}

export interface OfferCardSpecsProps {
  specs: OfferCardSpecItem[];
}

export const OfferCardSpecs = ({ specs }: OfferCardSpecsProps) => {
  if (specs.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      {specs.map((spec, index) => (
        <OfferCardSpec key={index} icon={spec.icon} label={spec.label} />
      ))}
    </div>
  );
};
