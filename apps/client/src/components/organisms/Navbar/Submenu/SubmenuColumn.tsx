import Link from 'next/link';

import type { SubmenuColumnProps } from '../types';
import { cn } from '@/utils/cv';

export const SubmenuColumn: React.FC<SubmenuColumnProps> = ({ title, links }) => (
  <div className="flex flex-col">
    <h3 className="mb-4 text-sm font-semibold text-gunmetal">{title}</h3>
    <ul className="flex flex-col gap-2">
      {links.map(link => {
        const isViewAll = link.label === 'Zobrazit vše';
        return (
          <li key={link.href} className={isViewAll ? 'pt-2' : ''}>
            <Link
              href={link.href}
              className={cn(
                'text-gunmetal text-sm transition-colors hover:underline',
                isViewAll && 'underline',
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);
