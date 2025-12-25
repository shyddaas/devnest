import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Analytics } from "@vercel/analytics/react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <TopNavigation onMenuClick={() => setMobileMenuOpen(true)} />
      
      <div className="flex flex-1">
        <Sidebar className="hidden xl:block shrink-0" />
        
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1">
          {children}
        </main>
      </div>

      <Footer />
      <Analytics />
    </div>
  );
}
