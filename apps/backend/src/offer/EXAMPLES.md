# GraphQL Query Examples - Offer System

## 📋 Public Queries (No Auth)

### Get all public offers (simple list)
```graphql
query GetPublicOffers {
  publicOffers(filters: { limit: 20 }) {
    id
    type
    totalPrice
    isActive

    # Basic vehicle info
    modelGeneration {
      name
      model {
        name
        brand {
          name
        }
      }
    }

    # For operational leasing - show default variant
    ... on OperationalLeasingOffer {
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit
    }

    # For direct purchase
    ... on DirectPurchaseOffer {
      discountAmount
      includesWarranty
    }
  }
}
```

### Get single offer with ALL variants (detailed view)
```graphql
query GetOfferDetail($id: ID!) {
  publicOffer(id: $id) {
    id
    type
    totalPrice
    description

    modelGeneration {
      name
      bodyType
      length
      width
    }

    # === OPERATIONAL LEASING WITH VARIANTS ===
    ... on OperationalLeasingOffer {
      # Default values from main table
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit

      # 🔥 LAZY LOADED VARIANTS (only fetched when requested)
      variants {
        id
        leasingDurationMonths
        annualMileageLimit
        monthlyPayment
        totalPrice
        downPayment
        isDefault
        isBestOffer

        # Services included
        hasServiceIncluded
        hasWinterTyresIncluded
        hasAssistanceServiceIncluded
        hasGapIncluded
        hasGlassInsuranceIncluded
      }

      # 🎨 COLOR VARIANTS
      colorVariants {
        id
        colorName
        isDefault
        exteriorColor {
          name
          hexCode
        }
        interiorColor {
          name
          hexCode
        }
      }

      # 🔧 OPTIONAL EQUIPMENT
      optionalEquipment {
        id
        name
        description
        additionalPrice
        isAvailable
      }
    }
  }
}
```

---

## 🔐 Admin Queries (Requires JWT + ADMIN role)

### Get all offers including individual
```graphql
query GetAllOffersAdmin {
  allOffers(filters: { limit: 50 }) {
    id
    type
    totalPrice
    isPublic
    isActive
    createdAt

    # Individual offers (admin-only)
    ... on IndividualOffer {
      status
      customer {
        firstName
        lastName
        email
      }
      assignedTo {
        firstName
        lastName
      }
      responseDeadline
    }
  }
}
```

### Get individual offers with calculations
```graphql
query GetIndividualOffers {
  individualOffers(filters: {
    status: NEW
    limit: 10
  }) {
    id
    totalPrice
    status

    customer {
      id
      email
      firstName
      lastName
    }

    modelGeneration {
      name
      model {
        brand {
          name
        }
      }
    }

    # 🧮 CALCULATIONS (lazy loaded)
    calculations {
      id
      availability
      createdAt

      exteriorColor {
        name
      }
      interiorColor {
        name
      }

      # Features requested by customer
      features {
        id
        featureName
        featureDescription
      }
    }

    internalNotes
    customRequirements
  }
}
```

---

## 🛠️ Admin Mutations

### 1. Create Operational Leasing Offer
```graphql
mutation CreateLeasingOffer {
  createOperationalLeasingOffer(input: {
    totalPrice: 900000
    modelGenerationId: "uuid-bmw-3-series-g20"
    brandId: "uuid-bmw"
    slug: "bmw-3-series-g20-leasing-2024"

    # Default variant (stored in main table)
    leasingDurationMonths: 36
    monthlyPayment: 25000
    annualMileageLimit: 15000

    hasServiceIncluded: true
    hasWinterTyresIncluded: false

    isActive: true
  }) {
    id
    type
    totalPrice
    leasingDurationMonths
    monthlyPayment
  }
}
```

### 2. Add Leasing Variant (after creating main offer)
```graphql
mutation AddLeasingVariant {
  createLeasingVariant(
    offerId: "uuid-main-offer"
    leasingDurationMonths: 48
    annualMileageLimit: 20000
    monthlyPayment: 28000
    totalPrice: 1344000
    downPayment: 50000
    isDefault: false
    isBestOffer: true  # Mark as "TOP NABÍDKA"
  ) {
    id
    leasingDurationMonths
    monthlyPayment
    isBestOffer
  }
}
```

### 3. Add Color Variant
```graphql
mutation AddColorVariant {
  createColorVariant(
    offerId: "uuid-main-offer"
    exteriorColorId: "uuid-alpine-white"
    interiorColorId: "uuid-black-leather"
    colorName: "Alpine White + Black Leather"
    isDefault: true
  ) {
    id
    colorName
    exteriorColor {
      name
    }
    interiorColor {
      name
    }
  }
}
```

### 4. Add Optional Equipment
```graphql
mutation AddOptionalEquipment {
  createOptionalEquipment(
    offerId: "uuid-main-offer"
    name: "Tow Bar (Tažné zařízení)"
    additionalPrice: 15000
    description: "Připojení přívěsného zařízení"
  ) {
    id
    name
    additionalPrice
  }
}
```

### 5. Create Individual Offer
```graphql
mutation CreateIndividualOffer {
  createIndividualOffer(input: {
    totalPrice: 1200000
    modelGenerationId: "uuid-audi-a6-c8"
    customerId: "uuid-customer-123"

    status: NEW
    customRequirements: "{\"equipment\": [\"panorama\", \"matrix-led\"], \"deliveryDate\": \"2024-06\"}"
    internalNotes: "Zákazník chce červenou barvu"
    assignedToId: "uuid-sales-rep"
    responseDeadline: "2024-01-31"

    isActive: true
  }) {
    id
    status
    customer {
      email
    }
  }
}
```

### 6. Add Calculation to Individual Offer
```graphql
mutation AddCalculation {
  createCalculation(
    offerId: "uuid-individual-offer"
    availability: "IN_STOCK"
    exteriorColorId: "uuid-brilliant-red"
    interiorColorId: "uuid-black"
  ) {
    id
    availability
  }
}
```

### 7. Add Features to Calculation
```graphql
mutation AddFeature {
  addFeatureToCalculation(
    calculationId: "uuid-calculation"
    featureName: "Panoramic Sunroof"
    featureDescription: "Velké panoramatické střešní okno"
  ) {
    id
    featureName
  }
}
```

---

## 🎯 Frontend Use Cases

### Use Case 1: List Page (Fast)
**Query:** `publicOffers` - WITHOUT variants
```graphql
{
  publicOffers {
    id
    totalPrice
    monthlyPayment  # default from main table
    modelGeneration { name }
  }
}
```
**Performance:** ⚡ Very fast - single SELECT, no JOINs

---

### Use Case 2: Detail Page (With Variants)
**Query:** `publicOffer(id)` - WITH variants
```graphql
{
  publicOffer(id: "xxx") {
    id
    totalPrice
    variants { ... }  # Lazy loaded when requested
    colorVariants { ... }
    optionalEquipment { ... }
  }
}
```
**Performance:** 🔄 4 queries (main + 3 relations), but only on detail page

---

### Use Case 3: Filter by Duration
**Query:** Filter variants on client or server
```graphql
{
  publicOffer(id: "xxx") {
    variants(where: { leasingDurationMonths: 36 }) {
      monthlyPayment
    }
  }
}
```

---

## 📊 Database Impact

### Main Table Query (List)
```sql
SELECT * FROM offers
WHERE is_public = true AND is_active = true
ORDER BY created_at DESC
LIMIT 20;
```
**Speed:** ~5ms for 10k rows

### With Variants (Detail)
```sql
-- Main offer
SELECT * FROM offers WHERE id = 'xxx';

-- Variants (lazy)
SELECT * FROM offer_leasing_variants WHERE offer_id = 'xxx';
SELECT * FROM offer_color_variants WHERE offer_id = 'xxx';
SELECT * FROM offer_optional_equipment WHERE offer_id = 'xxx';
```
**Speed:** ~10-15ms total

---

## 💡 Best Practices

1. **List pages:** Don't load variants
2. **Detail pages:** Load variants only when needed
3. **Filters:** Use main table fields for fast filtering
4. **Variants:** Use for display, not for filtering

---

**Autor:** Claude Code
**Datum:** 2025-10-12
