'use client';

import React, { useEffect, useState } from 'react';

import { SubmenuColumn } from './SubmenuColumn';
import { recommendedLinks, selectionLinks, brandLinks, categoryLinks } from '../constants';
import type { SubmenuProps } from '../types';

export const Submenu: React.FC<SubmenuProps> = ({ isVisible, onMouseLeave }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsAnimating(true);
      return;
    }

    setIsAnimating(false);
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 150); // Match fade-out animation duration
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`absolute top-28 left-1/2 -translate-x-1/2 w-full z-40 max-w-4xl mx-auto ${
        isAnimating ? 'animate-fade-in' : 'animate-fade-out'
      }`}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-4 gap-8 bg-white rounded-lg shadow-lg border border-slate-200 p-6">
        <SubmenuColumn title="Doporučené" links={recommendedLinks} />
        <SubmenuColumn title="Náš výběr" links={selectionLinks} />
        <SubmenuColumn title="Značky" links={brandLinks} />
        <SubmenuColumn title="Kategorie" links={categoryLinks} />
      </div>
    </div>
  );
};
