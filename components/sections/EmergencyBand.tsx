'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, MapPin, Navigation, HeartPulse, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ecgPath } from '@/lib/ecg';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import type { SiteConfig } from '@/lib/types';

interface EmergencyBandProps {
  siteConfig: SiteConfig;
}

export function EmergencyBand({ siteConfig }: EmergencyBandProps) {
  const { isReducedMotion } = useCanRender3D();
  const containerRef = useRef<HTMLDivElement>(null);
  const ecgPathRef = useRef<SVGPathElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const [ecgD, setEcgD] = useState<string>('');

  // Generate deterministic clinical ECG waveform based on responsive width
  useEffect(() => {
    const updatePath = () => {
      const w = Math.min(1200, window.innerWidth > 0 ? window.innerWidth * 0.85 : 900);
      setEcgD(ecgPath(w, 80, 4));
    };

    updatePath();
    window.addEventListener('resize', updatePath, { passive: true });
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  // ECG stroke draw on scroll animation
  useLayoutEffect(() => {
    if (!containerRef.current || !ecgPathRef.current || isReducedMotion) {
      if (ecgPathRef.current) {
        gsap.set(ecgPathRef.current, { strokeDashoffset: 0 });
      }
      return;
    }

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const pathEl = ecgPathRef.current;
    const length = pathEl.getTotalLength() || 1800;

    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const isDesktop = window.innerWidth >= 768;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Desktop: Scroll scrub draw
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'center 45%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // Mobile: Smooth single trigger animation on entry
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Heartbeat pulse ring animation
      if (pulseDotRef.current) {
        gsap.to(pulseDotRef.current, {
          scale: 1.4,
          opacity: 0.6,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [ecgD, isReducedMotion]);

  const cleanPhone = siteConfig.phone.replace(/\s+/g, '');
  const cleanWhatsapp = siteConfig.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-orange-deep via-orange-deep to-brown-deep text-cream py-12 sm:py-16 lg:py-20 overflow-hidden"
      aria-label="24x7 Emergency Veterinary Band"
    >
      {/* Background Subtle Radial Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Interactive ECG Waveform Track */}
      <div
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 overflow-hidden flex justify-center items-center"
        aria-hidden="true"
      >
        <div className="relative w-full max-w-4xl h-20 sm:h-24">
          <svg
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            fill="none"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            {/* Background faint guide line */}
            <path
              d={ecgD || 'M 0 44 L 1000 44'}
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-soft/20"
              vectorEffect="non-scaling-stroke"
            />
            {/* Active glowing ECG lead */}
            <path
              ref={ecgPathRef}
              d={ecgD || 'M 0 44 L 1000 44'}
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cream"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Pulse Indicator Beacon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-cream/15 backdrop-blur-md border border-cream/30 text-xs font-semibold uppercase tracking-wider text-cream">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cream" />
            </span>
            <span>Live Trauma Unit</span>
          </div>
        </div>
      </div>

      {/* Main Content & Call-to-Action Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/15 backdrop-blur-md border border-cream/30 text-cream text-xs font-bold uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5 text-sand" />
          <span>Immediate Trauma & Critical Surgery</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-tight mb-4">
          Emergency? We&apos;re Open 24x7.
        </h2>

        {/* Clinical Subtext */}
        <p className="text-base sm:text-lg text-cream/90 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
          Immediate stabilization, sterile emergency surgery, digital radiology, and intensive veterinary care in Rash Behari Avenue, {siteConfig.city}.
        </p>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          {/* Primary Phone Dialer */}
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-cream text-ink font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-sand transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-cream"
            aria-label={`Call 24/7 Emergency Line: ${siteConfig.phone}`}
          >
            <PhoneCall className="w-4 h-4 text-orange-deep" />
            <span>Call Now: {siteConfig.phone}</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Bastet Animal Hospital, I have an urgent pet emergency inquiry.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-cream/15 hover:bg-cream/25 text-cream border border-cream/40 font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-cream"
            aria-label="Message Emergency WhatsApp Desk"
          >
            <MessageCircle className="w-4 h-4 text-sand" />
            <span>WhatsApp Desk</span>
          </a>

          {/* Directions Map Link */}
          <a
            href={siteConfig.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/20 hover:bg-black/30 text-cream/90 border border-cream/20 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            aria-label="Get Directions to Bastet Hospital on Google Maps"
          >
            <Navigation className="w-3.5 h-3.5 text-sand" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Physical Address Reminder */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-cream/80 bg-black/15 px-4 py-2 rounded-full border border-cream/10">
          <MapPin className="w-4 h-4 text-sand shrink-0" />
          <span>{siteConfig.address}, {siteConfig.city}</span>
        </div>
      </div>
    </section>
  );
}
