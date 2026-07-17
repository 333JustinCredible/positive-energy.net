import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface ComingSoonProps {
  title: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase mb-6 text-foreground font-heading">
          {title}
        </h1>
        <div className="w-24 h-1 bg-primary mb-8" />
        <p className="text-xl text-muted-foreground max-w-lg">
          We're currently wiring up this section. Check back soon for updates.
        </p>
      </div>
    </Layout>
  );
}
