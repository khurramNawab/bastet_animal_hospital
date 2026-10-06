import React from 'react';
import { getServices } from '@/lib/data';

export default function ServicesPage() {
  const services = getServices();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Veterinary Specialities
        </span>
        <h1 className="font-display text-4xl text-teal font-bold mt-2">Our Clinical Services</h1>
        <p className="mt-3 text-ink/80 text-sm">
          Precision veterinary diagnostics, surgery, and preventive care in Kolkata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="glass-card p-6 border border-gold/20">
            <h2 className="font-display text-xl font-bold text-teal mb-2">{service.title}</h2>
            <p className="text-sm text-ink/80">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
