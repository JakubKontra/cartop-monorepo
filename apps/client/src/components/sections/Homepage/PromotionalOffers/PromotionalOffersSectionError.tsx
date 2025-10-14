'use client';

import { useState, useTransition } from 'react';

import { SectionHeader } from '@/components/sections/Homepage/SectionHeader';
import { revalidatePromotionalOffersCacheAction } from '@/lib/actions/promotional-offers.actions';

interface PromotionalOffersSectionErrorProps {
  error: Error;
  reset: () => void;
}

export const PromotionalOffersSectionError = ({
  error,
  reset,
}: PromotionalOffersSectionErrorProps) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleRetry = async () => {
    setMessage(null);

    startTransition(async () => {
      // First try to revalidate cache using server action
      const result = await revalidatePromotionalOffersCacheAction();

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
    <section className="bg-gunmetal px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader
          highlightedWord="Akční"
          remainingTitle="vozy"
          subtitle="Vyberte si z našich top možností a jeďěte výhodněji."
          variant="light"
        />

        {/* Error State */}
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="mb-4 text-5xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-white">
            Nepodařilo se načíst akční nabídky
          </h3>
          <p className="mb-6 max-w-md text-sm text-gray-300">
            {error.message || 'Došlo k chybě při načítání dat. Zkuste to prosím později.'}
          </p>

          {/* Success/Info Message */}
          {message && <p className="mb-4 max-w-md text-sm text-green-300">{message}</p>}

          {/* Retry Button */}
          <button
            className="rounded-xl border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending}
            onClick={handleRetry}
          >
            {isPending ? 'Zkouším znovu...' : 'Zkusit znovu'}
          </button>
        </div>
      </div>
    </section>
  );
};
