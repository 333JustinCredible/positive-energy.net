import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-background to-background pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We deliver hardened electrical infrastructure for clients who can't afford downtime. From fleet charging hubs to off-grid microgrids.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}
              >
                {/* Visual Placeholder */}
                <div className="w-full lg:w-1/2 aspect-[4/3] bg-card border border-border relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-background to-primary/10 opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="h-1 w-12 bg-primary mb-4" />
                    <div className="text-6xl font-heading font-black text-foreground/10 opacity-50 group-hover:text-primary/20 transition-colors duration-700">
                      0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 uppercase tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  {(service.partners || service.credentials) && (
                    <div className="pt-8 border-t border-border">
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                        {service.partners ? 'Hardware Partners' : 'Credentials'}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {(service.partners || service.credentials)?.map((badge, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-card border border-border text-sm text-foreground"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-10">
                    <Link href="/contact">
                      <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
                        DISCUSS A PROJECT
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 uppercase">
            Ready to break ground?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Our crews are dispatched from Nashville across the Southeast. Let's talk about your infrastructure needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-background text-foreground hover:bg-card rounded-none h-14 px-8 text-lg font-bold border-2 border-transparent">
              GET A PROPOSAL
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
