import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Doctors } from '@/components/sections/Doctors';
import { getDoctors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Veterinary Doctors & Surgeons in Kolkata | Bastet Small Animal Hospital',
  description:
    'Meet the expert team of veterinary surgeons, dog dermatologists, and diagnostic imaging consultants at Bastet Small Animal Hospital in Park Street, Kolkata.',
  openGraph: {
    title: 'Veterinary Specialists & Surgeons | Bastet Hospital Kolkata',
    description:
      'Compassionate clinical veterinary specialists, surgeons, and physicians in Kolkata.',
  },
};

export default function DoctorsIndexPage() {
  const doctors = getDoctors();

  return (
    <main className="min-h-screen pb-20">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Veterinary Specialists & Surgeons"
        subtitle="Compassionate medical care and surgical precision led by Kolkata’s trusted veterinary doctors."
        badge="Clinical Faculty"
        breadcrumbs={[{ label: 'Medical Team', href: '/doctors' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <Doctors doctors={doctors} />
      </div>
    </main>
  );
}
