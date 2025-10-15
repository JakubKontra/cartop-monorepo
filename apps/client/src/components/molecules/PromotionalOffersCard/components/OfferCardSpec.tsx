import type { ReactNode } from 'react';

export interface OfferCardSpecProps {
  className?: string;
  icon: ReactNode;
  label: string;
}

export const OfferCardSpec = ({ className = '', icon, label }: OfferCardSpecProps) => {
  return (
    <div className={`flex items-center gap-1.5 text-[#262D37] ${className}`}>
      {icon}
      <span className="text-sm leading-[120%] font-semibold tracking-[1%]">{label}</span>
    </div>
  );
};
