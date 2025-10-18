import React from 'react';

import { NavigationItem } from './NavigationItem';
import { NAVIGATION_ITEMS } from '../constants';

export const NavigationMenu: React.FC = () => (
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
