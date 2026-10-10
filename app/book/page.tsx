import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Calendar } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { BookingForm } from '@/components/sections/BookingForm';
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
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with SEO h1 */}
      <PageHero
        title="Book an Appointment"
        subtitle="Reserve your preferred consultation time with our veterinary specialists and surgeons in Park Street, Kolkata."
        badge="Priority Scheduling"
        breadcrumbs={[{ label: 'Book Appointment', href: '/book' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        {/* Booking Form with Suspense for URL Search Params */}
        <Suspense
          fallback={
            <div className="w-full max-w-3xl mx-auto p-12 text-center text-olive-deep dark:text-cream flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6 animate-pulse text-orange" />
              <span className="text-sm font-semibold font-heading">Loading scheduling system...</span>
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
      </div>
    </main>
  );
}
