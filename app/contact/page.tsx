import React from 'react';
import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Contact } from '@/components/sections/Contact';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { getSiteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact & Directions | Bastet Small Animal Hospital, Kolkata',
  description:
    'Find directions, 24/7 emergency hotline, OPD operating hours, and WhatsApp contact details for Bastet Small Animal Hospital in Park Street, Kolkata.',
  openGraph: {
    title: 'Contact & Directions | Bastet Small Animal Hospital Kolkata',
    description:
      'Contact our veterinary clinic in Park Street, Kolkata. 24x7 emergency support, OPD hours, and location map.',
  },
};

export default function ContactPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Connect & Directions</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal tracking-tight">
          Get in Touch
        </h1>

        <p className="mt-3 text-base sm:text-lg text-ink/80 leading-relaxed font-light">
          Visit our modern veterinary hospital in Park Street, Kolkata or connect directly via
          phone and WhatsApp.
        </p>
      </div>

      <div className="w-full max-w-4xl mb-12">
        <GoldDivider variant="eye" />
      </div>

      <Contact siteConfig={siteConfig} />
    </main>
  );
}
