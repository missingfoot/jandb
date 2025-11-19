import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col bg-neutral-900 text-white">
      {children}
    </div>
  );
}
