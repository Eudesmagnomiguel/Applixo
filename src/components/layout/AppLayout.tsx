import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col md:pl-64">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
