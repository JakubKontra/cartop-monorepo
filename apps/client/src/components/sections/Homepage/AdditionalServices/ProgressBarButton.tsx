'use client';

import Button from '@/components/atoms/button/Button';
import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';
import { cn } from '@/utils/cv';
import { MoveUpRight } from 'lucide-react';
import type React from 'react';
import { useCallback, useMemo, type HTMLAttributes } from 'react';

interface ProgressBarButtonProps extends HTMLAttributes<HTMLButtonElement> {
  progress: number;
}

export const ProgressBarButton = ({ progress, children, onClick }: ProgressBarButtonProps) => {
  const progressPercentage = useMemo(() => Math.min(Math.max(progress, 0), 1) * 100, [progress]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <>
      {/* Desktop Progress Button */}
      <Button
        variant="progress-button"
        iconPosition="right"
        size="narrow"
        icon={<MoveUpRight className="size-5 relative" />}
        onClick={handleClick}
        className="relative overflow-hidden hidden xl:flex"
      >
        <p className="relative z-10">{children}</p>
        <span
          className={cn(
            'absolute -left-full top-0 z-0 h-full w-full bg-gunmetal-600 transition-transform ease-out',
            progress === 0 ? 'opacity-0' : 'opacity-100',
          )}
          style={{
            transform: `translateX(${progressPercentage}%)`,
            transitionDuration: progress === 0 ? '300ms' : '10ms',
          }}
        />
      </Button>

      {/* Mobile Progress Button */}
      <div className="relative xl:hidden p-2 group">
        <ButtonIcon
          icon={children}
          variant="progress-button"
          className="rounded-full size-10 lg:size-10"
          onClick={handleClick}
        />
        {/* Progress Ring */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8ca1b2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-[stroke-dashoffset] duration-0 group-hover/mobile-progress-bar:duration-300"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
