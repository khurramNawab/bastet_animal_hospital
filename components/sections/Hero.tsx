'use client';

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Calendar, PhoneCall, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import { HeroCanvas } from '@/components/three';
import { HeroFallback } from './HeroFallback';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FloatCard } from '@/components/ui/FloatCard';
import { HeroServicesMarquee } from '@/components/ui/HeroServicesMarquee';
import { getServices } from '@/lib/data';
import type { SiteConfig } from '@/lib/types';

interface HeroProps {
  siteConfig: SiteConfig;
}

interface BoopParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
}

export function Hero({ siteConfig }: HeroProps) {
  const { canRender3D, isReducedMotion, isMounted } = useCanRender3D();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [boopParticles, setBoopParticles] = useState<BoopParticle[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  const services = getServices();

  // Mouse move parallax calculation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: nx * 20, y: ny * 20 });
  }, [isReducedMotion]);

  // Boop particle burst handler
  const handleBoop = useCallback(() => {
    if (isReducedMotion) return;
    const symbols = ['🐾', '🧡', '✨', '🐾', '💛', '🐾'];
    const newParticles: BoopParticle[] = symbols.map((symbol, i) => {
      const angle = (i / symbols.length) * Math.PI * 2 + (Math.random() - 0.5);
      const speed = 40 + Math.random() * 40;
      return {
        id: Date.now() + i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
        symbol,
      };
    });

    setBoopParticles(newParticles);
    setTimeout(() => {
      setBoopParticles([]);
    }, 850);
  }, [isReducedMotion]);

  // Staggered entrance animation & SVG underline drawing
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    if (isReducedMotion) {
      gsap.set(contentRef.current.querySelectorAll('.hero-anim'), { opacity: 1, y: 0 });
      if (underlineRef.current) {
        gsap.set(underlineRef.current, { strokeDashoffset: 0 });
      }
      return;
    }

    if (modelLoaded || !canRender3D) {
      const ctx = gsap.context(() => {
        // Stagger text and CTA elements
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

        // Draw the hand-drawn underline under "Royal Care"
        if (underlineRef.current) {
          const length = underlineRef.current.getTotalLength() || 220;
          gsap.set(underlineRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(underlineRef.current, {
            strokeDashoffset: 0,
            duration: 0.85,
            delay: 0.6,
            ease: 'power2.out',
          });
        }
      }, contentRef);

      return () => ctx.revert();
    }
  }, [modelLoaded, canRender3D, isReducedMotion]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100svh-4.5rem)] flex flex-col justify-between overflow-hidden bg-cream dark:bg-olive-deep pt-4 sm:pt-6"
      aria-label="Bastet Small Animal Hospital Hero"
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/6 right-1/4 w-[420px] h-[420px] bg-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-sand/25 dark:bg-olive/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Grid Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {isMounted && canRender3D ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
            {/* Left Column (6 cols): Copy, Typography & Action CTAs */}
            <div ref={contentRef} className="lg:col-span-6 flex flex-col items-start z-10">
              {/* Eyebrow Chip */}
              <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 dark:bg-olive-deep/80 border border-sand/60 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                <span>Kolkata&apos;s Premier Companion Hospital</span>
              </div>

              {/* Semantic H1 for SEO (clean & single) */}
              <h1 className="sr-only">Trusted Dog Hospital in Kolkata - {siteConfig.name}</h1>

              {/* Visually Prominent Display Heading */}
              <div
                className="hero-anim font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-olive-deep dark:text-cream tracking-tight leading-[1.12] mb-5"
                aria-label={siteConfig.tagline}
              >
                <span>Where Every Paw Gets </span>
                <span className="relative inline-block text-orange-deep dark:text-orange">
                  Royal Care
                  {/* Animated Hand-drawn underline SVG */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-full h-3.5 text-orange overflow-visible pointer-events-none"
                    viewBox="0 0 220 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      ref={underlineRef}
                      d="M 3 10 C 60 2, 160 16, 217 5"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Subtext */}
              <p className="hero-anim text-base sm:text-lg text-ink/80 dark:text-cream/80 leading-relaxed font-normal mb-8 max-w-lg">
                Advanced sterile surgeries, digital radiography, dermatology, and 24x7
                emergency trauma care in Rash Behari Avenue, {siteConfig.city}.
              </p>

              {/* Magnetic Action CTAs */}
              <div className="hero-anim flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
                <MagneticButton
                  href="/book"
                  variant="primary"
                  className="px-8 py-4 text-xs uppercase tracking-wider gap-2 shadow-warm-glow"
                >
                  <Calendar className="w-4 h-4 text-ink" />
                  <span>Book Appointment</span>
                </MagneticButton>

                <MagneticButton
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  variant="outline"
                  className="px-8 py-4 text-xs uppercase tracking-wider gap-2 dark:border-sand/40 dark:text-cream"
                >
                  <PhoneCall className="w-4 h-4 text-orange" />
                  <span>Emergency: {siteConfig.phone}</span>
                </MagneticButton>
              </div>

              {/* Trust Stats Row */}
              <div className="hero-anim grid grid-cols-3 gap-4 pt-6 border-t border-sand/30 w-full">
                <div>
                  <span className="block text-base sm:text-lg font-bold text-orange-deep dark:text-sand font-display">
                    24x7
                  </span>
                  <span className="text-[11px] sm:text-xs text-ink/75 dark:text-cream/75 leading-tight">
                    Emergency Unit
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

            {/* Right Column (6 cols): 3D Canine + Tilted Orange Rounded Cross Motif */}
            <div className="lg:col-span-6 relative w-full h-[460px] lg:h-[580px] flex items-center justify-center">
              {/* Large Tilted Orange Rounded Cross Plate Motif (Logo Anchor) */}
              <div
                style={{
                  transform: `translate3d(${mouseParallax.x * -0.4}px, ${mouseParallax.y * -0.4}px, 0) rotate(-6deg)`,
                }}
                className="absolute w-72 sm:w-96 lg:w-[420px] h-72 sm:h-96 lg:h-[420px] transition-transform duration-300 pointer-events-none opacity-95"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-2xl"
                >
                  <rect
                    x="68"
                    y="10"
                    width="64"
                    height="180"
                    rx="30"
                    fill="url(#hero-cross-grad)"
                  />
                  <rect
                    x="10"
                    y="68"
                    width="180"
                    height="64"
                    rx="30"
                    fill="url(#hero-cross-grad)"
                  />
                  <defs>
                    <linearGradient
                      id="hero-cross-grad"
                      x1="10"
                      y1="10"
                      x2="190"
                      y2="190"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF751B" />
                      <stop offset="1" stopColor="#FFB27A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 3D Canine Model Canvas */}
              <div className="relative z-10 w-full h-full">
                <HeroCanvas
                  reducedMotion={isReducedMotion}
                  onLoaded={() => setModelLoaded(true)}
                  onBoop={handleBoop}
                />
              </div>

              {/* Interactive Boop Particle Burst DOM Overlay */}
              {boopParticles.length > 0 && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                  {boopParticles.map((p) => (
                    <span
                      key={p.id}
                      style={{
                        transform: `translate(${p.vx}px, ${p.vy}px)`,
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
                      }}
                      className="absolute text-xl animate-boop-fade select-none"
                    >
                      {p.symbol}
                    </span>
                  ))}
                </div>
              )}

              {/* 3 Floating Info Cards with Mouse Parallax & Sine Float */}
              {/* Card 1: 24x7 Emergency (Top-Left) */}
              <div
                style={{
                  transform: `translate3d(${mouseParallax.x * 0.8}px, ${mouseParallax.y * 0.8}px, 0)`,
                }}
                className="absolute top-4 left-0 sm:-left-2 z-20"
              >
                <FloatCard
                  variant="emergency"
                  siteConfig={siteConfig}
                  isReducedMotion={isReducedMotion}
                />
              </div>

              {/* Card 2: Live OPD Status (Top-Right) */}
              <div
                style={{
                  transform: `translate3d(${mouseParallax.x * 0.6}px, ${mouseParallax.y * 0.6}px, 0)`,
                }}
                className="absolute top-16 right-0 sm:-right-4 z-20"
              >
                <FloatCard
                  variant="status"
                  siteConfig={siteConfig}
                  isReducedMotion={isReducedMotion}
                />
              </div>

              {/* Card 3: 3 Expert Doctors (Bottom-Left) */}
              <div
                style={{
                  transform: `translate3d(${mouseParallax.x * 1.0}px, ${mouseParallax.y * 1.0}px, 0)`,
                }}
                className="absolute bottom-8 left-4 sm:left-2 z-20"
              >
                <FloatCard
                  variant="doctors"
                  siteConfig={siteConfig}
                  isReducedMotion={isReducedMotion}
                />
              </div>
            </div>
          </div>
        ) : (
          <HeroFallback siteConfig={siteConfig} isReducedMotion={isReducedMotion} />
        )}
      </div>

      {/* Bottom Section: Olive Hill Transition & Services Marquee Strip */}
      <div className="w-full relative z-10">
        {/* Soft Olive Hill Curve Divider SVG */}
        <div className="w-full overflow-hidden leading-none text-olive-deep pointer-events-none -mb-[1px]">
          <svg
            className="w-full h-8 sm:h-12 block"
            viewBox="0 0 1440 48"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,48 C360,12 1080,12 1440,48 L1440,48 L0,48 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Services Marquee Strip */}
        <HeroServicesMarquee
          services={services}
          isReducedMotion={isReducedMotion}
        />
      </div>
    </section>
  );
}
