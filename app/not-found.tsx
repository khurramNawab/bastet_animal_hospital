import React from 'react';
import Link from 'next/link';
import { Home, Stethoscope, Phone, Compass } from 'lucide-react';
import { GoldDivider } from '@/components/ui/GoldDivider';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-24 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark dark:text-gold text-xs font-semibold uppercase tracking-widest mb-4">
        <Compass className="w-3.5 h-3.5 text-gold" />
        <span>Page Not Found • 404</span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal dark:text-cream tracking-tight mb-3">
        Lost Your Way, Traveler?
      </h1>

      <p className="text-sm sm:text-base text-ink/75 dark:text-cream/80 max-w-md mx-auto leading-relaxed font-light mb-8">
        The chamber or record you are searching for does not exist in our sanctuary. Let us guide you
        back to clinical care.
      </p>

      <div className="w-full max-w-xs mb-8">
        <GoldDivider variant="eye" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-teal dark:bg-gold text-cream dark:text-ink font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:opacity-90 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/services"
          className="py-3 px-6 rounded-2xl border border-gold/40 hover:bg-gold/15 text-teal dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Stethoscope className="w-4 h-4 text-gold" />
          <span>Our Services</span>
        </Link>

        <Link
          href="/contact"
          className="py-3 px-6 rounded-2xl border border-gold/40 hover:bg-gold/15 text-teal dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-gold" />
          <span>Contact Us</span>
        </Link>
      </div>
    </main>
  );
}
