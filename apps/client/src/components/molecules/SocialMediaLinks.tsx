import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

import { SocialIcon } from '../atoms/SocialIcon';

// Custom X/Twitter icon since lucide-react's Twitter icon might be outdated
const XIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const SocialMediaLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <SocialIcon
        className="text-white hover:underline"
        href="https://facebook.com/cartop.cz"
        icon={Facebook}
        label="Facebook"
      />
      <SocialIcon href="https://instagram.com/cartop.cz" icon={Instagram} label="Instagram" />
      <SocialIcon href="https://x.com/cartop.cz" icon={XIcon} label="X (Twitter)" />
    </div>
  );
};
