'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DogModel } from './DogModel';
import { Lighting } from './Lighting';
import { GoldDust } from './GoldDust';
import { Loader3D } from './Loader3D';

interface HeroCanvasProps {
  reducedMotion?: boolean;
  onLoaded?: () => void;
}

export function HeroCanvas({ reducedMotion = false, onLoaded }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  // Handle offscreen viewport pause and tab visibility pause
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
      { threshold: 0.1 },
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
    <div ref={containerRef} className="relative w-full h-full min-h-[420px] lg:min-h-[560px]">
      <Loader3D onLoaded={onLoaded} />

      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          position: [0, 1.2, 3.8],
          fov: 35,
          near: 0.1,
          far: 50,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Lighting />
          <DogModel reducedMotion={reducedMotion} />
          <GoldDust reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
