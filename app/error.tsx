'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Phone } from 'lucide-react';
import { GoldDivider } from '@/components/ui/GoldDivider';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error locally without leaking PII
    console.error('Runtime error caught by boundary:', error.message);
  }, [error]);

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-24 text-center max-w-3xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-teal dark:text-cream tracking-tight mb-3">
        Temporary Clinical Interruption
      </h1>

      <p className="text-sm sm:text-base text-ink/75 dark:text-cream/80 max-w-md mx-auto leading-relaxed font-light mb-8">
        We encountered an unexpected technical glitch while processing this request. Please try
        refreshing or contact our reception directly.
      </p>

      <div className="w-full max-w-xs mb-8">
        <GoldDivider variant="line" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="py-3 px-6 rounded-2xl bg-gold hover:bg-gold-light text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-teal dark:bg-teal-800 text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4 text-gold" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/contact"
          className="py-3 px-6 rounded-2xl border border-gold/40 hover:bg-gold/15 text-teal dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-gold" />
          <span>Emergency Line</span>
        </Link>
      </div>
    </main>
  );
}
