import { ReactNode } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface ScrollContainerProps {
  children: ReactNode;
  dependencies?: unknown[];
}

export function ScrollContainer({ children, dependencies = [] }: ScrollContainerProps) {
  const { containerRef } = useAutoScroll<HTMLDivElement>(dependencies);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
      }}
    >
      {children}
    </div>
  );
}
