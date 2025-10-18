# Navbar Component

A comprehensive navigation component with desktop and mobile support, including submenus and search functionality.

## Structure

```
Navbar/
├── Actions/                 # Action buttons and search components
│   ├── ActionButton.tsx    # Reusable action button component
│   ├── ActionButtons.tsx   # Container for all action buttons
│   ├── SearchForm.tsx      # Desktop search form
│   └── index.ts           # Barrel exports
├── Desktop/                # Desktop navigation components
│   ├── NavigationItem.tsx  # Individual navigation item with submenu
│   ├── NavigationMenu.tsx  # Desktop navigation menu container
│   └── index.ts           # Barrel exports
├── Mobile/                 # Mobile navigation components
│   ├── MobileAccordion.tsx # Accordion component for mobile submenus
│   ├── MobileMenu.tsx      # Full-screen mobile menu
│   ├── MobileNavigationItem.tsx # Mobile navigation item
│   └── index.ts           # Barrel exports
├── Submenu/                # Submenu components
│   ├── Submenu.tsx        # Desktop submenu with animations
│   ├── SubmenuColumn.tsx  # Individual submenu column
│   └── index.ts           # Barrel exports
├── constants.ts            # Navigation data and configuration
├── types.ts               # TypeScript type definitions
├── Navbar.tsx             # Main navbar component
└── index.ts               # Main barrel exports
```

## Components

### Main Components

- **Navbar** - Main component that orchestrates all navigation functionality
- **NavigationMenu** - Desktop navigation menu
- **MobileMenu** - Full-screen mobile navigation with accordions
- **ActionButtons** - Search, scale, user, and hamburger menu buttons

### Desktop Components

- **NavigationItem** - Individual navigation item with hover submenu
- **Submenu** - Four-column submenu with fade animations
- **SubmenuColumn** - Individual column in the submenu

### Mobile Components

- **MobileNavigationItem** - Mobile navigation item with accordion support
- **MobileAccordion** - Collapsible accordion for submenu sections

### Action Components

- **ActionButton** - Reusable icon button component
- **SearchForm** - Desktop search form

## Features

### Desktop

- Hover-activated submenu with smooth animations
- Four-column submenu layout (Doporučené, Náš výběr, Značky, Kategorie)
- Search functionality
- Scale and user action buttons

### Mobile

- Full-screen overlay menu
- Accordion-based navigation
- Search bar at the top
- Authentication buttons at the bottom
- Auto-close on link clicks

### Shared

- Responsive design (XL breakpoint)
- Smooth fade-in/out animations
- Body scroll locking for mobile menu
- TypeScript support
- Accessibility features

## Usage

```tsx
import Navbar from '@/components/organisms/Navbar/Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* Your content */}
    </div>
  );
}
```

## Customization

### Adding New Navigation Items

Update `constants.ts`:

```tsx
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  // Add your navigation items here
  {
    href: '/new-page',
    label: 'New Page',
    hasDropdown: false,
  },
];
```

### Adding New Submenu Links

Update the respective link arrays in `constants.ts`:

```tsx
export const recommendedLinks: readonly SubmenuLink[] = [
  // Add your links here
  { href: '/new-link', label: 'New Link' },
];
```

## Dependencies

- Next.js Link component
- Lucide React icons
- body-scroll-lock-upgrade
- Tailwind CSS for styling
