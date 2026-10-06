import React from 'react';
import { cn } from '@/lib/cn';

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
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
          {/* Egyptian Lotus / Royal Pet Mark */}
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
