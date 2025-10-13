import { cn } from '@/utils/cv';

interface ChoiceTileSkeletonProps {
  className?: string;
  count?: number;
}

export const ChoiceTileSkeleton = ({ className, count = 1 }: ChoiceTileSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4',
            'animate-pulse',
            className,
          )}
        >
          {/* Leading skeleton (icon placeholder) */}
          <div className="size-16 shrink-0 rounded-xl bg-gray-200" />

          {/* Content skeleton */}
          <div className="flex flex-1 flex-col justify-center gap-2">
            {/* Title skeleton */}
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </>
  );
};
