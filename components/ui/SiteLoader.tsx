'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setHasFinished(true);
      return;
    }

    try {
      const alreadyShown = sessionStorage.getItem('bastet_intro_shown_r5');
      if (alreadyShown) {
        setHasFinished(true);
        return;
      }

      sessionStorage.setItem('bastet_intro_shown_r5', 'true');
      setIsVisible(true);

      // Dismiss after 1000ms (max 1.2s total)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      // Failsafe 3s guarantee
      const failsafe = setTimeout(() => {
        setIsVisible(false);
        setHasFinished(true);
      }, 3000);

      // Dismiss immediately on user scroll or pointer action
      const dismissFast = () => {
        setIsVisible(false);
      };

      window.addEventListener('scroll', dismissFast, { passive: true, once: true });
      window.addEventListener('pointerdown', dismissFast, { passive: true, once: true });

      return () => {
        clearTimeout(timer);
        clearTimeout(failsafe);
        window.removeEventListener('scroll', dismissFast);
        window.removeEventListener('pointerdown', dismissFast);
      };
    } catch {
      setHasFinished(true);
    }
  }, []);

  if (hasFinished) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setHasFinished(true)}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/95 dark:bg-olive-deep/95 backdrop-blur-md pointer-events-none select-none"
        >
          {/* Animated Orange Medical Cross + Paw SVG */}
          <div className="relative w-20 h-20 flex items-center justify-center mb-4">
            {/* Pulsing cross badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-16 h-16 rounded-2xl bg-orange/15 border-2 border-orange/40 flex items-center justify-center text-orange shadow-warm-glow"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
              </svg>
            </motion.div>

            {/* Orbiting Paw dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange text-cream flex items-center justify-center shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <ellipse cx="6" cy="7" rx="2" ry="2.8" transform="rotate(-20 6 7)" />
                <ellipse cx="18" cy="7" rx="2" ry="2.8" transform="rotate(20 18 7)" />
                <ellipse cx="10" cy="4" rx="2" ry="2.8" transform="rotate(-6 10 4)" />
                <ellipse cx="14" cy="4" rx="2" ry="2.8" transform="rotate(6 14 4)" />
                <path d="M12 10.5C9 10.5 6.5 13 7.5 16.5C8.3 19.5 10 20.5 12 20.5C14 20.5 15.7 19.5 16.5 16.5C17.5 13 15 10.5 12 10.5Z" />
              </svg>
            </motion.div>
          </div>

          {/* Bastet Typography */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-center"
          >
            <span className="font-heading font-extrabold text-2xl tracking-wider text-olive-deep dark:text-cream uppercase">
              Bastet
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-orange-deep dark:text-sand font-bold mt-0.5">
              Small Animal Hospital • Kolkata
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
