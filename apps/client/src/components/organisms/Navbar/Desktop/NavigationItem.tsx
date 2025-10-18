'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Submenu } from '../Submenu';
import type { NavigationItemProps } from '../types';

export const NavigationItem: React.FC<NavigationItemProps> = ({ href, label, hasDropdown }) => {
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
