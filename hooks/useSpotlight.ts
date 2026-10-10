'use client';

import { useEffect, useRef } from 'react';

interface UseSpotlightOptions {
  radius?: number;
  color?: string;
}

export function useSpotlight({
  radius = 300,
  color = 'rgba(255, 117, 27, 0.15)',
}: UseSpotlightOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          container.style.setProperty('--spotlight-x', `${targetX}px`);
          container.style.setProperty('--spotlight-y', `${targetY}px`);
          container.style.setProperty('--spotlight-radius', `${radius}px`);
          container.style.setProperty('--spotlight-color', color);
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.style.setProperty('--spotlight-opacity', '0');
    };

    const handleMouseEnter = () => {
      container.style.setProperty('--spotlight-opacity', '1');
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [radius, color]);

  return containerRef;
}
