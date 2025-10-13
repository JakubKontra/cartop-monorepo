# ChoiceTile komponenta

Univerzální komponenta pro volbu položek s podporou různých variant, velikostí a typů použití.

## Import

```tsx
import { ChoiceTile } from '@/components/molecules/ChoiceTile';
```

## Příklady použití

### 1. Navigační dlaždice jako Next.js Link (interní navigace)

```tsx
<ChoiceTile
  href="/znacky/bmw"
  title="BMW"
  leading={<img src="/logos/bmw.svg" alt="BMW" />}
  selected
  variant="icon"
/>
```

### 2. Externí odkaz

```tsx
<ChoiceTile
  as="a"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  title="Externí odkaz"
  leading={<img src="/icons/external.svg" alt="" />}
  variant="icon"
/>
```

### 3. Dlaždice filtru (interaktivní tlačítko)

```tsx
<ChoiceTile
  as="button"
  title="Náš výběr"
  leading={<img src="/icons/star.svg" alt="" />}
  selected
  onClick={() => setFilter("featured")}
/>
```

### 4. Dlaždice modelu s fotkou auta

```tsx
<ChoiceTile
  href="/skoda/enyaq"
  variant="media"
  title="Enyaq IV"
  subtitle="Od 899 000 Kč"
  leading={<img src="/cars/enyaq.png" alt="Škoda Enyaq IV" />}
  size="lg"
/>
```

### 5. Malá dlaždice s ikonou

```tsx
<ChoiceTile
  as="button"
  title="Elektromobily"
  variant="icon"
  size="sm"
  onClick={() => handleFilter("electric")}
/>
```

### 6. Zakázaná dlaždice

```tsx
<ChoiceTile
  as="button"
  title="Nedostupné"
  subtitle="Brzy k dispozici"
  disabled
  onClick={() => {}}
/>
```

### 7. Dlaždice s měkkým tónem

```tsx
<ChoiceTile
  href="/kategorie/hybrid"
  title="Hybridní vozy"
  tone="soft"
  leading={<img src="/icons/hybrid.svg" alt="" />}
/>
```

## Props

### Základní props

| Prop | Type | Default | Popis |
|------|------|---------|-------|
| `title` | `string` | *required* | Hlavní text dlaždice |
| `subtitle` | `string` | - | Podnadpis (volitelný) |
| `leading` | `ReactNode` | - | Obsah vlevo (logo, ikona, foto) |
| `selected` | `boolean` | `false` | Označení vybrané položky |
| `disabled` | `boolean` | `false` | Zakázání interakce |
| `variant` | `'icon' \| 'media'` | `'icon'` | Varianta pro ikonu/logo nebo foto |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost dlaždice |
| `tone` | `'default' \| 'soft'` | `'default'` | Barevný tón pozadí |
| `className` | `string` | - | Vlastní CSS třídy |

### Props podle typu komponenty

#### Jako tlačítko (default)
```tsx
{
  as?: 'button';
  onClick?: () => void;
  // + všechny button HTML atributy
}
```

#### Jako Next.js Link (interní navigace)
```tsx
{
  as?: 'link'; // nebo vynechejte a jen zadejte href
  href: string;
  onClick?: () => void;
  // + všechny Next.js Link props
}
```

#### Jako externí odkaz
```tsx
{
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  // + všechny anchor HTML atributy
}
```

## Přístupnost

Komponenta automaticky nastavuje správné ARIA atributy:

- **Tlačítko**: `aria-pressed` pro indikaci výběru
- **Odkazy**: `aria-current="page"` pro aktivní stránku
- **Všechny**: `aria-disabled` pro zakázané položky
- **Focus ring**: Viditelný focus indicator pro klávesnicovou navigaci
- **Tab index**: Správné nastavení pro navigaci (zakázané položky mají `tabIndex={-1}`)

## Sémantika

- **`<button>`** - Pro interaktivní akce (filtry, výběr)
- **`<Link>`** - Pro interní navigaci (Next.js router)
- **`<a>`** - Pro externí odkazy

## Styling

Komponenta používá pouze Tailwind CSS utility třídy a `tailwind-variants` pro správu variant. Žádné custom CSS třídy.

### Vlastní styling

Můžete přidat vlastní třídy přes `className` prop:

```tsx
<ChoiceTile
  title="Custom"
  className="shadow-xl border-blue-500"
/>
```
