'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, PhoneCall, ShieldCheck, Stethoscope, HeartPulse, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import type { SiteConfig } from '@/lib/types';

interface HeroFallbackProps {
  siteConfig: SiteConfig;
}

export function HeroFallback({ siteConfig }: HeroFallbackProps) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 pt-8 pb-16">
      {/* Left Content Column */}
      <div className="flex-1 flex flex-col items-start z-10 max-w-2xl">
        {/* Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Kolkata&apos;s Royal Canine Sanctuary</span>
        </div>

        {/* Semantic H1 for SEO + Visually Prominent Display Tagline */}
        <h1 className="sr-only">Trusted Dog Hospital in Kolkata - Bastet Animal Hospital</h1>
        <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal tracking-tight leading-[1.15] mb-6">
          {siteConfig.tagline}
        </div>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-normal mb-8 max-w-xl">
          Dedicated 24x7 canine emergency triage, advanced sterile surgery, dermatology, and
          compassionate diagnostics located in Park Street, {siteConfig.city}.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
          <MagneticButton
            href="/book"
            variant="primary"
            className="px-8 py-4 text-xs uppercase tracking-wider gap-2 w-full sm:w-auto shadow-gold-glow"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </MagneticButton>

          <MagneticButton
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            variant="outline"
            className="px-8 py-4 text-xs uppercase tracking-wider gap-2 w-full sm:w-auto"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency: {siteConfig.phone}</span>
          </MagneticButton>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/20 w-full">
          <div className="flex items-center gap-2.5">
            <HeartPulse className="w-5 h-5 text-gold shrink-0" />
            <span className="text-xs font-semibold text-teal leading-tight">
              24x7 Trauma Emergency
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Stethoscope className="w-5 h-5 text-gold shrink-0" />
            <span className="text-xs font-semibold text-teal leading-tight">3 Expert Surgeons</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <span className="text-xs font-semibold text-teal leading-tight">5000+ Happy Pets</span>
          </div>
        </div>
      </div>

      {/* Right Image Graphic & Ambient CSS Dust */}
      <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-square max-w-lg lg:max-w-xl flex items-center justify-center">
        {/* Soft radial glow background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 via-gold/15 to-transparent rounded-full blur-3xl" />

        {/* CSS Gold Particles for Fallback */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 bg-gold rounded-full opacity-60 animate-pulse"
              style={{
                top: `${(i * 19) % 90}%`,
                left: `${(i * 23) % 90}%`,
                animationDelay: `${(i * 0.3).toFixed(1)}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-gold/30">
          <Image
            src="/images/hero-placeholder.svg"
            alt="Bastet Animal Hospital Luxury Dog Care"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
