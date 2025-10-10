/**
 * Date formatting utilities
 */

export interface DateFormatOptions {
  locale?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
}

export function formatDate(
  date: Date | string | number,
  options: DateFormatOptions = {}
): string {
  const { locale = 'en-US', dateStyle = 'medium', timeStyle } = options;

  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(dateObj);
}

export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(dateObj);
}
