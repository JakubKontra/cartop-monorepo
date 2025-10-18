import React from 'react';

import type { ActionButtonProps } from '../types';

export const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, className }) => (
  <button
    aria-label={label}
    className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 active:opacity-60 ${className}`}
    type="button"
  >
    <Icon className="h-5 w-5 text-white" />
  </button>
);
