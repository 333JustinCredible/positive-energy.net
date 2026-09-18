import { projectsData } from '@/data/projects';

export interface SeoConfig {
  title: string;
  description: string;
  image: string;
  robots?: 'index, follow' | 'noindex, follow';
}

export const siteUrl = 'https://positive-energy.net';

export function toMetaDescription(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

const defaultSeo: SeoConfig = {
  title: 'Positive Energy | Commercial Power Infrastructure',
  description:
    'Commercial EV charging, distributed energy, and resilient power systems designed and delivered by Positive Energy.',
  image: '/logos/pe-logo-wide.png',
};

export const seoByPath: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/services': {
    title: 'EV Charging & Resilient Power Services | Positive Energy',
    description:
      'Explore Positive Energy services for commercial EV charging, distributed energy, monitoring, O&M, and resilient power.',
    image: defaultSeo.image,
  },
  '/projects': {
    title: 'Field-Proven Energy Infrastructure Projects | Positive Energy',
    description:
      'Explore Positive Energy projects spanning commercial EV charging, distributed energy, remote power, and complex delivery.',
    image: defaultSeo.image,
  },
  '/gallery': {
    title: 'EV Charging & Solar Installation Gallery | Positive Energy',
    description:
      'Real job-site photos from commercial EV charging installs, dealership deployments, and infrastructure projects across the Southeast.',
    image: defaultSeo.image,
  },
  '/about': {
    title: 'About Positive Energy | Energy Infrastructure',
    description:
      'Positive Energy is a Tennessee-based energy infrastructure contractor focused on EV charging, distributed energy, resilient power, and complex electrical projects.',
    image: defaultSeo.image,
  },
  '/contact': {
    title: 'Discuss Your Project | Positive Energy',
    description:
      'Start a project inquiry with Positive Energy for EV charging, distributed energy, resilient power, or complex electrical work.',
    image: defaultSeo.image,
  },
  '/justin': {
    title: 'Justin Huff | Positive Energy',
    description: 'Meet Justin Huff, Founder & Principal of Positive Energy, serving energy infrastructure projects from Middle Tennessee and beyond.',
    image: defaultSeo.image,
  },
};

export const notFoundSeo: SeoConfig = {
  title: 'Page Not Found | Positive Energy',
  description: "The page you're looking for doesn't exist or has been moved.",
  image: defaultSeo.image,
  robots: 'noindex, follow',
};

export function getSeoForPath(path: string): SeoConfig {
  if (seoByPath[path]) {
    return seoByPath[path];
  }

  const projectSlug = path.startsWith('/projects/')
    ? path.slice('/projects/'.length)
    : null;
  const project = projectSlug
    ? projectsData.find((item) => item.slug === projectSlug)
    : undefined;

  if (project) {
    return {
      title: `${project.title} | Positive Energy`,
      description: toMetaDescription(project.indexSummary || project.summary || defaultSeo.description),
      image: project.coverImage?.src ?? project.image ?? defaultSeo.image,
    };
  }

  return notFoundSeo;
}

export function getProjectForPath(path: string) {
  const projectSlug = path.startsWith('/projects/')
    ? path.slice('/projects/'.length)
    : null;

  return projectSlug
    ? projectsData.find((item) => item.slug === projectSlug)
    : undefined;
}