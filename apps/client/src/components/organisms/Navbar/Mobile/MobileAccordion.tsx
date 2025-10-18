import Link from 'next/link';

import type { MobileAccordionProps } from '../types';

export const MobileAccordion: React.FC<MobileAccordionProps> = ({
  title,
  links,
  isOpen,
  onToggle,
  onLinkClick,
}) => (
  <div className="border-b border-slate-200">
    <button
      className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-gunmetal transition hover:text-slate-900"
      onClick={onToggle}
      type="button"
    >
      <span>{title}</span>
      <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
    </button>
    {isOpen && (
      <div className="pb-4">
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.href}>
              <Link
                className="block py-2 text-sm text-gunmetal-600 transition hover:text-primary"
                href={link.href}
                onClick={onLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
