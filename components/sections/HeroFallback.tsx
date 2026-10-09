'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, PhoneCall, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FloatCard } from '@/components/ui/FloatCard';
import type { SiteConfig } from '@/lib/types';

interface HeroFallbackProps {
  siteConfig: SiteConfig;
  isReducedMotion?: boolean;
}

export function HeroFallback({ siteConfig, isReducedMotion = false }: HeroFallbackProps) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 pt-4 pb-12">
      {/* Left Content Column */}
      <div className="flex-1 flex flex-col items-start z-10 max-w-2xl">
        {/* Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 border border-sand/50 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>Kolkata&apos;s Trusted Dog Hospital</span>
        </div>

        {/* Semantic H1 for SEO */}
        <h1 className="sr-only">Trusted Dog Hospital in Kolkata - {siteConfig.name}</h1>

        {/* Visually Prominent Display Heading */}
        <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-olive-deep dark:text-cream tracking-tight leading-[1.12] mb-5">
          Where Every Paw Gets{' '}
          <span className="relative inline-block text-orange-deep dark:text-orange">
            Royal Care
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-orange-deep/70 overflow-visible"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 2 8 C 50 2, 150 14, 198 4"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-ink/80 dark:text-cream/80 leading-relaxed font-normal mb-8 max-w-xl">
          Advanced sterile surgeries, digital radiography, dermatology, and 24x7
          emergency trauma care in Rash Behari Avenue, {siteConfig.city}.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
          <MagneticButton
            href="/book"
            variant="primary"
            className="px-8 py-4 text-xs uppercase tracking-wider gap-2 w-full sm:w-auto shadow-warm-glow"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </MagneticButton>

          <MagneticButton
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            variant="outline"
            className="px-8 py-4 text-xs uppercase tracking-wider gap-2 w-full sm:w-auto dark:border-sand/40 dark:text-cream"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency: {siteConfig.phone}</span>
          </MagneticButton>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sand/30 w-full">
          <div>
            <span className="block text-base sm:text-lg font-bold text-orange-deep dark:text-sand font-display">
              24x7
            </span>
            <span className="text-[11px] sm:text-xs text-ink/75 dark:text-cream/75 leading-tight">
              Emergency Trauma
            </span>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-bold text-orange-deep dark:text-sand font-display">
              3 Specialists
            </span>
            <span className="text-[11px] sm:text-xs text-ink/75 dark:text-cream/75 leading-tight">
              Surgery & Derm
            </span>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-bold text-orange-deep dark:text-sand font-display">
              5,000+
            </span>
            <span className="text-[11px] sm:text-xs text-ink/75 dark:text-cream/75 leading-tight">
              Happy Patients
            </span>
          </div>
        </div>
      </div>

      {/* Right Visual Column: Cross Motif + Canine Graphic + Floating Badges */}
      <div className="flex-1 relative w-full aspect-square max-w-md lg:max-w-lg flex items-center justify-center">
        {/* Ambient radial glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sand/30 via-orange/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Large Tilted Orange Rounded Cross Motif Plate */}
        <div className="absolute w-64 sm:w-80 h-64 sm:h-80 -rotate-6 transition-transform pointer-events-none opacity-90">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
            <rect x="70" y="10" width="60" height="180" rx="28" fill="url(#hero-cross-grad-fallback)" />
            <rect x="10" y="70" width="180" height="60" rx="28" fill="url(#hero-cross-grad-fallback)" />
            <defs>
              <linearGradient id="hero-cross-grad-fallback" x1="10" y1="10" x2="190" y2="190" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF751B" />
                <stop offset="1" stopColor="#FFB27A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Dog Silhouette Image */}
        <div className="relative w-[85%] h-[85%] rounded-3xl overflow-hidden drop-shadow-2xl z-10 flex items-center justify-center">
          <Image
            src="/images/hero-placeholder.svg"
            alt="Bastet Animal Hospital - Companion Canine Care"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* Floating Info Badges (2 on mobile/fallback) */}
        <div className="absolute -top-2 -left-2 z-20">
          <FloatCard variant="emergency" siteConfig={siteConfig} isReducedMotion={isReducedMotion} />
        </div>

        <div className="absolute -bottom-2 -right-2 z-20">
          <FloatCard variant="status" siteConfig={siteConfig} isReducedMotion={isReducedMotion} />
        </div>
      </div>
    </div>
  );
}
