# PromotionalOffers Section

Granular, reusable components for displaying promotional vehicle offers on the homepage.

## Architecture

Follows the established server-side architecture pattern with:
- **Server Components** for data fetching
- **Client Components** for interactivity
- **Service Layer** for pure data fetching
- **Server Actions** for mutations and cache management
- **Error Boundaries** for error recovery
- **Loading States** with skeleton UI

## Components

### 1. PromotionalOffersSection (Server Component)

Main section component that fetches and displays promotional offers.

```tsx
import { Suspense } from 'react';
import {
  PromotionalOffersSection,
  PromotionalOffersSectionLoading,
  PromotionalOffersSectionWrapper,
} from '@/components/sections/Homepage/PromotionalOffers';

// Example 1: Default usage with auto-fetch
export default function HomePage() {
  return (
    <PromotionalOffersSectionWrapper>
      <Suspense fallback={<PromotionalOffersSectionLoading />}>
        <PromotionalOffersSection />
      </Suspense>
    </PromotionalOffersSectionWrapper>
  );
}

// Example 2: Custom configuration
export default function HomePage() {
  return (
    <PromotionalOffersSectionWrapper>
      <Suspense fallback={<PromotionalOffersSectionLoading />}>
        <PromotionalOffersSection
          highlightedWord="Top"
          remainingTitle="nabídky"
          subtitle="Naše nejlepší akční vozy"
          limit={6}
          offerType="OPERATIONAL_LEASING"
          showViewAllLink={true}
        />
      </Suspense>
    </PromotionalOffersSectionWrapper>
  );
}

// Example 3: Parent-controlled data (allows filtering by parent)
export default async function HomePage() {
  // Fetch offers in parent with custom logic
  const offers = await getPromotionalOffers({
    filters: {
      brandId: 'specific-brand-id',
      isActive: true,
      isPublic: true,
      limit: 3,
    },
  });

  return (
    <PromotionalOffersSectionWrapper>
      <Suspense fallback={<PromotionalOffersSectionLoading />}>
        <PromotionalOffersSection items={offers} />
      </Suspense>
    </PromotionalOffersSectionWrapper>
  );
}
```

**Props:**
- `highlightedWord?: string` - Custom title highlighted word (default: "Akční")
- `remainingTitle?: string` - Custom title remaining text (default: "vozy")
- `subtitle?: string` - Custom subtitle
- `limit?: number` - Maximum number of offers to display (default: 3)
- `items?: PromotionalOffer[]` - Pre-fetched offers (optional, allows parent control)
- `brandId?: string` - Filter by brand ID
- `offerType?: 'OPERATIONAL_LEASING' | 'DIRECT_PURCHASE'` - Filter by offer type
- `showViewAllLink?: boolean` - Show "View all" link (default: true)
- `className?: string` - Custom CSS classes

### 2. PromotionalOffersCard (Molecule)

Reusable card component for displaying individual promotional offers.

```tsx
import { PromotionalOffersCard } from '@/components/molecules/PromotionalOffersCard';

<PromotionalOffersCard
  brandName="Volvo"
  title="XC90 Plus"
  subtitle="2.0 B4 (197 Hp) Mild Hybrid Automatic Core"
  imageUrl="/images/volvo-xc90.jpg"
  imageAlt="Volvo XC90 Plus"
  badgeText="Do 3 měsíců"
  labels={["Label No 1", "Label No 2"]}
  colorVariants={["#c0c0c0", "#ffffff", "#ff0000", "#0000ff"]}
  vehicleType="SUV"
  mileage="0 km"
  condition="Nový"
  drivetrain="4x4"
  identifier="CT25871597"
  fuelType="Diesel"
  horsepower="231 Hp"
  transmission="8° Automatická"
  annualMileage="15 000 - 50 000 km"
  monthlyPrice={9091}
  priceFrequencyText="Měsíčně od"
  currency="Kč"
  href="/offers/volvo-xc90-plus"
  ctaText="Zobrazit nabídku"
  showFavorite={true}
  showCompare={true}
/>
```

## Service Layer

### getPromotionalOffers

Pure data fetching function for all promotional offers.

```ts
import { getPromotionalOffers } from '@/lib/services/promotional-offers.service';

const offers = await getPromotionalOffers({
  filters: {
    brandId: 'brand-id',
    isActive: true,
    isPublic: true,
    limit: 10,
    offerType: 'OPERATIONAL_LEASING',
  },
});
```

### getOperationalLeasingOffers

Fetch only operational leasing offers.

```ts
import { getOperationalLeasingOffers } from '@/lib/services/promotional-offers.service';

const offers = await getOperationalLeasingOffers({
  filters: {
    limit: 5,
    isActive: true,
    isPublic: true,
  },
});
```

### getDirectPurchaseOffers

Fetch only direct purchase offers.

```ts
import { getDirectPurchaseOffers } from '@/lib/services/promotional-offers.service';

const offers = await getDirectPurchaseOffers({
  filters: {
    limit: 5,
    isActive: true,
    isPublic: true,
  },
});
```

## Server Actions

### revalidatePromotionalOffersCacheAction

Revalidate the promotional offers cache.

```ts
'use client';

import { revalidatePromotionalOffersCacheAction } from '@/lib/actions/promotional-offers.actions';

const result = await revalidatePromotionalOffersCacheAction();
console.log(result.message);
```

### getPromotionalOffersAction

Fetch offers from client components.

```ts
'use client';

import { getPromotionalOffersAction } from '@/lib/actions/promotional-offers.actions';

const result = await getPromotionalOffersAction({
  limit: 5,
  isActive: true,
  isPublic: true,
});

if (result.success) {
  console.log(result.offers);
}
```

## Usage on Homepage (Multiple Sections)

As mentioned in the requirements, you can use this section multiple times on the homepage:

```tsx
// apps/client/src/app/page.tsx
import { Suspense } from 'react';

import {
  PromotionalOffersSection,
  PromotionalOffersSectionLoading,
  PromotionalOffersSectionWrapper,
} from '@/components/sections/Homepage/PromotionalOffers';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Benefits />

      {/* First promotional offers section - Operational Leasing */}
      <PromotionalOffersSectionWrapper>
        <Suspense fallback={<PromotionalOffersSectionLoading />}>
          <PromotionalOffersSection
            highlightedWord="Akční"
            remainingTitle="vozy"
            subtitle="Stálá akční nabídka. Pravidelně pro vás vybíráme vozy s nejlepšími podmínkami."
            limit={3}
            offerType="OPERATIONAL_LEASING"
          />
        </Suspense>
      </PromotionalOffersSectionWrapper>

      {/* Brands Section */}
      <BrandsSectionWrapper>
        <Suspense fallback={<BrandsSectionLoading />}>
          <BrandsSection />
        </Suspense>
      </BrandsSectionWrapper>

      {/* Second promotional offers section - Direct Purchase */}
      <PromotionalOffersSectionWrapper>
        <Suspense fallback={<PromotionalOffersSectionLoading />}>
          <PromotionalOffersSection
            highlightedWord="Přímý"
            remainingTitle="nákup"
            subtitle="Kupte si auto rovnou s výhodnými podmínkami."
            limit={3}
            offerType="DIRECT_PURCHASE"
          />
        </Suspense>
      </PromotionalOffersSectionWrapper>

      <FaqSection />
      <Footer />
    </div>
  );
}
```

## Cache Management

The section uses Next.js ISR with:
- **Revalidation time**: 60 seconds
- **Cache tags**: `promotional-offers`, `operational-leasing-offers`, `direct-purchase-offers`

You can manually revalidate the cache using server actions as shown in the error recovery flow.

## Error Recovery

The error boundary automatically handles errors and provides retry functionality:
1. Error occurs during data fetching
2. Error boundary catches the error
3. Error UI is displayed with retry button
4. User clicks retry
5. Cache is revalidated via server action
6. Error boundary resets and refetches data

## Benefits

✅ **Granular & Reusable** - Components can be composed and reused
✅ **Type-Safe** - End-to-end TypeScript type safety
✅ **Server-First** - Minimal JavaScript shipped to client
✅ **Error Recovery** - Automatic error handling with retry
✅ **Loading States** - Skeleton UI for better UX
✅ **Cache Control** - ISR with manual revalidation
✅ **Flexible** - Parent can control data via `items` prop
