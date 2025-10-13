'use client';

import { useState } from 'react';

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error - This is a simulated 500 error for testing purposes');
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-bold text-gunmetal">Test Error Page</h1>
        <p className="mb-8 text-gray-600">
          Click the button below to trigger a 500 error and see the error page
        </p>
        <button
          className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90"
          type="button"
          onClick={() => setShouldError(true)}
        >
          Trigger 500 Error
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Navigate to: <code className="rounded bg-gray-100 px-2 py-1">/test-error</code>
        </p>
      </div>
    </div>
  );
}
