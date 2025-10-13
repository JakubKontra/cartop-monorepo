import type { ReactNode } from 'react';

export interface OfferCardSpecProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export const OfferCardSpec = ({ className = '', icon, label }: OfferCardSpecProps) => {
  return (
    <div className={`flex items-center gap-1.5 text-[#262D37] ${className}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};
