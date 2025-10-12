import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and resolves conflicts
 *
 * @example
 * cn('px-2 py-1', { 'bg-red-500': isError }, 'text-white')
 * // => 'px-2 py-1 bg-red-500 text-white'
 *
 * @example
 * cn('px-2', 'px-4') // => 'px-4' (later class wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
