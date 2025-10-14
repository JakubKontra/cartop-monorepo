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
      <span className="text-sm font-semibold leading-[120%] tracking-[1%]">{label}</span>
    </div>
  );
};
