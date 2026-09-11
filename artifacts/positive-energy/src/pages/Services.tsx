import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveImage } from '@/components/ResponsiveImage';

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
            Positive Energy designs, builds, commissions, and supports EV charging, distributed energy, and resilient power systems for complex projects.
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
                {/* Service Image */}
                <div className="w-full lg:w-1/2 aspect-[4/3] bg-card border border-border relative group overflow-hidden">
                  <ResponsiveImage
                    src={`/images/services/${service.id}.jpg`}
                    alt={service.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-opacity duration-700" />
                  <div className="absolute bottom-6 left-6">
                    <div className="h-1 w-12 bg-primary mb-3" />
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
                    <Button asChild variant="outline" className="min-h-11 rounded-none border-primary text-foreground hover:bg-primary hover:text-foreground group">
                      <Link href="/contact">
                        DISCUSS YOUR PROJECT
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-14">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/projects/residential-energy-distributed-power"
            className="group flex flex-col gap-6 border border-border bg-background p-7 transition-colors hover:border-primary/50 md:flex-row md:items-center md:justify-between md:gap-10 md:p-9"
            aria-label="View Complex Residential Energy capability"
          >
            <div className="max-w-3xl">
              <h2 className="mb-3 text-3xl font-bold uppercase tracking-tight font-heading">
                Complex Residential Energy
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Integrated battery backup, solar, EV charging, energy monitoring, and electrical infrastructure for large homes and technically demanding properties.
              </p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 uppercase">
            Let’s Talk About Your Project.
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Planning an EV charging, distributed energy, resilient power, or complex electrical project? Let’s look at the site, the requirements, and the best path forward.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-card rounded-none h-14 px-8 text-lg font-bold border-2 border-transparent">
            <Link href="/contact">
              Discuss Your Project
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
