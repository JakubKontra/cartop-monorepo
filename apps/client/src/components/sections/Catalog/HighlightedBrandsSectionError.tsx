'use client';

import { useState, useTransition } from 'react';

import { revalidateCatalogCacheAction } from '@/lib/actions/catalog.actions';

interface HighlightedBrandsSectionErrorProps {
  error: Error;
  reset: () => void;
}

export const HighlightedBrandsSectionError = ({
  error,
  reset,
}: HighlightedBrandsSectionErrorProps) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<null | string>(null);

  const handleRetry = async () => {
    setMessage(null);

    startTransition(async () => {
      // First try to revalidate cache using server action
      const result = await revalidateCatalogCacheAction();

      if (result.success) {
        setMessage('Cache byl obnoven, zkouším načíst data znovu...');
        // Then reset the error boundary
        setTimeout(() => {
          reset();
        }, 500);
      } else {
        setMessage(result.message);
        // Still try to reset after showing message
        setTimeout(() => {
          reset();
        }, 1500);
      }
    });
  };

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
      <div className="mb-4 text-5xl">⚠️</div>
      <h3 className="mb-2 text-xl font-semibold text-gunmetal">
        Nepodařilo se načíst oblíbené značky
      </h3>
      <p className="mb-6 max-w-md text-sm text-gunmetal-800">
        {error.message || 'Došlo k chybě při načítání dat. Zkuste to prosím později.'}
      </p>

      {/* Success/Info Message */}
      {message && <p className="mb-4 max-w-md text-sm text-green-600">{message}</p>}

      {/* Retry Button */}
      <button
        className="rounded-xl border border-primary bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
        onClick={handleRetry}
      >
        {isPending ? 'Zkouším znovu...' : 'Zkusit znovu'}
      </button>
    </div>
  );
};
