import React from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-testid="link-home">
          <img
            src="/logos/pe-logo-wide.png"
            alt="Positive Energy"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid={`link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" data-testid="link-nav-quote">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none">
              GET A QUOTE
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border py-4 px-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium p-2 ${location === link.href ? 'text-primary' : 'text-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none py-6 text-lg mt-2">
              GET A QUOTE
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
