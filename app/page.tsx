import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { getSiteConfig, getServices } from '@/lib/data';
import { Stethoscope } from 'lucide-react';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const services = getServices();

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Cinematic 3D Hero Section */}
      <Hero siteConfig={siteConfig} />

      {/* Services Preview Bar */}
      <section
        id="explore-services"
        className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold/20"
      >
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
