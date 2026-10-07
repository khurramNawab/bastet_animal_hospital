'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { StoryDog } from './StoryDog';
import { Lighting } from './Lighting';
import { GoldDust } from './GoldDust';
import type { StoryPanel } from '@/lib/types';

interface StoryCanvasProps {
  progress: number;
  panels: StoryPanel[];
  reducedMotion?: boolean;
}

export function StoryCanvas({ progress, panels, reducedMotion = false }: StoryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? 'never' : 'always');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Observer to only mount canvas when user scrolls within ~400px of section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (!document.hidden) {
          setFrameloop(entry.isIntersecting ? 'always' : 'never');
        }
      },
      { rootMargin: '400px 0px', threshold: 0.05 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[420px] lg:min-h-[560px] flex items-center justify-center"
    >
      {isNearViewport ? (
        <Canvas
          frameloop={frameloop}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          camera={{
            position: [-0.6, 0.9, 2.9],
            fov: 35,
            near: 0.1,
            far: 50,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Lighting />
            <StoryDog progress={progress} panels={panels} reducedMotion={reducedMotion} />
            <GoldDust reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  );
}
