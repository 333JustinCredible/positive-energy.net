import React from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
              className={`text-sm font-medium transition-colors hover:text-foreground ${location === link.href ? 'text-foreground' : 'text-muted-foreground'}`}
              data-testid={`link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none">
            <Link href="/contact" data-testid="link-nav-quote">
                DISCUSS YOUR PROJECT
            </Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          ref={menuButtonRef}
          className="md:hidden min-h-11 min-w-11 p-2 text-foreground"
          onClick={() => {
            setIsOpen((open) => !open);
          }}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div id="mobile-navigation" className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border py-4 px-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setIsOpen(false);
                menuButtonRef.current?.focus();
              }}
              className={`text-lg font-medium p-2 ${location === link.href ? 'text-primary' : 'text-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none py-6 text-lg mt-2">
              <Link
                href="/contact"
                onClick={() => {
                  setIsOpen(false);
                  menuButtonRef.current?.focus();
                }}
              >
              DISCUSS YOUR PROJECT
              </Link>
            </Button>
        </div>
      )}
    </header>
  );
}
