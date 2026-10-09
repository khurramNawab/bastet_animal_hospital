'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Phone } from 'lucide-react';
import { CrossDivider } from '@/components/ui/CrossDivider';

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

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-olive-deep dark:text-cream tracking-tight mb-3">
        Temporary Clinical Interruption
      </h1>

      <p className="text-sm sm:text-base text-ink/75 dark:text-cream/80 max-w-md mx-auto leading-relaxed font-light mb-8">
        We encountered an unexpected technical glitch while processing this request. Please try
        refreshing or contact our reception directly.
      </p>

      <div className="w-full max-w-xs mb-8">
        <CrossDivider variant="line" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="py-3 px-6 rounded-2xl bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-olive-deep text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:bg-olive"
        >
          <Home className="w-4 h-4 text-sand" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/contact"
          className="py-3 px-6 rounded-2xl border border-sand/50 hover:bg-sand/20 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-orange" />
          <span>Emergency Line</span>
        </Link>
      </div>
    </main>
  );
}
