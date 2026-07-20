import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { projectsData } from '@/data/projects';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Projects() {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border relative">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
            Field Proven
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We don't just draft plans; we build them. In boardrooms and muddy fields. Explore our track record of critical infrastructure delivery.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsData.map((project, idx) => (
              <div 
                key={project.id} 
                className="group bg-card border border-border hover:border-primary/50 transition-colors duration-300 flex flex-col h-full"
              >
                {/* Project Image */}
                <div className="aspect-video bg-background relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {project.category.map((cat, i) => (
                      <span key={i} className="bg-background/80 backdrop-blur text-xs font-bold uppercase px-2 py-1 text-primary border border-primary/20">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold font-heading uppercase group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-8 flex-1 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-6 border-t border-border mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i}>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Impact</p>
                          <p className="font-bold text-sm text-secondary">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center p-12 bg-card border border-border">
            <h3 className="text-2xl font-bold font-heading uppercase mb-4">Have a specific project in mind?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              This is just a selection of our public work. We handle confidential commercial deployments across the region.
            </p>
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-bold uppercase tracking-wide">
                Start the Conversation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
