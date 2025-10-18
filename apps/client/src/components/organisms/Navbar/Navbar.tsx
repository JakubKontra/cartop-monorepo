'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

import { Logo } from '@/components/branding/Logo';

import { ActionButtons, MobileMenu, NavigationMenu } from './';
import { cn } from '@cartop/ui-utils';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      disableBodyScroll(mobileMenuRef.current);
    } else if (mobileMenuRef.current) {
      enableBodyScroll(mobileMenuRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (mobileMenuRef.current) {
        enableBodyScroll(mobileMenuRef.current);
      }
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'section-container bg-whit py-2 lg:py-4 sticky top-0 z-50 px-4',
          isMobileMenuOpen && 'max-lg:bg-white',
        )}
      >
        <nav className="flex h-16 items-center justify-between gap-6 pl-4 pr-2 lg:px-4 lg:mx-4 glass-background rounded-2xl">
          <Link aria-label="Cartop — home" className="shrink-0 select-none" href="/">
            <Logo className="text-primary" />
          </Link>

          <NavigationMenu />
          <ActionButtons
            onMobileMenuToggle={handleMobileMenuToggle}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </nav>
      </header>
      <div ref={mobileMenuRef}>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
      </div>
    </>
  );
};

export default Navbar;
