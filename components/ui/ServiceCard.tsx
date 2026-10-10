'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
  Sparkles,
  Scissors,
  HeartPulse,
  Microscope,
  Home,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ServiceItem } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceItem;
  animalSlug: string;
}

export function ServiceCard({ service, animalSlug }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(isFine && !isReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !canTilt) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max ±8 degrees
    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    mouseY.set(rotX);
    mouseX.set(rotY);

    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-orange" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-orange" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-orange" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-orange" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-orange" />;
      case 'Microscope':
        return <Microscope className="w-5 h-5 text-orange" />;
      case 'Home':
        return <Home className="w-5 h-5 text-orange" />;
      default:
        return <Activity className="w-5 h-5 text-orange" />;
    }
  };

  const isFeature = service.layout === 'feature';
  const isWide = service.layout === 'wide';

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1000,
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <Link
        href={`/services/${animalSlug}#${service.slug}`}
        className={cn(
          'group relative flex flex-col justify-between h-full rounded-3xl transition-all duration-300 shadow-glass overflow-hidden block',
          isFeature
            ? 'p-7 sm:p-9 bg-gradient-to-br from-orange-deep via-orange-deep to-brown-deep text-cream border-2 border-orange-soft/40 shadow-warm-glow hover:border-cream'
            : isWide
              ? 'p-6 sm:p-8 bg-sand/25 dark:bg-olive-900/70 border border-sand/40 hover:border-orange/60'
              : 'p-6 sm:p-7 glass-card hover:border-orange/60',
        )}
      >
        {/* Dynamic Cursor-Following Warm Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            opacity: glowPos.opacity,
            background: isFeature
              ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 246, 229, 0.25) 0%, transparent 60%)`
              : `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 117, 27, 0.2) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <div>
          {/* Top Row: Icon, Badge & Duration */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-all duration-300',
                isFeature
                  ? 'bg-cream text-orange-deep border-cream'
                  : 'bg-olive-900 text-orange border-sand/40',
              )}
            >
              {getIcon(service.icon)}
            </div>

            <div className="flex items-center gap-2">
              {isFeature && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/20 border border-cream/30 text-[11px] font-bold uppercase tracking-wider text-cream">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cream" />
                  </span>
                  <span>Priority Care</span>
                </span>
              )}

              {service.duration && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border',
                    isFeature
                      ? 'bg-black/20 text-cream/90 border-cream/30'
                      : 'bg-sand/30 text-ink/70 dark:text-cream/80 border-sand/50',
                  )}
                >
                  <Clock className="w-3 h-3 text-orange-deep dark:text-orange" />
                  <span>{service.duration}</span>
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'font-display font-bold text-xl sm:text-2xl transition-colors mb-2',
              isFeature
                ? 'text-cream group-hover:text-sand'
                : 'text-olive dark:text-cream group-hover:text-orange-deep dark:group-hover:text-orange',
            )}
          >
            {service.title}
          </h3>

          {/* Short Description */}
          <p
            className={cn(
              'text-sm leading-relaxed font-light mb-4',
              isFeature ? 'text-cream/90' : 'text-ink/80 dark:text-cream/80',
              !isFeature && 'line-clamp-3',
            )}
          >
            {service.description}
          </p>

          {/* Features bullet preview for feature/wide cards */}
          {(isFeature || isWide) && service.features && service.features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 pt-2">
              {service.features.slice(0, 4).map((feat, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex items-center gap-2 text-xs',
                    isFeature ? 'text-cream/85' : 'text-ink/75 dark:text-cream/75',
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', isFeature ? 'bg-sand' : 'bg-orange')} />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Learn More Link with Sliding Arrow */}
        <div
          className={cn(
            'pt-3 border-t flex items-center justify-between text-xs font-semibold transition-colors',
            isFeature
              ? 'border-cream/20 text-cream group-hover:text-sand'
              : 'border-sand/40 text-olive dark:text-sand group-hover:text-orange-deep dark:group-hover:text-orange',
          )}
        >
          <span>Explore Clinical Details</span>
          <ArrowRight
            className={cn(
              'w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200',
              isFeature ? 'text-sand' : 'text-orange',
            )}
          />
        </div>
      </Link>
    </motion.div>
  );
}
