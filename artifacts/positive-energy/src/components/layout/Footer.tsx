import React from 'react';
import { Link } from 'wouter';
import { contactData } from '@/data/company';
import { Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1">
            <Link href="/" className="inline-flex mb-6 hover:opacity-80 transition-opacity">
              <img
                src="/logos/pe-logo-wide.png"
                alt="Positive Energy"
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Positive Energy provides commercial EV charging, distributed energy, resilient power, and complex electrical project support from Tennessee.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Services</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">Projects</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gallery</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{contactData.serviceArea}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`tel:${contactData.phone.replace(/[^0-9]/g, '')}`} className="hover:text-primary transition-colors">
                  {contactData.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Positive Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
