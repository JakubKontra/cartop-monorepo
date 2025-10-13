'use client';

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-2xl flex-col items-center gap-20 text-center">
        <svg fill="none" viewBox="0 0 750 288" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M187.095 1.031v47.67H68.06l-5.773 60.606a102 102 0 0 1 10.76-6.495c10.761-5.637 24.282-8.425 40.512-8.425 20.541 0 38.103 4.184 52.643 12.602 14.508 8.399 25.599 19.612 33.247 33.634h-.001c7.64 13.754 11.458 28.781 11.458 45.063v4.914c0 16.544-4.075 32.078-12.218 46.584-8.156 14.527-20.129 26.364-35.886 35.513l-.005.002c-15.551 8.923-34.625 13.358-57.175 13.358-21.797 0-40.61-4.31-56.403-12.97l-.006-.004c-15.509-8.644-27.482-20.101-35.89-34.37l-.01-.018c-8.147-14.51-12.22-30.296-12.22-47.34v-.968h53.718v.968c0 9.416 2.102 17.677 6.279 24.812 4.44 7.154 10.481 12.831 18.141 17.036l.721.365c7.49 3.708 16.164 5.575 26.048 5.575 10.698 0 19.846-2.238 27.482-6.672 7.656-4.446 13.446-10.485 17.39-18.127l.006-.011.005-.011c4.195-7.65 6.306-16.431 6.306-26.369 0-9.681-2.109-18.337-6.306-25.991l-.009-.016-.008-.016c-3.947-7.894-9.736-14.053-17.384-18.493l-.016-.01-.016-.01c-7.374-4.67-16.382-7.03-27.072-7.03-8.942 0-17.376 1.737-25.313 5.21-7.944 3.475-14.104 8.047-18.523 13.693l-.291.372H11.206l.097-1.057L25.287 1.912l.081-.88z"
            stroke="#c90932"
            strokeWidth="1.937"
          />
          <path
            d="M401.938 62.108h-89.437c-2.985 0-5.275 2.544-5.275 5.483V206h-56.288v-85.812C250.938 55.388 301.029 3 362.672 3h39.266zM327.938 226.594h89.436c2.99 0 5.275-2.559 5.275-5.505V82h56.289v86.235C478.937 233.358 428.842 286 367.203 286h-39.265zM671.938 62.108h-89.437c-2.985 0-5.275 2.544-5.275 5.483V206h-56.288v-85.812C520.938 55.388 571.029 3 632.672 3h39.266zM597.938 226.594h89.436c2.99 0 5.275-2.559 5.275-5.505V82h56.289v86.235C748.937 233.358 698.842 286 637.203 286h-39.265z"
            stroke="#c90932"
            strokeWidth="2"
          />
        </svg>
        <div>
          <h2 className="mb-4 text-3xl font-semibold text-gunmetal md:text-4xl">
            Něco se <span className="text-primary">pokazilo</span>
          </h2>
          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-primary">Error Details</summary>
              <pre className="mt-2 overflow-x-auto text-xs whitespace-pre-wrap text-gray-600">
                {error.message}
              </pre>
              {error.digest && (
                <p className="mt-1 text-xs text-gray-500">Error ID: {error.digest}</p>
              )}
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
