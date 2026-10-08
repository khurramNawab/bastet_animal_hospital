'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Calendar,
  PhoneCall,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import { HeroCanvas } from '@/components/three';
import { HeroFallback } from './HeroFallback';
import { MagneticButton } from '@/components/ui/MagneticButton';
import type { SiteConfig } from '@/lib/types';

interface HeroProps {
  siteConfig: SiteConfig;
}

export function Hero({ siteConfig }: HeroProps) {
  const { canRender3D, isReducedMotion, isMounted } = useCanRender3D();
  const [modelLoaded, setModelLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Staggered GSAP text entrance triggered once 3D is ready (or immediately on fallback/reduced motion)
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    if (isReducedMotion) {
      gsap.set(contentRef.current.querySelectorAll('.hero-anim'), { opacity: 1, y: 0 });
      return;
    }

    if (modelLoaded || !canRender3D) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.hero-anim',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.1,
          },
        );
      }, contentRef);

      return () => ctx.revert();
    }
  }, [modelLoaded, canRender3D, isReducedMotion]);

  // Words for the animated display tagline
  const taglineWords = siteConfig.tagline.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100svh-5rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 pb-8"
      aria-label="Hero Section"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-teal/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Conditional 3D Scene vs High-Performance Fallback */}
      {isMounted && canRender3D ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column (5 Cols) */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Eyebrow Chip */}
            <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Kolkata&apos;s Premium Dog Hospital</span>
            </div>

            {/* Semantic H1 for SEO */}
            <h1 className="sr-only">Trusted Dog Hospital in Kolkata - {siteConfig.name}</h1>

            {/* Visually Prominent Display Heading */}
            <div
              className="hero-anim font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal dark:text-cream tracking-tight leading-[1.12] mb-5"
              aria-label={siteConfig.tagline}
            >
              {taglineWords.map((word, idx) => (
                <span key={idx} className="inline-block mr-2.5 overflow-hidden">
                  <span className="inline-block text-balance">{word}</span>
                </span>
              ))}
            </div>

            {/* Subtext */}
            <p className="hero-anim text-base sm:text-lg text-ink/80 dark:text-cream/80 leading-relaxed font-normal mb-8 max-w-lg">
              Advanced sterile surgeries, digital radiography, canine dermatology, and 24x7
              emergency trauma care in Rash Behari Avenue, {siteConfig.city}.
            </p>

            {/* Magnetic CTA Buttons */}
            <div className="hero-anim flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <MagneticButton
                href="/book"
                variant="primary"
                className="px-8 py-4 text-xs uppercase tracking-wider gap-2 shadow-gold-glow"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </MagneticButton>

              <MagneticButton
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                variant="outline"
                className="px-8 py-4 text-xs uppercase tracking-wider gap-2 dark:border-gold/50 dark:text-cream"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency: {siteConfig.phone}</span>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="hero-anim grid grid-cols-3 gap-4 pt-6 border-t border-gold/20 w-full">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-gold shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-teal dark:text-cream leading-tight">
                  24x7 Emergency
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gold shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-teal dark:text-cream leading-tight">
                  3 Expert Doctors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-teal dark:text-cream leading-tight">
                  5000+ Happy Pets
                </span>
              </div>
            </div>
          </div>

          {/* Right 3D Canine Canvas Column (6 Cols) */}
          <div className="lg:col-span-6 relative w-full h-[460px] lg:h-[600px] flex items-center justify-center">
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 via-gold/15 to-transparent rounded-full blur-2xl" />
            <HeroCanvas reducedMotion={isReducedMotion} onLoaded={() => setModelLoaded(true)} />
          </div>
        </div>
      ) : (
        <HeroFallback siteConfig={siteConfig} />
      )}

      {/* Scroll Down Hint */}
      <div className="w-full flex items-center justify-center pt-2 pb-2">
        <a
          href="#explore-services"
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest text-gold-dark font-medium opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to discover services"
        >
          <span>Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
