import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { statsData, partnersData } from '@/data/company';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { HardHat, ShieldCheck, Zap } from 'lucide-react';
import * as SiIcons from 'react-icons/si';

// Helper to safely render SiIcons if they exist, or fallback to text
const getPartnerIcon = (name: string) => {
  const iconName = 'Si' + name.replace(/\s+/g, '');
  // @ts-ignore - dynamic access
  const IconComponent = SiIcons[iconName];
  if (IconComponent) {
    return <IconComponent className="h-10 w-10 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all" />;
  }
  return <span className="font-heading font-bold text-xl opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all">{name}</span>;
};

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-card border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
              The Crew That Shows Up.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We are not consultants who subcontract. We are a field-hardened crew of electricians, engineers, and project managers building the infrastructure for the energy transition.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {statsData.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black font-heading text-secondary mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading uppercase mb-4">How We Operate</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <HardHat className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Field-First Mentality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Plans are great until you hit rock. Our leadership comes from the field, meaning our engineering is actually constructible and our timelines reflect reality.
              </p>
            </div>
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <Zap className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Mission Critical</h3>
              <p className="text-muted-foreground leading-relaxed">
                From powering Willie Nelson's private ranch to deploying disaster recovery microgrids in hurricanes, we treat every project like failure isn't an option.
              </p>
            </div>
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <ShieldCheck className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Technical Authority</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain active credentials with USGBC, IFMA, and CSI. We understand the complex interplay of commercial loads, utility tariffs, and incentive programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Wall */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading uppercase mb-4">Hardware Partners & Affiliations</h2>
            <p className="text-muted-foreground">Certified installers and trusted partners for the industry's best technology.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-80">
            {partnersData.map((partner, idx) => (
              <div key={idx} className="group flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
                {getPartnerIcon(partner.name)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading uppercase mb-6">Need a reliable partner?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop dealing with consultants who vanish when the trenching starts. Work with the crew that owns the outcome.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-bold uppercase">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
