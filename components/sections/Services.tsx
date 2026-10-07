'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SpeciesTabs } from '@/components/ui/SpeciesTabs';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { GoldDivider } from '@/components/ui/GoldDivider';
import type { AnimalCategory, ServiceItem } from '@/lib/types';

interface ServicesProps {
  animals: AnimalCategory[];
  services: ServiceItem[];
  defaultSpecies?: string;
}

export function Services({ animals, services, defaultSpecies = 'dog' }: ServicesProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultSpecies);

  const currentAnimal = animals.find((a) => a.slug === selectedSlug) || animals[0];
  const activeServices = services.filter((s) => s.animals.includes(selectedSlug));

  return (
    <section
      id="services-section"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Veterinary Services & Species Directory"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Multi-Species Clinical Excellence</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-teal tracking-tight">
          Care For Every Companion
        </h2>

        <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed font-light max-w-xl mx-auto">
          Tailored clinical medicine, gentle surgical suites, and dedicated specialists for each
          unique species family.
        </p>
      </div>

      {/* Species Switcher Tabs */}
      <div className="mb-12">
        <SpeciesTabs
          animals={animals}
          activeSlug={selectedSlug}
          onSelect={(slug) => setSelectedSlug(slug)}
        />
      </div>

      {/* Dynamic Animated Panel Container (Zero CLS) */}
      <div className="min-h-[460px] relative">
        <AnimatePresence mode="wait">
          {!currentAnimal.comingSoon ? (
            /* Active Species: Services Grid */
            <motion.div
              key={`active-${currentAnimal.slug}`}
              id={`species-panel-${currentAnimal.slug}`}
              role="tabpanel"
              aria-labelledby={`species-tab-${currentAnimal.slug}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Species Hero Header Strip */}
              <div className="mb-8 p-6 rounded-3xl bg-teal/5 border border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-teal">
                    {currentAnimal.name} Medical Specialities
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/75 mt-0.5">
                    {currentAnimal.heroLine || currentAnimal.tagline}
                  </p>
                </div>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-ink text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-gold-light transition-colors shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </Link>
              </div>

              {/* 7 Services Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {activeServices.map((service) => (
                  <ServiceCard key={service.id} service={service} animalSlug={currentAnimal.slug} />
                ))}
              </div>
            </motion.div>
          ) : (
            /* Coming Soon Species: Waitlist Panel */
            <motion.div
              key={`coming-soon-${currentAnimal.slug}`}
              id={`species-panel-${currentAnimal.slug}`}
              role="tabpanel"
              aria-labelledby={`species-tab-${currentAnimal.slug}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 sm:p-12 rounded-4xl bg-gradient-to-br from-cream to-teal-900/10 border border-gold/30 shadow-glass"
            >
              <div className="max-w-md flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Expansion In Progress</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-teal mb-3">
                  {currentAnimal.name} Hospital Wings Coming Soon
                </h3>

                <p className="text-sm text-ink/80 leading-relaxed font-light mb-6">
                  {currentAnimal.heroLine || currentAnimal.tagline} Our team is actively curating
                  dedicated veterinary doctors, stress-free treatment rooms, and precision equipment
                  for {currentAnimal.name.toLowerCase()}.
                </p>

                <div className="p-4 rounded-2xl bg-white/60 border border-gold/20 text-xs text-teal flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span>
                    VIP launch invitations & introductory diagnostics packages available below.
                  </span>
                </div>
              </div>

              {/* Waitlist Form Component */}
              <div className="w-full lg:w-auto">
                <WaitlistForm animal={currentAnimal} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <GoldDivider className="mt-16" />
    </section>
  );
}
