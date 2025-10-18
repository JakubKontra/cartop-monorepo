'use client';
import { MenuIcon, ScaleIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

import { Logo } from '@/components/branding/Logo';

// Constants
const NAVIGATION_ITEMS = [
  {
    href: '#offers',
    label: 'Všechny nabídky',
    hasDropdown: true,
  },
  {
    href: '#how',
    label: 'Jak to funguje?',
    hasDropdown: false,
  },
  {
    href: '/contacts',
    label: 'Kontakt',
    hasDropdown: false,
  },
] as const;

const ACTION_BUTTONS = [
  {
    icon: ScaleIcon,
    label: 'Porovnat',
    className: 'bg-cadet-grey',
  },
  {
    icon: UserIcon,
    label: 'Přihlásit se',
    className: 'bg-cadet-grey',
  },
] as const;

// Types
interface NavigationItemProps {
  href: string;
  label: string;
  hasDropdown: boolean;
}

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Components
const NavigationItem: React.FC<NavigationItemProps> = ({ href, label, hasDropdown }) => (
  <li>
    <Link className="inline-flex items-center gap-1 transition hover:text-slate-900" href={href}>
      <span>{label}</span>
      {hasDropdown && <span className="text-slate-400">▾</span>}
    </Link>
  </li>
);

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, className }) => (
  <button
    aria-label={label}
    className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 active:opacity-60 ${className}`}
    type="button"
  >
    <Icon className="h-5 w-5 text-white" />
  </button>
);

const MobileNavigationItem: React.FC<NavigationItemProps> = ({ href, label, hasDropdown }) => (
  <li>
    <Link
      className="block py-4 text-xl font-medium text-gunmetal transition hover:text-slate-900"
      href={href}
    >
      {label}
      {hasDropdown && <span className="ml-2 text-slate-400">▾</span>}
    </Link>
  </li>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 xl:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="relative flex h-full w-full pt-16 flex-col bg-white animate-fade-in">
        {/* Navigation */}
        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map(item => (
              <MobileNavigationItem key={item.href} {...item} />
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <button
              className="flex h-[45px] flex-1 items-center justify-center rounded-[16px] bg-cadet-grey font-medium text-white transition-opacity hover:opacity-80"
              type="button"
            >
              <UserIcon className="mr-2 h-5 w-5" />
              Přihlásit se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchForm: React.FC = () => (
  <form
    className="hidden h-[45px] w-[282px] items-center rounded-[18px] border border-slate-400/60 bg-slate-100/70 px-5 transition focus-within:border-slate-500 xl:flex"
    role="search"
  >
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
);

const NavigationMenu: React.FC = () => (
  <ul
    className="font-sora hidden flex-grow items-center justify-center gap-10 text-base leading-[160%] font-normal tracking-[0.01em] text-gunmetal xl:flex"
    role="menubar"
    aria-label="Hlavní navigace"
  >
    {NAVIGATION_ITEMS.map(item => (
      <NavigationItem key={item.href} {...item} />
    ))}
  </ul>
);

interface ActionButtonsProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => (
  <div className="flex items-center gap-2" role="toolbar" aria-label="Akční tlačítka">
    <SearchForm />

    {/* Scale Button - Always visible */}
    <ActionButton {...ACTION_BUTTONS[0]} />

    {/* User Button - Desktop only */}
    <div className="hidden xl:flex">
      <ActionButton {...ACTION_BUTTONS[1]} />
    </div>

    {/* Mobile Hamburger Menu */}
    <button
      aria-label={isMobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
      className={`flex h-[45px] w-[45px] items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 xl:hidden ${
        isMobileMenuOpen ? 'bg-primary' : 'bg-cadet-grey'
      }`}
      onClick={onMobileMenuToggle}
      type="button"
    >
      {isMobileMenuOpen ? (
        <XIcon className="h-5 w-5 text-white" />
      ) : (
        <MenuIcon className="h-5 w-5 text-white" />
      )}
    </button>
  </div>
);

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
      <header className="section-container bg-white py-4 sticky top-0 z-50">
        <nav className="flex h-16 items-center justify-between gap-6 px-8">
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
