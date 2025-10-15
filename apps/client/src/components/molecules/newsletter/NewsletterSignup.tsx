'use client';

import { useNewsletterControllerSubscribe } from '@cartop/api-client';
import { emailSchema, newsletterConsentSchema } from '@cartop/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const newsletterSchema = z.object({
  consent: newsletterConsentSchema,
  email: emailSchema,
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const NewsletterSignup = () => {
  const {
    error,
    isError,
    isPending,
    isSuccess,
    mutate: subscribe,
    reset: resetMutation,
  } = useNewsletterControllerSubscribe();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset: resetForm,
  } = useForm<NewsletterFormData>({
    defaultValues: {
      consent: false,
      email: '',
    },
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribe({
      data: {
        consent: data.consent,
        email: data.email,
        source: 'web',
      },
    });
  };

  // Reset form and hide success message after 5 seconds
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      timerRef.current = setTimeout(() => {
        resetMutation();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSuccess, resetForm, resetMutation]);

  return (
    <div className="mb-12 rounded-3xl bg-gray-100 p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
            Chcete dostávat <span className="text-[#c8102e]">TOP nabídky?</span>
          </h2>
          <p className="text-sm text-gray-700 lg:text-base">
            Výběr nejzajímavějších vozů vám zašleme přímo do e-mailu.
          </p>
        </div>
        <div className="flex-1 lg:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <input
                  type="email"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-label="Email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-[#c8102e] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPending}
                  placeholder="Zadejte svůj email"
                />
              </div>
              <button
                className="rounded-lg bg-[#c8102e] px-6 py-3 font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#a00d25] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending}
                type="submit"
              >
                {isPending ? 'Odesílání...' : 'Přihlásit odběr'}
              </button>
            </div>

            {/* Validation errors */}
            {errors.email && 'message' in errors.email ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            ) : null}

            {/* API error message */}
            {isError && error && 'message' in error ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {(error as { message: string }).message}
              </p>
            ) : null}

            {/* Success message */}
            {isSuccess && (
              <p className="mt-3 text-sm text-green-600" role="status">
                Děkujeme! Váš email byl úspěšně přihlášen k odběru.
              </p>
            )}

            {/* Privacy policy notice with consent checkbox */}
            {!isError && !isSuccess && (
              <div className="mt-3">
                <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-0.5 rounded border-gray-300 text-[#c8102e] focus:ring-[#c8102e]"
                  />
                  <span>
                    Přihlášením k odběru souhlasíte s{' '}
                    <Link className="underline hover:text-gray-900" href="/privacy-policy">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.consent && 'message' in errors.consent ? (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.consent.message}
                  </p>
                ) : null}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
