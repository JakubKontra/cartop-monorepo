# Offer System - Hybrid Architecture

## 🏗️ Architektura

Používáme **Hybrid přístup** - kombinaci Single Table Inheritance a Separate Related Tables:

### Single Table (`offers`)
Hlavní entity používají **Single Table Inheritance (STI)** pro základní data:
- `Offer` (base abstract class)
- `OperationalLeasingOffer` (child)
- `DirectPurchaseOffer` (child)
- `IndividualOffer` (child)

### Separate Related Tables
Komplexní vztahy jsou v oddělených tabulkách:

#### Pro Operational Leasing:
1. **`offer_leasing_variants`** - Různé varianty leasingu
   - Různé kombinace duration + mileage + company
   - Příklad: 24 měsíců / 15000 km vs 36 měsíců / 20000 km

2. **`offer_color_variants`** - Barevné varianty
   - Kombinace exterior + interior colors
   - Lze přidat galerii pro každou variantu

3. **`offer_optional_equipment`** - Příslušenství
   - Tažné zařízení, nezávislé topení, atd.
   - Každé má additional price

#### Pro Individual Offers:
1. **`offer_calculations`** - Vlastní kalkulace
   - Availability status (in stock, on order, atd.)
   - Barevné preference

2. **`offer_calculation_features`** - Požadované featury
   - Seznam equipment/features pro calculation

---

## 📊 Jak to funguje

### Příklad: Operational Leasing s variantami

```typescript
// 1. Vytvoříš main offer (základní nabídka)
const mainOffer = await offerService.createOperationalLeasing({
  totalPrice: 900000,
  modelGenerationId: "bmw-3-series-g20",
  leasingDurationMonths: 36,  // default varianta
  monthlyPayment: 25000,
  annualMileageLimit: 15000,
  // ...
});

// 2. Přidáš varianty (různé kombinace)
const variant1 = await variantRepo.save({
  offerId: mainOffer.id,
  leasingDurationMonths: 24,
  annualMileageLimit: 10000,
  monthlyPayment: 22000,
  totalPrice: 528000,
  isDefault: false,
});

const variant2 = await variantRepo.save({
  offerId: mainOffer.id,
  leasingDurationMonths: 48,
  annualMileageLimit: 20000,
  monthlyPayment: 28000,
  totalPrice: 1344000,
  isBestOffer: true,  // označeno jako TOP nabídka
});

// 3. Přidáš barevné varianty
const colorVariant = await colorVariantRepo.save({
  offerId: mainOffer.id,
  exteriorColorId: "alpine-white",
  interiorColorId: "black-leather",
  colorName: "Alpine White + Black Leather",
  isDefault: true,
});

// 4. Přidáš příslušenství
const towBar = await equipmentRepo.save({
  offerId: mainOffer.id,
  name: "Tow Bar (Tažné zařízení)",
  additionalPrice: 15000,
});
```

### GraphQL Query pro frontend

```graphql
query GetLeasingOffer($id: ID!) {
  publicOffer(id: $id) {
    id
    type
    totalPrice

    # Základní leasing info
    ... on OperationalLeasingOffer {
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit

      # Varianty (lazy loaded když je potřeba)
      variants {
        id
        leasingDurationMonths
        annualMileageLimit
        monthlyPayment
        isBestOffer
        hasServiceIncluded
        hasWinterTyresIncluded
      }

      # Barevné varianty
      colorVariants {
        id
        colorName
        isDefault
        exteriorColor { name hexCode }
        interiorColor { name }
      }

      # Příslušenství
      optionalEquipment {
        id
        name
        additionalPrice
      }
    }
  }
}
```

---

## 🎯 Výhody tohoto přístupu

### ✅ Single Table pro základní data
- **Rychlé queries** - jeden SELECT místo JOINů
- **Snadné filtrování** - WHERE type = 'operational_leasing'
- **Type-safe** - TypeORM ví o child entities

### ✅ Separate Tables pro complex relations
- **Flexibilita** - můžeš mít 1 nebo 100 variants
- **Normalizace** - žádná duplicita
- **Lazy loading** - načítáš jen když potřebuješ
- **Separate indexy** - optimalizace pro každou tabulku

### ✅ Best of both worlds
- Hlavní nabídka = rychlá (STI)
- Detailní data = flexibilní (relations)

---

## 📝 Kdy použít varianty vs základní fields

### Základní fields v Offer (STI):
```typescript
// ✅ Použij když:
- Je to společné pro všechny instances typu
- Frontend to potřebuje vždy při zobrazení seznamu
- Filtrování/sorting podle tohoto pole

monthlyPayment: number  // default varianta
leasingDurationMonths: number  // default varianta
```

### Varianty v separate table:
```typescript
// ✅ Použij když:
- Můžeš mít více hodnot (1:N relation)
- Frontend to načítá až při detailu
- Každá varianta má komplexní data

variants: OfferLeasingVariant[]  // 1..N variants
```

---

## 🔍 Indexy pro performance

### Main table (`offers`)
```sql
CREATE INDEX idx_offers_public_active
  ON offers (type, is_public, is_active)
  WHERE is_public = true;

CREATE INDEX idx_offers_model_generation
  ON offers (model_generation_id, is_active);
```

### Variants table
```sql
CREATE INDEX idx_leasing_variants_offer
  ON offer_leasing_variants (offer_id, is_default);

CREATE INDEX idx_leasing_variants_best
  ON offer_leasing_variants (offer_id, is_best_offer)
  WHERE is_best_offer = true;
```

---

## 🚀 Další kroky

1. **Field resolvers** - Přidat `@ResolveField` pro lazy loading variants
2. **DTOs** - Přidat input types pro vytváření variants
3. **Service methods** - Přidat metody pro CRUD variants
4. **Validace** - Ensure alespoň 1 default variant exists

---

**Autor:** Claude Code
**Datum:** 2025-10-12
