import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DoctorCard } from '@/components/ui/DoctorCard';
import type { Doctor } from '@/lib/types';

interface DoctorsProps {
  doctors: Doctor[];
}

export function Doctors({ doctors }: DoctorsProps) {
  return (
    <section
      id="doctors-section"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Veterinary Medical Faculty"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 border border-sand/50 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>Medical Faculty</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-olive dark:text-cream tracking-tight">
          Meet Your Pet&apos;s Care Team
        </h2>

        <p className="mt-3 text-sm sm:text-base text-ink/80 dark:text-cream/80 leading-relaxed font-light max-w-xl mx-auto">
          Distinguished surgeons, dermatologists, and diagnostic physicians dedicated to
          compassionate, fear-free clinical care in Kolkata.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* Footer link to full directory */}
      <div className="mt-12 text-center">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-olive dark:text-sand hover:text-orange-deep dark:hover:text-orange transition-colors"
        >
          <span>Explore All Veterinary Specialists & On-Call Surgeons</span>
          <ArrowRight className="w-4 h-4 text-orange" />
        </Link>
      </div>
    </section>
  );
}
