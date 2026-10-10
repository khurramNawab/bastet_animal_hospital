'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ServiceItem } from '@/lib/types';

interface HeroServicesMarqueeProps {
  services: ServiceItem[];
  className?: string;
  isReducedMotion?: boolean;
}

export function HeroServicesMarquee({
  services,
  className,
  isReducedMotion = false,
}: HeroServicesMarqueeProps) {
  // SVG paw print separator icon
  const PawIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-orange shrink-0 inline-block opacity-80"
      aria-hidden="true"
    >
      <ellipse cx="6.5" cy="5" rx="2.5" ry="3.5" />
      <ellipse cx="12" cy="3" rx="2.5" ry="3.5" />
      <ellipse cx="17.5" cy="5" rx="2.5" ry="3.5" />
      <path d="M7 14C7 10 9 7.5 12 7.5s5 2.5 5 6.5c0 3.5-2.5 6-5 6s-5-2.5-5-6z" />
    </svg>
  );

  return (
    <div
      className={cn(
        'w-full relative overflow-hidden py-3 bg-olive-deep text-cream border-y border-sand/30 select-none group',
        className,
      )}
      aria-label="Veterinary Clinical Specialities"
    >
      {/* Subtle edge fade overlays for marquee blend */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-olive-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-olive-deep to-transparent z-10 pointer-events-none" />

      {isReducedMotion ? (
        /* Reduced Motion: Static accessible scrollable strip */
        <div className="flex items-center gap-6 overflow-x-auto px-6 py-1 scrollbar-none">
          {services.map((service, idx) => (
            <React.Fragment key={service.id || idx}>
              <Link
                href={`/services/dog#${service.slug}`}
                className="text-xs sm:text-sm font-semibold text-cream/90 hover:text-orange transition-colors shrink-0 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-orange rounded"
              >
                {service.title}
              </Link>
              <span className="shrink-0">{PawIcon}</span>
            </React.Fragment>
          ))}
        </div>
      ) : (
        /* Animated Infinite Marquee */
        <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          {/* Primary Track (Accessible to screen readers) */}
          <div className="flex items-center gap-8 px-4 shrink-0">
            {services.map((service, idx) => (
              <React.Fragment key={`p-${service.id || idx}`}>
                <Link
                  href={`/services/dog#${service.slug}`}
                  className="text-xs sm:text-sm font-semibold tracking-wide text-cream/90 hover:text-orange transition-colors shrink-0 whitespace-nowrap flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-orange rounded"
                >
                  <span>{service.title}</span>
                  {PawIcon}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Duplicate Track (Pure visual continuity with aria-hidden) */}
          <div className="flex items-center gap-8 px-4 shrink-0" aria-hidden="true">
            {services.map((service, idx) => (
              <React.Fragment key={`d-${service.id || idx}`}>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-cream/90 hover:text-orange transition-colors shrink-0 whitespace-nowrap flex items-center gap-3">
                  <span>{service.title}</span>
                  {PawIcon}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
