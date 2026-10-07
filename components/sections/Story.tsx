'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ScanSearch, HeartPulse } from 'lucide-react';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import { StoryCanvas } from '@/components/three';
import { StoryFallback } from './StoryFallback';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { cn } from '@/lib/cn';
import type { StoryPanel } from '@/lib/types';

interface StoryProps {
  panels: StoryPanel[];
}

export function Story({ panels }: StoryProps) {
  const { canRender3D, isReducedMotion, isMounted } = useCanRender3D();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !pinnedSectionRef.current || isReducedMotion || !canRender3D) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: pinnedSectionRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Update active step based on progress thresholds
          if (p < 0.38) {
            setActiveStepIndex(0);
          } else if (p < 0.72) {
            setActiveStepIndex(1);
          } else {
            setActiveStepIndex(2);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [canRender3D, isReducedMotion]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-gold" />;
      case 'ScanSearch':
        return <ScanSearch className="w-6 h-6 text-gold" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-gold" />;
      default:
        return <Shield className="w-6 h-6 text-gold" />;
    }
  };

  if (!isMounted || !canRender3D || isReducedMotion) {
    return <StoryFallback panels={panels} />;
  }

  // Calculate background color transition from Cream (#FAF5E9) to Deep Teal (#062527)
  const bgOpacity = Math.min(1, Math.max(0, scrollProgress * 1.2));

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-teal-900 text-cream"
      aria-label="How We Care - Clinical Journey"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedSectionRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col justify-between">
          {/* Top Gold Divider */}
          <div className="w-full">
            <GoldDivider className="py-2" />
          </div>

          {/* Main Grid: Left Story Text Panels | Right 3D Dog Canvas */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
            {/* Left Column: Progress Step Numbers & Text Panels */}
            <div className="lg:col-span-6 flex items-start gap-6 sm:gap-8 z-10">
              {/* Vertical Step Progress Line */}
              <div className="flex flex-col items-center gap-4 pt-2" aria-hidden="true">
                {panels.map((panel, idx) => (
                  <div key={panel.id} className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold font-display transition-all duration-300',
                        activeStepIndex === idx
                          ? 'border-gold bg-gold text-ink shadow-gold-glow scale-110'
                          : 'border-gold/30 text-gold/60 bg-teal/40',
                      )}
                    >
                      {panel.step}
                    </div>
                    {idx < panels.length - 1 && (
                      <div
                        className={cn(
                          'w-0.5 h-12 transition-colors duration-300',
                          activeStepIndex > idx ? 'bg-gold' : 'bg-gold/20',
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Cross-Fading Text Content */}
              <div className="flex-1 min-h-[280px] flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
                  How We Care • Step {panels[activeStepIndex].step}
                </span>

                <h2 className="sr-only">How We Care For Every Companion</h2>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-teal/60 border border-gold/40 shadow-sm backdrop-blur-md">
                    {getIcon(panels[activeStepIndex].icon)}
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold text-cream">
                    {panels[activeStepIndex].title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg font-semibold text-gold-light mb-3 leading-snug">
                  {panels[activeStepIndex].line}
                </p>

                <p className="text-sm sm:text-base leading-relaxed max-w-md text-cream/85 font-light">
                  {panels[activeStepIndex].detail}
                </p>
              </div>
            </div>

            {/* Right Column: 3D Story Canvas with dynamic camera poses */}
            <div className="lg:col-span-6 relative w-full h-[400px] lg:h-[520px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/15 via-teal/20 to-transparent rounded-full blur-3xl pointer-events-none" />
              <StoryCanvas progress={scrollProgress} panels={panels} />
            </div>
          </div>

          {/* Bottom Gold Divider & Indicator */}
          <div className="w-full flex flex-col items-center">
            <GoldDivider className="py-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
