'use client';

import React, { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

interface Loader3DProps {
  onLoaded?: () => void;
}

export function Loader3D({ onLoaded }: Loader3DProps) {
  const { active, progress } = useProgress();

  useEffect(() => {
    if (!active || progress >= 100) {
      const timer = setTimeout(() => {
        onLoaded?.();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onLoaded]);

  return (
    <AnimatePresence>
      {active && progress < 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-cream/80 dark:bg-olive-deep/80 backdrop-blur-sm pointer-events-none"
        >
          {/* Orange Glowing Ring & Paw Mark */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-orange/20 border-t-orange animate-spin" />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-orange"
            >
              <ellipse cx="12" cy="15" rx="4" ry="3.5" fill="currentColor" />
              <circle cx="7" cy="9" r="1.8" fill="currentColor" />
              <circle cx="10.5" cy="6.5" r="1.8" fill="currentColor" />
              <circle cx="13.5" cy="6.5" r="1.8" fill="currentColor" />
              <circle cx="17" cy="9" r="1.8" fill="currentColor" />
            </svg>
          </div>
          <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-olive dark:text-cream font-sans">
            Preparing 3D Experience {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
