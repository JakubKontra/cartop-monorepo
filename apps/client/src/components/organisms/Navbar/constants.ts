import { ScaleIcon, UserIcon } from 'lucide-react';

import type { NavigationItem, SubmenuLink } from './types';

// Navigation items
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
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
export const recommendedLinks: readonly SubmenuLink[] = [
  { href: '/koupit', label: 'Koupit' },
  { href: '/pronajmout', label: 'Pronajmout' },
  { href: '/akcni-vozy', label: 'Akční vozy' },
  { href: '/nas-vyber', label: 'Náš výběr' },
  { href: '/nejnovejsi-nabidky', label: 'Nejnovější nabídky' },
  { href: '/katalog', label: 'Katalog' },
] as const;

export const selectionLinks: readonly SubmenuLink[] = [
  { href: '/premiove', label: 'Prémiové' },
  { href: '/mainstream', label: 'Mainstream' },
  { href: '/sportovni', label: 'Sportovní' },
  { href: '/elektromobily', label: 'Elektromobily' },
  { href: '/uzitkove', label: 'Užitkové' },
  { href: '/hybridni', label: 'Hybridní' },
  { href: '/skladove', label: 'Skladové' },
  { href: '/nas-vyber', label: 'Zobrazit vše' },
] as const;

export const brandLinks: readonly SubmenuLink[] = [
  { href: '/znacky/audi', label: 'Audi' },
  { href: '/znacky/bmw', label: 'BMW' },
  { href: '/znacky/skoda', label: 'Škoda' },
  { href: '/znacky/hyundai', label: 'Hyundai' },
  { href: '/znacky/mazda', label: 'Mazda' },
  { href: '/znacky/mercedes', label: 'Mercedes' },
  { href: '/znacky', label: 'Zobrazit vše' },
] as const;

export const categoryLinks: readonly SubmenuLink[] = [
  { href: '/kategorie/suv', label: 'SUV' },
  { href: '/kategorie/kombi-mpv', label: 'Kombi / MPV' },
  { href: '/kategorie/hatchback', label: 'Hatchback' },
  { href: '/kategorie/sedan', label: 'Sedan' },
  { href: '/kategorie/kupe', label: 'Kupé' },
  { href: '/kategorie/kabriolet', label: 'Kabriolet' },
  { href: '/kategorie', label: 'Zobrazit vše' },
] as const;

// Action buttons
export const ACTION_BUTTONS = [
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
