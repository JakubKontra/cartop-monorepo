'use client';

import { ServerCrash, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gunmetal via-black to-gunmetal px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="animate-pulse text-9xl font-bold text-primary md:text-[12rem]">500</h1>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="animate-pulse rounded-full bg-primary/10 p-6">
            <ServerCrash className="h-16 w-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">Something Went Wrong</h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-cadet-grey md:text-xl">
          We encountered an unexpected error. Please try again or contact support if the problem
          persists.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mx-auto mb-8 max-w-lg">
            <details className="rounded-lg border border-primary/20 bg-gunmetal/50 p-4 text-left">
              <summary className="cursor-pointer font-semibold text-primary transition-colors hover:text-primary/80">
                Error Details
              </summary>
              <pre className="mt-4 overflow-x-auto text-sm break-words whitespace-pre-wrap text-cadet-grey">
                {error.message}
              </pre>
              {error.digest && (
                <p className="mt-2 text-xs text-french-grey">Error ID: {error.digest}</p>
              )}
            </details>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
          >
            Go Home
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
