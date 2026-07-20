import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Zap, Battery, Wrench, HardHat } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { statsData } from '@/data/company';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/fade-in';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 border-b border-border">
        <div className="absolute inset-0 bg-background z-0" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn className="max-w-4xl" direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Nashville, TN & Southeast Region
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading uppercase leading-[0.9] tracking-tight mb-8">
              Commercial <br />
              <span className="text-primary">Power</span> <br />
              Infrastructure.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We engineer, build, and maintain EV charging, solar, and resilient power systems for clients who can't afford downtime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-bold rounded-none uppercase">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-none uppercase border-border hover:bg-muted group">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Fast Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {statsData.map((stat, idx) => (
              <StaggerItem 
                key={idx} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="py-8 px-4 text-center"
              >
                <div className="text-3xl md:text-4xl font-black font-heading text-secondary mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-4">Core Capabilities</h2>
              <p className="text-xl text-muted-foreground">The expertise of a consultancy with the execution of a seasoned field crew.</p>
            </div>
            <Link href="/services" className="text-primary font-bold uppercase tracking-wider hover:underline flex items-center gap-2">
              All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <Stagger className="grid md:grid-cols-2 gap-8">
            <StaggerItem variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link href="/services" className="group block p-8 bg-card border border-border hover:border-primary/50 transition-colors h-full">
                <Zap className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-heading uppercase mb-4">Commercial EV Infrastructure</h3>
                <p className="text-muted-foreground mb-6">L2 and DC Fast Charging deployments for fleets, hospitality, multi-family, and public retail locations.</p>
                <div className="text-sm font-bold text-primary uppercase flex items-center gap-2 mt-auto pt-4">Explore <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
              </Link>
            </StaggerItem>

            <StaggerItem variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link href="/services" className="group block p-8 bg-card border border-border hover:border-primary/50 transition-colors h-full">
                <Battery className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-heading uppercase mb-4">Distributed Energy</h3>
                <p className="text-muted-foreground mb-6">Commercial solar PV, smart battery storage, and demand management systems to take control of your power.</p>
                <div className="text-sm font-bold text-primary uppercase flex items-center gap-2 mt-auto pt-4">Explore <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
              </Link>
            </StaggerItem>

            <StaggerItem variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link href="/services" className="group block p-8 bg-card border border-border hover:border-primary/50 transition-colors h-full">
                <Wrench className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-heading uppercase mb-4">Field Services & Maint.</h3>
                <p className="text-muted-foreground mb-6">On-call electrical repair, emergency response, and preventative maintenance with 24/7 dispatch capability.</p>
                <div className="text-sm font-bold text-primary uppercase flex items-center gap-2 mt-auto pt-4">Explore <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
              </Link>
            </StaggerItem>

            <StaggerItem variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link href="/services" className="group block p-8 bg-card border border-border hover:border-primary/50 transition-colors h-full">
                <HardHat className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-heading uppercase mb-4">Resilient & Remote Power</h3>
                <p className="text-muted-foreground mb-6">Off-grid event power, disaster response microgrids, and temporary infrastructure deployments.</p>
                <div className="text-sm font-bold text-primary uppercase flex items-center gap-2 mt-auto pt-4">Explore <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-4">Tested in the Field</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">From hurricanes to music festivals, our systems perform when it matters most.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projectsData.slice(0, 3).map((project) => (
              <div key={project.id} className="group bg-background border border-border hover:border-primary/50 transition-all flex flex-col">
                <div className="p-8 flex-1">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.category.slice(0, 2).map((cat, i) => (
                      <span key={i} className="text-xs font-bold uppercase text-secondary">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold font-heading uppercase mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{project.summary}</p>
                  
                  <div className="mt-auto">
                    <p className="font-bold text-foreground text-sm border-l-2 border-primary pl-3">
                      {project.metrics[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-heading uppercase mb-6 text-background">
            Build It Right.<br />The First Time.
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-background/80 font-medium">
            Contact our engineering and field teams to discuss your next commercial infrastructure project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-background text-foreground hover:bg-card h-16 px-10 text-xl font-bold rounded-none uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all">
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>

    </Layout>
  );
}
