'use client';

import { useState, useEffect } from 'react';

export interface Render3DCapabilities {
  canRender3D: boolean;
  isReducedMotion: boolean;
  isMounted: boolean;
}

export function useCanRender3D(): Render3DCapabilities {
  const [capabilities, setCapabilities] = useState<Render3DCapabilities>({
    canRender3D: false,
    isReducedMotion: false,
    isMounted: false,
  });

  useEffect(() => {
    // 1. Reduced Motion Check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = motionQuery.matches;

    // 2. Viewport Width Check (<768px is mobile)
    const isMobileViewport = window.innerWidth < 768;

    // 3. WebGL Support Check
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = Boolean(
        window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
      );
    } catch {
      hasWebGL = false;
    }

    // 4. Low-power / Low-memory Device Check
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowCores = nav.hardwareConcurrency ? nav.hardwareConcurrency <= 4 : false;
    const lowMemory = nav.deviceMemory ? nav.deviceMemory <= 4 : false;
    const isLowPower = lowCores || lowMemory;

    // Can render 3D if WebGL supported, desktop viewport, and not severely throttled
    const canRender3D = hasWebGL && !isMobileViewport && !isLowPower;

    setCapabilities({
      canRender3D,
      isReducedMotion,
      isMounted: true,
    });

    const handleResize = () => {
      const updatedMobile = window.innerWidth < 768;
      setCapabilities((prev) => ({
        ...prev,
        canRender3D: hasWebGL && !updatedMobile && !isLowPower,
      }));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
