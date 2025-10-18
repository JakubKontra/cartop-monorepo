'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

import { Logo } from '@/components/branding/Logo';

import { ActionButtons, MobileMenu, NavigationMenu } from './';

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
      <header className="section-container bg-white py-2 lg:py-4 sticky top-0 z-50">
        <nav className="flex h-16 items-center justify-between gap-6 px-4 lg:px-8">
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
