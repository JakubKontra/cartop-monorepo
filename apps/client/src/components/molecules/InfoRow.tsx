import type { ReactNode } from 'react';

interface InfoRowProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}

export const InfoRow = ({ children, icon, title }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-gunmetal-100 text-gray-800">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-xs leading-[160%] font-normal tracking-[0.01em] text-gunmetal-700">
        {title}
      </p>
      <div className="text-sm leading-[160%] font-semibold tracking-[0.01em] text-gunmetal">
        {children}
      </div>
    </div>
  </div>
);
