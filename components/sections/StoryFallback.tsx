'use client';

import React from 'react';
import { Shield, ScanSearch, HeartPulse } from 'lucide-react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import type { StoryPanel } from '@/lib/types';

interface StoryFallbackProps {
  panels: StoryPanel[];
}

export function StoryFallback({ panels }: StoryFallbackProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-gold" />;
      case 'ScanSearch':
        return <ScanSearch className="w-6 h-6 text-gold" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-gold" />;
      default:
        return <Shield className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <section
      className="relative w-full py-16 px-4 sm:px-6 bg-gradient-to-b from-cream to-teal-900 text-cream transition-colors duration-500"
      aria-label="Clinical Care Journey"
    >
      <div className="max-w-4xl mx-auto">
        <GoldDivider className="mb-8" />

        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Our Clinical Methodology
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-teal dark:text-cream mt-2">
            How We Care For Every Companion
          </h2>
          <p className="mt-3 text-sm text-ink/80 dark:text-cream/80 max-w-xl mx-auto">
            From preventive shields to surgical mastery, every step is tailored for royalty.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="glass-card bg-teal-800/80 backdrop-blur-md border border-gold/30 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-glass"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-900/90 border border-gold/40 flex items-center justify-center shrink-0 shadow-sm">
                  {getIcon(panel.icon)}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold font-bold font-display">
                    Step {panel.step}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-cream mt-0.5">
                    {panel.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 sm:max-w-md">
                <p className="text-sm font-semibold text-gold-light mb-1">{panel.line}</p>
                <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
                  {panel.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <GoldDivider className="mt-12" />
      </div>
    </section>
  );
}
