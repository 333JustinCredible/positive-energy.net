import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getProjectForPath, getSeoForPath, siteUrl, toMetaDescription } from '@/data/seo';

const managedAttribute = 'data-seo-managed';
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

function addMeta(attribute: 'name' | 'property', value: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute(attribute, value);
  meta.setAttribute('content', content);
  meta.setAttribute(managedAttribute, 'true');
  document.head.appendChild(meta);
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

function addJsonLd(data: Record<string, unknown>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute(managedAttribute, 'true');
  script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  document.head.appendChild(script);
}

function getBreadcrumbNames(path: string, project?: ReturnType<typeof getProjectForPath>) {
  if (project) {
    return [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: project.title, url: path },
    ];
  }

  const pageNames: Record<string, string> = {
    '/': 'Home',
    '/services': 'Services',
    '/projects': 'Projects',
    '/gallery': 'Gallery',
    '/about': 'About',
    '/contact': 'Contact',
    '/justin': 'Justin Huff',
  };
  const name = pageNames[path];

  return name
    ? [
        { name: 'Home', url: '/' },
        ...(path === '/' ? [] : [{ name, url: path }]),
      ]
    : [];
}

function addStructuredData(routePath: string, seo: ReturnType<typeof getSeoForPath>) {
  const project = getProjectForPath(routePath);
  const pageUrl = toAbsoluteUrl(routePath);
  const breadcrumbNames = getBreadcrumbNames(routePath, project);
  const graph: Record<string, unknown>[] = [];

  if (breadcrumbNames.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: breadcrumbNames.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: toAbsoluteUrl(breadcrumb.url),
      })),
    });
  }

  if (routePath === '/justin') {
    const personId = `${pageUrl}#person`;
    graph.push({
      '@type': 'ProfilePage',
      '@id': `${pageUrl}#profilepage`,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    });
    graph.push({
      '@type': 'Person',
      '@id': personId,
      name: 'Justin Huff',
      jobTitle: 'Founder & Principal',
      url: pageUrl,
      image: toAbsoluteUrl('/images/justin-huff.webp'),
      telephone: '+1-615-308-0622',
      email: 'justin@pe-charging.com',
      worksFor: { '@id': organizationId },
      sameAs: ['https://www.linkedin.com/in/333-justin-huff/'],
    });
  }

  if (project) {
    const projectId = `${pageUrl}#project`;
    const projectDescription = toMetaDescription(project.indexSummary || project.summary);
    const projectImage = project.coverImage?.src ?? project.image;

    graph.push({
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.title,
      description: projectDescription,
      isPartOf: { '@id': websiteId },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
      mainEntity: { '@id': projectId },
    });
    graph.push({
      '@type': 'CreativeWork',
      '@id': projectId,
      name: project.title,
      description: projectDescription,
      url: pageUrl,
      ...(projectImage ? { image: toAbsoluteUrl(projectImage) } : {}),
      creator: { '@id': organizationId },
      publisher: { '@id': organizationId },
    });
  }

  if (graph.length > 0) {
    addJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  }
}

export function SEO() {
  const [location] = useLocation();

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    const path = location.split('?')[0] || '/';
    const routePath =
      basePath && path.startsWith(basePath)
        ? path.slice(basePath.length) || '/'
        : path;
    const seo = getSeoForPath(routePath);
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '');
    const imageUrl = configuredSiteUrl
      ? new URL(seo.image, `${configuredSiteUrl}/`).toString()
      : seo.image;

    document.title = seo.title;
    document.head
      .querySelectorAll(`[${managedAttribute}]`)
      .forEach((element) => element.remove());

    addMeta('name', 'description', seo.description);
    addMeta('name', 'robots', seo.robots ?? 'index, follow');
    addMeta('property', 'og:title', seo.title);
    addMeta('property', 'og:description', seo.description);
    addMeta('property', 'og:image', imageUrl);
    addMeta('property', 'og:type', 'website');
    addMeta('property', 'og:site_name', 'Positive Energy');
    addMeta('name', 'twitter:card', 'summary_large_image');
    addMeta('name', 'twitter:title', seo.title);
    addMeta('name', 'twitter:description', seo.description);
    addMeta('name', 'twitter:image', imageUrl);

    if (configuredSiteUrl) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = new URL(
        routePath === '/' ? '/' : routePath,
        `${configuredSiteUrl}/`,
      ).toString();
      canonical.setAttribute(managedAttribute, 'true');
      document.head.appendChild(canonical);
      addMeta('property', 'og:url', canonical.href);
    }

    addStructuredData(routePath, seo);
  }, [location]);

  return null;
}