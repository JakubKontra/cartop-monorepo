'use client';

import { LogIn, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { SearchForm } from '@/components/organisms/Navbar/Actions';
import { MobileNavigationItem } from '@/components/organisms/Navbar/Mobile/MobileNavigationItem';
import { NAVIGATION_ITEMS } from '@/components/organisms/Navbar/constants';
import type { MobileMenuProps } from '@/components/organisms/Navbar/types';
import Button from '@/components/atoms/button/Button';

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
          <SearchForm />
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
          <div className="flex justify-center gap-3">
            <Button variant="primary" icon={<LogIn className="h-5 w-5" />}>
              Přihlášení
            </Button>
            <Button variant="secondary" icon={<UserPlus className="h-5 w-5" />}>
              Registrace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
