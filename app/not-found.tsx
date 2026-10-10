import React from 'react';
import Link from 'next/link';
import { Home, Stethoscope, Phone, Compass } from 'lucide-react';
import { CrossDivider } from '@/components/ui/CrossDivider';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center max-w-3xl mx-auto">
      {/* Brand Scene Illustration: Cross + Paw */}
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-orange/15 border-2 border-orange/40 flex items-center justify-center text-orange shadow-warm-glow">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-olive-deep text-sand border-2 border-cream dark:border-olive-deep flex items-center justify-center shadow-md">
          <Compass className="w-4 h-4 text-orange" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/30 dark:bg-olive-deep/80 border border-sand/50 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-3">
        <span>404 • Page Not Found</span>
      </div>

      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-olive-deep dark:text-cream tracking-tight mb-3">
        Lost Your Way?
      </h1>

      <p className="text-sm sm:text-base text-ink/75 dark:text-cream/80 max-w-md mx-auto leading-relaxed font-body mb-8">
        The clinical record, species guide, or page you are looking for does not exist in our directory. Let us guide you back to our care services.
      </p>

      <div className="w-full max-w-xs mb-8">
        <CrossDivider variant="cross" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all"
        >
          <Home className="w-4 h-4 text-ink" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/#services"
          className="py-3 px-6 rounded-2xl border border-sand/60 hover:bg-sand/20 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Stethoscope className="w-4 h-4 text-orange" />
          <span>Our Services</span>
        </Link>

        <Link
          href="/contact"
          className="py-3 px-6 rounded-2xl border border-sand/60 hover:bg-sand/20 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Phone className="w-4 h-4 text-orange" />
          <span>Contact & Help</span>
        </Link>
      </div>
    </main>
  );
}
