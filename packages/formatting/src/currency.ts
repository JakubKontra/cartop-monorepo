/**
 * Currency formatting utilities
 */

export interface CurrencyOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  amount: number,
  options: CurrencyOptions = {}
): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
}
