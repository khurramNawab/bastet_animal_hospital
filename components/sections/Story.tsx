'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ScanSearch, HeartPulse } from 'lucide-react';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import { StoryCanvas } from '@/components/three';
import { StoryFallback } from './StoryFallback';
import { CrossDivider } from '@/components/ui/CrossDivider';
import { sceneForProgress } from '@/lib/story/scene';
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

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=160%',
        pin: pinnedSectionRef.current,
        pinSpacing: true,
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
        return <Shield className="w-6 h-6 text-orange" />;
      case 'ScanSearch':
        return <ScanSearch className="w-6 h-6 text-orange" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-orange" />;
      default:
        return <Shield className="w-6 h-6 text-orange" />;
    }
  };

  const activeEffect = panels[activeStepIndex]?.scene?.effect ?? 'sun';

  if (isMounted && (!canRender3D || isReducedMotion)) {
    return <StoryFallback panels={panels} />;
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-olive-deep text-cream overflow-hidden transition-colors duration-500"
      aria-label="How We Care - Clinical Journey"
    >
      {/* Multi-Scene Dynamic Background Color & Glow Overlays */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 pointer-events-none -z-10',
          activeStepIndex === 0 && 'bg-gradient-to-b from-olive-deep via-olive-deep to-olive-900',
          activeStepIndex === 1 && 'bg-gradient-to-b from-olive-900 via-olive-deep to-olive-900',
          activeStepIndex === 2 && 'bg-gradient-to-b from-brown-deep/80 via-olive-deep to-olive-deep',
        )}
      />

      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#F7DAA7_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Scene 1: Top Soft Sun Radiance (Always in DOM to avoid insertBefore reconciliation error) */}
      <div
        className={cn(
          'absolute top-0 right-1/6 w-[600px] h-[400px] bg-gradient-to-b from-orange/25 via-sand/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse transition-opacity duration-700',
          activeEffect === 'sun' && !isReducedMotion ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Scene 3: Deep Warm Rising Bottom Glow (Always in DOM) */}
      <div
        className={cn(
          'absolute bottom-0 inset-x-0 h-[450px] bg-gradient-to-t from-orange-deep/35 via-brown/20 to-transparent rounded-t-full blur-3xl pointer-events-none transition-opacity duration-700',
          activeEffect === 'pulse' && !isReducedMotion ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedSectionRef}
        className="w-full h-screen min-h-[580px] max-h-[880px] overflow-hidden flex flex-col justify-between py-6"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
          {/* Top Divider */}
          <div className="w-full">
            <CrossDivider variant="line" className="py-2" />
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
                          ? 'border-orange bg-orange text-ink shadow-warm-glow scale-110'
                          : 'border-sand/30 text-sand/60 bg-olive-900/60',
                      )}
                    >
                      {panel.step}
                    </div>
                    {idx < panels.length - 1 && (
                      <div
                        className={cn(
                          'w-0.5 h-12 transition-colors duration-300',
                          activeStepIndex > idx ? 'bg-orange' : 'bg-sand/20',
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Cross-Fading Text Content */}
              <div className="flex-1 min-h-[260px] flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-sand font-semibold">
                    How We Care • Step {panels[activeStepIndex]?.step || '01'}
                  </span>
                  {panels[activeStepIndex]?.scene?.mood && (
                    <span className="px-2 py-0.5 rounded-full bg-sand/15 text-[10px] text-sand font-medium uppercase tracking-wider">
                      {panels[activeStepIndex].scene.mood}
                    </span>
                  )}
                </div>

                <h2 className="sr-only">How We Care For Every Companion</h2>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-olive-900 border border-sand/40 shadow-sm backdrop-blur-md">
                    {getIcon(panels[activeStepIndex]?.icon || 'Shield')}
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold text-cream">
                    {panels[activeStepIndex]?.title || 'Prevent'}
                  </h3>
                </div>

                <p className="text-base sm:text-lg font-semibold text-orange-soft mb-3 leading-snug">
                  {panels[activeStepIndex]?.line || ''}
                </p>

                <p className="text-sm sm:text-base leading-relaxed max-w-md text-cream/85 font-light">
                  {panels[activeStepIndex]?.detail || ''}
                </p>
              </div>
            </div>

            {/* Right Column: 3D Story Canvas with dynamic camera poses & visual scene effects */}
            <div className="lg:col-span-6 relative w-full h-[520px] sm:h-[560px] lg:h-[640px] flex items-center justify-center overflow-visible">
              {/* Scene 2: Scan Beam Effect Overlay (Permanently mounted in DOM) */}
              <div
                className={cn(
                  'absolute inset-x-4 top-8 bottom-8 pointer-events-none z-20 overflow-hidden rounded-3xl border border-orange/30 shadow-inner transition-opacity duration-500',
                  activeEffect === 'scan' && !isReducedMotion ? 'opacity-100' : 'opacity-0',
                )}
                aria-hidden="true"
              >
                {/* Subtle Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF751B12_1px,transparent_1px),linear-gradient(to_bottom,#FF751B12_1px,transparent_1px)] bg-[size:28px_28px]" />
                {/* Sweeping Horizontal Laser Scan Bar */}
                <div className="absolute w-full h-1.5 bg-gradient-to-r from-transparent via-orange to-transparent shadow-[0_0_20px_#FF751B] animate-scan-sweep opacity-90" />
                {/* Corner Target Reticles */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange" />
              </div>

              {/* Scene 3: Triple Concentric Heartbeat Pulse Rings (Permanently mounted in DOM) */}
              <div
                className={cn(
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center transition-opacity duration-500',
                  activeEffect === 'pulse' && !isReducedMotion ? 'opacity-100' : 'opacity-0',
                )}
                aria-hidden="true"
              >
                <div className="w-[420px] h-[420px] rounded-full border-2 border-orange/20 animate-ping opacity-30" />
                <div className="absolute w-72 h-72 rounded-full border border-sand/40 animate-pulse opacity-50" />
                <div className="absolute w-44 h-44 rounded-full bg-orange-deep/15 blur-xl animate-pulse" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-sand/15 via-orange/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              {isMounted && canRender3D && (
                <StoryCanvas progress={scrollProgress} panels={panels} />
              )}
            </div>
          </div>

          {/* Bottom Divider & Indicator */}
          <div className="w-full flex flex-col items-center">
            <CrossDivider variant="line" className="py-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

