import React from 'react';

import type { ActionButtonProps } from '../types';
import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';

export const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, className }) => (
  <ButtonIcon
    aria-label={label}
    className={className}
    size="small"
    type="button"
    icon={<Icon className="h-5 w-5" />}
    variant="cadet-grey"
  />
);
