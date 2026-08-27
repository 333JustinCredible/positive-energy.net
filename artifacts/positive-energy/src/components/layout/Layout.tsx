import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEO } from '@/components/SEO';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <SEO />
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
