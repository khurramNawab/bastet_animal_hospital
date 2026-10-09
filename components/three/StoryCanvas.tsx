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

  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? 'never' : 'always');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!document.hidden) {
          setFrameloop(entry.isIntersecting ? 'always' : 'never');
        }
      },
      { threshold: 0.05 },
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
      className="relative w-full h-full min-h-[380px] lg:min-h-[500px] flex items-center justify-center"
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          position: [-0.65, 0.72, 2.22],
          fov: 42,
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
    </div>
  );
}
