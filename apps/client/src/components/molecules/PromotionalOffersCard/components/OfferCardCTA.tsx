import type { ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';

export interface OfferCardCTAProps extends ComponentPropsWithoutRef<typeof Link> {
  text: string;
}

export const OfferCardCTA = ({ text, ...linkProps }: OfferCardCTAProps) => {
  return (
    <Link
      {...linkProps}
      className="pointer-events-auto flex max-h-[56px] w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-sm leading-[160%] font-normal tracking-[0] text-white transition-colors hover:bg-primary/90"
    >
      {text}
    </Link>
  );
};
