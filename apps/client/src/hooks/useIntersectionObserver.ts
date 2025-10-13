import type { RefObject } from 'react';

import { useEffect, useState } from 'react';

type UseIntersectionObserverProps = {
  elementId?: string;
  ref?: RefObject<HTMLElement | null>;
  threshold?: number;
};

// This hook is used to check if an element is intersecting with the viewport.
// Using primarily for playing videos when the video is in the viewport.

export const useIntersectionObserver = ({
  elementId,
  ref,
  threshold = 0.5,
}: UseIntersectionObserverProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold },
    );

    const element = ref?.current || (elementId ? document.getElementById(elementId) : null);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [elementId, ref, threshold]);

  return isActive;
};
