import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, AlertTriangle, PhoneCall, Calendar, CheckCircle2 } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GoldDivider } from '@/components/ui/GoldDivider';

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
    <main className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark dark:text-gold text-xs font-semibold uppercase tracking-wider mb-3">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Hospital Regulations</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-teal dark:text-cream mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-ink/60 dark:text-cream/60">
          Last Updated: March 2026 • Bastet Small Animal Hospital, Kolkata
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-light leading-relaxed">
        {/* Section 1: Appointment Request Model */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
            <span>1. Online Booking is an Appointment Request</span>
          </h2>
          <p>
            Submitting a form through our website (/book) constitutes an <strong>appointment request</strong> and does not guarantee an immediate confirmed booking slot.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Our hospital patient coordinator will contact you via telephone or WhatsApp message to confirm doctor availability and finalize the slot.</li>
            <li>In the event of active surgical emergencies or unforeseen doctor unavailability, we reserve the right to offer the nearest alternative consultation window.</li>
          </ul>
        </section>

        {/* Section 2: Critical Emergency Protocol */}
        <section className="p-7 rounded-3xl bg-red-500/10 dark:bg-red-950/20 border border-red-500/30 space-y-3">
          <h2 className="font-display text-xl font-bold text-red-800 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <span>2. Emergency Medical Protocol</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink/90 dark:text-cream/90">
            <strong>Do not use web forms for active life-threatening emergencies.</strong> If your pet suffers from severe breathing distress, bloat, collapse, severe bleeding, or poisoning, call our 24x7 trauma hotline immediately or transport the patient directly to our facility:
          </p>
          <div className="pt-2">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-800 transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Hotline: {siteConfig.phone}</span>
            </a>
          </div>
        </section>

        {/* Section 3: Educational Tools Disclaimer */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold">
            3. Non-Diagnostic Nature of Online Health Tools
          </h2>
          <p>
            The Canine Age Calculator, Symptom Triage Checker, and pet health blog guides published on this website are designed solely for educational reference and general triage guidance. They do not constitute formal veterinary medical diagnoses, prescriptions, or clinical prognoses.
          </p>
          <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75">
            Read our full{' '}
            <Link href="/medical-disclaimer" className="text-gold font-semibold underline underline-offset-4 hover:text-gold-light">
              Medical Disclaimer
            </Link>{' '}
            for comprehensive details.
          </p>
        </section>

        {/* Section 4: Patient Care & In-Clinic Conduct */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold">
            4. In-Clinic Safety & Pet Parent Responsibility
          </h2>
          <p>
            To ensure the physical safety of all animal patients, pet parents, and clinical staff on hospital premises:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>All dogs must be secured on a standard non-retractable leash upon arrival.</li>
            <li>Aggressive, anxious, or highly reactive animals must be fitted with a comfortable basket muzzle prior to entering the waiting lounge.</li>
            <li>Pet parents must disclose all prior vaccination history, existing medication, and behavioral sensitivities to the attending veterinarian.</li>
          </ul>
        </section>
      </div>

      <GoldDivider className="mt-14 mb-8" />
    </main>
  );
}
