'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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

  // 6s Autoplay with pause on hover/focus/touch and disable on reduced motion
  useEffect(() => {
    if (isPaused || isReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, isReducedMotion, handleNext]);

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
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
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

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
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

      {/* Testimonials Carousel Track */}
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer Reviews"
        className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-6"
      >
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -((total - 1) * 360), right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) {
              handleNext();
            } else if (info.offset.x > 50) {
              handlePrev();
            }
          }}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
            >
              <div className="h-full p-7 sm:p-8 rounded-3xl glass-card border border-gold/30 flex flex-col justify-between shadow-glass relative overflow-hidden">
                {/* Gold Watermark Quote Icon */}
                <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-gold/10 pointer-events-none" />

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
                  <p className="text-sm sm:text-base text-ink/85 leading-relaxed font-light italic mb-6">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-teal">{item.name}</h3>
                    <p className="text-xs text-gold-dark font-medium mt-0.5">{item.pet}</p>
                    <p className="text-[11px] text-ink/60">{item.area}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
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
    </section>
  );
}
