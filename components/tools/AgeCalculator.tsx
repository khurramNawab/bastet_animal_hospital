'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Heart, ArrowRight, Info } from 'lucide-react';
import { calcHumanAge } from '@/lib/tools/age';
import { cn } from '@/lib/cn';
import type { AgeCalculatorConfig, DogSizeId } from '@/lib/types';

interface AgeCalculatorProps {
  config: AgeCalculatorConfig;
}

export function AgeCalculator({ config }: AgeCalculatorProps) {
  const [dogName, setDogName] = useState('');
  const [years, setYears] = useState<number | string>(3);
  const [months, setMonths] = useState<number | string>(0);
  const [size, setSize] = useState<DogSizeId>('medium');
  const [displayNumber, setDisplayNumber] = useState(29);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const nameInputId = useId();
  const yearsInputId = useId();
  const monthsInputId = useId();

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
  }, []);

  const numYears = Number(years) || 0;
  const numMonths = Number(months) || 0;

  const result = calcHumanAge(
    {
      years: numYears,
      months: numMonths,
      size,
    },
    config,
  );

  const previousNumberRef = React.useRef(29);

  // Animated Count-Up for calculated human age
  useEffect(() => {
    if (!result.isValid) return;

    if (isReducedMotion) {
      setDisplayNumber(result.roundedHumanAge);
      previousNumberRef.current = result.roundedHumanAge;
      return;
    }

    const startVal = previousNumberRef.current;
    const endVal = result.roundedHumanAge;
    const duration = 600;
    const startTime = performance.now();

    let frameId: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(startVal + (endVal - startVal) * ease);
      setDisplayNumber(val);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayNumber(endVal);
        previousNumberRef.current = endVal;
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [result.roundedHumanAge, result.isValid, isReducedMotion]);

  const displayName = dogName.trim() || 'Your companion';

  return (
    <div className="w-full flex flex-col gap-6 text-ink">
      {/* Intro Subtitle */}
      <div>
        <p className="text-sm text-ink/75 leading-relaxed font-light">
          {config.tagline}
        </p>
      </div>

      {/* Form Controls */}
      <div className="flex flex-col gap-5">
        {/* Optional Dog Name */}
        <div>
          <label
            htmlFor={nameInputId}
            className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5"
          >
            Dog&apos;s Name <span className="text-ink/40 font-normal lowercase">(optional)</span>
          </label>
          <input
            id={nameInputId}
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="e.g., Leo or Bella"
            maxLength={30}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold/40 text-ink placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm"
          />
        </div>

        {/* Size Selection Chips */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-teal mb-2">
            Dog Size Category
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {config.sizes.map((s) => {
              const isSelected = size === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSize(s.id)}
                  className={cn(
                    'p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-gold',
                    isSelected
                      ? 'border-gold bg-gold/15 shadow-sm ring-1 ring-gold'
                      : 'border-gold/20 bg-white/70 hover:border-gold/50 hover:bg-white',
                  )}
                >
                  <span className="font-display font-bold text-sm text-teal">
                    {s.label}
                  </span>
                  <span className="text-[11px] text-gold-dark font-medium mt-0.5">
                    {s.weightRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Age Inputs: Years & Months */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={yearsInputId}
              className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5"
            >
              Age (Years)
            </label>
            <input
              id={yearsInputId}
              type="number"
              min={0}
              max={30}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold/40 text-ink focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-base font-semibold"
            />
          </div>

          <div>
            <label
              htmlFor={monthsInputId}
              className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5"
            >
              Months (0 – 11)
            </label>
            <input
              id={monthsInputId}
              type="number"
              min={0}
              max={11}
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold/40 text-ink focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-base font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result.isValid ? (
        <div className="mt-2 p-6 rounded-2xl bg-teal-900 text-cream border border-gold/40 shadow-xl relative overflow-hidden flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-1">
                Estimated Equivalent
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-gold tabular-nums flex items-baseline gap-2">
                <span>≈ {displayNumber}</span>
                <span className="text-lg sm:text-xl text-cream font-normal font-sans">
                  human years
                </span>
              </div>
            </div>

            {result.lifeStage && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{result.lifeStage.label}</span>
              </div>
            )}
          </div>

          {/* Care Hint for Life Stage */}
          {result.careHint && (
            <div className="p-3.5 rounded-xl bg-teal/60 border border-gold/20 flex items-start gap-3">
              <Heart className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p className="text-xs text-cream/90 leading-relaxed font-light">
                <strong className="font-semibold text-gold-light">{displayName}:</strong>{' '}
                {result.careHint}
              </p>
            </div>
          )}

          {/* Soft CTA */}
          <div className="pt-2 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-cream/60">
              Personalized longevity starts with proactive wellness care.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-ink font-semibold text-xs hover:bg-gold-light transition-all shadow-gold-glow shrink-0"
            >
              <span>Book Wellness Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{result.errorMessage}</span>
        </div>
      )}

      {/* Approximate Disclaimer Note */}
      <div className="flex items-start gap-2 text-[11px] text-ink/60 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
        <p>{config.disclaimer}</p>
      </div>
    </div>
  );
}
