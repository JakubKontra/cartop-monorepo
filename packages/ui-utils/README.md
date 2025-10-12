# @cartop/ui-utils

Shared UI utilities for the Cartop monorepo.

## Installation

This package is internal to the monorepo and included via workspace protocol:

```json
{
  "dependencies": {
    "@cartop/ui-utils": "workspace:*"
  }
}
```

## Usage

### `cn()` - Class Name Merger

Merge Tailwind CSS classes with intelligent conflict resolution using `clsx` and `tailwind-merge`.

```typescript
import { cn } from '@cartop/ui-utils'

// Basic usage
<div className={cn('px-2 py-1', 'text-white')} />
// => 'px-2 py-1 text-white'

// Conditional classes
<div className={cn(
  'px-2 py-1',
  isError && 'bg-red-500',
  isSuccess && 'bg-green-500',
  'text-white'
)} />

// Conflict resolution (later class wins)
<div className={cn('px-2', 'px-4')} />
// => 'px-4'

<div className={cn('text-blue-500', 'text-red-500')} />
// => 'text-red-500'

// Component props pattern
interface ButtonProps {
  className?: string
  variant?: 'default' | 'destructive'
}

function Button({ className, variant = 'default' }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'default' && 'bg-blue-500 text-white',
        variant === 'destructive' && 'bg-red-500 text-white',
        className // User's custom classes override defaults
      )}
    />
  )
}
```

## How It Works

The `cn()` utility combines two powerful libraries:

1. **clsx** - Conditionally construct className strings
2. **tailwind-merge** - Intelligently merge Tailwind CSS classes

This ensures:
- ✅ Conditional class application
- ✅ Proper Tailwind class conflict resolution
- ✅ Clean, readable className declarations
- ✅ Type-safe class value handling

## Benefits

✅ **DRY Principle** - Shared utility across all apps
✅ **Conflict Resolution** - Tailwind classes properly merged
✅ **Type Safety** - TypeScript support for class values
✅ **Conditional Classes** - Clean conditional className logic
✅ **Reusable Components** - Standard pattern for component styling
