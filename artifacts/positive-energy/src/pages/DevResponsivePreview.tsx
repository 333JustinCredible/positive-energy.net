import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';

const previewPages = [
  { path: '/', label: 'Home' },
  { path: '/contact', label: 'Contact' },
  { path: '/projects', label: 'Projects' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/projects/chuck-hutton-toyota', label: 'Chuck Hutton project' },
  { path: '/projects/toyota-lexus-multi-site', label: 'Toyota & Lexus project' },
  { path: '/projects/hurricane-helene-response', label: 'Hurricane Helene project' },
  { path: '/projects/luck-reunion', label: 'Luck Reunion project' },
  { path: '/projects/residential-energy-distributed-power', label: 'Residential energy project' },
  { path: '/projects/ev-charging-service-om-technical-support', label: 'Service & O&M project' },
];

const previewWidths = [320, 390, 402, 768, 1024, 1280, 1440] as const;

export default function DevResponsivePreview() {
  const [page, setPage] = useState('/');
  const [width, setWidth] = useState<number>(390);
  const selectedPage = useMemo(
    () => previewPages.find((item) => item.path === page) ?? previewPages[0],
    [page],
  );
  const previewUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${selectedPage.path}`;

  return (
    <Layout>
      <section className="border-b border-border bg-card pt-28 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Development only
          </p>
          <h1 className="font-heading text-4xl font-bold uppercase md:text-6xl">
            Responsive preview
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Preview the actual routed pages at fixed viewport widths. This route is only registered in development and is not linked from the site navigation.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-6">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-end md:px-6">
          <label className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-bold uppercase tracking-wider">
            Page
            <select
              value={page}
              onChange={(event) => setPage(event.target.value)}
              className="h-11 rounded-none border border-border bg-card px-3 text-sm font-medium normal-case tracking-normal"
            >
              {previewPages.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider">
            Viewport width
            <select
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              className="h-11 rounded-none border border-border bg-card px-3 text-sm font-medium normal-case tracking-normal"
            >
              {previewWidths.map((option) => (
                <option key={option} value={option}>
                  {option}px
                </option>
              ))}
            </select>
          </label>
          <Link
            href={selectedPage.path}
            className="inline-flex min-h-11 items-center justify-center border border-primary px-4 text-sm font-bold uppercase tracking-wider text-foreground hover:bg-primary"
          >
            Open page
          </Link>
        </div>
      </section>

      <section className="overflow-auto bg-muted/30 py-10">
        <div className="mx-auto flex min-w-fit justify-center px-4">
          <div className="border border-border bg-background shadow-xl" style={{ width }}>
            <iframe
              key={`${selectedPage.path}-${width}`}
              title={`${selectedPage.label} at ${width}px`}
              src={previewUrl}
              className="block h-[760px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}