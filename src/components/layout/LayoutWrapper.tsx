'use client';

import { usePathname } from 'next/navigation';
import { GlobalNavigation } from './GlobalNavigation';
import { GlobalFooter } from './GlobalFooter';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {!isHome && <GlobalNavigation />}
      <main className="flex-grow">
        {children}
      </main>
      {!isHome && <GlobalFooter />}
    </>
  );
}
