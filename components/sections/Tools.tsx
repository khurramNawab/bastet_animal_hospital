'use client';

import React, { useState, useRef } from 'react';
import { Calculator, Activity, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { ToolDialog } from '@/components/ui/ToolDialog';
import { AgeCalculator } from '@/components/tools/AgeCalculator';
import { SymptomChecker } from '@/components/tools/SymptomChecker';
import type { AgeCalculatorConfig, SymptomCheckerConfig, SiteConfig } from '@/lib/types';

interface ToolsSectionProps {
  ageConfig: AgeCalculatorConfig;
  symptomConfig: SymptomCheckerConfig;
  siteConfig: SiteConfig;
}

export function Tools({ ageConfig, symptomConfig, siteConfig }: ToolsSectionProps) {
  const [activeModal, setActiveModal] = useState<'age' | 'symptom' | null>(null);

  const ageTriggerRef = useRef<HTMLButtonElement>(null);
  const symptomTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section
      id="tools-section"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Pet Parent Health & Triage Tools"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Clinical Utilities</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-teal tracking-tight">
          Pet Parent Health Tools
        </h2>

        <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed font-light max-w-xl mx-auto">
          Explore interactive, science-backed utilities designed to calculate physiological age
          and triage urgent health symptoms.
        </p>
      </div>

      {/* 2 Luxury Interactive Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {/* Card 1: Dog Age Calculator */}
        <div className="group relative rounded-3xl p-8 sm:p-10 glass-card border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-glass flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-gold/30 flex items-center justify-center text-gold mb-6 group-hover:bg-teal group-hover:text-gold transition-colors">
              <Calculator className="w-7 h-7" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-teal mb-2">
              Dog Age Calculator
            </h3>

            <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-light mb-6">
              Translate your canine companion&apos;s physical milestones into physiological human years
              based on veterinary breed-size charts.
            </p>

            <ul className="text-xs text-ink/70 space-y-2 mb-8 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Customized for Small, Medium, Large & Giant breeds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Life stage care hints for puppies, adults & seniors</span>
              </li>
            </ul>
          </div>

          <button
            ref={ageTriggerRef}
            type="button"
            onClick={() => setActiveModal('age')}
            className="w-full py-3.5 px-6 rounded-2xl bg-teal text-cream font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-teal-800 transition-all shadow-md group-hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Open Age Calculator</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Symptom Checker */}
        <div className="group relative rounded-3xl p-8 sm:p-10 glass-card border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-glass flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-teal/15 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-gold/30 flex items-center justify-center text-gold mb-6 group-hover:bg-teal group-hover:text-gold transition-colors">
              <Activity className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-[11px] font-semibold mb-2">
              <ShieldAlert className="w-3 h-3 text-gold-dark" />
              <span>Guidance & Triage Only</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-teal mb-2">
              Symptom Triage Checker
            </h3>

            <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-light mb-6">
              Answer structured clinical questions to evaluate critical signs and determine whether
              your pet needs immediate emergency care or a routine visit.
            </p>

            <ul className="text-xs text-ink/70 space-y-2 mb-8 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Life-threatening red flags & emergency priority screening</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Direct 24/7 hospital calling & location guidance</span>
              </li>
            </ul>
          </div>

          <button
            ref={symptomTriggerRef}
            type="button"
            onClick={() => setActiveModal('symptom')}
            className="w-full py-3.5 px-6 rounded-2xl bg-teal text-cream font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-teal-800 transition-all shadow-md group-hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Start Symptom Check</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Age Calculator Modal */}
      <ToolDialog
        isOpen={activeModal === 'age'}
        onClose={() => setActiveModal(null)}
        title="Canine Age Calculator"
        triggerRef={ageTriggerRef}
      >
        <AgeCalculator config={ageConfig} />
      </ToolDialog>

      {/* Symptom Checker Modal */}
      <ToolDialog
        isOpen={activeModal === 'symptom'}
        onClose={() => setActiveModal(null)}
        title="Pet Health Symptom Triage"
        triggerRef={symptomTriggerRef}
      >
        <SymptomChecker config={symptomConfig} siteConfig={siteConfig} />
      </ToolDialog>
    </section>
  );
}
