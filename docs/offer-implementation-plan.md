# Offer System Implementation Plan - Single Table Inheritance

## 📋 Přehled
Implementace systému nabídek pro nákup vozů s použitím **Single Table Inheritance** v TypeORM.

### Typy nabídek:
1. **Operational Leasing** (Operativní leasing) - veřejný
2. **Direct Purchase** (Přímá koupě) - veřejný
3. **Individual** (Individuální nabídka) - pouze admin

---

## 🗂️ Struktura souborů

### Adresářová struktura
```
apps/backend/src/offer/
├── enums/
│   ├── offer-type.enum.ts
│   └── individual-offer-status.enum.ts
├── dto/
│   ├── create-operational-leasing-offer.input.ts
│   ├── create-direct-purchase-offer.input.ts
│   ├── create-individual-offer.input.ts
│   ├── update-offer.input.ts
│   └── offer-filters.input.ts
├── offer.entity.ts
├── offer.service.ts
├── offer-public.resolver.ts
├── offer-admin.resolver.ts
└── offer.module.ts
```

---

## ✅ Implementační kroky (Checklist)

### Krok 1: Enums
- [ ] **1.1** Vytvořit `offer/enums/offer-type.enum.ts`
  - `OPERATIONAL_LEASING`, `DIRECT_PURCHASE`, `INDIVIDUAL`
  - Export do GraphQL pomocí `registerEnumType`

- [ ] **1.2** Vytvořit `offer/enums/individual-offer-status.enum.ts`
  - `NEW`, `IN_PROGRESS`, `COMPLETED`, `REJECTED`
  - Export do GraphQL

### Krok 2: Entity (Single Table Inheritance)
- [ ] **2.1** Vytvořit `offer/offer.entity.ts`
  - Base abstract class `Offer` s `@TableInheritance`
  - Společná pole: id, type, totalPrice, isPublic, isActive, createdAt, updatedAt
  - Relations: modelGeneration, brand, model, engine, customer
  - Nullable type-specific fields

- [ ] **2.2** Child entity classes
  - `OperationalLeasingOffer extends Offer` - `@ChildEntity`
  - `DirectPurchaseOffer extends Offer` - `@ChildEntity`
  - `IndividualOffer extends Offer` - `@ChildEntity`

- [ ] **2.3** Indexy pro optimalizaci
  - `@Index(['type', 'isPublic', 'isActive'])`
  - `@Index(['type', 'status'])` pro Individual
  - `@Index(['modelGenerationId', 'isActive'])`

### Krok 3: DTOs (Input Types)
- [ ] **3.1** `dto/create-operational-leasing-offer.input.ts`
  - Pole: leasingDurationMonths, monthlyPayment, annualMileageLimit
  - Validace: @IsNotEmpty, @Min, @Max
  - GraphQL `@InputType()`

- [ ] **3.2** `dto/create-direct-purchase-offer.input.ts`
  - Pole: discountAmount, includesWarranty, warrantyYears
  - Validace specifická pro koupě

- [ ] **3.3** `dto/create-individual-offer.input.ts`
  - Pole: customerId, customRequirements (JSONB), status
  - Validace: customer musí existovat

- [ ] **3.4** `dto/update-offer.input.ts`
  - Partial update pro všechny typy
  - `@InputType()` s optional fields

- [ ] **3.5** `dto/offer-filters.input.ts`
  - Filtry: type, modelGenerationId, brandId, priceRange
  - Pro public queries

### Krok 4: Service (Business Logic)
- [ ] **4.1** Vytvořit `offer/offer.service.ts`
  - Constructor s `@InjectRepository(Offer)`

- [ ] **4.2** CRUD metody
  - `createOperationalLeasing(input)`
  - `createDirectPurchase(input)`
  - `createIndividual(input)` - admin only
  - `findAll(filters, isPublic)` - s filtry
  - `findOne(id)`
  - `findByType(type)`
  - `update(id, input)`
  - `remove(id)`

- [ ] **4.3** Specializované metody
  - `findPublicOffers()` - exclude Individual
  - `findIndividualOffers()` - admin only
  - `findByModelGeneration(modelGenerationId)`
  - `updateIndividualStatus(id, status)`

### Krok 5: Resolvers

#### 5.1 Public Resolver
- [ ] **5.1.1** Vytvořit `offer/offer-public.resolver.ts`
  - `@Resolver(() => Offer)`

- [ ] **5.1.2** Public Queries
  - `@Query(() => [Offer]) publicOffers()`
    - WHERE: `isPublic = true AND isActive = true`
    - Exclude type = INDIVIDUAL
  - `@Query(() => [Offer]) operationalLeasingOffers()`
  - `@Query(() => [Offer]) directPurchaseOffers()`
  - `@Query(() => Offer) publicOffer(@Args('id'))`

- [ ] **5.1.3** GraphQL Union Type
  - `createUnionType` pro polymorfní return type
  - `resolveType()` podle offer.type

#### 5.2 Admin Resolver
- [ ] **5.2.1** Vytvořit `offer/offer-admin.resolver.ts`
  - `@Resolver(() => Offer)`
  - `@UseGuards(JwtAuthGuard, RolesGuard)`

- [ ] **5.2.2** Admin Queries
  - `@Query(() => [Offer]) @Roles(UserRole.ADMIN) allOffers()`
  - `@Query(() => [IndividualOffer]) @Roles(UserRole.ADMIN) individualOffers()`
  - `@Query(() => Offer) @Roles(UserRole.ADMIN) offer(@Args('id'))`

- [ ] **5.2.3** Admin Mutations
  - `@Mutation(() => OperationalLeasingOffer) createOperationalLeasingOffer()`
  - `@Mutation(() => DirectPurchaseOffer) createDirectPurchaseOffer()`
  - `@Mutation(() => IndividualOffer) createIndividualOffer()`
  - `@Mutation(() => Offer) updateOffer()`
  - `@Mutation(() => Boolean) deleteOffer()`
  - `@Mutation(() => IndividualOffer) updateIndividualStatus()`

### Krok 6: Module
- [ ] **6.1** Vytvořit `offer/offer.module.ts`
  - Import: `TypeOrmModule.forFeature([Offer])`
  - Import: `CatalogModelGenerationModule` (pro relations)
  - Import: `UserModule` (pro customer relation)
  - Providers: OfferService, OfferPublicResolver, OfferAdminResolver
  - Exports: OfferService

- [ ] **6.2** Registrovat v `app.module.ts`
  - Přidat `OfferModule` do imports

### Krok 7: Database Migration
- [ ] **7.1** Vytvořit migration soubor
  - `npm run migration:generate -- CreateOffersTable`

- [ ] **7.2** Migration obsah
  ```sql
  CREATE TABLE offers (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- discriminator
    is_public BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    total_price DECIMAL(12,2) NOT NULL,
    model_generation_id UUID REFERENCES catalog_model_generations(id),

    -- Operational Leasing fields
    leasing_duration_months INT,
    monthly_payment DECIMAL(10,2),
    annual_mileage_limit INT,

    -- Direct Purchase fields
    discount_amount DECIMAL(10,2),
    includes_warranty BOOLEAN,
    warranty_years INT,

    -- Individual fields
    customer_id UUID REFERENCES users(id),
    status VARCHAR(50),
    custom_requirements JSONB,
    internal_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- [ ] **7.3** Indexy v migraci
  ```sql
  CREATE INDEX idx_offers_public_active
    ON offers (type, is_public, is_active)
    WHERE is_public = true AND is_active = true;

  CREATE INDEX idx_offers_individual_status
    ON offers (type, status, created_at)
    WHERE type = 'individual';

  CREATE INDEX idx_offers_model_generation
    ON offers (model_generation_id, is_active);
  ```

- [ ] **7.4** Spustit migraci
  - `npm run migration:run`

---

## 🔍 Testování

### Krok 8: Manuální testování
- [ ] **8.1** GraphQL Playground queries
  - Public: Query `publicOffers`
  - Admin: Query `allOffers` (s JWT tokenem)
  - Admin: Mutation `createIndividualOffer`

- [ ] **8.2**Ověřit filtry
  - Filtrovat podle typu
  - Filtrovat podle modelGeneration
  - Price range

- [ ] **8.3**Ověřit permissions
  - Public nemůže vidět Individual offers
  - Public nemůže vytvářet nabídky
  - Admin může vše

---

## 📊 Schema struktury

### Base Offer (společná pole)
```typescript
{
  id: UUID
  type: OfferType (enum)
  isPublic: boolean
  isActive: boolean
  totalPrice: number
  modelGenerationId: UUID
  brandId: UUID
  modelId: UUID
  engineId: UUID
  createdAt: Date
  updatedAt: Date
}
```

### Operational Leasing (specifické)
```typescript
{
  leasingDurationMonths: number    // 12-60 měsíců
  monthlyPayment: number            // měsíční splátka
  annualMileageLimit: number        // km/rok (10000-50000)
  downPayment?: number              // akontace
  hasServiceIncluded: boolean
  hasWinterTyresIncluded: boolean
}
```

### Direct Purchase (specifické)
```typescript
{
  discountAmount?: number           // sleva v Kč
  discountPercentage?: number       // sleva v %
  includesWarranty: boolean
  warrantyYears?: number            // roky záruky
  financingAvailable: boolean
}
```

### Individual (specifické)
```typescript
{
  customerId: UUID                  // required
  status: IndividualOfferStatus     // NEW | IN_PROGRESS | COMPLETED | REJECTED
  customRequirements: {             // JSONB
    equipment?: string[]
    colors?: string[]
    deliveryDate?: string
    tradeInVehicle?: {...}
  }
  internalNotes: string             // admin poznámky
  assignedToId?: UUID               // sales rep
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  responseDeadline?: Date
}
```

---

## 🚀 Deployment checklist

- [ ] Všechny soubory vytvořeny a zkompilované
- [ ] Migration spuštěna na DEV databázi
- [ ] Testy prošly (manuální testování v Playground)
- [ ] Code review (pokud je třeba)
- [ ] Migration spuštěna na PROD databázi
- [ ] Monitoring (sledovat performance queries s 10k+ záznamy)

---

## 📝 Poznámky

### Proč Single Table?
- ✅ 10k záznamů = ideální pro STI
- ✅ Společná pole převažují nad specifickými
- ✅ TypeORM native support
- ✅ Jednodušší queries (bez JOINů)
- ✅ Snadné přidání nového typu v budoucnu

### Optimalizace
- Composite index pro public queries
- Partial index pro Individual (admin dashboard)
- JSONB index pro customRequirements (pokud potřeba)

### Bezpečnost
- Individual offers mají `isPublic = false` default
- RolesGuard kontroluje přístup k admin resolverům
- Validace inputů přes class-validator

---

**Status:** ⏳ Připraveno k implementaci
**Autor:** Claude Code
**Datum:** 2025-10-12
