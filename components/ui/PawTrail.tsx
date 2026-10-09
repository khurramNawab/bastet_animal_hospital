'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PawTrailProps {
  pathD?: string;
  pawCount?: number;
  className?: string;
  isReducedMotion?: boolean;
}

export interface PawPoint {
  x: number;
  y: number;
  angle: number;
  isRight: boolean;
}

/**
 * Pure helper function to compute point positions and tangent angles along an SVG path
 */
export function computePawTrailPoints(
  pathElement: SVGPathElement | null,
  count: number = 8,
): PawPoint[] {
  if (!pathElement || count <= 0) return [];

  const totalLength = pathElement.getTotalLength();
  const points: PawPoint[] = [];

  for (let i = 0; i < count; i++) {
    const progress = (i + 0.5) / count;
    const distance = progress * totalLength;
    const pt = pathElement.getPointAtLength(distance);

    // Sample a point slightly ahead to compute tangent rotation
    const nextDistance = Math.min(distance + 2, totalLength);
    const nextPt = pathElement.getPointAtLength(nextDistance);
    const dx = nextPt.x - pt.x;
    const dy = nextPt.y - pt.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    points.push({
      x: pt.x,
      y: pt.y,
      angle,
      isRight: i % 2 === 1,
    });
  }

  return points;
}

export function PawTrail({
  pathD = 'M 60,0 C 80,120 20,240 60,360 C 100,480 30,600 60,720',
  pawCount = 8,
  className,
  isReducedMotion = false,
}: PawTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<PawPoint[]>([]);

  // Compute SVG trail coordinates
  useEffect(() => {
    if (pathRef.current) {
      const computed = computePawTrailPoints(pathRef.current, pawCount);
      setPoints(computed);
    }
  }, [pathD, pawCount]);

  // GSAP ScrollTrigger entrance scrub
  useLayoutEffect(() => {
    if (isReducedMotion || points.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const paws = containerRef.current?.querySelectorAll('.paw-step');
      if (paws && paws.length > 0) {
        gsap.fromTo(
          paws,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 0.85,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.5,
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [points, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-32 h-[480px] pointer-events-none select-none z-10', className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Hidden reference path for coordinate sampling */}
        <path ref={pathRef} d={pathD} stroke="transparent" fill="none" />

        {/* Rendered Paw Steps */}
        {points.map((pt, idx) => {
          // Slight lateral offset for left vs right paws
          const offsetDist = pt.isRight ? 12 : -12;
          const rad = ((pt.angle + 90) * Math.PI) / 180;
          const offsetX = pt.x + Math.cos(rad) * offsetDist;
          const offsetY = pt.y + Math.sin(rad) * offsetDist;
          const rotation = pt.angle + (pt.isRight ? 12 : -12);

          return (
            <g
              key={idx}
              className={cn('paw-step transition-opacity', isReducedMotion ? 'opacity-70' : 'opacity-0')}
              transform={`translate(${offsetX}, ${offsetY}) rotate(${rotation}) scale(0.75)`}
            >
              {/* Paw Print Graphic */}
              <ellipse cx="-4" cy="-5" rx="2.5" ry="3.8" fill="#FF751B" opacity="0.9" />
              <ellipse cx="0" cy="-7" rx="2.5" ry="3.8" fill="#FF751B" opacity="0.9" />
              <ellipse cx="4" cy="-5" rx="2.5" ry="3.8" fill="#FF751B" opacity="0.9" />
              <path
                d="M-5 2C-5 -2 -2 -4.5 0 -4.5S5 -2 5 2C5 5.5 2.5 7.5 0 7.5S-5 5.5 -5 2Z"
                fill="#FF751B"
                opacity="0.9"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
