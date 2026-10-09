import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { PageHero } from '@/components/sections/PageHero';
import { CrossDivider } from '@/components/ui/CrossDivider';

export const metadata: Metadata = {
  title: 'Terms of Service | Bastet Small Animal Hospital Kolkata',
  description:
    'Terms and conditions regarding online appointment requests, hospital clinical guidelines, emergency protocols, and website usage.',
  alternates: {
    canonical: 'https://bastetsmallanimalhospital.com/terms',
  },
};

export default function TermsPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Terms of Service"
        subtitle="Standard operating guidelines regarding online appointment requests, emergency protocols, and veterinary facility policies."
        badge="Hospital Regulations"
        breadcrumbs={[{ label: 'Terms of Service' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-body leading-relaxed">
        {/* Section 1: Appointment Request Model */}
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-orange shrink-0" />
            <span>1. Online Booking is an Appointment Request</span>
          </h2>
          <p>
            Submitting a form through our website (/book) constitutes an <strong>appointment request</strong> and does not guarantee an immediate confirmed booking slot.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-body">
            <li>Our hospital patient coordinator will contact you via telephone or WhatsApp message to confirm doctor availability and finalize the slot.</li>
            <li>In the event of active surgical emergencies or unforeseen doctor unavailability, we reserve the right to offer the nearest alternative consultation window.</li>
          </ul>
        </section>

        {/* Section 2: Critical Emergency Protocol */}
        <section className="p-7 rounded-3xl bg-danger/10 dark:bg-danger-deep/20 border border-danger/30 space-y-3 shadow-glass backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-danger dark:text-orange flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-danger shrink-0" />
            <span>2. Emergency Medical Protocol</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink/90 dark:text-cream/90 font-body">
            <strong>Do not use web forms for active life-threatening emergencies.</strong> If your pet suffers from severe breathing distress, bloat, collapse, severe bleeding, or poisoning, call our 24x7 trauma hotline immediately or transport the patient directly to our facility:
          </p>
          <div className="pt-2">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-danger hover:bg-danger-deep text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm font-heading"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Hotline: {siteConfig.phone}</span>
            </a>
          </div>
        </section>

        {/* Section 3: Educational Tools Disclaimer */}
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand">
            3. Non-Diagnostic Nature of Online Health Tools
          </h2>
          <p>
            The Canine Age Calculator, Symptom Triage Checker, and pet health blog guides published on this website are designed solely for educational reference and general triage guidance. They do not constitute formal veterinary medical diagnoses, prescriptions, or clinical prognoses.
          </p>
          <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75 font-body">
            Read our full{' '}
            <Link href="/medical-disclaimer" className="text-orange-deep dark:text-sand font-bold underline underline-offset-4 hover:text-orange">
              Medical Disclaimer
            </Link>{' '}
            for comprehensive details.
          </p>
        </section>

        {/* Section 4: Patient Care & In-Clinic Conduct */}
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand">
            4. In-Clinic Safety & Pet Parent Responsibility
          </h2>
          <p>
            To ensure the physical safety of all animal patients, pet parents, and clinical staff on hospital premises:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-body">
            <li>All dogs must be secured on a standard non-retractable leash upon arrival.</li>
            <li>Aggressive, anxious, or highly reactive animals must be fitted with a comfortable basket muzzle prior to entering the waiting lounge.</li>
            <li>Pet parents must disclose all prior vaccination history, existing medication, and behavioral sensitivities to the attending veterinarian.</li>
          </ul>
        </section>

        <CrossDivider variant="cross" className="mt-14" />
      </div>
    </main>
  );
}
