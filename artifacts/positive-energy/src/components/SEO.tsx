import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getSeoForPath } from '@/data/seo';

const managedAttribute = 'data-seo-managed';

function addMeta(attribute: 'name' | 'property', value: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute(attribute, value);
  meta.setAttribute('content', content);
  meta.setAttribute(managedAttribute, 'true');
  document.head.appendChild(meta);
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
    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '');
    const imageUrl = siteUrl
      ? new URL(`${basePath}${seo.image}`, `${siteUrl}/`).toString()
      : seo.image;

    document.title = seo.title;
    document.head
      .querySelectorAll(`[${managedAttribute}]`)
      .forEach((element) => element.remove());

    addMeta('name', 'description', seo.description);
    addMeta('name', 'robots', 'index, follow');
    addMeta('property', 'og:title', seo.title);
    addMeta('property', 'og:description', seo.description);
    addMeta('property', 'og:image', imageUrl);
    addMeta('property', 'og:type', 'website');
    addMeta('name', 'twitter:card', 'summary_large_image');
    addMeta('name', 'twitter:title', seo.title);
    addMeta('name', 'twitter:description', seo.description);
    addMeta('name', 'twitter:image', imageUrl);

    if (siteUrl) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = new URL(
        `${basePath}${routePath === '/' ? '' : routePath}`,
        `${siteUrl}/`,
      ).toString();
      canonical.setAttribute(managedAttribute, 'true');
      document.head.appendChild(canonical);
      addMeta('property', 'og:url', canonical.href);
    }
  }, [location]);

  return null;
}