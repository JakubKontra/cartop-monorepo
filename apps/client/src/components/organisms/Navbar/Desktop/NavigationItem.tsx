'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Submenu } from '../Submenu';
import type { NavigationItemProps } from '../types';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

// createPortal usage => this is the article that explains why backdrop-filter fails with positioned child elements and how to fix it
// https://medium.com/@aqib-2/why-backdrop-filter-fails-with-positioned-child-elements-0b82b504f440

export const NavigationItem: React.FC<NavigationItemProps> = ({ href, label, hasDropdown }) => {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navItemRef = useRef<HTMLLIElement>(null);

  const calculateSubmenuPosition = () => {
    if (navItemRef.current) {
      const rect = navItemRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Position the submenu below the navigation item
      let top = rect.bottom + scrollY + 40; // 8px gap
      let left = rect.left + scrollX;

      // Ensure submenu doesn't go off-screen horizontally
      const submenuWidth = 896; // max-w-4xl = 896px
      const viewportWidth = window.innerWidth;

      if (left + submenuWidth > viewportWidth) {
        left = viewportWidth - submenuWidth - 16; // 16px margin from edge
      }

      // Ensure submenu doesn't go off-screen vertically
      const submenuHeight = 200; // Approximate height
      const viewportHeight = window.innerHeight;

      if (top + submenuHeight > viewportHeight + scrollY) {
        top = rect.top + scrollY - submenuHeight - 8; // Position above instead
      }

      setSubmenuPosition({ top, left });
    }
  };

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
        calculateSubmenuPosition();
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

  // Recalculate position on scroll when submenu is visible
  useEffect(() => {
    if (isSubmenuVisible) {
      const handleScroll = () => {
        calculateSubmenuPosition();
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
    return undefined;
  }, [isSubmenuVisible]);

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
    <li
      ref={navItemRef}
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        className="inline-flex items-center gap-1 transition hover:underline hover:text-slate-900"
        href={href}
      >
        <span>{label}</span>
        {hasDropdown && <ChevronDown className="text-gunmetal size-3.5" />}
      </Link>
      {hasDropdown &&
        createPortal(
          <Submenu
            isVisible={isSubmenuVisible}
            onMouseLeave={handleSubmenuMouseLeave}
            position={submenuPosition}
          />,
          document.body,
        )}
    </li>
  );
};
