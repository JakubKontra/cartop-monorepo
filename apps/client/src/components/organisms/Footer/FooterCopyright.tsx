import Link from 'next/link';

import { SocialMediaLinks } from '../../molecules/SocialMediaLinks';

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-12 border-t border-gray-600 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6 text-sm text-white">
          <p>&copy; {currentYear} Cartop.cz. Všechna práva vyhrazena.</p>
          <Link
            className="transition-colors text-xs text-gunmetal-200 underline hover:no-underline"
            href="/privacy-policy"
          >
            Všeobecné obchodní podmínky
          </Link>
          <Link
            className="transition-colors text-xs text-gunmetal-200 underline hover:no-underline"
            href="/terms-of-service"
          >
            Nakládání s osobními údaji
          </Link>
          <Link
            className="transition-colors text-xs text-gunmetal-200 underline hover:no-underline"
            href="/terms-of-service"
          >
            Nakládání s cookies
          </Link>
        </div>
        <SocialMediaLinks />
      </div>
    </div>
  );
};
