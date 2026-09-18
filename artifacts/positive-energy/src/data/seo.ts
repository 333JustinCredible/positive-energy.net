import { projectsData } from '@/data/projects';

export interface SeoConfig {
  title: string;
  description: string;
  image: string;
  robots?: 'index, follow' | 'noindex, follow';
}

const defaultSeo: SeoConfig = {
  title: 'Positive Energy | Commercial Power Infrastructure',
  description:
    'Positive Energy designs, builds, commissions, and supports EV charging, distributed energy, and resilient power systems for complex projects.',
  image: '/logos/pe-logo-wide.png',
};

export const seoByPath: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/services': {
    title: 'EV Charging & Resilient Power Services | Positive Energy',
    description:
      'Positive Energy designs, builds, commissions, and supports EV charging, distributed energy, and resilient power systems for complex projects.',
    image: defaultSeo.image,
  },
  '/projects': {
    title: 'Field-Proven Energy Infrastructure Projects | Positive Energy',
    description:
      "We don't just draft plans; we build them. Explore our track record of critical infrastructure delivery.",
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
      'Planning an EV charging, distributed energy, resilient power, or complex electrical project? Tell us about the site, requirements, and goals.',
    image: defaultSeo.image,
  },
  '/justin': {
    title: 'Justin Huff | Positive Energy',
    description: 'Justin Huff — Founder & Principal of Positive Energy. Energy Infrastructure, Sustainability, Resilient Power.',
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
      description: project.summary || defaultSeo.description,
      image: project.coverImage?.src ?? project.image ?? defaultSeo.image,
    };
  }

  return notFoundSeo;
}