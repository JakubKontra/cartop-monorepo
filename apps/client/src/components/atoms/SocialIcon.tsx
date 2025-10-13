import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SocialIconProps {
  href: string;
  icon: LucideIcon | (() => JSX.Element);
  label: string;
  className?: string;
}

export function SocialIcon({ href, icon: Icon, label, className = '' }: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-300 transition-colors hover:text-white ${className}`}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}
