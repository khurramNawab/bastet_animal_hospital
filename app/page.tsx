import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Sparkles, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { getSiteConfig, getServices, getDoctors } from '@/lib/data';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const services = getServices();
  const doctors = getDoctors();

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Placeholder Hero Section for Phase 1 */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-cream via-cream/80 to-cream-dark/30">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Kolkata&apos;s Royal Veterinary Sanctuary</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-teal font-bold tracking-tight text-balance leading-tight">
            Trusted Dog Hospital in Kolkata
          </h1>

          <p className="text-base sm:text-lg text-ink/80 max-w-2xl text-balance leading-relaxed">
            {siteConfig.tagline}. Advanced surgical suites, 24x7 trauma emergency, dermatology, and
            compassionate canine diagnostics in Park Street, Kolkata.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gold text-ink font-semibold text-sm uppercase tracking-wider shadow-gold-glow hover:bg-gold-light hover:shadow-gold-glow-lg transition-all active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-teal text-cream font-semibold text-sm uppercase tracking-wider hover:bg-teal-light transition-all active:scale-95"
            >
              <span>Explore Services</span>
            </Link>
          </div>

          {/* Placeholder Hero Graphic */}
          <div className="mt-10 relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gold/30">
            <Image
              src="/images/hero-placeholder.svg"
              alt="Bastet Animal Hospital Luxury Care"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="w-full bg-teal text-cream py-12 border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold">
                  {stat.value}
                  <span className="text-gold-light">{stat.suffix}</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-cream/80 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Bar */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            Comprehensive Canine Care
          </span>
          <h2 className="font-display text-3xl text-teal font-bold mt-1">Our Core Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="glass-card p-6 flex flex-col justify-between hover:shadow-gold-glow transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-teal text-gold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-teal">{service.title}</h3>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
