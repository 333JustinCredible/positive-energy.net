import { projectsData } from '@/data/projects';

export interface SeoConfig {
  title: string;
  description: string;
  image: string;
}

const defaultSeo: SeoConfig = {
  title: 'Positive Energy | Commercial Power Infrastructure',
  description:
    "We engineer, build, and maintain EV charging, solar, and resilient power systems for clients who can't afford downtime.",
  image: '/logos/pe-logo-wide.png',
};

export const seoByPath: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/services': {
    title: 'EV Charging & Resilient Power Services | Positive Energy',
    description:
      "We deliver hardened electrical infrastructure for clients who can't afford downtime. From fleet charging hubs to off-grid microgrids.",
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
    title: 'The Crew That Shows Up | Positive Energy',
    description:
      'We are a field-hardened crew of electricians, engineers, and project managers building the infrastructure for the energy transition.',
    image: defaultSeo.image,
  },
  '/contact': {
    title: 'Get a Quote | Positive Energy',
    description:
      "Whether it's a multi-site EV rollout or emergency response power, we're ready to deploy. Tell us about your project.",
    image: defaultSeo.image,
  },
  '/markets': {
    title: 'Markets | Positive Energy',
    description: "We're currently wiring up this section. Check back soon for updates.",
    image: defaultSeo.image,
  },
  '/case-studies': {
    title: 'Case Studies | Positive Energy',
    description: "We're currently wiring up this section. Check back soon for updates.",
    image: defaultSeo.image,
  },
  '/faq': {
    title: 'FAQ | Positive Energy',
    description: "We're currently wiring up this section. Check back soon for updates.",
    image: defaultSeo.image,
  },
  '/financing': {
    title: 'Financing | Positive Energy',
    description: "We're currently wiring up this section. Check back soon for updates.",
    image: defaultSeo.image,
  },
  '/resources': {
    title: 'Resources | Positive Energy',
    description: "We're currently wiring up this section. Check back soon for updates.",
    image: defaultSeo.image,
  },
};

export const notFoundSeo: SeoConfig = {
  title: 'Page Not Found | Positive Energy',
  description: "The page you're looking for doesn't exist or has been moved.",
  image: defaultSeo.image,
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
      description: project.summary,
      image: project.coverImage?.src ?? project.image,
    };
  }

  return notFoundSeo;
}