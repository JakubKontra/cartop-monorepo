import Link from 'next/link';

import { SocialMediaLinks } from '../../molecules/SocialMediaLinks';

export function FooterCopyright() {
  return (
    <div className="mt-12 border-t border-gray-600 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm text-white">
          <p>© 2025 Cartop. All rights reserved.</p>
          <Link href="/privacy-policy" className="transition-colors hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition-colors hover:underline">
            Terms of Service
          </Link>
        </div>
        <SocialMediaLinks />
      </div>
    </div>
  );
}
