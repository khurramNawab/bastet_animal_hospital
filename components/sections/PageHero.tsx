'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HillDivider } from '@/components/ui/HillDivider';
import { Reveal } from '@/components/ui/Reveal';
import { useSpotlight } from '@/hooks/useSpotlight';
import type { BreadcrumbItem } from '@/lib/types';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageHero({
  title,
  subtitle,
  badge,
  breadcrumbs,
  children,
}: PageHeroProps) {
  const containerRef = useSpotlight();

  return (
    <section
      ref={containerRef}
      className="relative bg-olive-deep text-cream pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden"
    >
      {/* Subtle brand motif background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FFF6E5_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs
              items={breadcrumbs}
              className="[&_a]:text-cream/70 [&_a:hover]:text-orange-soft [&_span]:text-sand [&_svg]:text-cream/40"
            />
          </div>
        )}

        <div className="max-w-3xl">
          {/* Optional Badge */}
          {badge && (
            <Reveal variant="fade-up" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-soft/20 text-sand border border-sand/20 text-xs font-semibold uppercase tracking-wider mb-3 font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                {badge}
              </div>
            </Reveal>
          )}

          {/* Single SEO H1 */}
          <Reveal variant="fade-up" delay={0.1}>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-cream">
                {title}
              </h1>
              {/* Decorative Medical Cross motif */}
              <div
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-orange/20 border border-orange/30 text-orange shrink-0"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Subtitle */}
          {subtitle && (
            <Reveal variant="fade-up" delay={0.15}>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-cream/80 leading-relaxed font-body">
                {subtitle}
              </p>
            </Reveal>
          )}

          {/* Optional actions / slot */}
          {children && (
            <Reveal variant="fade-up" delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-4">
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Bottom HillDivider transition into content */}
      <HillDivider
        fromColor="olive-deep"
        toColor="cream"
        variant="hill"
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
