'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export type DividerVariant = 'line' | 'eye' | 'ankh-pattern';

interface GoldDividerProps {
  className?: string;
  variant?: DividerVariant;
}

export function GoldDivider({ className, variant = 'line' }: GoldDividerProps) {
  if (variant === 'eye') {
    return (
      <div
        className={cn('flex items-center justify-center w-full py-6 overflow-hidden', className)}
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
        <div className="mx-4 flex items-center justify-center text-gold">
          {/* Eye of Horus / Royal Guardian Minimal Line Art */}
          <motion.svg
            width="48"
            height="32"
            viewBox="0 0 48 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="stroke-gold"
          >
            {/* Brow */}
            <path
              d="M4 8C14 4 34 4 44 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Upper Lid & Pupil */}
            <path
              d="M8 14C16 10 32 10 40 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="24"
              cy="15"
              r="3.5"
              fill="currentColor"
              fillOpacity="0.3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="24" cy="15" r="1.5" fill="currentColor" />
            {/* Lower Lid */}
            <path
              d="M10 16C18 20 30 20 38 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Falcon Markings */}
            <path d="M24 19V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M32 17C32 23 37 25 40 26"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
      </div>
    );
  }

  if (variant === 'ankh-pattern') {
    return (
      <div
        className={cn('flex items-center justify-center w-full py-4 overflow-hidden', className)}
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
        <div className="mx-3 flex items-center gap-3 text-gold opacity-80">
          {[...Array(3)].map((_, i) => (
            <svg
              key={i}
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-gold"
            >
              <ellipse cx="9" cy="6" rx="4" ry="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 12H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M9 11V22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          ))}
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
      </div>
    );
  }

  // Default "line" with Lotus Mark
  return (
    <div
      className={cn('flex items-center justify-center w-full py-4 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
      <div className="mx-3 flex items-center gap-1.5 text-gold">
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-gold"
        >
          <path
            d="M12 2L15 8L12 14L9 8L12 2Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M3 10C5 6 8 5 12 5C16 5 19 6 21 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
    </div>
  );
}
