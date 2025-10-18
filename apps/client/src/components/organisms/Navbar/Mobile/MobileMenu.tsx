'use client';

import { SearchIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { MobileNavigationItem } from './MobileNavigationItem';
import { NAVIGATION_ITEMS } from '../constants';
import type { MobileMenuProps } from '../types';

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(true);
      return;
    }

    setIsAnimating(false);
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 150); // Match fade-out animation duration
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-40 xl:hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${
          isAnimating ? 'animate-fade-in' : 'animate-fade-out'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`relative flex h-full w-full pt-16 flex-col bg-gunmetal-50 ${
          isAnimating ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        {/* Search Bar */}
        <div className="px-6 py-4 bg-white rounded-b-3xl">
          <form className="flex h-[45px] items-center rounded-[18px] border border-slate-400/60 bg-slate-100/70 px-5 transition focus-within:border-slate-500">
            <input
              aria-label="Hledat"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
              placeholder="Hledat..."
              type="text"
            />
            <button
              aria-label="Hledat"
              className="h-5 w-5 shrink-0 cursor-pointer text-slate-400 transition hover:text-slate-600"
              type="submit"
            >
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map(item => (
              <MobileNavigationItem key={item.href} {...item} onClose={onClose} />
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex gap-3">
            <button
              className="flex h-[45px] w-full items-center justify-center rounded-[16px] bg-cadet-grey font-medium text-white transition-opacity hover:opacity-80"
              type="button"
            >
              <UserIcon className="mr-2 h-5 w-5" />
              Přihlášení
            </button>
            <button
              className="flex h-[45px] w-full items-center justify-center rounded-[16px] border border-cadet-grey font-medium text-cadet-grey transition-colors hover:bg-cadet-grey hover:text-white"
              type="button"
            >
              Registrace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
