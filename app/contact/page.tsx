import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Contact } from '@/components/sections/Contact';
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
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with SEO single h1 */}
      <PageHero
        title="Contact & Emergency"
        subtitle="Find directions, 24/7 trauma care hotline, OPD hours, and WhatsApp reception for Bastet Small Animal Hospital in Kolkata."
        badge="24/7 Care Support"
        breadcrumbs={[{ label: 'Contact & Directions', href: '/contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <Contact siteConfig={siteConfig} />
      </div>
    </main>
  );
}
