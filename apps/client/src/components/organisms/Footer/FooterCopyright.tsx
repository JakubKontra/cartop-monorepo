import Link from 'next/link';

import { SocialMediaLinks } from '../../molecules/SocialMediaLinks';

export const FooterCopyright = () => {
  return (
    <div className="mt-12 border-t border-gray-600 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm text-white">
          <p>© 2025 Cartop. All rights reserved.</p>
          <Link className="transition-colors hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="transition-colors hover:underline" href="/terms-of-service">
            Terms of Service
          </Link>
        </div>
        <SocialMediaLinks />
      </div>
    </div>
  );
};
