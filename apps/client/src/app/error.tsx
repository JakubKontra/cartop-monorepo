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
    <div className="min-h-screen bg-gradient-to-br from-gunmetal via-black to-gunmetal flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary animate-pulse">500</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 rounded-full p-6 animate-pulse">
            <ServerCrash className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-4">Something Went Wrong</h2>
        <p className="text-cadet-grey text-lg md:text-xl mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Please try again or contact support if the problem
          persists.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 max-w-lg mx-auto">
            <details className="bg-gunmetal/50 border border-primary/20 rounded-lg p-4 text-left">
              <summary className="text-primary font-semibold cursor-pointer hover:text-primary/80 transition-colors">
                Error Details
              </summary>
              <pre className="mt-4 text-sm text-cadet-grey overflow-x-auto whitespace-pre-wrap break-words">
                {error.message}
              </pre>
              {error.digest && (
                <p className="mt-2 text-xs text-french-grey">Error ID: {error.digest}</p>
              )}
            </details>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            Go Home
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
