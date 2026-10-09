'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Stethoscope, ChevronUp, ChevronDown } from 'lucide-react';
import type { Doctor } from '@/lib/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-3xl glass-card border border-sand/40 hover:border-orange/60 transition-all duration-300 shadow-glass overflow-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      {/* Top Portrait with Rounded Arch Frame */}
      <div className="relative w-full aspect-[4/5] bg-olive-950/20 dark:bg-olive-950/40 overflow-hidden flex items-center justify-center p-3">
        <div className="relative w-full h-full rounded-t-[60px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden border border-sand/40">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top-Right Experience Badge */}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive-900/90 border border-sand/40 text-sand text-xs font-semibold backdrop-blur-md shadow-sm">
            <Award className="w-3.5 h-3.5 text-orange" />
            <span>{doctor.yearsOfExperience} yrs exp</span>
          </div>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-deep dark:text-orange font-semibold mb-1">
            <Stethoscope className="w-3.5 h-3.5 text-orange-deep dark:text-orange" />
            <span>Veterinary Physician</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-olive dark:text-cream group-hover:text-orange-deep dark:group-hover:text-orange transition-colors">
            {doctor.name}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-ink/75 dark:text-cream/75 mt-1 line-clamp-1">
            {doctor.role}
          </p>

          {doctor.qualifications && (
            <p className="text-[11px] text-ink/60 dark:text-cream/60 mt-0.5 font-sans font-light">
              {doctor.qualifications}
            </p>
          )}
        </div>

        {/* Slide-Up / Expandable Specialties Panel */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden mt-3"
        >
          <div className="pt-3 border-t border-sand/30">
            <span className="text-[11px] uppercase tracking-wider text-orange-deep dark:text-orange font-semibold block mb-2">
              Clinical Disciplines
            </span>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {doctor.specialties?.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-sand/30 dark:bg-olive/40 border border-sand/40 text-ink dark:text-cream font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
            <p className="text-xs text-ink/80 dark:text-cream/80 leading-relaxed line-clamp-2 mb-3">
              {doctor.bio.replace('\n', ' ')}
            </p>
          </div>
        </motion.div>

        {/* Mobile / Touch toggle and Profile Link */}
        <div className="mt-4 pt-3 border-t border-sand/30 flex items-center justify-between">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-olive dark:text-sand hover:text-orange-deep dark:hover:text-orange transition-colors"
          >
            <span>View Full Profile</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-1.5 text-olive dark:text-cream hover:text-orange"
            aria-label={isExpanded ? 'Collapse specialties' : 'Expand specialties'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
