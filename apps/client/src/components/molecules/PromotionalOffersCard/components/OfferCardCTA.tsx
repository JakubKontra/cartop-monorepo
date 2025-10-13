import type { ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';

export interface OfferCardCTAProps extends ComponentPropsWithoutRef<typeof Link> {
  text: string;
}

export const OfferCardCTA = ({ text, ...linkProps }: OfferCardCTAProps) => {
  return (
    <Link
      {...linkProps}
      className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 pointer-events-auto"
    >
      {text}
    </Link>
  );
};
