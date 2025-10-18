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

// Submenu data (reused from footer)
const recommendedLinks = [
  { href: '/koupit', label: 'Koupit' },
  { href: '/pronajmout', label: 'Pronajmout' },
  { href: '/akcni-vozy', label: 'Akční vozy' },
  { href: '/nas-vyber', label: 'Náš výběr' },
  { href: '/nejnovejsi-nabidky', label: 'Nejnovější nabídky' },
  { href: '/katalog', label: 'Katalog' },
] as const;

const selectionLinks = [
  { href: '/premiove', label: 'Prémiové' },
  { href: '/mainstream', label: 'Mainstream' },
  { href: '/sportovni', label: 'Sportovní' },
  { href: '/elektromobily', label: 'Elektromobily' },
  { href: '/uzitkove', label: 'Užitkové' },
  { href: '/hybridni', label: 'Hybridní' },
  { href: '/skladove', label: 'Skladové' },
  { href: '/nas-vyber', label: 'Zobrazit vše' },
] as const;

const brandLinks = [
  { href: '/znacky/audi', label: 'Audi' },
  { href: '/znacky/bmw', label: 'BMW' },
  { href: '/znacky/skoda', label: 'Škoda' },
  { href: '/znacky/hyundai', label: 'Hyundai' },
  { href: '/znacky/mazda', label: 'Mazda' },
  { href: '/znacky/mercedes', label: 'Mercedes' },
  { href: '/znacky', label: 'Zobrazit vše' },
] as const;

const categoryLinks = [
  { href: '/kategorie/suv', label: 'SUV' },
  { href: '/kategorie/kombi-mpv', label: 'Kombi / MPV' },
  { href: '/kategorie/hatchback', label: 'Hatchback' },
  { href: '/kategorie/sedan', label: 'Sedan' },
  { href: '/kategorie/kupe', label: 'Kupé' },
  { href: '/kategorie/kabriolet', label: 'Kabriolet' },
  { href: '/kategorie', label: 'Zobrazit vše' },
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
  onClose?: () => void;
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

interface SubmenuLink {
  href: string;
  label: string;
}

interface SubmenuColumnProps {
  title: string;
  links: readonly SubmenuLink[];
}

interface SubmenuProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

// Components
const SubmenuColumn: React.FC<SubmenuColumnProps> = ({ title, links }) => (
  <div className="flex flex-col">
    <h3 className="mb-4 text-sm font-semibold text-gunmetal">{title}</h3>
    <ul className="flex flex-col gap-2">
      {links.map(link => {
        const isViewAll = link.label === 'Zobrazit vše';
        return (
          <li key={link.href} className={isViewAll ? 'pt-2' : ''}>
            <Link
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                isViewAll ? 'text-slate-500 font-medium' : 'text-gunmetal-600'
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const Submenu: React.FC<SubmenuProps> = ({ isVisible, onMouseLeave }) => {
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

const NavigationItem: React.FC<NavigationItemProps> = ({ href, label, hasDropdown }) => {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hasDropdown) {
      // Clear any pending leave timeout
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setIsSubmenuVisible(true);
      }, 100); // Small delay to prevent flickering
    }
  };

  const handleMouseLeave = () => {
    if (hasDropdown) {
      // Clear any pending enter timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      // Add delay when leaving the main menu link
      leaveTimeoutRef.current = setTimeout(() => {
        setIsSubmenuVisible(false);
      }, 200); // Delay to allow moving to submenu
    }
  };

  const handleSubmenuMouseLeave = () => {
    // Immediate close when leaving submenu
    if (hasDropdown) {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      setIsSubmenuVisible(false);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <li className="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link className="inline-flex items-center gap-1 transition hover:text-slate-900" href={href}>
        <span>{label}</span>
        {hasDropdown && <span className="text-slate-400">▾</span>}
      </Link>
      {hasDropdown && (
        <Submenu isVisible={isSubmenuVisible} onMouseLeave={handleSubmenuMouseLeave} />
      )}
    </li>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, className }) => (
  <button
    aria-label={label}
    className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 active:opacity-60 ${className}`}
    type="button"
  >
    <Icon className="h-5 w-5 text-white" />
  </button>
);

interface MobileAccordionProps {
  title: string;
  links: readonly SubmenuLink[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
}

const MobileAccordion: React.FC<MobileAccordionProps> = ({
  title,
  links,
  isOpen,
  onToggle,
  onLinkClick,
}) => (
  <div className="border-b border-slate-200">
    <button
      className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-gunmetal transition hover:text-slate-900"
      onClick={onToggle}
      type="button"
    >
      <span>{title}</span>
      <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
    </button>
    {isOpen && (
      <div className="pb-4">
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.href}>
              <Link
                className="block py-2 text-sm text-gunmetal-600 transition hover:text-primary"
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

const MobileNavigationItem: React.FC<NavigationItemProps> = ({
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

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
