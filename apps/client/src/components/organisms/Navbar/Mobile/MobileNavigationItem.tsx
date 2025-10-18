'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { MobileAccordion } from './MobileAccordion';
import { recommendedLinks, selectionLinks, brandLinks, categoryLinks } from '../constants';
import type { NavigationItemProps } from '../types';

export const MobileNavigationItem: React.FC<NavigationItemProps> = ({
  href,
  label,
  hasDropdown,
  onClose,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());

  const handleAccordionToggle = (title: string) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (hasDropdown) {
    return (
      <li>
        <div className="border-b border-slate-200">
          <button
            className="flex w-full items-center justify-between py-4 text-left text-xl font-medium text-gunmetal transition hover:text-slate-900"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            type="button"
          >
            <span>{label}</span>
            <span
              className={`text-slate-400 transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`}
            >
              ▾
            </span>
          </button>
          {isAccordionOpen && (
            <div className="pb-4">
              <div className="space-y-4">
                <MobileAccordion
                  title="Doporučené"
                  links={recommendedLinks}
                  isOpen={openAccordions.has('Doporučené')}
                  onToggle={() => handleAccordionToggle('Doporučené')}
                  onLinkClick={handleLinkClick}
                />
                <MobileAccordion
                  title="Náš výběr"
                  links={selectionLinks}
                  isOpen={openAccordions.has('Náš výběr')}
                  onToggle={() => handleAccordionToggle('Náš výběr')}
                  onLinkClick={handleLinkClick}
                />
                <MobileAccordion
                  title="Značky"
                  links={brandLinks}
                  isOpen={openAccordions.has('Značky')}
                  onToggle={() => handleAccordionToggle('Značky')}
                  onLinkClick={handleLinkClick}
                />
                <MobileAccordion
                  title="Kategorie"
                  links={categoryLinks}
                  isOpen={openAccordions.has('Kategorie')}
                  onToggle={() => handleAccordionToggle('Kategorie')}
                  onLinkClick={handleLinkClick}
                />
              </div>
            </div>
          )}
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        className="block py-4 text-xl font-medium text-gunmetal transition hover:text-slate-900"
        href={href}
        onClick={handleLinkClick}
      >
        {label}
      </Link>
    </li>
  );
};
