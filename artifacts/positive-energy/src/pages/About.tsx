import { Layout } from '@/components/layout/Layout';
import { statsData } from '@/data/company';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { HardHat, ShieldCheck, Zap } from 'lucide-react';

const relationshipNames = [
  "New Use Energy",
  "Schneider Electric",
  "Radiant Engineering",
  "CED",
  "Greentech Renewables",
  "Lane Valente Industries",
  "ChargePoint",
  "ABB",
  "FootPrint Project",
  "OVRDRV",
  "Music Sustainability Alliance",
  "Drive Electric Tennessee"
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-card border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
              Built for Complex Energy Projects.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Positive Energy is a Tennessee-based energy infrastructure contractor focused on EV charging, distributed energy, resilient power, and complex electrical projects.
            </p>
            <div className="mt-10 max-w-md border border-dashed border-primary/60 bg-background/40 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                About Hero — Positive Energy Field / Infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {statsData.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black font-heading text-secondary mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Evolution */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-6">
              From EV Charging to Energy Infrastructure
            </h2>
            <div className="h-1 w-20 bg-primary mb-8" />
            <div className="space-y-5 text-xl text-muted-foreground leading-relaxed">
              <p>
                Positive Energy began in 2020 with a focus on EV charging infrastructure. As projects became larger and more complex, the work expanded into distributed energy, monitoring, battery storage, resilient power, service and project delivery.
              </p>
              <p>
                Today, EV charging remains a core specialty while the company continues building toward a broader electric-energy future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading uppercase mb-4">How We Work</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <HardHat className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Field Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                We approach projects with installation, commissioning, service, and long-term operation in mind.
              </p>
            </div>
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <Zap className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Integrated Systems</h3>
              <p className="text-muted-foreground leading-relaxed">
                We look beyond individual equipment to the electrical infrastructure, controls, communications, and energy systems around it.
              </p>
            </div>
            <div className="bg-card p-8 border border-border hover:border-primary/30 transition-colors">
              <ShieldCheck className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold uppercase font-heading mb-4">Extended Capability</h3>
              <p className="text-muted-foreground leading-relaxed">
                When a project needs specialized engineering, equipment, logistics, or field support, Positive Energy can draw from an established network of experienced organizations and specialists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Wall */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading uppercase mb-4">Relationships That Extend Our Reach</h2>
            <p className="text-muted-foreground">Positive Energy works with manufacturers, distributors, engineers, contractors, and energy organizations to bring the right expertise, equipment, and resources to each project.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {relationshipNames.map((name) => (
              <div key={name} className="flex min-h-20 items-center justify-center border border-border bg-background px-4 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading uppercase mb-6">Let’s Talk About Your Project.</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            EV charging, distributed energy, resilient power, or a complex electrical project — start with the site, the requirements, and the goal.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-bold uppercase">
              Discuss Your Project
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
