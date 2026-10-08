'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 6s Autoplay with pause on hover/focus and disabled on reduced motion
  useEffect(() => {
    if (isPaused || isReducedMotion || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, isReducedMotion, handleNext, total]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <section
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Pet Parent Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Parent Experiences</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-teal tracking-tight">
            Loved by Kolkata&apos;s Pet Parents
          </h2>

          <p className="mt-2 text-sm sm:text-base text-ink/80 leading-relaxed font-light">
            Real stories of compassion, recovery, and emergency life-saving surgical care.
          </p>
        </div>

        {/* Mobile / Tablet Carousel Arrow Controls */}
        <div className="flex lg:hidden items-center gap-3 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-gold/40 glass flex items-center justify-center text-teal hover:bg-gold hover:text-ink hover:border-gold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-gold/40 glass flex items-center justify-center text-teal hover:bg-gold hover:text-ink hover:border-gold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Grid Layout (all 3 visible) & Mobile/Tablet Interactive Slider */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="h-full p-8 rounded-3xl glass-card border border-gold/30 flex flex-col justify-between shadow-glass relative overflow-hidden group hover:border-gold/60 transition-all duration-300"
          >
            {/* Gold Watermark Quote Icon */}
            <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-gold/10 pointer-events-none group-hover:text-gold/20 transition-colors" />

            <div>
              {/* Star Rating */}
              <div
                className="flex items-center gap-1 mb-4"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-ink/85 dark:text-cream/85 leading-relaxed font-light italic mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            {/* Author Info */}
            <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-teal dark:text-cream">{item.name}</h3>
                <p className="text-xs text-gold-dark dark:text-gold font-medium mt-0.5">{item.pet}</p>
                <p className="text-[11px] text-ink/60 dark:text-cream/60">{item.area}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile & Tablet Slider Track */}
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer Reviews"
        className="lg:hidden relative overflow-hidden cursor-grab active:cursor-grabbing pb-4"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
              className="w-full shrink-0 px-2"
            >
              <div className="h-full p-7 rounded-3xl glass-card border border-gold/30 flex flex-col justify-between shadow-glass relative overflow-hidden">
                <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-gold/10 pointer-events-none" />

                <div>
                  <div
                    className="flex items-center gap-1 mb-4"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-ink/85 dark:text-cream/85 leading-relaxed font-light italic mb-6">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-teal dark:text-cream">{item.name}</h3>
                    <p className="text-xs text-gold-dark dark:text-gold font-medium mt-0.5">{item.pet}</p>
                    <p className="text-[11px] text-ink/60 dark:text-cream/60">{item.area}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIndex(dotIdx)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                currentIndex === dotIdx
                  ? 'w-8 bg-gold shadow-gold-glow'
                  : 'w-2 bg-gold/30 hover:bg-gold/60',
              )}
              aria-label={`Go to slide ${dotIdx + 1}`}
              aria-current={currentIndex === dotIdx ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
