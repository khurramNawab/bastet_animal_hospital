'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Bird, Footprints, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { AnimalCategory } from '@/lib/types';

interface SpeciesTabsProps {
  animals: AnimalCategory[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export function SpeciesTabs({ animals, activeSlug, onSelect }: SpeciesTabsProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'dog':
        return <Dog className="w-4 h-4" />;
      case 'cat':
        return <Cat className="w-4 h-4" />;
      case 'bird':
        return <Bird className="w-4 h-4" />;
      default:
        return <Footprints className="w-4 h-4" />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % animals.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + animals.length) % animals.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = animals.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    onSelect(animals[nextIndex].slug);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Select pet species"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full bg-sand/30 dark:bg-olive-900/70 border border-sand/40 backdrop-blur-md max-w-2xl mx-auto shadow-sm"
    >
      {animals.map((animal, idx) => {
        const isSelected = activeSlug === animal.slug;

        return (
          <button
            key={animal.slug}
            ref={(el) => {
              tabsRef.current[idx] = el;
            }}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`species-panel-${animal.slug}`}
            id={`species-tab-${animal.slug}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(animal.slug)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-deep',
              isSelected ? 'text-ink font-bold' : 'text-ink/75 dark:text-cream/80 hover:text-orange-deep dark:hover:text-orange',
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="activeSpeciesPill"
                className="absolute inset-0 bg-orange rounded-full shadow-warm-glow -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            <span className={cn('transition-transform duration-200', isSelected && 'scale-110')}>
              {getIcon(animal.icon)}
            </span>

            <span>{animal.name.split(' ')[0]}</span>

            {animal.comingSoon && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border',
                  isSelected
                    ? 'bg-ink/10 text-ink border-ink/20'
                    : 'bg-orange/15 text-orange-deep dark:text-sand border-orange/30',
                )}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Soon</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
