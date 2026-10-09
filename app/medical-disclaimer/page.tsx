import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { PageHero } from '@/components/sections/PageHero';
import { CrossDivider } from '@/components/ui/CrossDivider';

export const metadata: Metadata = {
  title: 'Veterinary Medical Disclaimer | Bastet Small Animal Hospital Kolkata',
  description:
    'Important veterinary disclaimer regarding the educational nature of our online Symptom Checker, Age Calculator, and health blog articles.',
  alternates: {
    canonical: 'https://bastetsmallanimalhospital.com/medical-disclaimer',
  },
};

export default function MedicalDisclaimerPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Veterinary Medical Disclaimer"
        subtitle="Important regulatory and safety disclosure regarding online health tools, educational articles, and clinical consultations."
        badge="Clinical Advisory"
        breadcrumbs={[{ label: 'Medical Disclaimer' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-body leading-relaxed">
        {/* Main Advisory Box */}
        <section className="p-8 rounded-3xl bg-sand/30 dark:bg-olive-deep/80 border-2 border-sand/50 shadow-glass space-y-4 backdrop-blur-md">
          <div className="flex items-center gap-3 text-orange-deep dark:text-sand font-heading font-extrabold text-xl">
            <Stethoscope className="w-6 h-6 shrink-0 text-orange" />
            <span>This Website Does Not Provide Medical Diagnosis</span>
          </div>

          <p className="text-base text-ink/90 dark:text-cream/90 font-normal leading-relaxed">
            The content on this website—including pet health articles, Canine Age Calculator results, Symptom Triage Checker suggestions, and care guides—is published exclusively for general educational and awareness purposes.
          </p>

          <p className="font-bold text-olive-deep dark:text-sand font-heading">
            It does NOT constitute veterinary medical advice, diagnosis, treatment, prognosis, or medical prescription.
          </p>
        </section>

        {/* Core Principles */}
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand">
            1. Always Seek Professional In-Person Veterinary Examination
          </h2>
          <p>
            No digital algorithm, interactive triage tree, or online article can substitute for a hands-on physical clinical examination performed by a licensed, registered veterinary surgeon. Clinical parameters such as body temperature, mucous membrane perfusion, auscultation of heart and lungs, abdominal palpation, and blood chemistry can only be accurately assessed in person.
          </p>
          <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75">
            Never disregard, avoid, or delay seeking professional veterinary medical advice because of something you have read on this website.
          </p>
        </section>

        {/* Emergency Guidance */}
        <section className="p-7 rounded-3xl bg-danger/10 dark:bg-danger-deep/20 border border-danger/30 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-danger dark:text-orange">
            2. Life-Threatening Emergency Situations
          </h2>
          <p>
            If you suspect your pet has ingested poison, experienced major blunt trauma, is exhibiting difficulty breathing, is unable to urinate, or is suffering from seizures, immediately contact our 24x7 emergency department at {siteConfig.phone} or visit our trauma centre at Rash Behari Avenue, Kolkata without delay.
          </p>
        </section>

        {/* Action Banner */}
        <div className="p-7 rounded-3xl bg-olive-deep text-cream border border-sand/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-heading text-xl font-bold text-sand">Schedule a Clinical Checkup</h3>
            <p className="text-xs text-cream/80 mt-1 font-body">Book an in-person consultation with our veterinary specialists.</p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3 rounded-full bg-orange hover:bg-orange-soft text-ink text-xs font-bold uppercase tracking-wider transition-colors shadow-warm-glow shrink-0 font-heading"
          >
            <span>Book Appointment</span>
          </Link>
        </div>

        <CrossDivider variant="cross" className="mt-14" />
      </div>
    </main>
  );
}
