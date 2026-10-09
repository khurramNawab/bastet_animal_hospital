'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface CrossDividerProps {
  variant?: 'line' | 'cross' | 'paws';
  className?: string;
}

export const CrossDivider: React.FC<CrossDividerProps> = ({
  variant = 'cross',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (variant === 'line') {
    return (
      <div
        className={cn('relative w-full flex items-center justify-center py-6', className)}
        aria-hidden="true"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sand to-transparent dark:via-sand/40" />
      </div>
    );
  }

  if (variant === 'paws') {
    return (
      <div
        className={cn('relative w-full flex items-center justify-center py-8 gap-4 overflow-hidden', className)}
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-sand dark:to-sand/40" />
        <div className="flex items-center gap-3 text-orange dark:text-sand opacity-80">
          <svg className="w-4 h-4 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="6" cy="7" rx="2" ry="2.8" />
            <ellipse cx="11" cy="4" rx="2" ry="2.8" />
            <ellipse cx="16" cy="5" rx="2" ry="2.8" />
            <ellipse cx="20" cy="9" rx="1.8" ry="2.5" />
            <path d="M7 14c0-3 3-5 6-5s6 2 6 5c0 3.5-2.5 6-6 6s-6-2.5-6-6z" />
          </svg>
          <svg className="w-3.5 h-3.5 transform rotate-12 text-olive dark:text-sand/80" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="6" cy="7" rx="2" ry="2.8" />
            <ellipse cx="11" cy="4" rx="2" ry="2.8" />
            <ellipse cx="16" cy="5" rx="2" ry="2.8" />
            <ellipse cx="20" cy="9" rx="1.8" ry="2.5" />
            <path d="M7 14c0-3 3-5 6-5s6 2 6 5c0 3.5-2.5 6-6 6s-6-2.5-6-6z" />
          </svg>
          <svg className="w-4 h-4 transform -rotate-6" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="6" cy="7" rx="2" ry="2.8" />
            <ellipse cx="11" cy="4" rx="2" ry="2.8" />
            <ellipse cx="16" cy="5" rx="2" ry="2.8" />
            <ellipse cx="20" cy="9" rx="1.8" ry="2.5" />
            <path d="M7 14c0-3 3-5 6-5s6 2 6 5c0 3.5-2.5 6-6 6s-6-2.5-6-6z" />
          </svg>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-sand dark:to-sand/40" />
      </div>
    );
  }

  // Default 'cross' variant (Medical cross + paw emblem motif)
  return (
    <div
      className={cn('relative w-full flex items-center justify-center py-8', className)}
      aria-hidden="true"
    >
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full flex items-center justify-center gap-4"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sand/70 to-sand dark:via-sand/20 dark:to-sand/50" />

        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-cream-50 dark:bg-olive-900 border border-sand/50 dark:border-sand/25 shadow-sm text-orange">
          {/* Rounded Cross Motif */}
          <svg
            className="w-4 h-4 text-orange"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 3a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 00-2 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4a2 2 0 00-2-2H5a2 2 0 01-2-2v-2a2 2 0 012-2h4a2 2 0 002-2V3z" />
          </svg>

          {/* Little Paw Motif */}
          <svg
            className="w-3.5 h-3.5 text-olive dark:text-sand"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <ellipse cx="6" cy="7" rx="2" ry="2.8" />
            <ellipse cx="11" cy="4" rx="2" ry="2.8" />
            <ellipse cx="16" cy="5" rx="2" ry="2.8" />
            <ellipse cx="20" cy="9" rx="1.8" ry="2.5" />
            <path d="M7 14c0-3 3-5 6-5s6 2 6 5c0 3.5-2.5 6-6 6s-6-2.5-6-6z" />
          </svg>
        </div>

        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-sand/70 to-sand dark:via-sand/20 dark:to-sand/50" />
      </motion.div>
    </div>
  );
};
