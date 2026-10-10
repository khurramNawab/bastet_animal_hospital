import React from 'react';
import type { Metadata } from 'next';
import { Calculator, Activity } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { AgeCalculator } from '@/components/tools/AgeCalculator';
import { SymptomChecker } from '@/components/tools/SymptomChecker';
import {
  getAgeCalculatorConfig,
  getSymptomCheckerConfig,
  getSiteConfig,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'Dog Age Calculator & Symptom Checker | Bastet Small Animal Hospital',
  description:
    'Free clinical pet health tools for Kolkata pet parents. Calculate your dog’s age in human years and triage urgent symptoms with veterinary guidance.',
  openGraph: {
    title: 'Pet Health Tools | Bastet Small Animal Hospital Kolkata',
    description:
      'Free clinical pet health tools. Calculate your dog’s age in human years and triage urgent health symptoms.',
  },
};

export default function ToolsPage() {
  const ageConfig = getAgeCalculatorConfig();
  const symptomConfig = getSymptomCheckerConfig();
  const siteConfig = getSiteConfig();

  return (
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with SEO single h1 */}
      <PageHero
        title="Pet Parent Health Tools"
        subtitle="Science-backed canine age computation and symptom triage designed by veterinary physicians in Kolkata."
        badge="Interactive Clinical Utilities"
        breadcrumbs={[{ label: 'Health Tools', href: '/tools' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        {/* 2 Side-by-Side In-Depth Tool Modules */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Module 1: Dog Age Calculator */}
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass backdrop-blur-md">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-sand/30">
              <div className="p-3 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-olive-deep dark:text-cream">
                  Canine Age Calculator
                </h2>
                <p className="text-xs text-ink/65 dark:text-cream/65 font-body">
                  Accurate breed-size weight conversion
                </p>
              </div>
            </div>

            <AgeCalculator config={ageConfig} />
          </div>

          {/* Module 2: Symptom Checker */}
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass backdrop-blur-md">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-sand/30">
              <div className="p-3 rounded-2xl bg-orange/15 border border-orange/30 text-orange">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-olive-deep dark:text-cream">
                  Symptom Triage Engine
                </h2>
                <p className="text-xs text-ink/65 dark:text-cream/65 font-body">
                  Urgent warning signs & care priority guidance
                </p>
              </div>
            </div>

            <SymptomChecker config={symptomConfig} siteConfig={siteConfig} />
          </div>
        </div>
      </div>
    </main>
  );
}
