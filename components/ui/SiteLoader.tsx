'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    // 1. If reduced motion or already shown in this session, don't show at all
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setHasFinished(true);
      return;
    }

    try {
      const alreadyShown = sessionStorage.getItem('bastet_intro_shown');
      if (alreadyShown) {
        setHasFinished(true);
        return;
      }

      sessionStorage.setItem('bastet_intro_shown', 'true');
      setIsVisible(true);

      // Auto dismiss after 600ms
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);

      // Dismiss immediately on user scroll or click
      const dismissFast = () => {
        setIsVisible(false);
      };

      window.addEventListener('scroll', dismissFast, { passive: true, once: true });
      window.addEventListener('pointerdown', dismissFast, { passive: true, once: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', dismissFast);
        window.removeEventListener('pointerdown', dismissFast);
      };
    } catch {
      setHasFinished(true);
    }
  }, []);

  // Once finished animating, completely unmount from DOM to prevent any overlay blocking
  if (hasFinished) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setHasFinished(true)}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream/95 dark:bg-olive-deep/95 backdrop-blur-sm pointer-events-none select-none"
        >
          {/* Glowing Brand Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-28 h-14 rounded-2xl overflow-hidden bg-cream p-2 border-2 border-sand shadow-warm-glow mb-4 flex items-center justify-center"
          >
            <Image
              src="/brand/logo.avif"
              alt="Bastet Animal Hospital"
              width={112}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>

          {/* Paw Prints Sequence */}
          <div className="flex items-center gap-2.5 mb-3">
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1 + idx * 0.08,
                  ease: 'easeOut',
                }}
                className="w-3 h-3 rounded-full bg-orange shadow-warm-glow"
              />
            ))}
          </div>

          {/* Bastet Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="text-center"
          >
            <span className="font-display font-bold text-xl tracking-widest text-olive dark:text-cream uppercase">
              Bastet
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-brown-soft dark:text-sand font-semibold mt-0.5">
              Small Animal Hospital • Kolkata
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
