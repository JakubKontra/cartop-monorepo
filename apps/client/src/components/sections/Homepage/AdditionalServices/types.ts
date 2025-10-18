import type React from 'react';

export type CarouselTheme = 'light' | 'dark';

export interface CarouselItem {
  innerItem: React.ReactNode;
  buttonText: string;
}
