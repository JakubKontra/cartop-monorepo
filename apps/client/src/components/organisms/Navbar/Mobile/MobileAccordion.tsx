import Link from 'next/link';

import type { MobileAccordionProps } from '../types';
import { ChevronDown } from 'lucide-react';

export const MobileAccordion: React.FC<MobileAccordionProps> = ({
  title,
  links,
  isOpen,
  onToggle,
  onLinkClick,
}) => (
  <div>
    <button
      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-gunmetal transition hover:text-slate-900"
      onClick={onToggle}
      type="button"
    >
      <span>{title}</span>
      <span className="flex items-center justify-center size-5 mx-0.5 bg-primary rounded-full">
        <ChevronDown className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </span>
    </button>
    {isOpen && (
      <div className="pb-2">
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.href}>
              <Link
                className="block py-2 text-sm text-gunmetal underline"
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
