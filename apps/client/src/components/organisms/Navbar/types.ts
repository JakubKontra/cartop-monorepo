import { ReactNode } from 'react';

// Navigation data types
export interface NavigationItem {
  href: string;
  label: string;
  hasDropdown: boolean;
}

export interface SubmenuLink {
  href: string;
  label: string;
}

// Component prop types
export interface NavigationItemProps {
  href: string;
  label: string;
  hasDropdown: boolean;
  onClose?: () => void;
}

export interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SubmenuColumnProps {
  title: string;
  links: readonly SubmenuLink[];
}

export interface SubmenuProps {
  isVisible: boolean;
  onMouseLeave: () => void;
  position?: { top: number; left: number };
}

export interface MobileAccordionProps {
  title: string;
  links: readonly SubmenuLink[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
}

export interface ActionButtonsProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}
