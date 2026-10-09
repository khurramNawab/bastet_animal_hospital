import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Services } from '@/components/sections/Services';
import { getAnimals, getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Veterinary Services in Kolkata | Bastet Small Animal Hospital',
  description:
    'Explore comprehensive medical, surgical, dental, grooming, and 24x7 emergency services for canines, felines, and birds at Bastet Small Animal Hospital in Kolkata.',
  openGraph: {
    title: 'Veterinary Clinical Services | Bastet Hospital Kolkata',
    description:
      'Multidisciplinary clinical veterinary disciplines, advanced surgery, diagnostics, and 24/7 trauma care in Kolkata.',
  },
};

export default function ServicesIndexPage() {
  const animals = getAnimals();
  const services = getServices();

  return (
    <main className="min-h-screen pb-20">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Veterinary Clinical Services"
        subtitle="Multidisciplinary clinical veterinary disciplines, advanced diagnostics, surgical excellence, and 24/7 emergency trauma care in Kolkata."
        badge="Multidisciplinary Care"
        breadcrumbs={[{ label: 'Clinical Services', href: '/services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <Services animals={animals} services={services} defaultSpecies="dog" />
      </div>
    </main>
  );
}
