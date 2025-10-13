'use client';

import { useNewsletterControllerSubscribe } from '@cartop/api-client';
import { emailSchema, newsletterConsentSchema } from '@cartop/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const newsletterSchema = z.object({
  email: emailSchema,
  consent: newsletterConsentSchema,
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterSignup() {
  const {
    mutate: subscribe,
    isPending,
    isError,
    isSuccess,
    error,
    reset: resetMutation,
  } = useNewsletterControllerSubscribe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consent: false,
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribe({
      email: data.email,
      consent: data.consent,
      source: 'web',
    });
  };

  // Reset form and hide success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      const timer = setTimeout(() => {
        resetMutation();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, resetForm, resetMutation]);

  return (
    <div className="bg-gray-100 rounded-3xl p-6 lg:p-8 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-2">
            Chcete dostávat <span className="text-[#c8102e]">TOP nabídky?</span>
          </h2>
          <p className="text-gray-700 text-sm lg:text-base">
            Výběr nejzajímavějších vozů vám zašleme přímo do e-mailu.
          </p>
        </div>
        <div className="flex-1 lg:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Zadejte svůj email"
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Email address"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#c8102e] hover:bg-[#a00d25] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Odesílání...' : 'Přihlásit odběr'}
              </button>
            </div>

            {/* Validation errors */}
            {errors.email && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                {errors.email.message}
              </p>
            )}

            {/* API error message */}
            {isError && error && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                {error.message}
              </p>
            )}

            {/* Success message */}
            {isSuccess && (
              <p className="text-green-600 text-sm mt-3" role="status">
                Děkujeme! Váš email byl úspěšně přihlášen k odběru.
              </p>
            )}

            {/* Privacy policy notice with consent checkbox */}
            {!isError && !isSuccess && (
              <div className="mt-3">
                <label className="flex items-start gap-2 text-gray-600 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-0.5 rounded border-gray-300 text-[#c8102e] focus:ring-[#c8102e]"
                  />
                  <span>
                    Přihlášením k odběru souhlasíte s{' '}
                    <Link href="/privacy-policy" className="underline hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-600 text-xs mt-1" role="alert">
                    {errors.consent.message}
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
