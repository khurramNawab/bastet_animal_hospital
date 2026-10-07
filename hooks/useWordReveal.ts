'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseWordRevealOptions {
  trigger?: boolean;
  delay?: number;
  reducedMotion?: boolean;
}

export function useWordReveal({
  trigger = true,
  delay = 0.2,
  reducedMotion = false,
}: UseWordRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !trigger) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll('.word-inner');
      if (!words || words.length === 0) return;

      if (reducedMotion) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
          delay,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [trigger, delay, reducedMotion]);

  return containerRef;
}
