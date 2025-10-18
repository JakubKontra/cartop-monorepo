'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { MobileAccordion } from './MobileAccordion';
import { recommendedLinks, selectionLinks, brandLinks, categoryLinks } from '../constants';
import type { NavigationItemProps } from '../types';
import { ChevronDown } from 'lucide-react';

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
        <div className="border-b border-gunmetal-100">
          <button
            className="flex w-full items-center justify-between py-4 text-left text-xl font-medium text-gunmetal transition hover:text-slate-900"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            type="button"
          >
            <span>{label}</span>
            <ChevronDown
              className={`text-primary transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isAccordionOpen && (
            <div className="pb-4 border-t border-gunmetal-100">
              <div className="space-y-2">
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
    <li className="border-b border-gunmetal-100">
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
