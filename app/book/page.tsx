import React from 'react';
import { getSiteConfig } from '@/lib/data';

export default function BookPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
        Appointments
      </span>
      <h1 className="font-display text-4xl text-teal font-bold mt-2">Book an Appointment</h1>
      <p className="mt-4 text-ink/80 max-w-lg mx-auto text-sm">
        Schedule a consultation with our experienced veterinary team. Multi-step booking form
        arriving in Phase 4.
      </p>

      <div className="glass-card mt-8 p-8 border border-gold/30 max-w-md mx-auto">
        <p className="text-sm font-medium text-teal">For immediate emergency assistance:</p>
        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
          className="mt-3 inline-block px-6 py-3 rounded-xl bg-gold text-ink font-semibold text-sm shadow-gold-glow"
        >
          Call Emergency: {siteConfig.phone}
        </a>
      </div>
    </main>
  );
}
