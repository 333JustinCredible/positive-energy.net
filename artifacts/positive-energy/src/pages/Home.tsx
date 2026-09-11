import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  ArrowRight,
  Battery,
  Building2,
  ClipboardCheck,
  HardHat,
  MapPin,
  Settings2,
  Wrench,
  Zap,
} from 'lucide-react';
import { projectsData } from '@/data/projects';
import { statsData } from '@/data/company';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/fade-in';

const featuredProjectSlugs = [
  'chuck-hutton-toyota',
  'toyota-lexus-multi-site',
  'hurricane-helene-response',
] as const;

const featuredProjects = featuredProjectSlugs.map((slug) => {
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Featured project not found: ${slug}`);
  }
  return project;
});

const proofLabels = [
  'EV Chargers Installed',
  'Years Combined Construction Experience',
  'Years Energy & Sustainability Experience',
  'Founded',
];

const proofPoints = statsData.map((stat, index) => ({
  value: stat.value,
  label: proofLabels[index],
}));

const audiences = [
  'General Contractors',
  'Property Owners & Developers',
  'Fleet Operators',
  'Government & Institutional',
  'Architects & Engineers',
  'Complex Residential',
];

const capabilities = [
  {
    icon: Zap,
    title: 'Commercial EV Charging',
    description:
      'High-power DC fast charging, fleet, dealership, public and commercial charging infrastructure.',
  },
  {
    icon: Battery,
    title: 'Distributed Energy & Monitoring',
    description:
      'Solar, battery storage, energy monitoring, load management and integrated power systems.',
  },
  {
    icon: Wrench,
    title: 'Service & O&M',
    description:
      'Commissioning, troubleshooting, repairs, upgrades and lifecycle support.',
  },
  {
    icon: Building2,
    title: 'Design-Build & Project Delivery',
    description:
      'Site assessment, design coordination, electrical infrastructure, construction and commissioning.',
  },
  {
    icon: HardHat,
    title: 'Resilient & Remote Power',
    description:
      'Temporary microgrids, battery power, event infrastructure and emergency-response applications.',
  },
];

const processSteps = [
  { icon: ClipboardCheck, title: 'Assess & Plan' },
  { icon: Settings2, title: 'Design & Coordinate' },
  { icon: HardHat, title: 'Build' },
  { icon: Zap, title: 'Commission' },
  { icon: Wrench, title: 'Support' },
];

function getProjectImage(project: (typeof projectsData)[number]) {
  return (
    project.images?.find((image) => image.role === 'hero' && image.src)?.src ||
    project.image ||
    ''
  );
}

export default function Home() {
  return (
    <Layout>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container relative z-10 mx-auto px-4 py-20 md:px-6 md:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-20">
            <FadeIn className="max-w-3xl" direction="up">
              <div className="mb-8 inline-flex items-center gap-2 border border-primary/30 bg-card px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
                Tennessee • Southeast • Select Nationwide Projects
              </div>

              <h1 className="mb-8 max-w-4xl break-normal max-[359px]:break-all text-4xl font-bold uppercase leading-[0.94] tracking-tight sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl">
                Commercial EV Charging &amp; Energy Infrastructure
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-2xl">
                Positive Energy designs, builds, commissions, and supports EV charging, distributed energy, and resilient power systems for complex projects.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-none bg-primary px-8 text-lg font-bold uppercase text-primary-foreground hover:bg-primary/90 sm:w-auto"
                  >
                    Discuss Your Project
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group h-14 w-full rounded-none border-border px-8 text-lg font-bold uppercase hover:bg-muted sm:w-auto"
                  >
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn className="relative min-h-[220px] overflow-hidden border border-border bg-card/60 lg:min-h-[360px]" direction="up">
              <img
                src="/images/projects/chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-8-04-24.jpg"
                alt="Aerial view of ChargePoint charging dispensers and sitework at Chuck Hutton Toyota's Electri-CITY Park in Memphis, Tennessee."
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 max-w-sm font-heading text-xl font-bold uppercase text-white">
                Commercial charging infrastructure, built for scale.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card" aria-labelledby="proof-heading">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="proof-heading" className="sr-only">
            Proof
          </h2>
          <Stagger className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {proofPoints.map((stat) => (
              <StaggerItem
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="px-3 py-8 text-center md:px-4"
              >
                <div className="mb-1 font-heading text-3xl font-black text-secondary md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16 md:py-20" aria-labelledby="audience-heading">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="mb-10 max-w-2xl" direction="up">
            <h2 id="audience-heading" className="mb-4 font-heading text-3xl font-bold uppercase md:text-4xl">
              Who We Work With
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3">
            {audiences.map((audience) => (
              <StaggerItem
                key={audience}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-card px-5 py-5 font-bold uppercase tracking-tight md:px-6"
              >
                {audience}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24" aria-labelledby="capabilities-heading">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end" direction="up">
            <div className="max-w-2xl">
              <h2 id="capabilities-heading" className="mb-4 font-heading text-4xl font-bold uppercase md:text-5xl">
                Core Capabilities
              </h2>
            </div>
            <Link href="/services" className="flex items-center gap-2 font-bold uppercase tracking-wider text-primary hover:underline">
              All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <StaggerItem
                  key={capability.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href="/services"
                    className="group block h-full border border-border bg-card p-7 transition-colors hover:border-primary/50"
                  >
                    <Icon className="mb-5 h-10 w-10 text-primary" />
                    <h3 className="mb-3 font-heading text-2xl font-bold uppercase">{capability.title}</h3>
                    <p className="text-muted-foreground">{capability.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20 md:py-24" aria-labelledby="featured-heading">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="mb-12 max-w-2xl" direction="up">
            <h2 id="featured-heading" className="mb-4 font-heading text-4xl font-bold uppercase md:text-5xl">
              Featured Projects
            </h2>
          </FadeIn>

          <Stagger className="grid gap-8 lg:grid-cols-3">
            {featuredProjects.map((project) => {
              const image = getProjectImage(project);
              return (
                <StaggerItem
                  key={project.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block h-full border border-border bg-background transition-colors hover:border-primary/50"
                    aria-label={`View ${project.title}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden border-b border-border bg-muted">
                      {image ? (
                        <img
                          src={image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </div>
                    <div className="p-7">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.category.slice(0, 2).map((category) => (
                          <span key={category} className="text-xs font-bold uppercase text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                      <h3 className="mb-3 font-heading text-2xl font-bold uppercase">{project.title}</h3>
                      <p className="mb-6 text-sm text-muted-foreground">{project.summary}</p>
                      <p className="border-l-2 border-primary pl-3 text-sm font-bold text-foreground">
                        {project.metrics[0]}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-10 text-center">
            <Link href="/projects">
              <Button
                variant="outline"
                className="rounded-none border-primary font-bold uppercase text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24" aria-labelledby="process-heading">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="mb-12 max-w-2xl" direction="up">
            <h2 id="process-heading" className="font-heading text-4xl font-bold uppercase md:text-5xl">
              How We Work
            </h2>
          </FadeIn>
          <Stagger className="grid border border-border md:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem
                  key={step.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-secondary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase">{step.title}</h3>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20 md:py-24" aria-labelledby="remote-heading">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-20">
            <FadeIn className="max-w-2xl" direction="up">
              <h2 id="remote-heading" className="mb-6 font-heading text-4xl font-bold uppercase md:text-5xl">
                Power Where the Grid Can’t.
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                Temporary microgrids, battery-powered events, and disaster-response deployments.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/projects/hurricane-helene-response"
                  className="group border border-border bg-background p-5 font-heading text-lg font-bold uppercase transition-colors hover:border-primary/50"
                >
                  Hurricane Helene Disaster Response
                  <ArrowRight className="mt-4 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects/luck-reunion"
                  className="group border border-border bg-background p-5 font-heading text-lg font-bold uppercase transition-colors hover:border-primary/50"
                >
                  Luck Reunion — Battery-Powered Event Infrastructure
                  <ArrowRight className="mt-4 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn className="relative min-h-[260px] overflow-hidden border border-border bg-background" direction="up">
              <img
                src="/images/projects/footprint-project-hurricane-helene-microgrid-camp-miller-2-10-24.jpg"
                alt="Solar and battery microgrid providing temporary power at Camp Miller in Pensacola, North Carolina after Hurricane Helene."
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-sm font-heading text-xl font-bold uppercase text-white">
                Temporary microgrids for event and emergency power.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20" aria-labelledby="reach-heading">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="mb-10 max-w-2xl" direction="up">
            <h2 id="reach-heading" className="font-heading text-4xl font-bold uppercase md:text-5xl">
              Geographic Reach
            </h2>
          </FadeIn>
          <Stagger className="grid gap-px border border-border bg-border md:grid-cols-3">
            <StaggerItem
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-card p-6"
            >
              <MapPin className="mb-5 h-7 w-7 text-primary" />
              <h3 className="font-heading text-2xl font-bold uppercase">Tennessee</h3>
              <p className="mt-2 text-muted-foreground">Primary market</p>
            </StaggerItem>
            <StaggerItem
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-card p-6"
            >
              <MapPin className="mb-5 h-7 w-7 text-primary" />
              <h3 className="font-heading text-2xl font-bold uppercase">Southeast</h3>
              <p className="mt-2 text-muted-foreground">Regional project experience</p>
            </StaggerItem>
            <StaggerItem
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-card p-6"
            >
              <MapPin className="mb-5 h-7 w-7 text-primary" />
              <h3 className="font-heading text-2xl font-bold uppercase">Select Nationwide Projects</h3>
              <p className="mt-2 text-muted-foreground">Specialized projects and program support</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <h2 className="mb-6 font-heading text-4xl font-bold uppercase text-background md:text-6xl">
            Let’s Talk About Your Project.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-background/80 md:text-2xl">
            Planning an EV charging, distributed energy, resilient power, or complex electrical project? Let’s look at the site, the requirements, and the best path forward.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="h-16 rounded-none bg-background px-10 text-xl font-bold uppercase text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 hover:bg-card hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              Discuss Your Project
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}