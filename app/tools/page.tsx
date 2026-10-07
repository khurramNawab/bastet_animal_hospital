import React from 'react';
import type { Metadata } from 'next';
import { Sparkles, Calculator, Activity } from 'lucide-react';
import { AgeCalculator } from '@/components/tools/AgeCalculator';
import { SymptomChecker } from '@/components/tools/SymptomChecker';
import { GoldDivider } from '@/components/ui/GoldDivider';
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
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Interactive Health Utilities</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal tracking-tight">
          Pet Parent Health Tools
        </h1>

        <p className="mt-3 text-base sm:text-lg text-ink/80 leading-relaxed font-light">
          Science-backed canine age computation and symptom triage designed by veterinary
          physicians in Kolkata.
        </p>
      </div>

      <div className="w-full max-w-5xl mb-12">
        <GoldDivider variant="eye" />
      </div>

      {/* 2 Side-by-Side In-Depth Tool Modules */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Module 1: Dog Age Calculator */}
        <div className="w-full p-6 sm:p-8 rounded-3xl glass-card border border-gold/40 shadow-glass">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
            <div className="p-3 rounded-2xl bg-teal/10 border border-gold/30 text-teal">
              <Calculator className="w-6 h-6 text-gold-dark" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-teal">
                Canine Age Calculator
              </h2>
              <p className="text-xs text-ink/65">
                Accurate breed-size weight conversion
              </p>
            </div>
          </div>

          <AgeCalculator config={ageConfig} />
        </div>

        {/* Module 2: Symptom Checker */}
        <div className="w-full p-6 sm:p-8 rounded-3xl glass-card border border-gold/40 shadow-glass">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
            <div className="p-3 rounded-2xl bg-teal/10 border border-gold/30 text-teal">
              <Activity className="w-6 h-6 text-gold-dark" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-teal">
                Symptom Triage Engine
              </h2>
              <p className="text-xs text-ink/65">
                Urgent warning signs & care priority guidance
              </p>
            </div>
          </div>

          <SymptomChecker config={symptomConfig} siteConfig={siteConfig} />
        </div>
      </div>
    </main>
  );
}
