import React from 'react';
import { Link, useRoute } from 'wouter';
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calendar,
  Images,
  MapPin,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import {
  projectsData,
  type Project,
  type ProjectContentType,
  type ProjectImage,
} from '@/data/projects';
import { galleryPhotos } from '@/data/gallery';

const contentTypeLabels: Record<ProjectContentType, string> = {
  'case-study': 'Case Study',
  'program-experience': 'Program Experience',
  capability: 'Capability',
};

function getProjectImages(project: Project): ProjectImage[] {
  if (project.images && project.images.length > 0) {
    return project.images
      .filter((image) => Boolean(image.src))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const legacyImages: ProjectImage[] = [];

  if (project.coverImage) {
    legacyImages.push(project.coverImage);
  } else if (project.image) {
    legacyImages.push({
      src: project.image,
      role: 'hero',
      placeholderLabel: `${project.title} photography`,
      caption: '',
      alt: project.title,
      sortOrder: 0,
    });
  }

  if (project.supportingImages) {
    legacyImages.push(...project.supportingImages);
  }

  return legacyImages
    .filter((image) => Boolean(image.src))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function ProjectImageCard({
  image,
  hero = false,
}: {
  image: ProjectImage;
  hero?: boolean;
}) {
  return (
    <figure className="bg-card border border-border overflow-hidden">
      <div className={`${hero ? 'aspect-[4/3]' : 'aspect-video'} bg-muted/30 relative overflow-hidden`}>
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading={hero ? 'eager' : 'lazy'}
        />
        {hero && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
      </div>
      <figcaption className="p-4 text-sm text-muted-foreground">
        {image.caption}
      </figcaption>
    </figure>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold font-heading uppercase mb-4">{title}</h2>
      <div className="text-foreground/80 leading-relaxed">{children}</div>
    </section>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 items-start">
          <span className="h-1.5 w-1.5 bg-primary mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectHero({ project }: { project: Project }) {
  const heroImage = getProjectImages(project).find((image) => image.role === 'hero');

  return (
    <section className="bg-card border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className={heroImage
          ? 'grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center'
          : 'max-w-4xl'}>
          <div>
            {project.contentType && (
              <p className="text-sm text-primary uppercase tracking-[0.2em] font-bold mb-4">
                {contentTypeLabels[project.contentType]}
              </p>
            )}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase font-heading leading-[0.95] mb-7 break-words">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-7">
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
              {project.contractedBy && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  <span>Contracted by {project.contractedBy}</span>
                </div>
              )}
            </div>
            {project.summary && (
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {project.summary}
              </p>
            )}
          </div>

          {heroImage && <ProjectImageCard image={heroImage} hero />}
        </div>
      </div>
    </section>
  );
}

function ProjectNotFound() {
  return (
    <Layout>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-sm text-primary uppercase tracking-[0.2em] font-bold mb-4">
            Projects
          </p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase font-heading leading-[0.95] mb-6">
            Project not found
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The project link may be outdated or unavailable.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slug');
  const project = projectsData.find((item) => item.slug === params?.slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const hasGalleryPhotos = galleryPhotos.some((photo) => photo.project === project.id);
  const projectImages = getProjectImages(project);
  const supportingImages = projectImages.filter((image) => image.role !== 'hero');

  return (
    <Layout>
      <ProjectHero project={project} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {project.metrics.map((metric) => (
                <div key={metric} className="bg-card border border-border p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {project.metricsLabel ?? 'Impact'}
                  </p>
                  <p className="font-bold text-secondary">{metric}</p>
                </div>
              ))}
            </div>
          )}

          {(project.challenge ||
            project.solution ||
            (project.servicesProvided && project.servicesProvided.length > 0) ||
            (project.equipmentTechnology && project.equipmentTechnology.length > 0) ||
            project.resultsSignificance) && (
            <div className="max-w-4xl mx-auto space-y-10">
              {project.challenge && (
                <DetailSection title="Challenge">
                  <p>{project.challenge}</p>
                </DetailSection>
              )}

              {project.solution && (
                <DetailSection title="Solution / Positive Energy scope">
                  <p>{project.solution}</p>
                </DetailSection>
              )}

              {project.servicesProvided && project.servicesProvided.length > 0 && (
                <DetailSection title="Services provided">
                  <DetailList items={project.servicesProvided} />
                </DetailSection>
              )}

              {project.equipmentTechnology && project.equipmentTechnology.length > 0 && (
                <DetailSection title="Charging infrastructure">
                  <DetailList items={project.equipmentTechnology} />
                </DetailSection>
              )}

              {project.resultsSignificance && (
                <DetailSection title="Results / significance">
                  <p>{project.resultsSignificance}</p>
                </DetailSection>
              )}

              {project.projectImportance && (
                <DetailSection title="Project importance">
                  <p>{project.projectImportance}</p>
                </DetailSection>
              )}
            </div>
          )}

          {supportingImages.length > 0 && (
            <section className="mt-20 border-t border-border pt-10">
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-sm text-primary uppercase tracking-[0.2em] font-bold mb-3">
                    Project imagery
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase">
                    Supporting images
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportingImages.map((image) => (
                  <ProjectImageCard
                    key={`${image.role}-${image.sortOrder}`}
                    image={image}
                  />
                ))}
              </div>
            </section>
          )}

          {hasGalleryPhotos && (
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                href={`/gallery?project=${project.id}`}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                <Images className="h-4 w-4" />
                View all project photos
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <section className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-sm text-primary uppercase tracking-[0.2em] font-bold mb-2">
                Start a conversation
              </p>
              <h2 className="text-2xl font-bold font-heading uppercase">
                Discuss your project
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
            >
              Discuss Your Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </section>
    </Layout>
  );
}