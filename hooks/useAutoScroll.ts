import { useRef, useEffect } from 'react';

export function useAutoScroll<T extends HTMLElement>(dependencies: unknown[] = []) {
  const containerRef = useRef<T>(null);
  const prevScrollHeightRef = useRef<number>(0);

  const scrollToBottom = (instant = false) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: instant ? 'instant' : 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentScrollHeight = container.scrollHeight;
    const prevScrollHeight = prevScrollHeightRef.current;

    // If content was added and we were near the bottom, scroll to new bottom
    if (currentScrollHeight > prevScrollHeight) {
      const isNearBottom =
        container.scrollTop + container.clientHeight >= prevScrollHeight - 100;

      if (isNearBottom || prevScrollHeight === 0) {
        scrollToBottom(prevScrollHeight === 0);
      }
    }

    prevScrollHeightRef.current = currentScrollHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    containerRef,
    scrollToBottom,
  };
}
