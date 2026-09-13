import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { projectsData, type ProjectContentType } from '@/data/projects';
import { MapPin, Calendar, ArrowUpRight, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { galleryPhotos } from '@/data/gallery';
import { ResponsiveImage } from '@/components/ResponsiveImage';

const contentTypeLabels: Record<ProjectContentType, string> = {
  'case-study': 'Case Study',
  'program-experience': 'Program Experience',
  capability: 'Capability',
};

export default function Projects() {
  const orderedProjects = [...projectsData].sort(
    (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
  );

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border relative">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
            Field Proven
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore Positive Energy’s work across commercial EV charging, distributed energy, resilient power, and field service.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {orderedProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-card border border-border hover:border-primary/50 transition-colors duration-300 flex flex-col h-full"
              >
                {(project.images?.find((image) => image.role === 'hero')?.src || project.coverImage?.src || project.image) && (
                  /* Project Image */
                  <div className="aspect-video bg-background relative overflow-hidden">
                    <ResponsiveImage
                      src={project.images?.find((image) => image.role === 'hero')?.src || project.coverImage?.src || project.image}
                      alt={project.images?.find((image) => image.role === 'hero')?.alt || project.coverImage?.alt || project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                      {project.category.map((cat, i) => (
                          <span key={i} className="bg-background/80 backdrop-blur text-xs font-bold uppercase px-2 py-1 text-foreground border border-foreground/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-start gap-2 text-2xl font-bold font-heading uppercase group-hover:text-primary transition-colors leading-tight"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="h-5 w-5 shrink-0 mt-1.5" />
                      </Link>
                      {project.contentType && (
                        <p className="text-xs text-foreground uppercase tracking-widest font-bold mt-3">
                          {contentTypeLabels[project.contentType]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    {project.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{project.year}</span>
                      </div>
                    )}
                  </div>

                  {project.summary && (
                    <p className="text-foreground/80 mb-8 flex-1 leading-relaxed">
                           {project.indexSummary ?? project.summary}
                    </p>
                  )}

                  <div className="pt-6 border-t border-border mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i}>
                           <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{project.metricsLabel ?? 'Project context'}</p>
                           <p className="font-bold text-sm text-foreground">{metric}</p>
                        </div>
                      ))}
                    </div>
                    {galleryPhotos.some((p) => p.project === project.id) && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <Link
                          href={`/gallery?project=${project.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                        >
                          <Images className="h-3.5 w-3.5" />
                          View all photos →
                        </Link>
                      </div>
                    )}
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
             <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-bold uppercase tracking-wide">
               <Link href="/contact">
                Discuss Your Project
               </Link>
             </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
