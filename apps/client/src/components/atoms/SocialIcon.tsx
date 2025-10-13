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
      className={`text-gray-300 hover:text-white transition-colors ${className}`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
