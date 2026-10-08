'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import type { SiteConfig } from '@/lib/types';

interface NavbarProps {
  siteConfig: SiteConfig;
}

export function Navbar({ siteConfig }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-ink focus:rounded-lg focus:shadow-gold-glow font-medium text-sm"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8',
          isScrolled ? 'py-3' : 'py-5',
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto rounded-2xl transition-all duration-300 ease-out flex items-center justify-between px-4 sm:px-6 py-2.5',
            isScrolled
              ? 'glass shadow-glass border-gold/30 backdrop-blur-md bg-white/80 dark:bg-teal-900/80'
              : 'bg-white/40 backdrop-blur-xs border border-white/30',
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1"
            aria-label="Bastet Small Animal Hospital Home"
          >
            <div className="relative w-8 h-8 rounded-full bg-teal flex items-center justify-center border border-gold/40 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-gold"
                aria-hidden="true"
              >
                {/* Stylized Cat Ear & Egyptian Eye Motif */}
                <path
                  d="M4 14L8 6L12 11L16 6L20 14"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="2" fill="#C9A24B" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-wide text-teal group-hover:text-teal-600 transition-colors">
                Bastet
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-gold-dark -mt-1">
                Animal Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg',
                    isActive ? 'text-teal font-semibold' : 'text-ink/80 hover:text-teal',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button & Emergency Call */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="p-2 text-teal dark:text-cream hover:text-gold transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-gold"
              title={`Call Emergency: ${siteConfig.phone}`}
              aria-label={`Call Emergency: ${siteConfig.phone}`}
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl bg-gold text-ink shadow-sm hover:bg-gold-light hover:shadow-gold-glow transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-teal dark:text-cream hover:bg-gold/10 focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-teal/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                Navigation
              </span>
              {siteConfig.navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block py-2 text-2xl font-display transition-colors',
                        isActive
                          ? 'text-gold font-bold underline underline-offset-8'
                          : 'text-cream/90 hover:text-gold',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 border-t border-gold/20 pt-6">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-center text-sm uppercase tracking-wider font-semibold rounded-2xl bg-gold text-ink shadow-gold-glow hover:bg-gold-light transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
              <div className="text-center text-xs text-cream/70">
                <p>24x7 Emergency: {siteConfig.phone}</p>
                <p className="mt-1">{siteConfig.city}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
