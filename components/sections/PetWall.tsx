'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import type { GalleryItem } from '@/lib/types';

interface PetWallProps {
  items: GalleryItem[];
}

export function PetWall({ items }: PetWallProps) {
  return (
    <section
      id="happy-tails"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-label="Happy Tails Patient Gallery"
    >
      {/* Header */}
      <Reveal variant="fade-up">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 border border-sand/50 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>Healing Journeys</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-olive dark:text-cream tracking-tight">
            Happy Tails
          </h2>

          <p className="mt-3 text-sm sm:text-base text-ink/80 dark:text-cream/80 leading-relaxed font-light max-w-xl mx-auto">
            Glimpses of clinical recovery, joyful tail wags, and companion wellness milestones from our Kolkata hospital wards.
          </p>
        </div>
      </Reveal>

      {/* Polaroid Wall Grid (Desktop: 3-4 col collage, Mobile: horizontal scroll-snap strip) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 py-6">
        {items.map((item, index) => {
          const rot = item.rotation ?? ((index % 5) - 2) * 2;
          return (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={index * 0.08}
              className="flex justify-center"
            >
              <div
                style={{ transform: `rotate(${rot}deg)` }}
                className="group relative w-full max-w-sm p-4 pb-6 bg-[#FFFDF9] dark:bg-sand-50 rounded-2xl shadow-xl hover:shadow-2xl border border-sand/40 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-20 cursor-pointer"
              >
                {/* Vintage Washi Tape Pin Accent */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-sand/70 dark:bg-sand/80 border border-sand/40 shadow-sm rotate-[-2deg] rounded-sm pointer-events-none"
                  aria-hidden="true"
                />

                {/* Polaroid Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-sand/20 mb-3 border border-black/5">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-medium">
                    {item.category}
                  </div>
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="px-1 text-center">
                  <h3 className="font-display text-sm font-bold text-ink mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink/75 font-normal leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Mobile Horizontal Snap Carousel */}
      <div className="sm:hidden flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-center shrink-0 w-[280px] p-4 pb-5 bg-[#FFFDF9] dark:bg-sand-50 rounded-2xl shadow-lg border border-sand/40"
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-sand/20 mb-3">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-medium">
                {item.category}
              </div>
            </div>
            <div className="text-center px-1">
              <h3 className="font-display text-sm font-bold text-ink mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-ink/70 leading-snug">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
