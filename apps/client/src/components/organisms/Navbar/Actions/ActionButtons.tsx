import { MenuIcon, XIcon } from 'lucide-react';
import React from 'react';

import { ActionButton } from './ActionButton';
import { SearchForm } from './SearchForm';
import { ACTION_BUTTONS } from '../constants';
import type { ActionButtonsProps } from '../types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => (
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
