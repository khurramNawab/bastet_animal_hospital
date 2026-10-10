'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import type { SiteStat } from '@/lib/types';

interface StatsProps {
  stats: SiteStat[];
}

export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

function StatCounterItem({
  stat,
  isInView,
  isReducedMotion,
}: {
  stat: SiteStat;
  isInView: boolean;
  isReducedMotion: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(isReducedMotion ? stat.value : 0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isReducedMotion) {
      setCurrentValue(stat.value);
      return;
    }

    if (isInView && !animatedRef.current) {
      animatedRef.current = true;
      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();
      const target = stat.value;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease out quartic
        const ease = 1 - Math.pow(1 - progress, 4);
        const val = Math.floor(ease * target);

        setCurrentValue(val);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCurrentValue(target);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, stat.value, isReducedMotion]);

  const formattedDisplay = `${formatIndianNumber(currentValue)}${stat.suffix}`;
  const accessibleFullText = `${formatIndianNumber(stat.value)}${stat.suffix} ${stat.label}`;

  return (
    <div
      className="flex flex-col items-center justify-center p-6 sm:p-8 text-center"
      aria-label={accessibleFullText}
    >
      {/* Animated Number with Tabular Nums & Zero Layout Shift */}
      <div
        className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sand tabular-nums tracking-tight min-h-[1.2em] flex items-center justify-center"
        aria-hidden="true"
      >
        <span>{formatIndianNumber(currentValue)}</span>
        <span className="text-orange ml-0.5">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-cream/90 font-medium max-w-[160px] leading-relaxed">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats({ stats }: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-olive-deep text-cream py-14 sm:py-16 border-y border-sand/30 shadow-2xl overflow-hidden"
      aria-label="Clinical Metrics and Hospital Impact"
    >
      {/* Background Subtle Geometric Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#F7DAA7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-sand/20">
          {stats.map((stat, idx) => (
            <StatCounterItem
              key={idx}
              stat={stat}
              isInView={isInView}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
