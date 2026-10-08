'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Stethoscope, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Doctor } from '@/lib/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-3xl glass-card border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-glass overflow-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      {/* Top Portrait with Egyptian Doorway Arch Frame */}
      <div className="relative w-full aspect-[4/5] bg-teal-900/40 overflow-hidden flex items-center justify-center p-3">
        <div className="relative w-full h-full rounded-t-[60px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden border border-gold/30">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top-Right Experience Badge */}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/90 border border-gold/40 text-gold text-xs font-semibold backdrop-blur-md shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>{doctor.yearsOfExperience} yrs exp</span>
          </div>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-dark dark:text-gold font-semibold mb-1">
            <Stethoscope className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>Veterinary Physician</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-teal dark:text-cream group-hover:text-teal-600 dark:group-hover:text-gold transition-colors">
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
          <div className="pt-3 border-t border-gold/20">
            <span className="text-[11px] uppercase tracking-wider text-gold-dark dark:text-gold font-semibold block mb-2">
              Clinical Disciplines
            </span>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {doctor.specialties?.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-teal/10 dark:bg-gold/15 border border-gold/20 text-teal dark:text-cream font-medium"
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
        <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal dark:text-gold hover:text-gold-dark dark:hover:text-gold-light transition-colors"
          >
            <span>View Full Profile</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-1.5 text-teal dark:text-cream hover:text-gold"
            aria-label={isExpanded ? 'Collapse specialties' : 'Expand specialties'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
