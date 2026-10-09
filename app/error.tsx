'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home, Phone } from 'lucide-react';
import { CrossDivider } from '@/components/ui/CrossDivider';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error caught by boundary:', error.message);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center max-w-3xl mx-auto">
      {/* Brand Error Scene */}
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-danger/15 border-2 border-danger/30 flex items-center justify-center text-danger shadow-warm-glow">
          <AlertCircle className="w-10 h-10" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-danger/10 border border-danger/20 text-danger text-xs font-semibold uppercase tracking-widest mb-3">
        <span>System Notice</span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-olive-deep dark:text-cream tracking-tight mb-3">
        Temporary Clinical Interruption
      </h1>

      <p className="text-sm sm:text-base text-ink/75 dark:text-cream/80 max-w-md mx-auto leading-relaxed font-body mb-8">
        We encountered an unexpected technical issue while loading this view. Please try refreshing or contact our emergency reception directly.
      </p>

      <div className="w-full max-w-xs mb-8">
        <CrossDivider variant="cross" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="py-3 px-6 rounded-2xl bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all"
        >
          <RotateCcw className="w-4 h-4 text-ink" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-olive-deep hover:bg-olive text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4 text-sand" />
          <span>Return Home</span>
        </Link>

        <a
          href="tel:+919876543210"
          className="py-3 px-6 rounded-2xl border border-sand/60 hover:bg-sand/20 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-orange" />
          <span>Emergency Call</span>
        </a>
      </div>
    </main>
  );
}
