import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertOctagon, Stethoscope, PhoneCall, Calendar } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GoldDivider } from '@/components/ui/GoldDivider';

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
    <main className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Medical Disclaimer' }]} />
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark dark:text-gold text-xs font-semibold uppercase tracking-wider mb-3">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Clinical Advisory</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-teal dark:text-cream mb-2">
          Veterinary Medical Disclaimer
        </h1>
        <p className="text-xs text-ink/60 dark:text-cream/60">
          Last Updated: March 2026 • Bastet Small Animal Hospital, Kolkata
        </p>
      </div>

      {/* Main Advisory Box */}
      <div className="space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-light leading-relaxed">
        <section className="p-8 rounded-4xl bg-gold/10 dark:bg-gold/5 border-2 border-gold/40 shadow-glass space-y-4">
          <div className="flex items-center gap-3 text-gold-dark dark:text-gold font-display font-bold text-xl">
            <Stethoscope className="w-6 h-6 shrink-0" />
            <span>This Website Does Not Provide Medical Diagnosis</span>
          </div>

          <p className="text-base text-ink/90 dark:text-cream/90 font-normal leading-relaxed">
            The content on this website—including pet health articles, Canine Age Calculator results, Symptom Triage Checker suggestions, and care guides—is published exclusively for general educational and awareness purposes.
          </p>

          <p className="font-semibold text-teal dark:text-gold">
            It does NOT constitute veterinary medical advice, diagnosis, treatment, prognosis, or medical prescription.
          </p>
        </section>

        {/* Core Principles */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold">
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
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold">
            2. Life-Threatening Emergency Situations
          </h2>
          <p>
            If you suspect your pet has ingested poison, experienced major blunt trauma, is exhibiting difficulty breathing, is unable to urinate, or is suffering from seizures, immediately contact our 24x7 emergency department at {siteConfig.phone} or visit our trauma centre at Rash Behari Avenue, Kolkata without delay.
          </p>
        </section>

        {/* Action Banner */}
        <div className="p-7 rounded-3xl bg-teal-900 text-cream border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-gold">Schedule a Clinical Checkup</h3>
            <p className="text-xs text-cream/80 mt-1">Book an in-person consultation with our veterinary specialists.</p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3 rounded-xl bg-gold text-ink text-xs font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors shadow-gold-glow shrink-0"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      <GoldDivider className="mt-14 mb-8" />
    </main>
  );
}
