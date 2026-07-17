import React from 'react';
import { Link } from 'wouter';
import { contactData } from '@/data/company';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-primary mb-6 inline-block">
              <Zap className="h-8 w-8 fill-primary inline mr-2" />
              <span className="font-heading font-bold text-xl tracking-tight text-foreground uppercase">
                Positive Energy
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The crew that shows up. Commercial energy infrastructure, EV charging, and resilient power systems for the Southeast.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Work</Link></li>
              <li><Link href="/markets" className="text-muted-foreground hover:text-primary transition-colors text-sm">Markets</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">All Services</Link></li>
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm">Case Studies</Link></li>
              <li><Link href="/financing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Financing</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
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
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${contactData.email}`} className="hover:text-primary transition-colors">
                  {contactData.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Positive Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary text-xs">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
