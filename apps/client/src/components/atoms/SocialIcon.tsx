import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

interface SocialIconProps {
  className?: string;
  href: string;
  icon: (() => JSX.Element) | LucideIcon;
  label: string;
}

export const SocialIcon = ({ className = '', href, icon: Icon, label }: SocialIconProps) => {
  return (
    <Link
      aria-label={label}
      className={`text-gray-300 transition-colors hover:text-white ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
};
