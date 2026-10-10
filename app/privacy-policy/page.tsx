import React from 'react';
import type { Metadata } from 'next';
import { Lock, FileText, Shield, Mail, Phone } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { PageHero } from '@/components/sections/PageHero';
import { CrossDivider } from '@/components/ui/CrossDivider';

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
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Privacy Policy"
        subtitle="Our commitment to safeguarding patient health data and pet parent information in compliance with Indian DPDP regulations."
        badge="Patient Data Protection"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 space-y-8 text-sm sm:text-base text-ink/85 dark:text-cream/85 font-body leading-relaxed">
        {/* Section 1 */}
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange shrink-0" />
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
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange shrink-0" />
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
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange shrink-0" />
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
        <section className="p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass space-y-3 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-olive-deep dark:text-sand">
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
        <section className="p-7 rounded-3xl bg-olive-deep text-cream border border-sand/40 space-y-3 shadow-xl">
          <h2 className="font-heading text-xl font-bold text-sand">
            5. Contact Our Privacy Officer
          </h2>
          <p className="text-xs sm:text-sm text-cream/90 font-body">
            To exercise your data privacy rights or request record corrections, please contact our hospital desk:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs font-body">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sand shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="text-sand hover:underline font-medium">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sand shrink-0" />
              <span className="font-medium">{siteConfig.phone}</span>
            </div>
          </div>
        </section>

        <CrossDivider variant="cross" className="mt-14" />
      </div>
    </main>
  );
}
