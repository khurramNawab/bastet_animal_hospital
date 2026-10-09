import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, FileText, Mail, Phone, Calendar } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GoldDivider } from '@/components/ui/GoldDivider';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bastet Small Animal Hospital Kolkata',
  description:
    'Our privacy commitment and data handling practices in accordance with India’s Digital Personal Data Protection (DPDP) Act 2023.',
  alternates: {
    canonical: 'https://bastetsmallanimalhospital.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark dark:text-gold text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Patient Data Protection</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-teal dark:text-cream mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-ink/60 dark:text-cream/60">
          Last Updated: March 2026 • Aligned with Digital Personal Data Protection (DPDP) Act, 2023
        </p>
      </div>

      {/* Policy Content Body */}
      <div className="space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-light leading-relaxed">
        {/* Section 1 */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold shrink-0" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            At {siteConfig.name}, we collect only the minimum necessary information required to schedule veterinary consultations, coordinate clinical care, and communicate hospital updates:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Appointment Requests:</strong> Pet parent name, Indian mobile number (+91), email address, pet name, animal species, breed, approximate age, selected medical service, preferred doctor, requested date/time slot, and clinical notes.</li>
            <li><strong>Expansion Waitlist:</strong> Email address, mobile phone number, and pet species for non-canine department launch notifications.</li>
            <li><strong>Technical Telemetry:</strong> Standard non-identifiable web server access logs (IP address, browser user-agent, timestamp) for security defense and rate limiting.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold shrink-0" />
            <span>2. Purpose of Data Processing</span>
          </h2>
          <p>Your personal and pet information is processed solely for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Verifying and confirming appointment booking requests via phone call or WhatsApp message.</li>
            <li>Preparing veterinary patient files prior to in-clinic consultation.</li>
            <li>Sending critical clinical care reminders, vaccination alerts, and emergency triage instructions.</li>
            <li>Protecting our servers against automated abuse, spam submissions, and Denial of Service attempts.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold shrink-0" />
            <span>3. Data Storage & Security Infrastructure</span>
          </h2>
          <p>
            All submitted patient data is stored within encrypted cloud database infrastructure provided by Supabase with Row Level Security (RLS) policies strictly enforced. Database access keys are stored as server-side environment variables and are never exposed to browser clients.
          </p>
          <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75">
            We do <strong>not</strong> sell, rent, monetize, or trade patient data with third-party advertisers or marketing brokers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-7 rounded-3xl glass-card border border-gold/25 space-y-3">
          <h2 className="font-display text-xl font-bold text-teal dark:text-gold">
            4. Your Rights Under DPDP Act 2023
          </h2>
          <p>As a data principal, you hold the following statutory rights regarding your personal information:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Right to Access:</strong> Request a summary of personal data held by the hospital.</li>
            <li><strong>Right to Correction & Erasure:</strong> Request updates to outdated contact numbers or deletion of past appointment records once clinical retention requirements are fulfilled.</li>
            <li><strong>Right to Grievance Redressal:</strong> Submit privacy concerns directly to our administrative desk.</li>
          </ul>
        </section>

        {/* Section 5: Contact */}
        <section className="p-7 rounded-3xl bg-teal-900 text-cream border border-gold/30 space-y-3">
          <h2 className="font-display text-xl font-bold text-gold">
            5. Contact Our Privacy Officer
          </h2>
          <p className="text-xs sm:text-sm text-cream/90">
            To exercise your data privacy rights or request record corrections, please contact our hospital desk:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="text-gold-light hover:underline">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>{siteConfig.phone}</span>
            </div>
          </div>
        </section>
      </div>

      <GoldDivider className="mt-14 mb-8" />
    </main>
  );
}
