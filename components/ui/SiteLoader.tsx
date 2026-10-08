'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if reduced motion or already shown in this session
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    try {
      const alreadyShown = sessionStorage.getItem('bastet_intro_shown');
      if (alreadyShown) return;

      sessionStorage.setItem('bastet_intro_shown', 'true');
      setIsVisible(true);

      // Auto dismiss after 1.2s
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1200);

      return () => clearTimeout(timer);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream dark:bg-ink pointer-events-none select-none"
        >
          {/* Glowing Brand Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-20 h-20 rounded-2xl overflow-hidden bg-teal-900 border-2 border-gold/60 shadow-gold-glow-lg mb-5 flex items-center justify-center"
          >
            <Image
              src="/images/Bastetanimalhospital.avif"
              alt="Bastet Animal Hospital"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>

          {/* Paw Prints Sequence */}
          <div className="flex items-center gap-3 mb-4">
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + idx * 0.1,
                  ease: 'easeOut',
                }}
                className="w-3.5 h-3.5 rounded-full bg-gold shadow-gold-glow"
              />
            ))}
          </div>

          {/* Bastet Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="text-center"
          >
            <span className="font-display font-bold text-2xl tracking-widest text-teal dark:text-gold uppercase">
              Bastet
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-gold-dark dark:text-cream/70 font-semibold mt-0.5">
              Small Animal Hospital • Kolkata
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
