import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Sparkles, Calendar } from 'lucide-react';
import { BookingForm } from '@/components/sections/BookingForm';
import { CrossDivider } from '@/components/ui/CrossDivider';
import { getSiteConfig, getServices, getDoctors, getAnimals } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Book an Appointment | Bastet Small Animal Hospital, Kolkata',
  description:
    'Schedule a clinical veterinary consultation, surgery review, or wellness exam at Bastet Small Animal Hospital in Park Street, Kolkata.',
  openGraph: {
    title: 'Book an Appointment | Bastet Small Animal Hospital Kolkata',
    description:
      'Schedule a clinical consultation or wellness exam with veterinary surgeons and dermatologists in Kolkata.',
  },
};

export default function BookPage() {
  const siteConfig = getSiteConfig();
  const services = getServices();
  const doctors = getDoctors();
  const animals = getAnimals();

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 dark:bg-olive-deep/70 border border-sand/60 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>Priority Clinical Scheduling</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-olive-deep dark:text-cream tracking-tight">
          Book an Appointment
        </h1>

        <p className="mt-3 text-base sm:text-lg text-ink/80 dark:text-cream/80 leading-relaxed font-light">
          Reserve your preferred consultation time with our veterinary specialists and surgeons in
          Kolkata.
        </p>
      </div>

      <div className="w-full max-w-4xl mb-10">
        <CrossDivider variant="cross" />
      </div>

      {/* Booking Form with Suspense for URL Search Params */}
      <Suspense
        fallback={
          <div className="w-full max-w-3xl mx-auto p-12 text-center text-olive-deep dark:text-cream flex items-center justify-center gap-3">
            <Calendar className="w-6 h-6 animate-pulse text-orange" />
            <span className="text-sm font-semibold">Loading scheduling system...</span>
          </div>
        }
      >
        <BookingForm
          siteConfig={siteConfig}
          services={services}
          doctors={doctors}
          animals={animals}
        />
      </Suspense>
    </main>
  );
}
