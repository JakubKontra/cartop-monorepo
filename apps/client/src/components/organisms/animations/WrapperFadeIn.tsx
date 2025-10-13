'use client';

import type { ElementType, ReactNode } from 'react';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Map element types to their corresponding HTML element refs
type ElementTagNameMap = {
  article: HTMLElement;
  aside: HTMLElement;
  div: HTMLDivElement;
  footer: HTMLElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  header: HTMLElement;
  li: HTMLLIElement;
  main: HTMLElement;
  nav: HTMLElement;
  p: HTMLParagraphElement;
  section: HTMLElement;
  span: HTMLSpanElement;
  ul: HTMLUListElement;
};

type ElementTag = keyof ElementTagNameMap;

interface WrapperFadeInProps<TElement extends ElementTag = 'div'> {
  as?: TElement;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const WrapperFadeIn = <TElement extends ElementTag = 'div'>({
  as,
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.8,
}: WrapperFadeInProps<TElement>) => {
  const Component = (as || 'div') as ElementType;
  const elementRef = useRef<ElementTagNameMap[TElement]>(null);
  const hasAnimated = useRef(false);
  const isInView = useIntersectionObserver({ ref: elementRef, threshold });

  useEffect(() => {
    if (!elementRef.current || hasAnimated.current) return;

    const element = elementRef.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 50,
    });

    // Animate when in view (only once)
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.to(element, {
        delay,
        duration,
        ease: 'power2.out',
        opacity: 1,
        y: 0,
      });
    }
  }, [isInView, delay, duration]);

  return (
    <Component ref={elementRef} className={className}>
      {children}
    </Component>
  );
};
