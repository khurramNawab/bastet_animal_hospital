'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCanRender3D } from '@/hooks/useCanRender3D';

interface SceneWipeProps {
  className?: string;
}

export function SceneWipe({ className }: SceneWipeProps) {
  const { isReducedMotion, isMounted } = useCanRender3D();
  const triggerRef = useRef<HTMLDivElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current || !hillRef.current || isReducedMotion) {
      return;
    }

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Only apply scrub animation on desktop viewport (>= 768px)
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      // GPU-accelerated hill elevation wipe to cover hero smoothly
      gsap.fromTo(
        hillRef.current,
        {
          yPercent: 75,
          scaleY: 0.8,
          transformOrigin: 'bottom center',
          force3D: true,
        },
        {
          yPercent: 0,
          scaleY: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }, triggerRef);

    return () => ctx.revert();
  }, [isReducedMotion, isMounted]);

  return (
    <div
      ref={triggerRef}
      className={`relative w-full h-24 sm:h-32 lg:h-44 -mt-16 sm:-mt-24 lg:-mt-32 overflow-hidden pointer-events-none z-20 ${className ?? ''}`}
      aria-hidden="true"
    >
      <div
        ref={hillRef}
        className="w-full h-full will-change-transform"
      >
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Natural gentle arch curve rising to meet Story background */}
          <path
            d="M 0,180 L 0,60 Q 360,0 720,28 Q 1080,56 1440,10 L 1440,180 Z"
            className="fill-olive-deep transition-colors duration-300"
          />
        </svg>
      </div>
    </div>
  );
}
